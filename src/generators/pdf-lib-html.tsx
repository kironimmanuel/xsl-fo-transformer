import html2pdf from 'html2pdf.js';

const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<Contents>
  <Item>
    <Username>Hello</Username>
    <Email>Good day</Email>
  </Item>
</Contents>`;

const xslData = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>User Information</title>
        <style>
          body {
            font-family: Helvetica, sans-serif;
          }
          .title {
            font-size: 24pt;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20pt;
          }
          .info {
            font-size: 14pt;
          }
          .info span {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="title">User Information</div>
        <div class="info">
          <div>
            <span>Username: </span>
            <xsl:value-of select="/Contents/Item/Username"/>
          </div>
          <div>
            <span>Email: </span>
            <xsl:value-of select="/Contents/Item/Email"/>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

const App = () => {
    const generatePDF = () => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlData, 'text/xml');
        const xsl = parser.parseFromString(xslData, 'text/xml');

        // Perform the transformation
        const xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        const resultDocument = xsltProcessor.transformToDocument(xml);

        // Serialize the result document to a string
        const serializer = new XMLSerializer();
        const htmlString = serializer.serializeToString(resultDocument);

        // Create a temporary element to render the HTML
        const element = document.createElement('div');
        element.innerHTML = htmlString;
        document.body.appendChild(element);

        // Generate PDF using html2pdf.js
        html2pdf()
            .from(element)
            .save()
            .then(() => {
                document.body.removeChild(element);
            });
    };

    return (
        <div>
            <button onClick={generatePDF}>Generate PDF</button>
        </div>
    );
};

export default App;
