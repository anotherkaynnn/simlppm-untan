const fs = require('fs');
const { Document, Packer, Paragraph, TextRun } = require('docx');

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: "SURAT TUGAS",
              bold: true,
              size: 32,
            }),
          ],
          alignment: "center",
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Nomor: {nomor_surat}",
              size: 24,
            }),
          ],
          alignment: "center",
        }),
        new Paragraph({ text: "" }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Berdasarkan permohonan pada tanggal {tanggal_permintaan}, dengan ini Ketua LPPM Universitas Tanjungpura menugaskan kepada dosen yang bersangkutan untuk melaksanakan kegiatan:",
              size: 24,
            }),
          ],
        }),
        new Paragraph({ text: "" }),
        new Paragraph({
          children: [
            new TextRun({ text: "Kegiatan: {kegiatan}", size: 24 }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Tujuan: {tujuan}", size: 24 }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Waktu Pelaksanaan: {tanggal_pelaksanaan}", size: 24 }),
          ],
        }),
        new Paragraph({ text: "" }),
        new Paragraph({
          children: [
            new TextRun({ text: "Demikian surat tugas ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.", size: 24 }),
          ],
        }),
        new Paragraph({ text: "" }),
        new Paragraph({
          children: [
            new TextRun({ text: "Pontianak, {tanggal_permintaan}", size: 24 }),
          ],
          alignment: "right",
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Ketua LPPM,", size: 24 }),
          ],
          alignment: "right",
        }),
        new Paragraph({ text: "\n\n\n" }),
        new Paragraph({
          children: [
            new TextRun({ text: "{nama_ketua}", bold: true, size: 24 }),
          ],
          alignment: "right",
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('./public/templates/surat_tugas_template.docx', buffer);
  console.log('Template created at /public/templates/surat_tugas_template.docx');
});
