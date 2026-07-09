const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const path = require("path");
async function generatePresPDF(data) {
    console.log(`Here is the data being shown:\n`);
    console.log(data);
    /* 
        {
            "id": 3,
            
            "doctor_note": "doctor's note is not good enough",
            "treatment_plan": "treatment plan was given",
            "other_examinations": "other examinations are also necessary",
            "prescription_time": "13:23:47.734535",
            "patient_name": "Ahmed Raza",
            "condition": "Diabetes",
            "contact": "03001112224",
            "created_at": "2026-05-07T04:51:16.438Z",
            "treating_doctor_ID": 1,
            "patient_complaint": "problems...",
            "past_medical_history": "past problems...",
            "consciousness": "alert",
            "temperature": "33.0",
            "breathing_rate": "92.6",
            "systolic_bp": "18.0",
            "diastolic_bp": "12.0",
            "pulse": "88.30",
            "assessment_time": "2026-07-09T07:26:14.760Z"
        }
    */
    const cssPath = path.join(__dirname, "../../styles/output.css");
    const cssContent = await fs.readFile(cssPath, "utf-8");
    const rawHTML = `<!doctype html>
<html lang="en">
  <head>
  <style>
  ${cssContent}
  </style>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prescription</title>
    <link rel="stylesheet" href="../../styles/output.css" />
  </head>
  <body class="bg-gray-900/7">
    <section class="header bg-purple-800/60 py-3 flex items-center justify-between">
      <div class="flex items-center gap-x-2">
        <img
          class="px-2 w-40 h-25 rounded-2xl"
          src="data:image/jpeg;base64,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"
          alt="doc-logo" />
        <div class="org-title text-6xl font-semibold">Name of Hospital</div>
      </div>
      <div class="address flex flex-col mx-4 text-xl text-justify">
        <span>Address: First lane address</span>
        <span>Contact: 84389es934983</span>
        <span>Email: email@email.com</span>
      </div>
    </section>
    <section class="identification flex flex-row">
      <div class="patient-data w-full">
        <table class="mt-2 text-md bg-amber-400 w-full rounded-md">
          <tr class="*:px-4 *:py-4">
          <td>Patient Name</td>
          <td>Condition</td>
          <td>Contact</td>
            <td>Generated at</td>
           
          </tr>
          <tr class="*:px-4 *:py-4">
            <td>${data.patient_name}</td>
            <td>${data.condition}</td>
            <td>${data.contact}</td>
            <td>${data.created_at}</td>
           
          </tr>
        </table>
        <div class="flex flex-row">
          <p class="w-full text-center text-xl mt-2">Doctor's Note</p>
        </div>
        <p class="w-full text-justify text-xl mt-2">${data.doctor_note}
        </p>
      </div>
      <div class="vitals w-full">
        <p class="text-center text-xl mt-2">Assessment Details</p>
        <table class="text-xl w-full">
          <tbody>
            <tr class="*:px-4 *:py-2 mt-3">
              <td>Systolic BP</td>
              <td>${data.diastolic_bp}</td>
              <td>Di systolic BP</td>
              <td>${data.systolic_bp}</td>
            </tr>

            <tr class="*:px-4 *:py-2 mt-3">
              <td>Pulse</td>
              <td>${data.pulse}</td>
              <td>Temperature</td>
              <td>${data.temperature}</td>
            </tr>

            <tr class="*:px-4 *:py-2 mt-3">
              <td>Breating rate</td>
              <td>${data.breathing_rate}</td>
              <td>Consciousness</td>
              <td>${data.consciousness}</td>
            </tr>
            <tr class="*:px-4 *:py-2 mt-3">
              <td>Treatment Plan:</td>
            </tr>
            <tr class="*:px-4 *:py-2 mt-3">
              <td colspan="4" class="text-justify">
                ${data.treatment_plan}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="medicine-and-labs flex flex-row mb-5  w-full">
      <div class="patient-data w-full ">
        <table class="mt-2 text-xl bg-amber-400 w-full">
          <tr class="*:px-4 w-full *:py-4">
            <td colspan="4">Medicine 1</td>
          </tr>
          <tr class="*:px-4 w-full *:py-4 bg-gray-300">
            <td colspan="4">Medicine 2</td>
          </tr>
          <tr class="*:px-4 w-full *:py-4">
            <td colspan="4">Medicine 3</td>
          </tr>
          <tr class="*:px-4 w-full *:py-4 bg-gray-300">
            <td colspan="4">Medicine 4</td>
          </tr>
          <tr class="*:px-4 w-full *:py-4">
            <td colspan="4">Medicine 5</td>
          </tr>
          <tr class="*:px-4 w-full *:py-4 bg-gray-300">
            <td colspan="4">Medicine 6</td>
          </tr>
        </table>
      </div>
      <div class="vitals w-full mx-2">
        <p class="text-center text-xl mt-2">Lab Routines</p>
        <table class="text-xl w-full">
          <tr class="*:px-4 w-full *:py-4 bg-gray-300">
            <td colspan="4">Test 1</td>
          </tr>
          <tr class="*:px-4 w-full *:py-4">
            <td colspan="4">Test 2</td>
          </tr>
          <tr class="*:px-4 w-full *:py-4 bg-gray-300">
            <td colspan="4">Test 3</td>
          </tr>
          <tr class="*:px-4 w-full *:py-4">
            <td colspan="4">Test 4</td>
          </tr>
          <tr class="*:px-4 w-full *:py-4 bg-gray-300">
            <td colspan="4">Test 4</td>
          </tr>
          <tr class="*:px-4 w-full *:py-4">
            <td colspan="4">Test 4</td>
          </tr>
        </table>
      </div>
    </section>
    <p class="text-xs text-center font-bold mb-0.5">
      This is electronically generated report, no signature required.
    </p>
    <footer class="header bg-purple-800/60 py-3 flex items-center justify-between text-white">
      <div class="address flex flex-col mx-4 text-xl text-justify">
        Particulars
        <span>Address: First lane address</span>
        <span>Contact: 84389es934983</span>
        <span>Email: email@email.com</span>
      </div>
      <div class="address flex flex-col mx-4 text-xl text-justify">
        Services
        <span>Laboratory</span>
        <span>X-Ray</span>
        <span>Dialysis</span>
      </div>

      <div class="address flex flex-col mx-4 text-xl text-justify">
        Branches
        <span>Islamabad branch</span>
        <span>Lahore Branch</span>
        <span>Faisalabad Branch</span>
      </div>
    </footer>
  </body>
</html>
`;
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            dumpio: true,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            args: ['--no-sandbox'],

        });
        const page = await browser.newPage();
        await page.setContent(rawHTML, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '10px', bottom: '10px', left: '10px', right: '10px' },
        });
        return pdfBuffer;
    } catch (error) {
        return error;
    } finally {
        if (browser) await browser.close();
    }
}

module.exports = { generatePresPDF };