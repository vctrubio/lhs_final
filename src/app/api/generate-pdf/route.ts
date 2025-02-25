import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const slug = searchParams.get("slug");
        if (!slug) {
            return new NextResponse("Missing 'slug' param", { status: 400 });
        }

        // Build the URL to your /pdf/<slug> page
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = `${baseUrl}/pdf/${slug}`;

        console.log("Generating PDF from:", url);

        // 1) Launch Puppeteer
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        // 2) Open the page
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });

        // 3) Ensure fonts load
        await page.evaluate(() => {
            return new Promise<void>((resolve) => {
                if (document.fonts) {
                    document.fonts.ready.then(() => resolve());
                } else {
                    resolve();
                }
            });
        });

        // 4) Wait for any images
        await page.waitForSelector("img", { timeout: 5000 });

        // 5) Force an A4 viewport in pixels:
        //    210mm ~= 795px, 297mm ~= 1123px at 96 DPI,
        //    We'll add deviceScaleFactor to improve clarity
        await page.setViewport({
            width: 795,
            height: 1123,
            deviceScaleFactor: 3,
        });

        // 6) Print the PDF
        const pdfBuffer = await page.pdf({
            width: "210mm",
            height: "297mm",
            printBackground: true,
            scale: 1,
        });

        await browser.close();

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="LHS-${slug}.pdf"`,
            },
        });
    } catch (err) {
        console.error("PDF Generation Error:", err);
        return new NextResponse("PDF Generation Failed", { status: 500 });
    }
}
