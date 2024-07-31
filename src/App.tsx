import { PDFLibGenerator, PDFLibGeneratorHTML } from './generators';
import PDFMake from './generators/pdfmake';
import PDFMakeDynamic from './generators/pdfmake-dynamic';

const App = () => {
    return (
        <main className='flex justify-center items-center'>
            {/* <PDFLibGenerator /> */}
            {/* <PDFLibGeneratorHTML /> */}
            {/* <PDFMake /> */}
            <PDFMakeDynamic />
        </main>
    );
};

export default App;
