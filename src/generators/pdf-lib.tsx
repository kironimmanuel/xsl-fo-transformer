import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { useState } from 'react';

const PDFLibGenerator = () => {
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

    const xslContent = `<?xml version="1.0" encoding="UTF-8"?>
        <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
            <xsl:template match="/">
                <html>
                    <head>
                        <title>User Information</title>
                    </head>
                    <body style="font-family: Helvetica, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
                        <div
                            style="width: 100%; max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
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
        </xsl:stylesheet>`;

    const transformXmlWithXslt = (xml: string, xsl: string): string | null => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'application/xml');
        const xslDoc = parser.parseFromString(xsl, 'application/xml');

        const xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslDoc);
        const resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);

        return resultDocument.textContent;
    };

    const generatePdf = async (content: string | null): Promise<void> => {
        if (!content) return;

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { width, height } = page.getSize();
        console.log(width);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 14;

        page.drawText(content, {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
    };

    const handleTransformAndGeneratePdf = (): void => {
        const xml = xmlContent(username, email);
        const transformedContent = transformXmlWithXslt(xml, xslContent);
        generatePdf(transformedContent);
        clearInputs();
    };

    const clearInputs = () => {
        setUsername('');
        setEmail('');
    };

    return (
        <div className='flex flex-col gap-3 p-3 w-[625px] items-center'>
            <Input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
            <Input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <Button onClick={handleTransformAndGeneratePdf} className='w-full'>
                Generate PDF
            </Button>
            {pdfUrl && <iframe src={pdfUrl} width='600' height='400' title='Generated PDF' />}
        </div>
    );
};

export default PDFLibGenerator;
