import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const {userEmail } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
      }
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: 'New Lucid Subscriber',
      html: `
        <h2>New Lucid Subscriber</h2>
        <p><strong>User Email:</strong> ${userEmail}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Thank you for subscribing' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    return NextResponse.json(
      { error: 'Failed to send feedback' },
      { status: 500 }
    );
  }
} 