import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { naam, email, onderwerp, bericht } = await req.json();

    if (!naam || !email || !onderwerp || !bericht) {
      return NextResponse.json({ error: 'Alle velden zijn verplicht' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Arvenzo Contact <onboarding@resend.dev>',
      to: 'support@arvenzo.eu',
      replyTo: email,
      subject: `[Contact] ${onderwerp}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1A0A02;">
          <div style="background: #5D2B09; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #F7F1ED; margin: 0; font-size: 20px;">Nieuw contactbericht</h1>
          </div>
          <div style="background: #F7F1ED; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5ddd8;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; color: #7a6a62; font-size: 13px; width: 110px;">Naam</td>
                <td style="padding: 8px 0; font-weight: 600;">${naam}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7a6a62; font-size: 13px;">E-mail</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #5D2B09;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7a6a62; font-size: 13px;">Onderwerp</td>
                <td style="padding: 8px 0; font-weight: 600;">${onderwerp}</td>
              </tr>
            </table>
            <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e5ddd8;">
              <p style="margin: 0 0 8px; color: #7a6a62; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Bericht</p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${bericht}</p>
            </div>
            <p style="margin: 24px 0 0; font-size: 12px; color: #7a6a62;">
              Beantwoord deze email om rechtstreeks te antwoorden aan ${naam}.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact API]', err);
    return NextResponse.json({ error: 'Versturen mislukt' }, { status: 500 });
  }
}
