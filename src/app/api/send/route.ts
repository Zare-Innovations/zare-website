
import { EmailTemplate } from '@/app/_components/email-template';
import { Resend } from 'resend';

const resend = new Resend('re_a5cESMYv_DQgSpGmK1bmgT9kMBufzsVPX');

interface RawData {
    name: string,
    email: string,
    phoneNumber: string,
    message: string
}

export async function POST(req: Request) {
    const rawData: RawData = await req.json()
    try {

        const component = await EmailTemplate({ name: rawData?.name, email: rawData?.email, phoneNumber: rawData?.phoneNumber, message: rawData?.message })

        const { data, error } = await resend.emails.send({
            from: `${rawData?.name} <contact@resend.dev>`,
            to: ['info@zareinnovations.com'],
            subject: 'Contact Us',
            react: component,
        });

        if (error) {

            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.log(error)
        return Response.json({ error }, { status: 500 });
    }
}