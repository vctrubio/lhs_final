import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MAX_PDF_SIZE_MB = 20;
const JPEG_QUALITY = 0.8;

const waitForImages = async (container) => {
  const images = Array.from(container.querySelectorAll("img"));
  await Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => {
              console.error("Image failed to load:", img.src);
              resolve();
            };
          })
    )
  );
};

export async function generatePdfFromDom(title) {
  const pdfContainer = document.getElementById("pdf");
  if (!pdfContainer) {
    console.error("PDF container not found.");
    return false;
  }

  try {
    // Temporarily make the container visible but still hidden from view
    const originalStyles = {
      position: pdfContainer.style.position,
      left: pdfContainer.style.left,
      top: pdfContainer.style.top,
      visibility: pdfContainer.style.visibility,
      opacity: pdfContainer.style.opacity,
      height: pdfContainer.style.height,
      width: pdfContainer.style.width,
      zIndex: pdfContainer.style.zIndex
    };

    // Position it off-screen but make it renderablefor html2canvas
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.top = '0';
    pdfContainer.style.visibility = 'visible';
    pdfContainer.style.opacity = '1';
    pdfContainer.style.height = 'auto';
    pdfContainer.style.width = 'auto';
    pdfContainer.style.zIndex = '-9999';
    
    await waitForImages(pdfContainer);
    console.log("-- All images loaded!");

    const canvas = await html2canvas(pdfContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    // Restore original styles
    Object.entries(originalStyles).forEach(([prop, value]) => {
      pdfContainer.style[prop] = value;
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

      if (pdfBlobSize > MAX_PDF_SIZE_MB) {
        quality -= 0.05; // Reduce quality and retry
      }
    } while (pdfBlobSize > MAX_PDF_SIZE_MB && quality > 0.3);

    pdf.save(`${title}.pdf`);
    return true;
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    return false;
  }
}
