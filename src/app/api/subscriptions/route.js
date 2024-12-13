import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const {userEmail } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lucidinc11@gmail.com',
        pass: 'sxnh jxnr pbxe juky'
      }
    });

    const mailOptions = {
      from: 'lucidinc11@gmail.com',
      to: 'lucidinc11@gmail.com',
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
