const { Router } = require("express");
const PDFDocument = require('pdfkit');
const path = require('path');
const router = Router();
const fs = require('fs');
const express = require('express')
router.get('/generate-pdf', (req, res) => {
    const text = "This is the text content that will appear in the PDF file.";
    const pdfDirectory = path.join(__dirname, 'pdfs');

    // Create the directory if it doesn't exist
    if (!fs.existsSync(pdfDirectory)) {
        fs.mkdirSync(pdfDirectory);
    }

    // Generate a unique file name
    const fileName = `generated-file-${Date.now()}.pdf`;
    const filePath = path.join(pdfDirectory, fileName);

    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF to a file (save it on the server)
    doc.pipe(fs.createWriteStream(filePath));

    // Add text to the PDF
    doc.fontSize(12).text(text, {
        width: 410,
        align: 'left',
    });

    // Finalize the PDF
    doc.end();

    // Send back a link to download the generated file
    doc.on('finish', () => {
        res.json({
            message: 'PDF generated successfully.',
            downloadLink: `http://localhost:3000/pdfs/${fileName}`
        });
    });
    return res.json({
        message : "PDf Created"
    })
});

// Serve the PDF files statically
router.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

module.exports = router;
