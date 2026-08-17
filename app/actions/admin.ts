"use server";

import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { contributions } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import crypto from "crypto";
import { getPostHogClient } from "@/lib/posthog-server";

const COOKIE_NAME = "admin_session";

function getExpectedToken(): string | null {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return crypto.createHmac("sha256", secret).update("safetomerge-admin-v1").digest("hex");
}

export async function loginAdmin(password: string) {
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminPass) {
    return { success: false, error: "ADMIN_PASSWORD environment variable is not configured." };
  }

  const inputBuffer = Buffer.from(password.trim());
  const expectedBuffer = Buffer.from(adminPass.trim());

  if (
    inputBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(inputBuffer, expectedBuffer)
  ) {
    const token = getExpectedToken();
    if (!token) return { success: false, error: "Failed to generate session token." };

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/",
    });

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: "admin",
      event: "admin_logged_in",
      properties: {
        source: "admin_dashboard",
      },
    });
    await posthog.flush();

    return { success: true };
  }

  return { success: false, error: "Incorrect passcode." };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return { success: true };
}

export async function checkIsAdmin(): Promise<boolean> {
  const expectedToken = getExpectedToken();
  if (!expectedToken) return false;

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;
  return sessionToken === expectedToken;
}

export async function getContributions() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  return await db.select().from(contributions).orderBy(desc(contributions.createdAt));
}
