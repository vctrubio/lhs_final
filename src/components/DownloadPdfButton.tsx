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

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pageElements.length; i++) {
      const page = pageElements[i];
      await waitForImages(page);
      
      // Capture the page content into a canvas
      const canvas = await html2canvas(page, {
        useCORS: true, // Ensure CORS is handled
        allowTaint: false,
        scale: 2, // Increase scale for better quality
        logging: true, // Enable logging for debugging
      });
      
      const imgData = canvas.toDataURL("image/png");
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const scaleFactor = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
      const imgWidth = canvasWidth * scaleFactor;
      const imgHeight = canvasHeight * scaleFactor;
      const offsetX = (pdfWidth - imgWidth) / 2;
      const offsetY = (pdfHeight - imgHeight) / 2;

      if (i === 0) {
        pdf.addImage(imgData, "PNG", offsetX, offsetY, imgWidth, imgHeight);
      } else {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", offsetX, offsetY, imgWidth, imgHeight);
      }
    }

    pdf.save(`${title}.pdf`);
    setLoading(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="mt-2 p-2 bg-greenish text-white rounded p-6 mx-auto"
    >
      {loading ? "Descargando..." : "Descargar PDF"}
    </button>
  );
};
