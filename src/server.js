import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";
import Handlebars from "handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5689;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Register Handlebars helpers
Handlebars.registerHelper("formatDate", function (date) {
  return new Date(date).toLocaleDateString();
});

Handlebars.registerHelper("uppercase", function (str) {
  return str.toUpperCase();
});

// Routes
app.post("/convert", async (req, res) => {
  try {
    const { html, data } = req.body;

    if (!html) {
      return res.status(400).json({ error: "Template is required" });
    }

    // Compile template with Handlebars
    const compiledTemplate = Handlebars.compile(html);
    const template = compiledTemplate(data || {});

    // Launch browser
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });

    // Create new page
    const page = await browser.newPage();

    // Set content
    await page.setContent(template, {
      waitUntil: "networkidle0",
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
    });

    // Close browser
    await browser.close();

    // Send PDF
    res.contentType("application/pdf");
    res.send(pdf);
  } catch (error) {
    console.error("Conversion error:", error);
    res.status(500).json({ error: "PDF conversion failed" });
  }
});

// Test endpoint with Handlebars example
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>HTML to PDF Converter with Handlebars</h1>
        <p>Send a POST request to /convert with a Handlebars template and data in the request body to generate a PDF.</p>
        <h2>Example:</h2>
        <pre>
POST /convert
Content-Type: application/json

{
  "template": "
    &lt;h1&gt;{{uppercase title}}&lt;/h1&gt;
    &lt;p&gt;Date: {{formatDate date}}&lt;/p&gt;
    &lt;ul&gt;
      {{#each items}}
        &lt;li&gt;{{this}}&lt;/li&gt;
      {{/each}}
    &lt;/ul&gt;
  ",
  "data": {
    "title": "My Document",
    "date": "2024-03-10",
    "items": ["Item 1", "Item 2", "Item 3"]
  }
}
        </pre>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
