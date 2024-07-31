import { pdfmakeDocDefinition } from '@/assets/pdfmake-dd';
import { Button } from '@/components/ui/button';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// //
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import { vfs_fonts } from './vfs_fonts';

// (pdfMake as any).vfs = {
//     Roboto: {
//         normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
//         bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
//         italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
//         bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
//     },
// };
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const PDFMake = () => {
    const generatePdf = () => {
        // pdfMake.createPdf(pdfmakeDocDefinition, undefined, undefined, pdfFonts.pdfMake.vfs).open();
        // pdfMake.createPdf(pdfmakeDocDefinition, undefined, undefined, pdfFonts.pdfMake.vfs).print();
        pdfMake.createPdf(pdfmakeDocDefinition, undefined, undefined, pdfFonts.pdfMake.vfs).download();
        // pdfMake.createPdf(docDefinition, undefined, undefined, vfs_fonts).download();
        // pdfMake.createPdf(docDefinition).download();
        //         pdfMake.createPdf(docDefinition).download();
        // pdfMake.createPdf(docDefinition).download('file.pdf');
        // pdfMake.createPdf(docDefinition, options).download();
    };
    return (
        <div>
            <Button onClick={generatePdf} className='w-full'>
                Generate PDF
            </Button>
        </div>
    );
};
export default PDFMake;
