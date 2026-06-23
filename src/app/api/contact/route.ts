import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, subject, isHireInquiry } = body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Length guards
    if (name.trim().length > 100 || message.trim().length > 2000) {
      return NextResponse.json(
        { error: "Input too long." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const emailSubject =
      subject?.trim() ||
      (isHireInquiry
        ? `Hire Me inquiry from ${name.trim()}`
        : `New message from ${name.trim()} — Portfolio`);

    // ── Email TO Prishu ──
    const toOwnerHtml = isHireInquiry
      ? buildHireEmailHtml(name.trim(), email.trim(), message.trim())
      : buildContactEmailHtml(name.trim(), email.trim(), message.trim());

    await transporter.sendMail({
      from: `"Portfolio" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email.trim(),
      subject: emailSubject,
      html: toOwnerHtml,
    });

    // ── Auto-reply TO sender ──
    await transporter.sendMail({
      from: `"Prishu Kumar" <${process.env.GMAIL_USER}>`,
      to: email.trim(),
      subject: isHireInquiry
        ? "Got your hire inquiry — Prishu Kumar"
        : "Got your message — Prishu Kumar",
      html: buildAutoReplyHtml(name.trim(), message.trim(), isHireInquiry),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

// ── HTML builders ────────────────────────────────────────────────

function buildContactEmailHtml(name: string, email: string, message: string) {
  return `
<div style="font-family:system-ui,sans-serif;max-width:580px;margin:0 auto;background:#0a0a0a;color:#f4f4f5;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
  <div style="background:linear-gradient(135deg,#8B5CF6,#3B82F6);padding:24px 28px;">
    <h2 style="margin:0;font-size:18px;font-weight:600;color:#fff;">New Portfolio Message</h2>
    <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">Someone reached out via your portfolio</p>
  </div>
  <div style="padding:28px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#71717a;">From</span>
        <p style="margin:4px 0 0;font-size:15px;color:#f4f4f5;">${escapeHtml(name)}</p>
      </td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#71717a;">Reply-To</span>
        <p style="margin:4px 0 0;font-size:15px;color:#8B5CF6;">${escapeHtml(email)}</p>
      </td></tr>
      <tr><td style="padding:10px 0;">
        <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#71717a;">Message</span>
        <p style="margin:8px 0 0;font-size:15px;color:#d4d4d8;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </td></tr>
    </table>
  </div>
  <div style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);">
    <p style="margin:0;font-size:12px;color:#52525b;">Hit reply to respond directly to ${escapeHtml(name)} at ${escapeHtml(email)}</p>
  </div>
</div>`;
}

function buildHireEmailHtml(name: string, email: string, message: string) {
  return `
<div style="font-family:system-ui,sans-serif;max-width:580px;margin:0 auto;background:#0a0a0a;color:#f4f4f5;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
  <div style="background:linear-gradient(135deg,#8B5CF6,#3B82F6);padding:24px 28px;">
    <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:1.5px;">New Hire Inquiry</p>
    <h2 style="margin:0;font-size:20px;font-weight:700;color:#fff;">💼 Someone wants to hire you</h2>
  </div>
  <div style="padding:28px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#71717a;">From</span>
        <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#f4f4f5;">${escapeHtml(name)}</p>
      </td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#71717a;">Reply-To</span>
        <p style="margin:4px 0 0;font-size:15px;color:#8B5CF6;">${escapeHtml(email)}</p>
      </td></tr>
      <tr><td style="padding:10px 0;">
        <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#71717a;">Inquiry Details</span>
        <p style="margin:8px 0 0;font-size:14px;color:#d4d4d8;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </td></tr>
    </table>
  </div>
  <div style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.04);background:rgba(139,92,246,0.05);">
    <p style="margin:0;font-size:12px;color:#52525b;">Hit reply to respond directly to ${escapeHtml(name)} at ${escapeHtml(email)}</p>
  </div>
</div>`;
}

function buildAutoReplyHtml(name: string, message: string, isHire?: boolean) {
  const preview = message.slice(0, 200) + (message.length > 200 ? "…" : "");
  return `
<div style="font-family:system-ui,sans-serif;max-width:580px;margin:0 auto;background:#0a0a0a;color:#f4f4f5;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
  <div style="background:linear-gradient(135deg,#8B5CF6,#3B82F6);padding:24px 28px;">
    <h2 style="margin:0;font-size:18px;font-weight:600;color:#fff;">Hey ${escapeHtml(name)} 👋</h2>
  </div>
  <div style="padding:28px;line-height:1.7;font-size:15px;color:#d4d4d8;">
    <p>${isHire ? "Thanks for your hire inquiry — I've received it and will review and get back to you within 24 hours." : "Thanks for reaching out — I've received your message and will get back to you within 24 hours."}</p>
    <p style="margin-top:16px;color:#71717a;font-size:13px;border-left:2px solid #8B5CF6;padding-left:12px;white-space:pre-wrap;">"${escapeHtml(preview)}"</p>
    <p style="margin-top:24px;">Talk soon,<br/><strong style="color:#f4f4f5;">Prishu Kumar</strong><br/><span style="font-size:13px;color:#71717a;">AI-Focused Full-Stack Developer</span></p>
  </div>
</div>`;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
