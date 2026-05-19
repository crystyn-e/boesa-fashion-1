<?php

namespace App\Exports;

use App\Models\Transaksi;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TransaksiExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    protected $startDate;
    protected $endDate;
    protected $status;

    public function __construct($startDate = null, $endDate = null, $status = null)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->status = $status;
    }

    public function collection()
    {
        $query = Transaksi::with('pelanggan');

        if ($this->startDate) {
            $query->whereDate('created_at', '>=', $this->startDate);
        }
        if ($this->endDate) {
            $query->whereDate('created_at', '<=', $this->endDate);
        }
        if ($this->status) {
            $query->where('status', $this->status);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    public function headings(): array
    {
        return [
            'No',
            'Kode Transaksi',
            'Pelanggan',
            'Tanggal Sewa',
            'Tanggal Harus Kembali',
            'Tanggal Kembali',
            'Total Harga',
            'DP',
            'Sisa',
            'Denda',
            'Deposit',
            'Status',
            'Tanggal Transaksi'
        ];
    }

    public function map($transaksi): array
    {
        static $row = 0;
        $row++;

        return [
            $row,
            $transaksi->kode_transaksi,
            $transaksi->pelanggan?->nama ?? 'Walk-in',
            $transaksi->tgl_sewa->format('d/m/Y'),
            $transaksi->tgl_harus_kembali->format('d/m/Y'),
            $transaksi->tgl_kembali?->format('d/m/Y') ?? '-',
            $transaksi->total_harga,
            $transaksi->dp,
            $transaksi->sisa_pembayaran,
            $transaksi->denda,
            $transaksi->deposit_tipe === 'uang' ? 'Uang' : 'KTP',
            $transaksi->status,
            $transaksi->created_at->format('d/m/Y H:i'),
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true, 'size' => 12]],
            'A1:M1' => ['fill' => ['fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID, 'startColor' => ['rgb' => 'C5A059']]],
        ];
    }
}
