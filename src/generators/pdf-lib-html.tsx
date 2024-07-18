import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import html2pdf from 'html2pdf.js';
import { useState } from 'react';

const xslData = `<?xml version="1.0" encoding="UTF-8"?>
        <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
            <xsl:template match="/">
                <html>
                    <head>
                        <title>User Information</title>
                    </head>
                    <body style="font-family: Helvetica, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
                        <div
                            style="width: 100%; max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <div style="font-size: 24pt; font-weight: bold; text-align: center; margin-bottom: 20px; color: red;">User Information</div>
                            <div style="font-size: 14pt;">
                                <div style="margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #ddd;">
                                    <span style="font-weight: bold;">Username: </span>
                                    <xsl:value-of select="/Contents/Item/Username" />
                                </div>
                                <div style="margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #ddd;">
                                    <span style="font-weight: bold;">Email: </span>
                                    <xsl:value-of select="/Contents/Item/Email" />
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
            </xsl:template>
        </xsl:stylesheet>
`;

const App = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const xmlContent = (username: string, email: string) => `<?xml version="1.0" encoding="UTF-8"?>
<Contents>
  <Item>
    <Username>${username}</Username>
    <Email>${email}</Email>
  </Item>
</Contents>`;

    const generatePDF = async () => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlContent(username, email), 'text/xml');
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

        /**
         * iframe
         */
        // Use html2pdf to create a PDF and get the blob
        const pdfBlob = await html2pdf().from(element).outputPdf('blob');
        document.body.removeChild(element);

        // Create a URL for the blob and set it to the iframe
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);

        /**
         * Download
         */
        // html2pdf()
        //     .from(element)
        //     .save()
        //     .then(() => {
        //         document.body.removeChild(element);
        //     });
    };

    return (
        <div className='flex flex-col gap-3 p-3 w-[625px] items-center'>
            <Input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
            <Input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <Button onClick={generatePDF} className='w-full'>
                Generate PDF
            </Button>
            {pdfUrl && <iframe src={pdfUrl} width='600' height='400' title='Generated PDF' />}
        </div>
    );
};

export default App;
