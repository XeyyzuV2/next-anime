import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import prisma from "@/src/lib/prisma";

// Add a custom property to the NextApiRequest type
interface NextApiRequestWithKeyInfo extends NextApiRequest {
  keyInfo?: {
    tier: string;
    owner: string | null;
    remaining: number;
    limit: number;
  };
}

export const validateApiKey = (handler: NextApiHandler) => {
  return async (req: NextApiRequestWithKeyInfo, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "API Key required" });
    }

    const apiKey = authHeader.split(" ")[1];

    if (!apiKey) {
      return res.status(401).json({ message: "API Key required" });
    }

    try {
      let keyData = await prisma.apiKey.findUnique({
        where: { value: apiKey },
      });

      if (!keyData) {
        return res.status(401).json({ message: "Invalid API Key" });
      }

      const now = Date.now();
      if (keyData.resetAt < now) {
        keyData = await prisma.apiKey.update({
          where: { id: keyData.id },
          data: {
            usage: 0,
            resetAt: BigInt(now + Number(keyData.duration)),
          },
        });
      }

      if (keyData.usage >= keyData.limit) {
        return res.status(429).json({ message: "Rate limit exceeded" });
      }

      await prisma.apiKey.update({
        where: { id: keyData.id },
        data: { usage: { increment: 1 } },
      });

      req.keyInfo = {
        tier: keyData.tier,
        owner: keyData.owner,
        remaining: keyData.limit - keyData.usage - 1,
        limit: keyData.limit,
      };

      return handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
