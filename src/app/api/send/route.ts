import { EmailTemplate } from '@/app/(public)/_components/email-template';
import { Resend } from 'resend';

const resendApiKey ="re_WAsL1jwy_69W8QmnpGc5qxZXk3jv6fQJp"
//  process.env.NEXT_PUBLIC_RESEND_API_KEY;

if (!resendApiKey) {
  console.error('❌ RESEND_API_KEY is not set in environment variables.');
  throw new Error('Missing RESEND_API_KEY');
}

const resend = new Resend(resendApiKey);

interface RawData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const rawData: RawData = await req.json();

    const component = await EmailTemplate({
      name: rawData.name,
      email: rawData.email,
      phoneNumber: rawData.phoneNumber,
      message: rawData.message,
    });

    const { data, error } = await resend.emails.send({
      from: `${rawData.name} <contact@resend.dev>`,
      to: ['careers@zareinnovations.com'],
      subject: 'Contact Us',
      react: component,
    });

    if (error) {
      console.error('Email send error:', error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('POST /api/send error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
