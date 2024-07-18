declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number;
        filename?: string;
        image?: { type?: string; quality?: number };
        html2canvas?: { scale?: number };
        jsPDF?: { unit?: string; format?: string; orientation?: string };
    }

    interface Html2Pdf {
        from(element: HTMLElement): Html2Pdf;
        set(options: Html2PdfOptions): Html2Pdf;
        save(): Promise<void>;
        outputPdf(type: 'blob'): Promise<Blob>;
    }

    const html2pdf: {
        (): Html2Pdf;
        (element: HTMLElement, options?: Html2PdfOptions): void;
    };

    export = html2pdf;
}
