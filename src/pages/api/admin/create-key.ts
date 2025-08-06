import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prisma";
import { randomBytes } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // NOTE: This endpoint should be protected by admin authentication
  try {
    const { tier, limit, duration, owner } = req.body;

    if (!tier || !limit || !duration) {
      return res.status(400).json({
        message: "Missing required fields: tier, limit, duration",
      });
    }

    if (tier !== "pro" && tier !== "enterprise") {
      return res.status(400).json({ message: "Invalid tier specified" });
    }

    const prefix = tier === "pro" ? "pro_" : "ent_";
    const apiKey = `${prefix}${randomBytes(16).toString("hex")}`;
    const resetAt = BigInt(Date.now() + duration);

    const newKey = await prisma.apiKey.create({
      data: {
        value: apiKey,
        tier,
        limit,
        duration: BigInt(duration),
        owner: owner || null,
        resetAt: resetAt,
      },
    });

    res.status(201).json({
      status: true,
      api_key: newKey.value,
      tier: newKey.tier,
      limit: newKey.limit,
      owner: newKey.owner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
