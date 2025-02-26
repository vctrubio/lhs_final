'use client'

import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface DownloadPdfButtonProps {
  title: string;
}

export const DownloadPdfButton = ({ title }: DownloadPdfButtonProps) => {
  const [loading, setLoading] = useState(false);

  const waitForImages = async (container: HTMLElement) => {
    const images = Array.from(container.querySelectorAll("img"));
    await Promise.all(
      images.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            })
      )
    );
  };

  const handleDownload = async () => {
    setLoading(true);
    const pdfContainer = document.getElementById("pdf");
    if (!pdfContainer) {
      setLoading(false);
      return;
    }

    const pageElements = Array.from(pdfContainer.children) as HTMLElement[];
    if (!pageElements.length) {
      setLoading(false);
      return;
    }

    const pdf = new jsPDF("p", "mm"); // No fixed A4 size, we will set dynamically

    for (let i = 0; i < pageElements.length; i++) {
      const page = pageElements[i];
      await waitForImages(page);

      // Capture page at full resolution
      const canvas = await html2canvas(page, {
        useCORS: true,
        allowTaint: false,
        scale: 2, // Higher scale for better quality
      });

      const imgData = canvas.toDataURL("image/png");
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Convert px to mm
      const pxToMm = 0.264583;
      const imgWidthMm = canvasWidth * pxToMm;
      const imgHeightMm = canvasHeight * pxToMm;

      // Define PDF page size
      const pdfWidth = imgWidthMm;
      const pdfHeight = imgHeightMm;
      pdf.addPage([pdfWidth, pdfHeight]);

      // Calculate aspect ratio scaling (object-contain)
      const scaleFactor = Math.min(pdfWidth / imgWidthMm, pdfHeight / imgHeightMm);
      const finalWidth = imgWidthMm * scaleFactor;
      const finalHeight = imgHeightMm * scaleFactor;

      // Centering the image like object-contain
      const offsetX = (pdfWidth - finalWidth) / 2;
      const offsetY = (pdfHeight - finalHeight) / 2;

      pdf.addImage(imgData, "PNG", offsetX, offsetY, finalWidth, finalHeight);
    }

    pdf.deletePage(1); // Remove first empty default page
    pdf.save(`${title}.pdf`);
    setLoading(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="mt-2 p-2 bg-greenish text-white rounded p-4"
    >
      {loading ? "Descargando..." : "Descargar PDF"}
    </button>
  );
};