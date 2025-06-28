import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, content, fromName, fromEmail, letterContent } = body;

    if (!to || !subject || !letterContent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a test SMTP transporter
    // In production, you would use your actual SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
        pass: process.env.SMTP_PASSWORD || 'ethereal_pass',
      },
    });

    // Format the letter content for email
    const formattedContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="margin-bottom: 20px;">
          ${fromName ? `<p style="margin-bottom: 5px;"><strong>${fromName}</strong></p>` : ''}
          ${fromEmail ? `<p style="margin-bottom: 5px;">${fromEmail}</p>` : ''}
        </div>
        
        <div style="margin-bottom: 20px;">
          <p>${letterContent.date || ''}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          ${letterContent.to?.name ? `<p style="margin-bottom: 5px;"><strong>${letterContent.to.name}</strong></p>` : ''}
          ${letterContent.to?.address ? `<p style="margin-bottom: 5px;">${letterContent.to.address}</p>` : ''}
        </div>
        
        ${letterContent.subject ? `<div style="margin-bottom: 20px;"><p><strong>Subject: ${letterContent.subject}</strong></p></div>` : ''}
        
        <div style="line-height: 1.6; white-space: pre-line;">
          ${letterContent.content || ''}
        </div>
      </div>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail || process.env.SMTP_FROM_EMAIL || 'noreply@docmagic.com'}>`,
      to,
      subject,
      html: formattedContent,
      text: content || letterContent.content || '',
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}