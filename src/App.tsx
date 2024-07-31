import { PDFLibGenerator, PDFLibGeneratorHTML } from './generators';
import PDFMake from './generators/pdfmake';

const App = () => {
    return (
        <main className='flex justify-center items-center'>
            {/* <PDFLibGenerator /> */}
            {/* <PDFLibGeneratorHTML /> */}
            <PDFMake />
        </main>
    );
};

export default App;
