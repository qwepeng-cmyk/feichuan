import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, company, email, countryCode, phone, demands, message } = body;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Inquiry from ${name} (${company})`,
            text: `
                New Inquiry Received:
                
                Name: ${name}
                Company: ${company}
                Email: ${email}
                Phone: ${countryCode} ${phone}
                Inquiry Types: ${demands.join(', ')}
                
                Message:
                ${message}
            `,
            html: `
                <h2>New Website Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
                <p><strong>Inquiry Types:</strong> ${demands.join(', ')}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
