"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MAX_PDF_SIZE_MB = 20;
const JPEG_QUALITY = 0.8;

const waitForImages = async (container: HTMLElement) => {
  const images = Array.from(container.querySelectorAll("img"));
  await Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => {
            console.error("Image failed to load:", img.src);
            resolve();
          };
        }),
    ),
  );
};

interface DownloadPdfButtonProps {
  title: string;
}

const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({ title }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const pdfContainer = document.getElementById("pdf");
    if (!pdfContainer) {
      console.error("PDF container not found.");
      setLoading(false);
      return;
    }

    try {
      await waitForImages(pdfContainer);
      console.log("-- All images loaded!");

      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      let quality = JPEG_QUALITY;
      let pdfBlobSize = Infinity;
      let imgData = "";
      let pdf;

      do {
        imgData = canvas.toDataURL("image/jpeg", quality);
        pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let yPosition = 0;

        while (yPosition < imgHeight) {
          pdf.addImage(imgData, "JPEG", 0, -yPosition, imgWidth, imgHeight);
          yPosition += pageHeight;
          if (yPosition < imgHeight) pdf.addPage();
        }

        const pdfBlob = pdf.output("blob");
        pdfBlobSize = pdfBlob.size / (1024 * 1024); // Convert bytes to MB
        console.log(`PDF Size: ${pdfBlobSize.toFixed(2)} MB`);

        if (pdfBlobSize > MAX_PDF_SIZE_MB) {
          quality -= 0.05; // Reduce quality and retry
        }
      } while (pdfBlobSize > MAX_PDF_SIZE_MB && quality > 0.3);

      pdf.save(`${title}.pdf`);
    } catch (error) {
      console.error("❌ Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-greenish text-white p-6 rounded-md text-xl hover:bg-green-700 transition"
      disabled={loading}
    >
      {loading ? "Generando..." : "Descargar Ficha"}
    </button>
  );
};

export default DownloadPdfButton;
