# HTML to PDF Converter with Handlebars

A robust Node.js service that converts HTML templates (with Handlebars support) to PDF documents. This service is production-ready with PM2 process management, clustering, and automatic restarts.

## 🚀 Features

- **HTML to PDF Conversion**: Convert any HTML content to high-quality PDF documents
- **Handlebars Template Support**: Use dynamic templates with Handlebars for flexible document generation
- **Built-in Helpers**: Includes useful Handlebars helpers (`formatDate`, `uppercase`)
- **A4 Format**: Generates professional A4-sized documents with customizable margins
- **Clustering**: Runs multiple instances for improved performance and reliability
- **Process Management**: Uses PM2 for process management, monitoring, and automatic restarts
- **CORS Enabled**: Ready for cross-origin requests
- **Error Handling**: Comprehensive error handling and logging
- **Production Ready**: Includes proper configurations for development and production environments

## 📋 Prerequisites

- Node.js (v16 or higher)
- NPM (v7 or higher)
- Chrome/Chromium (for Puppeteer)

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd html-to-pdf-converter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the logs directory:
   ```bash
   mkdir logs
   ```

## 🚦 Usage

### Starting the Server

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode (with PM2):

```bash
npm run pm2:start
```

### PM2 Commands

- Start the application: `npm run pm2:start`
- Stop the application: `npm run pm2:stop`
- Restart the application: `npm run pm2:restart`
- Delete from PM2: `npm run pm2:delete`
- View logs: `npm run pm2:logs`
- Check status: `npm run pm2:status`

### API Endpoints

#### POST /convert

Converts HTML template to PDF using Handlebars for template processing.

Request body:

```json
{
  "template": "string", // Handlebars template
  "data": "object" // Data to be used in the template
}
```

Example request:

```json
{
  "template": "<h1>{{uppercase title}}</h1><p>Date: {{formatDate date}}</p><ul>{{#each items}}<li>{{this}}</li>{{/each}}</ul>",
  "data": {
    "title": "My Document",
    "date": "2024-03-10",
    "items": ["Item 1", "Item 2", "Item 3"]
  }
}
```

Response:

- Content-Type: application/pdf
- Body: PDF file content

### Built-in Handlebars Helpers

1. `formatDate`

   ```handlebars
   {{formatDate date}}
   ```

   Formats a date string to localized date format

2. `uppercase`
   ```handlebars
   {{uppercase text}}
   ```
   Converts text to uppercase

## ⚙️ Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### PM2 Configuration (ecosystem.config.cjs)

```javascript
{
  instances: 2,              // Number of instances to run
  exec_mode: 'cluster',      // Running mode
  max_memory_restart: '300M' // Memory limit per instance
}
```

## 📝 Logging

Logs are stored in the `logs` directory:

- `err.log`: Error logs
- `out.log`: Output logs
- `combined.log`: Combined logs

## 🔒 Security

- CORS enabled for cross-origin requests
- Request size limits implemented
- Puppeteer runs with `--no-sandbox` for compatibility
- Input validation for templates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Important Notes

- Ensure proper memory allocation for PDF generation of large documents
- Monitor the logs directory size in production
- Consider implementing rate limiting for production use
- Add authentication for production deployment
