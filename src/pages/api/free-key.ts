import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prisma";
import { randomBytes } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const apiKey = `free_${randomBytes(16).toString("hex")}`;
    const duration = 7200000; // 2 hours in milliseconds
    const resetAt = BigInt(Date.now() + duration);

    const newKey = await prisma.apiKey.create({
      data: {
        value: apiKey,
        tier: "free",
        owner: "xapis-LLC",
        limit: 500,
        usage: 0,
        duration: BigInt(duration),
        resetAt: resetAt,
      },
    });

    res.status(200).json({
      status: true,
      api_key: newKey.value,
      tier: newKey.tier,
      limit: newKey.limit,
      expires_in: "2h",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
