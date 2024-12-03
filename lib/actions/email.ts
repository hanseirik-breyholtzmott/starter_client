export async function sendInvestmentPDF(
  pdfBase64: string,
  email: string,
  investorName: string,
  companyName: string
) {
  try {
    console.log("Sending PDF with data:", {
      hasEmail: !!email,
      hasName: !!investorName,
      hasCompany: !!companyName,
      email,
      investorName,
      companyName,
      pdfLength: pdfBase64?.length,
    });

    const response = await fetch("/api/send-investment-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pdfBase64,
        email,
        investorName,
        companyName,
      }),
    });

    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.error || "Failed to send email");
    }

    if (!data.success) {
      throw new Error("Email sending was not successful");
    }

    return data;
  } catch (error) {
    console.log("Error sending email:", error);
    throw error;
  }
}
