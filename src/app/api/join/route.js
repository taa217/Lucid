import nodemailer from 'nodemailer';

export async function POST(req) {
  // if (req.method === 'POST') {
    const { name, email, position, experience } = await req.json()

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS, // Use environment variables for security
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: `Job Application from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPosition: ${position}\nExperience: ${experience}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return new Response(JSON.stringify({ message: "Submitted Successfully" }), {
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (error) {
      return new Response(JSON.stringify({ message: "Error Submitting" }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  // }
  // else {
  //   res.setHeader('Allow', ['POST']);
  //   res.status(405).end(`Method ${req.method} Not Allowed`);
  // }
} 