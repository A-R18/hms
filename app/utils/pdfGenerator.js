const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const path = require("path");
async function generatePresPDF(data) {

  const cssPath = path.join(__dirname, "../../styles/output.css");
  const imagePath = path.join(__dirname, "../../assets/resized.png");
  console.log(imagePath);
  const cssContent = await fs.readFile(cssPath, "utf-8");

  const rawHtml = `<!doctype html>
<html lang="en">
  <head>
   <style>
  ${cssContent}
  </style>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="styles/output.css" />
  </head>
  <body>
    <div class="prescription w-[210mm] h-[297mm] grid grid-cols-2 grid-rows-10 text-sm">
      <!-- Credentials section -->
      <div class="header bg-pink-800 col-span-2 flex items-center justify-center gap-x-4 text-white">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACUCAMAAABY3hBoAAAAZlBMVEX/////AAD/b2//6en/wcH/9/f/lZX/Nzf/7u7/9PT/19f/cXH/KSn/s7P/PT3/hob/ior/5OT/Vlb/qKj/nZ3/Q0P/T0//ubn/ysr/X1//jo7/z8//fX3/Gxv/Zmb/SUn/EBD/MDC8afn0AAADwklEQVR4nO2c6XajMAyFIYQ1LCEhaVaSvP9LFtJOOwMIZJDNPXO4v1v3qy1kWZZlWYsWLfrPFDp5tE723mWbZdtLsf84RXngzgzlnIrb+RA/7X9093dllkThPExhlKxiu1dH75Sbxoou5wGqL6WbvWMMyo0KFtQflYmZeUtWKlRvvbaRbqrcU5qsX+0Snd9CcPHHYdU6J7qwnOw5/Of7lCZa3Nv+MA2r1kbe1q676Vi1trLeI/RksCr5a0GutcAq/molNmnFRKNv6ihjaY6Qdf2tQoDrNMF10bpNdrcfOrAqHSfun3JfY1P+FENzt9q4qnBygt+4aeSqyD7GzlemlavSyDnTO1+1nqPmTKd9/WjEF3AxwWXHymS6/FdTfqDGdb0bArNLpeDR4XAlgTOgoGQMc1PgCjkDcj72DWcchU+z4IzHAWOd9F7sD+DE4hIDs49MruBhGIwbnnF3Ijmw+5XDdWVyiRm/zVvM8CwIxk5z7IfHSrhjiYL5gyenkO/yJcGG3SzPhcmD2QNngPw1F9jAlClMmDBYfwDkvGYDs7O+gZROa8JgfVbmKp26pcE8ehy1sFUa7EAGsy4rDNMGZpNJ2lxpGHmwDTWMiq/QAfYkzN9lxmHawKit/KqYOJQHS7tHUVxJDWBx51q67EBMG1j3WjrELdFh1a2SEQ8XJfHLhNV07uRr4r+QSOS2lHb/rbQrNUtlUXp2itEi974uI6OchVGwDiMLqYtIo2AdsQ95ajMK9mj/LHk6MgoWt62fzGwaBbu3A2wyFWwUrO216QO4WbDWZ+mQoYVZsEvzR+kDpVmw1qYUkakBs2CbZq6YTj6ZBTs3/QWd3jQLtmuC0Sc3s2CP5hmOCnpMg6VNMDpfNzMYylK2wGCXEmXGWsYP6y5gHSzslgS7idM3WzOHPbCBImxoTSes5z6MwB7fSA8794EXNkUAm1TBTUPBJu5UU50rRh2HSKoTNjkMm07HvYCwjnODUdUXqJdcuNeCsBepsFfPuJf1sOUNuAUhsCU0lqNgZUaLjmDLtOgIWzPYcP0waimgQlhmuHhStNyUC3ZmcOEW6M5Q0sxZyFqoReDcLdN82TwzMJOqtVZ5dBy8OAOaf5pRmRnoYxbc5z+4D6Zwn5jhPsrDfcYI+/AT+KmszsfFChtRp1CfY+M+YMd98m/BNkmwcNtKiDbiSCUbcViwrUtqgTZ7qRR4mO1xLNiGQrVAWzC9NaJpVay/aVUt1DZfb0E2RvuSi9lK7luIzfd+9N2usHi3K/RA2hUuWrRIgz4BbFtMUGWRr3gAAAAASUVORK5CYII=" alt="logo" class="w-15 h-15 rounded-full " />
        <span class="text-5xl font-bold">NAME OF HOSPITAL</span>
        <div class="flex flex-col gap-x-1">
          <div><span>Contact</span> <span>+38493829</span></div>
          <div><span>Whatsapp</span> <span>+38493829</span></div>
          <div>
            <span>Address</span>
            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
          </div>
        </div>
      </div>
      <div class="introduction py-2 row-span-2 text-[10px] px-1">
        <table class="w-full bg-amber-400 rounded-sm ">
          <tbody class="*:*:px-2 *:*:py-3 text-left">
            <tr>
              <td>Patient Name:</td>
              <td>${data.patient_name}</td>
              <td>Contact:</td>
              <td>${data.contact}</td>
            </tr>
            <tr>
              <td>MR #:</td>
              <td>${data.contact}</td>
              <td>Physician:</td>
              <td>${data.created_at}</td>
            </tr>
          </tbody>
        </table>
        <!-- Doctor's note -->
        <div class="d-note w-full bg-orange-600/60 mt-2 rounded-sm">
          <table class="w-full">
            <tbody class="*:*:px-2 *:*:py-1.5 text-left">
              <tr>
                <td colspan="2">Doctor's note:</td>
              </tr>
              <tr>
                <td rowspan="3" colspan="2" class="text-justify">
                  ${data.doctor_note}.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Assesment Data -->
      <div class="assessment row-span-2 mb-2 text-[10px]">
        <div class="title text-center text-balance text-md">
          <strong class="text-lg">Assessment Details</strong>
        </div>
        <table class="w-full bg-amber-400 rounded-sm">
          <tbody class="*:*:px-2 *:*:py-1.5 text-left">
            <tr>
              <td>Systolic BP:</td>
              <td>${data.systolic_bp}</td>
              <td>Di systolic BP:</td>
              <td>${data.diastolic_bp}</td>
            </tr>
            <tr>
              <td>Pulse:</td>
              <td>${data.pulse}</td>
              <td>Temperature:</td>
              <td>${data.temperature}</td>
            </tr>
            <tr>
              <td>Breath rate:</td>
              <td>${data.breathing_rate}</td>
              <td>Consciousness:</td>
              <td>${data.consciousness}</td>
            </tr>
          </tbody>
        </table>

        <div class="d-note  bg-orange-600/60 mt-2 rounded-sm">
          <table class="w-full">
            <tbody class="*:*:px-2 *:*:py-1.5 text-left">
              <tr>
                <td colspan="2">Treatment Plan:</td>
              </tr>
              <tr>
                <td rowspan="3" colspan="2" class="text-justify">
                  ${data.treatment_plan}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Medicines -->
      <div class="medicines w-full row-span-6 px-4 ">
         <p class="text-lg font-bold text-center  w-full">Medicines</p>
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Med1</span>
          <div class="text-xs px-2 mb-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, quisquam!
          </div>
        </div>
       
      
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Med1</span>
          <div class="text-xs px-2 mb-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, quisquam!
          </div>
        </div>
      
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Med1</span>
          <div class="text-xs px-2 mb-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, quisquam!
          </div>
        </div>
       
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Med1</span>
          <div class="text-xs px-2 mb-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, quisquam!
          </div>
        </div>
      </div>
      <!-- Lab Routines -->

      <div class="lab-routines w-full row-span-6 px-4 ">
        <p class="text-lg font-bold text-center  w-full">Lab Routines</p>
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Lab T1</span>
        </div>
       
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Lab T1</span>
        </div>
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Lab T1</span>
          <div class="text-xs px-2 mb-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, quisquam!
          </div>
        </div>
       
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Lab T1</span>
          <div class="text-xs px-2 mb-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, quisquam!
          </div>
        </div>
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Lab T1</span>
        </div>
       
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Lab T1</span>
          <div class="text-xs px-2 mb-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, quisquam!
          </div>
        </div>
        <div class="w-full py-1.2 flex flex-col border-b-2 mt-2">
          <span class="w-full text-md px-2">Lab T1</span>
          <div class="text-xs px-2 mb-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, quisquam!
          </div>
        </div>
      </div>
      <div class="footer bg-pink-800 col-span-2 flex justify-center text-white">
        <span
          ><strong class="text-xs"
            >Electronically generated, doesn't require any signature.</strong
          ></span>
      </div>
    </div>
  </body>
</html>
`;
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      dumpio: true,
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(rawHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0px", bottom: "0px", left: "0px", right: "0px" },
    });
    return pdfBuffer;
  } catch (error) {
    return error;
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { generatePresPDF };
