// Data penjualan
const salesData = [150, 123, 180, 240, 350, 210, 190];
const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

// Membuat grafik batang
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: days,
        datasets: [{
            label: 'Penjualan Produk',
            data: salesData,
            backgroundColor: 'rgba(255, 105, 180, 0.2)', // Warna pink dengan transparansi
            borderColor: 'rgba(255, 105, 180, 1)', // Warna pink penuh
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Fungsi untuk menghitung pendapatan
const calculateRevenue = (sales) => sales * 1000; // Contoh: harga produk adalah 1000

// Fungsi untuk membuat dan mengunduh PDF
document.getElementById('downloadPDF').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;

    // Buat dokumen jsPDF baru
    const doc = new jsPDF();

    // Tentukan ukuran font dan judul
    const title = 'Laporan Penjualan Produk Mingguan';
    const fontSize = 18;

    // Set ukuran font
    doc.setFontSize(fontSize);

    // Hitung posisi x untuk teks agar berada di tengah halaman
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2;

    // Tambahkan teks judul di posisi yang telah dihitung
    doc.text(title, textX, 22);

    // Fungsi untuk menggambar grafik bar
    function drawBarChart(doc, x, y, width, height, data, labels) {
        const maxData = Math.max(...data);
        const barWidth = width / data.length;
        const tickInterval = Math.ceil(maxData / 5); // Interval untuk sumbu y

        // Menggambar sumbu y
        for (let i = 0; i <= 5; i++) {
            const yTick = y + height - (i * (height / 5));
            doc.setFontSize(8);
            doc.setTextColor(0, 0, 0);
            doc.text(String(i * tickInterval), x - 10, yTick + 3, { align: 'right' }); // Mengatur posisi x agar lebih jelas
            doc.line(x, yTick, x + width, yTick); // Garis horizontal
        }

        // Garis vertikal untuk sumbu y
        doc.line(x, y, x, y + height);

        // Menggambar grafik bar
        for (let i = 0; i < data.length; i++) {
            const barHeight = (data[i] / maxData) * height;
            doc.setFillColor(255, 105, 180); // Warna pink untuk batang grafik
            doc.rect(x + i * barWidth, y + height - barHeight, barWidth - 5, barHeight, 'F');
            doc.setFontSize(12); // Ukuran font untuk label hari
            doc.setTextColor(0, 0, 0); // Warna teks
            doc.text(labels[i], x + i * barWidth + (barWidth - 5) / 2, y + height + 10, { align: 'center' }); // Menambah jarak y untuk teks hari
        }
    }

    // Menggambar grafik
    drawBarChart(doc, 30, 40, 150, 90, salesData, days);

    // Tambahkan tabel dengan jarak yang cukup
    const tableData = days.map((day, index) => [day, salesData[index], calculateRevenue(salesData[index])]);
    doc.autoTable({
        head: [['Hari', 'Produk Terjual', 'Pendapatan']],
        body: tableData,
        startY: 150, // Menambahkan jarak antara grafik dan tabel
        theme: 'grid',
        styles: {
            halign: 'center',
            fillColor: [255, 182, 193] // Warna pink untuk latar belakang sel
        },
        headStyles: {
            fillColor: [255, 105, 180] // Warna pink lebih gelap untuk header tabel
        }
    });

    // Unduh PDF
    doc.save('penjualan_produk.pdf');
});

/**
 * Fungsi untuk menggambar grafik bar ke dalam dokumen PDF.
 * @param {Object} doc - Objek jsPDF.
 * @param {number} x - Posisi x untuk grafik.
 * @param {number} y - Posisi y untuk grafik.
 * @param {number} width - Lebar grafik.
 * @param {number} height - Tinggi grafik.
 * @param {Array} data - Array data penjualan.
 * @param {Array} labels - Array label untuk data penjualan.
 */
function drawBarChart(doc, x, y, width, height, data, labels) {
    const maxData = Math.max(...data);
    const barWidth = width / data.length;
    const tickInterval = Math.ceil(maxData / 5); // Interval untuk sumbu y

    // Menggambar sumbu y
    for (let i = 0; i <= 5; i++) {
        const yTick = y + height - (i * (height / 5));
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        doc.text(String(i * tickInterval), x - 10, yTick + 3, { align: 'right' }); // Mengatur posisi x agar lebih jelas
        doc.line(x, yTick, x + width, yTick); // Garis horizontal
    }

    // Garis vertikal untuk sumbu y
    doc.line(x, y, x, y + height);

    // Menggambar grafik bar
    for (let i = 0; i < data.length; i++) {
        const barHeight = (data[i] / maxData) * height;
        doc.setFillColor(255, 105, 180); // Warna pink untuk batang grafik
        doc.rect(x + i * barWidth, y + height - barHeight, barWidth - 5, barHeight, 'F');
        doc.setFontSize(12); // Ukuran font untuk label hari
        doc.setTextColor(0, 0, 0); // Warna teks
        doc.text(labels[i], x + i * barWidth + (barWidth - 5) / 2, y + height + 10, { align: 'center' }); // Menambah jarak y untuk teks hari
    }
}
