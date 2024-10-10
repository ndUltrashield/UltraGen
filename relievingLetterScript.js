let generatedPDF;

document
  .getElementById("generate-certificate")
  .addEventListener("click", function () {
    const relieving_letter_date = document.getElementById(
      "relieving_letter_date"
    ).value;
    const emp_name = document.getElementById("emp_name").value;
    const emp_joining = document.getElementById("emp_joining").value;
    const emp_complete = document.getElementById("emp_complete").value;

    document.getElementById("relieving-letter-date-placeholder").textContent =
      relieving_letter_date;
    document.getElementById("emp_name-placeholder").textContent = emp_name;
    document.getElementById("emp_joining-placeholder").textContent =
      emp_joining;
    document.getElementById("emp_complete-placeholder").textContent =
      emp_complete;

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm

    // Create new PDF
    const { jsPDF } = window.jspdf;
    generatedPDF = new jsPDF();

    console.log("Starting PDF generation...");
    alert("Starting Relieving letter generation...");

    // Generate PDF from the template with higher resolution
    html2canvas(document.querySelector("#pdf-template"), {
      scale: 3, // Increase scale for higher resolution
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdfWidth; // Full width, no margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      // Calculate x position to center the image horizontally
      const xPos = (pdfWidth - imgWidth) / 2; // This will be 0 if imgWidth = pdfWidth, but adaptable for other sizes
      const yPos = 0; // Start from the top (no margin)

      if (imgHeight > pdfHeight) {
        // Handle multi-page PDF generation
        let position = 0;
        while (position < imgHeight) {
          generatedPDF.addImage(
            imgData,
            "PNG",
            xPos,
            yPos,
            imgWidth,
            pdfHeight
          );
          position += pdfHeight;
          if (position < imgHeight) generatedPDF.addPage();
        }
      } else {
        // Single page PDF
        generatedPDF.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
      }

      console.log("PDF generated!");
      alert("Relieving letter Generated");

      // Show download button once the PDF is generated
      document.getElementById("download-pdf").style.display = "inline-block";

      // Download the PDF on button click
      document
        .getElementById("download-pdf")
        .addEventListener("click", function () {
          console.log("Download button clicked!");
          generatedPDF.save(emp_name + "_Relieving Letter.pdf");
        });
    });
  });
