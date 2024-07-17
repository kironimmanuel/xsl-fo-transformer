import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import jsPDF from 'jspdf';
import { useState } from 'react';

const PDFLibGenerator = () => {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
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
    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:fo="http://www.w3.org/1999/XSL/Format">
        <xsl:template match="/">
            <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
                <fo:layout-master-set>
                    <fo:simple-page-master master-name="simple">
                        <fo:region-body margin="1in"/>
                    </fo:simple-page-master>
                </fo:layout-master-set>
                <fo:page-sequence master-reference="simple">
                    <fo:flow flow-name="xsl-region-body">
                        <fo:block font-family="Helvetica" font-size="14pt">
                            <fo:block font-size="100pt" font-weight="bold" text-align="center" margin-bottom="20pt" color="black">User Information</fo:block>
                            <fo:block>
                                <fo:inline font-weight="bold">Username: </fo:inline>
                                <fo:inline><xsl:value-of select="/Contents/Item/Username" /></fo:inline>
                            </fo:block>
                            <fo:block>
                                <fo:inline font-weight="bold">Email: </fo:inline>
                                <fo:inline><xsl:value-of select="/Contents/Item/Email" /></fo:inline>
                            </fo:block>
                        </fo:block>
                    </fo:flow>
                </fo:page-sequence>
            </fo:root>
        </xsl:template>
    </xsl:stylesheet>`;

    const transformXmlWithXslt = (xml: string, xsl: string): string | null => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'text/xml');
            const xslDoc = parser.parseFromString(xsl, 'text/xml');

            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xslDoc);
            const resultDocument = xsltProcessor.transformToDocument(xmlDoc);
            const serializer = new XMLSerializer();
            return serializer.serializeToString(resultDocument);
        } catch (error) {
            console.error('Error transforming XML with XSLT:', error);
            return null;
        }
    };

    const generateHtmlAndPdf = (): void => {
        const xml = xmlContent(username, email);
        const transformedContent = transformXmlWithXslt(xml, xslContent);
        setHtmlContent(transformedContent);
        convertHtmlToPdf(transformedContent);
        clearInputs();
    };

    const convertHtmlToPdf = (html: string | null): void => {
        // Here you would use a library or service to convert HTML to PDF
        // Example: You can use jsPDF, Puppeteer, or an external API for HTML to PDF conversion
        // This implementation would depend on the chosen method.
        // For simplicity, we assume an external service or library like jsPDF or Puppeteer.

        // Example with jsPDF:
        const pdf = new jsPDF();

        // pdf.setTextColor(0, 0, 0);

        pdf.html(html!, {
            callback: () => {
                pdf.save('user_information.pdf');
            },
        });

        // For this example, we set pdfUrl to an actual PDF file or URL.
        // Replace this with the actual implementation for HTML to PDF conversion.
        const pdfUrl = 'path/to/generated.pdf';
        setPdfUrl(pdfUrl);
    };

    const clearInputs = () => {
        setUsername('');
        setEmail('');
    };

    return (
        <div className='flex flex-col gap-3 p-3 w-[625px] items-center'>
            <Input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
            <Input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <Button onClick={generateHtmlAndPdf} className='w-full'>
                Generate PDF
            </Button>
            {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }} />}
            {pdfUrl && <iframe src={pdfUrl} width='600' height='400' title='Generated PDF' />}
        </div>
    );
};

export default PDFLibGenerator;
