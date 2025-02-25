import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Get `slug` from query params
        const searchParams = req.nextUrl.searchParams;
        const slug = searchParams.get("slug");

        if (!slug) {
            return new NextResponse("Missing 'slug' parameter", { status: 400 });
        }

        // Get the base URL dynamically (default to localhost in dev)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        // Construct the PDF page URL dynamically
        const url = `${baseUrl}/pdf/${slug}`;

        console.log("Generating PDF from URL:", url);

        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for serverless environments
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
        });

        await browser.close();

        console.log("PDF successfully generated");

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${slug}.pdf"`,
            },
        });
    } catch (error) {
        console.error("PDF Generation Error:", error);
        return new NextResponse("Failed to generate PDF", { status: 500 });
    }
}
