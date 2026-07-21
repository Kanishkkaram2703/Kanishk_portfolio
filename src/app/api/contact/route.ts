import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (message.trim().length < 15) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["kanishk.karam.28@gmail.com"],
      subject: `Portfolio: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #D1001F, #a00018); padding: 24px 32px;">
            <h1 style="color: #fff; font-size: 18px; margin: 0;">New Portfolio Message</h1>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px; width: 80px;">Name</td>
                <td style="padding: 8px 0; color: #fff; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 8px 0; color: #D1001F; font-size: 14px;"><a href="mailto:${email}" style="color: #D1001F; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">Subject</td>
                <td style="padding: 8px 0; color: #fff; font-size: 14px;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 20px; background: #111; border-radius: 8px; border: 1px solid #222;">
              <p style="color: #999; font-size: 11px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
              <p style="color: #eee; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="color: #444; font-size: 11px; margin: 0;">Sent from Kanishk Portfolio</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
