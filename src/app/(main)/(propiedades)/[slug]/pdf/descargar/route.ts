import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    // The "slug" param is from the [slug] segment.
    const { slug } = params;
    console.log('check. ', slug);


    // We need to figure out the base URL to visit. 
    // In local dev, it might be http://localhost:3000
    // In production on Vercel, you can do process.env.VERCEL_URL
    const baseUrl = `http://localhost:3000`;
    const targetUrl = `${baseUrl}/${slug}/pdf`;

    let browser;
    try {
        // 1. Launch a headless browser
        browser = await puppeteer.launch();

        // 2. Open a new tab
        const page = await browser.newPage();

        // 3. Go to the dynamic PDF page
        await page.goto(targetUrl, { waitUntil: 'networkidle0' });

        // 4. Generate a PDF in A4
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        // 5. Close Puppeteer
        await browser.close();

        // 6. Return the PDF for download
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                // Force download in the browser
                'Content-Disposition': `attachment; filename="property-${slug}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        if (browser) {
            await browser.close();
        }
        return new NextResponse('Failed to generate PDF', { status: 500 });
    }
}
