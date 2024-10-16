let generatedPDF;

document.getElementById("generate-pdf").addEventListener("click", function () {
  const pay_month = document.getElementById("pay_month").value;
  const name = document.getElementById("name").value;
  const designation = document.getElementById("designation").value;
  const department = document.getElementById("department").value;
  const doj = document.getElementById("doj").value;
  const email = document.getElementById("email").value;
  const emp_code = document.getElementById("emp_code").value;
  const pan = document.getElementById("pan").value;
  const bank_name = document.getElementById("bank_name").value;
  const bank_acc_no = document.getElementById("bank_acc_no").value;
  const days_payable = document.getElementById("days_payable").value;

  var basic_actual = document.getElementById("basic_actual").value;
  var hra_actual = document.getElementById("hra_actual").value;
  var conv_allowances_actual = document.getElementById(
    "conv_allowances_actual"
  ).value;
  // var other_allowances_actual = document.getElementById(
  //   "other_allowances_actual"
  // ).value;
  // var incentive_actual = document.getElementById("incentive_actual").value;

  var basic_earned = document.getElementById("basic_earned").value;
  // var hra_earned = document.getElementById("hra_earned").value;
  // var conv_allowances_earned = document.getElementById(
  //   "conv_allowances_earned"
  // ).value;
  var other_allowances_earned = document.getElementById(
    "other_allowances_earned"
  ).value;
  var incentive_earned = document.getElementById("incentive_earned").value;
  var medical_insurance = 750;
  var pf = document.getElementById("pf").value;

  function fillWithZero(value) {
    return Number(value) || 0; // Converts to number, if NaN, replace with 0
  }

  // Fill empty variables with 0
  var basic_actual_calc = fillWithZero(basic_actual);
  var hra_actual_calc = fillWithZero(hra_actual);
  var conv_allowances_actual_calc = fillWithZero(conv_allowances_actual);
  // var other_allowances_actual_calc = fillWithZero(other_allowances_actual);
  // var incentive_actual_calc = fillWithZero(incentive_actual);

  var basic_earned_calc = fillWithZero(basic_earned);
  // var hra_earned_calc = fillWithZero(hra_earned);
  // var conv_allowances_earned_calc = fillWithZero(conv_allowances_earned);
  var other_allowances_earned_calc = fillWithZero(other_allowances_earned);
  var incentive_earned_calc = fillWithZero(incentive_earned);

  var medical_insurance_calc = fillWithZero(medical_insurance);
  var pf_calc = fillWithZero(pf);

  var gross_total =
    basic_actual_calc + hra_actual_calc + conv_allowances_actual_calc;

  var net_pay =
    basic_earned_calc +
    hra_actual_calc +
    conv_allowances_actual_calc +
    other_allowances_earned_calc +
    incentive_earned_calc;

  var net_total = net_pay - (medical_insurance_calc + pf_calc);

  document.getElementById("pay-month-placeholder").textContent = pay_month;
  document.getElementById("name-placeholder").textContent = name;
  document.getElementById("designation-placeholder").textContent = designation;
  document.getElementById("department-placeholder").textContent = department;
  document.getElementById("doj-placeholder").textContent = doj;
  document.getElementById("email-placeholder").textContent = email;
  document.getElementById("emp-code-placeholder").textContent = emp_code;
  document.getElementById("pan-placeholder").textContent = pan;
  document.getElementById("bank-name-placeholder").textContent = bank_name;
  document.getElementById("bank-acc-no-placeholder").textContent = bank_acc_no;
  document.getElementById("days-payable-placeholder").textContent =
    days_payable;

  document.getElementById("basic_actual-placeholder").textContent =
    basic_actual;
  document.getElementById("hra_actual-placeholder").textContent = hra_actual;
  document.getElementById("conv_allowances_actual-placeholder").textContent =
    conv_allowances_actual;
  document.getElementById("other_allowances_actual-placeholder").textContent =
    "";
  document.getElementById("incentive_actual-placeholder").textContent = "";
  document.getElementById("gross_total-placeholder").textContent = gross_total;

  document.getElementById("basic_earned-placeholder").textContent =
    basic_earned;
  document.getElementById("hra_earned-placeholder").textContent = hra_actual;
  document.getElementById("conv_allowances_earned-placeholder").textContent =
    conv_allowances_actual;

  document.getElementById("other_allowances_earned-placeholder").textContent =
    other_allowances_earned;
  document.getElementById("incentive_earned-placeholder").textContent =
    incentive_earned;
  document.getElementById("net_total-placeholder").textContent = net_pay;
  document.getElementById("medical_insurance-placeholder").textContent =
    medical_insurance;
  document.getElementById("pf-placeholder").textContent = pf;
  document.getElementById("final_net_total-placeholder").textContent =
    net_total;

  // Arrays for number words
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const indianPlaces = ["", "Thousand", "Lakh", "Crore"];

  // Function to convert a number below 1000 to words
  function numberToWordsBelowThousand(num) {
    let word = "";

    // Handle hundreds place
    if (Math.floor(num / 100) > 0) {
      word += ones[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }

    // Handle tens and ones place
    if (num >= 10 && num < 20) {
      word += teens[num - 10];
    } else {
      if (Math.floor(num / 10) > 0) {
        word += tens[Math.floor(num / 10)] + " ";
      }
      if (num % 10 > 0) {
        word += ones[num % 10];
      }
    }

    return word.trim(); // Remove extra spaces
  }

  // Function to convert large numbers to words using Indian numbering system
  function numberToWordsIndian(num) {
    if (num === 0) return "Zero";

    let word = "";

    // Handling numbers above Crore (upto lakh crore)
    if (Math.floor(num / 10000000) > 0) {
      word +=
        numberToWordsBelowThousand(Math.floor(num / 10000000)) + " Crore ";
      num %= 10000000;
    }

    // Handling Lakh
    if (Math.floor(num / 100000) > 0) {
      word += numberToWordsBelowThousand(Math.floor(num / 100000)) + " Lakh ";
      num %= 100000;
    }

    // Handling Thousands
    if (Math.floor(num / 1000) > 0) {
      word += numberToWordsBelowThousand(Math.floor(num / 1000)) + " Thousand ";
      num %= 1000;
    }

    // Handle the remainder (below 1000)
    if (num > 0) {
      word += numberToWordsBelowThousand(num);
    }

    return word.trim(); // Remove any extra spaces
  }

  // Example usage
  let numberInWords = numberToWordsIndian(net_total);

  //console.log(number + " in words is: " + numberInWords);

  document.getElementById("net_total_words-placeholder").textContent =
    numberInWords;

  // Conditionally display the name and address if not empty
  // if (name.trim() !== "") {
  //   document.getElementById("name-placeholder").textContent = name;
  //   document
  //     .getElementById("name-container")
  //     .classList.remove("hidden");
  // } else {
  //   document.getElementById("name-container").classList.add("hidden");
  // }

  // if (designation.trim() !== "") {
  //   document.getElementById("designation-placeholder").textContent =
  //     designation;
  //   document
  //     .getElementById("designation-container")
  //     .classList.remove("hidden");
  // } else {
  //   document
  //     .getElementById("designation-container")
  //     .classList.add("hidden");
  // }

  const pdfWidth = 210; // A4 width in mm
  const pdfHeight = 297; // A4 height in mm

  // Create new PDF
  const { jsPDF } = window.jspdf;
  generatedPDF = new jsPDF();

  console.log("Starting PDF generation...");
  alert("Starting Slip generation...");

  // Generate PDF from the template with higher resolution
  html2canvas(document.querySelector("#pdf-template"), {
    scale: 3, // Increase scale for higher resolution
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = pdfWidth - 20; // Account for margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

    if (imgHeight > pdfHeight) {
      // Handle multi-page PDF generation
      let position = 0;
      while (position < imgHeight) {
        generatedPDF.addImage(imgData, "PNG", 10, 10, imgWidth, pdfHeight);
        position += pdfHeight;
        if (position < imgHeight) generatedPDF.addPage();
      }
    } else {
      // Single page PDF
      generatedPDF.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    }

    console.log("PDF generated!");
    alert("Slip Generated");

    // Show download button once the PDF is generated
    document.getElementById("download-pdf").style.display = "inline-block";

    // Download the PDF on button click
    document
      .getElementById("download-pdf")
      .addEventListener("click", function () {
        console.log("Download button clicked!");
        generatedPDF.save(name + "_Payslip_" + pay_month + ".pdf");
      });
  });
});
