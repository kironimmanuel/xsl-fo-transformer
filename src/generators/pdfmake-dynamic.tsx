import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Combobox } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { useState } from 'react';

type CustomTDocumentDefinitions = TDocumentDefinitions & {
    variables: Record<string, string>;
    functions: Record<string, () => number | string | boolean>;
};

const PDFMakeDynamic = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    const handleChange = (e: React.ChangeEvent) => {
        const { id, value } = e.target as HTMLInputElement;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    function createPdfDocument(): CustomTDocumentDefinitions {
        return {
            info: {
                title: 'Muster Massnahme',
                author: 'Max Mustermann',
                subject: 'Massnahme für Muster',
                keywords: 'Massnahme, Muster, Mustermann',
            },
            userPassword: '123',
            ownerPassword: '123',
            permissions: {
                printing: 'highResolution',
                modifying: true,
                copying: false,
                annotating: true,
                fillingForms: true,
                contentAccessibility: true,
                documentAssembly: true,
            },
            pageSize: 'A4',
            pageOrientation: 'portrait',
            content: [
                { text: `First Name: ${formData.firstName}`, style: 'header1' },
                { text: `Last Name: ${formData.lastName}`, style: 'header2' },
                { text: `Email: ${formData.email}`, style: 'normal' },
                { text: `Phone Number: ${formData.phone}`, style: 'normal' },
                { text: `Address: ${formData.address}`, style: 'normal' },
                { text: `City: ${formData.city}`, style: 'normal' },
                { text: `State: ${formData.state}`, style: 'normal' },
                { text: `ZIP Code: ${formData.zip}`, style: 'normal' },
                { text: `Country: ${formData.country}`, style: 'normal' },
            ],
            styles: {
                header1: { fontSize: 20, bold: true },
                header2: { fontSize: 16, italics: true },
                normal: { fontSize: 12 },
            },
            defaultStyle: {
                alignment: 'justify',
            },
            variables: {
                $variable1: 'Hello World 1!',
                $variable2: 'Hello World 2!',
                $variable3: 'Hello World 3!',
                $variable4: 'Hello World 4!',
                $variable5: 'Hello World 5!',
            },
            functions: {
                function2: function () {
                    return 1 + 2;
                },
            },
        };
    }

    function generatePdf() {
        const documentDefinition = createPdfDocument();

        pdfMake.createPdf(documentDefinition).open();
        // pdfMake.createPdf(documentDefinition).download('generated.pdf');
        // pdfMake.createPdf(documentDefinition).print();
    }

    return (
        <div className='my-5'>
            <h1 className='text-2xl py-2'>Muster Formular</h1>
            <hr className='py-2' />
            <form onSubmit={generatePdf} className='w-[800px]'>
                <div className='flex flex-col gap-3 items-center'>
                    <div className='flex gap-3 w-full'>
                        <Input
                            type='text'
                            placeholder='First Name'
                            id='firstName'
                            name='firstName'
                            onChange={handleChange}
                            value={formData.firstName}
                        />
                        <Input
                            type='text'
                            placeholder='Last Name'
                            id='lastName'
                            name='lastName'
                            onChange={handleChange}
                            value={formData.lastName}
                        />
                    </div>
                    <Input
                        type='email'
                        placeholder='Email'
                        id='email'
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                    <Input
                        type='text'
                        placeholder='Phone Number'
                        id='phone'
                        name='phone'
                        onChange={handleChange}
                        value={formData.phone}
                        required
                    />
                    <Input
                        type='text'
                        placeholder='Address'
                        id='address'
                        name='address'
                        onChange={handleChange}
                        value={formData.address}
                        required
                    />
                    <Input type='text' placeholder='City' id='city' name='city' onChange={handleChange} value={formData.city} />
                    <div className='flex gap-3 w-full'>
                        <Input type='text' placeholder='State' id='state' name='state' onChange={handleChange} value={formData.state} />
                        <Input type='text' placeholder='ZIP Code' id='zip' name='zip' onChange={handleChange} value={formData.zip} />
                    </div>
                    <Input type='text' placeholder='Country' id='country' name='country' onChange={handleChange} value={formData.country} />
                    <Select>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Bitte waehlen sie eine Option' />
                        </SelectTrigger>
                        <SelectContent>
                            {['foo', 'bar'].map(option => (
                                <SelectItem key={option} value={option}>
                                    Option {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <RadioGroup defaultValue='option-one' className='w-full p-1 flex flex-col gap-3 py-3'>
                        <Label htmlFor='option-one'>Choose an option that suits your preference.</Label>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='option-one' id='option-one' />
                            <Label htmlFor='option-one' className='font-thin'>
                                Select this if you prefer the first choice available.
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='option-two' id='option-two' />
                            <Label htmlFor='option-two' className='font-thin'>
                                Choose this option if you find it more suitable.
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='option-three' id='option-three' />
                            <Label htmlFor='option-three' className='font-thin'>
                                Opt for this choice if you agree with this one.
                            </Label>
                        </div>
                    </RadioGroup>

                    <div className='flex justify-end w-full'>
                        <Button type='submit' className=''>
                            PDF Generieren
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default PDFMakeDynamic;
