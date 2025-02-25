import { chromium } from "playwright-core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    if (!slug) {
      return new NextResponse("Missing 'slug' param", { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/pdf/${slug}`;

    console.log("🔹 Generating PDF from:", url);

    const browser = await chromium.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });

    await page.waitForLoadState("load");
    await page.waitForSelector("img", { timeout: 10000 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    console.log("✅ PDF Successfully Generated");

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="LHS-${slug}.pdf"`,
        "Access-Control-Allow-Origin": "*", // ✅ Fix CORS for client-side calls
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (err) {
    console.error("❌ PDF Generation Error:", err);
    return new NextResponse("PDF Generation Failed", { status: 500 });
  }
}
