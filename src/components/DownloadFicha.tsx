'use client'
import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const waitForImages = async (container: HTMLElement) => {
  const images = Array.from(container.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => {
                console.error("Image failed to load:", img.src);
                resolve();
              };
            })
    )
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
      // Wait for images to fully load
      await waitForImages(pdfContainer);
      console.log("-- All images loaded!");

      // Capture the full content as an image
      const canvas = await html2canvas(pdfContainer, {
        scale: 2, // Higher scale for better resolution
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale height to fit width

      let yPosition = 0;

      while (yPosition < imgHeight) {
        pdf.addImage(
          imgData,
          "PNG",
          0,
          -yPosition, // Shift image up for the next page
          imgWidth,
          imgHeight
        );

        yPosition += pageHeight;

        if (yPosition < imgHeight) {
          pdf.addPage();
        }
      }

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