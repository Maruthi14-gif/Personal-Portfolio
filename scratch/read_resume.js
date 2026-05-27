import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

async function main() {
  try {
    const pdfPath = path.join('public', 'P_Maruthi_Resume.pdf');
    if (!fs.existsSync(pdfPath)) {
      console.log('PDF file not found at:', pdfPath);
      return;
    }
    const data = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(data);
    console.log('Title:', pdfDoc.getTitle());
    console.log('Author:', pdfDoc.getAuthor());
    console.log('Subject:', pdfDoc.getSubject());
    console.log('Creator:', pdfDoc.getCreator());
    console.log('Producer:', pdfDoc.getProducer());
    console.log('Creation Date:', pdfDoc.getCreationDate());
    console.log('Modification Date:', pdfDoc.getModificationDate());
    console.log('Page Count:', pdfDoc.getPageCount());
    
    // Check text by showing first 500 bytes as string (in case it is simple plain text/layout)
    console.log('First 500 bytes as UTF-8:');
    console.log(data.toString('utf8', 0, Math.min(data.length, 1000)));
  } catch (error) {
    console.error('Error reading PDF:', error);
  }
}

main();
