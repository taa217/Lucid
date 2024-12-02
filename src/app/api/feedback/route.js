import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { to, feedback, userEmail } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
      }
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: 'lucidinc11@gmail.com',
      subject: 'New LucidQ Feedback',
      html: `
        <h2>New Lucid Q Feedback Submission</h2>
        <p><strong>User Email:</strong> ${userEmail}</p>
        <div style="margin: 20px 0;">
          ${Object.entries(feedback).map(([key, value]) => `
            <div style="margin: 10px 0;">
              <strong>${key}:</strong> ${Array.isArray(value) ? value.join(', ') : value}
            </div>
          `).join('')}
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    return NextResponse.json(
      { error: 'Failed to send feedback' },
      { status: 500 }
    );
  }
} 