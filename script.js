document.getElementById('generate-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Hello World!", 10, 10);
    doc.addPage();
    doc.text("Halaman kedua!", 10, 10);

    // Tampilkan PDF di browser
    doc.output('dataurlnewwindow');

    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
});
