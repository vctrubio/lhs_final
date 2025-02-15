import { NextResponse } from 'next/server';

export async function GET() {
    // In a real app, you could read from a file, generate a PDF, etc.
    // Here, we'll just return plain text "Hello World" as an example.

    const fileContent = 'Hello World';

    // Set headers to force the browser to prompt a file download,
    // giving it a filename of "helloworld.txt" (or change as needed).
    return new NextResponse(fileContent, {
        headers: {
            'Content-Type': 'text/plain',
            'Content-Disposition': 'attachment; filename="helloworld.txt"',
        },
    });
}
