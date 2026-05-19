<?php

namespace App\Exports;

use App\Models\Barang;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class BarangExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    public function collection()
    {
        return Barang::with('kategori')
            ->withCount('detailTransaksis')
            ->orderBy('total_disewa', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return [
            'No',
            'Kode Barang',
            'Nama Barang',
            'Kategori',
            'Ukuran',
            'Warna',
            'Harga Sewa',
            'Stok',
            'Total Disewa',
            'Total Pendapatan',
            'Status'
        ];
    }

    public function map($barang): array
    {
        static $row = 0;
        $row++;

        return [
            $row,
            $barang->kode_barang,
            $barang->nama_barang,
            $barang->kategori?->nama_kategori ?? '-',
            $barang->ukuran ?? '-',
            $barang->warna ?? '-',
            $barang->harga_sewa,
            $barang->stok,
            $barang->detail_transaksis_count,
            $barang->detail_transaksis_count * $barang->harga_sewa,
            $barang->status,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 12]],
            'A1:K1' => ['fill' => ['fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID, 'startColor' => ['rgb' => 'C5A059']]],
        ];
    }
}
