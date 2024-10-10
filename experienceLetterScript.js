let generatedPDF;
const form = document.getElementById("dynamicForm");
const addMoreBtn = document.getElementById("addMoreBtn");
const resultList = document.getElementById("resultList");
const submitBtn = document.getElementById("submitBtn");

addMoreBtn.addEventListener("click", () => {
  // Create new input field dynamically
  const newInputGroup = document.createElement("div");
  newInputGroup.classList.add("input-group");

  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.name = "inputField";
  newInput.placeholder = "Enter text";
  newInput.required = true;
  newInput.classList.add("input-field");

  newInputGroup.appendChild(newInput);
  form.insertBefore(newInputGroup, form.querySelector(".submit-btn"));
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Clear previous results
  resultList.innerHTML = "";

  // Get all input fields data and create bullet list
  const inputFields = document.querySelectorAll(".input-field");
  inputFields.forEach((field) => {
    const value = field.value;
    console.log(value);
    if (value.trim()) {
      const listItem = document.createElement("li");
      listItem.textContent = value;
      resultList.appendChild(listItem);
    }
  });
});

document
  .getElementById("generate-certificate")
  .addEventListener("click", function () {
    const intern_date = document.getElementById("intern_date").value;
    const intern_name = document.getElementById("intern_name").value;
    const intern_pos = document.getElementById("intern_pos").value;

    const intern_joining = document.getElementById("intern_joining").value;
    const intern_complete = document.getElementById("intern_complete").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // Define gender-specific pronouns
    let possesivePronoun, personalPronoun, subjectPronoun;
    if (gender === "male") {
      personalPronoun = "him";
      possesivePronoun = "his";
      subjectPronoun = "he";
    } else {
      personalPronoun = "her";
      possesivePronoun = "her";
      subjectPronoun = "she";
    }

    document.getElementById("cert-date-placeholder").textContent = intern_date;

    const emp_name_placeholder = document.querySelectorAll(".emp-name");

    emp_name_placeholder.forEach(function (placeholder) {
      placeholder.textContent = intern_name;
    });

    document.getElementById("emp_pos-placeholder").textContent = intern_pos;

    document.getElementById("emp_joining-placeholder").textContent =
      intern_joining;
    document.getElementById("emp_complete-placeholder").textContent =
      intern_complete;

    const possesivePronoun_placeholder = document.querySelectorAll(
      ".possesivePronoun-placeholder"
    );

    possesivePronoun_placeholder.forEach(function (placeholder) {
      placeholder.textContent = possesivePronoun;
    });

    const personalPronoun_placeholder = document.querySelectorAll(
      ".personalPronoun-placeholder"
    );

    personalPronoun_placeholder.forEach(function (placeholder) {
      placeholder.textContent = personalPronoun;
    });

    const subjectPronoun_placeholder = document.querySelectorAll(
      ".subjectPronoun-placeholder"
    );

    subjectPronoun_placeholder.forEach(function (placeholder) {
      placeholder.textContent = subjectPronoun;
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm

    // Create new PDF
    const { jsPDF } = window.jspdf;
    generatedPDF = new jsPDF();

    console.log("Starting PDF generation...");
    alert("Starting Experience Letter generation...");

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
      alert("Experience Letter Generated");

      // Show download button once the PDF is generated
      document.getElementById("download-pdf").style.display = "inline-block";

      // Download the PDF on button click
      document
        .getElementById("download-pdf")
        .addEventListener("click", function () {
          console.log("Download button clicked!");
          generatedPDF.save(intern_name + "_Experience_Letter.pdf");
        });
    });
  });
