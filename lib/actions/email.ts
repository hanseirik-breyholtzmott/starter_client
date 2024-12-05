export async function sendInvestmentPDF(
  pdfBase64: string,
  email: string,
  investorName: string,
  companyName: string
) {
  try {
    console.log("Starting sendInvestmentPDF with:", {
      hasBase64: !!pdfBase64,
      base64Length: pdfBase64?.length,
      email,
      investorName,
      companyName,
    });

    if (!pdfBase64 || !email || !investorName || !companyName) {
      console.error("Missing required fields:", {
        hasBase64: !!pdfBase64,
        hasEmail: !!email,
        hasName: !!investorName,
        hasCompany: !!companyName,
      });
      throw new Error("Missing required fields for email send");
    }

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
    console.log("API Response:", {
      status: response.status,
      ok: response.ok,
      data,
    });

    if (!response.ok) {
      throw new Error(data.error || `Failed to send email: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error in sendInvestmentPDF:", error);
    throw error;
  }
}
