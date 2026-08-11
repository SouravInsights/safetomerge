"use server";

import { Resend } from "resend";

export async function subscribeEmail(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: "Missing RESEND_API_KEY configuration." };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "Failed to connect to Resend." };
  }
}
