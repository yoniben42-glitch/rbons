export async function sendEmail(args: { to: string; subject: string; html: string; text: string; attachments?: Array<{ filename: string; content: string }> }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY not configured" };
  const from = process.env.RESEND_FROM_EMAIL || "RBONSU Photography <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [args.to], subject: args.subject, html: args.html, text: args.text, attachments: args.attachments }),
  });
  if (!response.ok) throw new Error(`Resend ${response.status}: ${(await response.text()).slice(0, 300)}`);
  return { sent: true };
}

export async function sendStudioEmail(args: { subject: string; html: string; text: string; attachments?: Array<{ filename: string; content: string }> }) {
  const to = process.env.STUDIO_NOTIFICATION_EMAIL || "info@rbonsuphotography.com";
  return sendEmail({ ...args, to });
}
