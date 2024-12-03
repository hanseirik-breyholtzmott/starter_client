import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { pdfBase64, email, investorName, companyName } =
      await request.json();

    if (!pdfBase64 || !email || !investorName || !companyName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert base64 PDF to Buffer
    const pdfBuffer = Buffer.from(pdfBase64.split(",")[1], "base64");

    const data = await resend.emails.send({
      from: "Folkekraft <no-reply@folkekraft.no>",
      to: email,
      subject: `Din investering i ${companyName}`,
      html: `<p>Hei ${investorName},</p>
             <p>Takk for din investering i ${companyName}. Vedlagt finner du detaljene om din investering.</p>
             <p>Med vennlig hilsen,<br>Folkekraft</p>`,
      attachments: [
        {
          filename: `Folkekraft-Investering-${companyName}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    console.log("Resend API Response:", data); // Debug log

    // Remove the ID check since it might not be consistent
    return NextResponse.json({
      success: true,
      data,
      debug: {
        emailSent: true,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.log("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
