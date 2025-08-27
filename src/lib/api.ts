// Lokasi: src/lib/api.ts (di proyek pelacakan-publik)

const API_URL = "https://script.google.com/macros/s/AKfycbyzEEtqUHq0AJB8eKriDX2kx4zQhFkL3sd4Nh-CX5XNiH5uq-34shq1bwmPZ_zfRNfJ/exec";

export type Category = 'ikan' | 'hewan' | 'tumbuhan';

export type Sample = {
  'Kode Sampel': string;
  'Tanggal Pengambilan Sampel': string;
  'Nama Pemilik': string;
  'No. Whatsapp': string;
  'Jenis Sampel': string;
  'Berat (kg)': number;
  'Catatan': string;
  'Status': string;
  'Progress': string;
  'Hasil': string; 
  'Timestamp': string;
  'Timestamp KI-2'?: string;
  'Riwayat Status'?: string;
  // Kolom baru yang ditambahkan
  'Nama Petugas Pengambil Sampel': string;
  'Asal Wilayah Kerja': string;
  'Nomor Agenda': string;
  'Nama Komoditas / Nama Ilmiah': string;
  'Jumlah Sampel': number;
  'Target Uji': string;
  'Target HPI / HPIK': string;
  'Metode Uji': string;
  'Status Pengujian': string;
  'Tanggal Penerimaan Sampel': string;

  // Kolom untuk F.A.3.2 (Tanda Terima Sampel)
  'Cara Pengiriman Sampel'?: string;
  'Alamat'?: string;
  'HS Code'?: string;
  'Jumlah Kontainer/Lot'?: string;
  'Lama Pengujian'?: string;
  
  // Kolom untuk tahap pengujian selanjutnya
  'Analis'?: string;
  'Tanggal Mulai Uji'?: string;
};

/**
 * Mengambil data satu sampel berdasarkan kategori dan kodenya.
 */
export const fetchSampleByCode = async (category: Category, kodeSampel: string): Promise<Sample> => {
  if (!category || !kodeSampel) {
    throw new Error("Kategori dan Kode Sampel tidak boleh kosong.");
  }
  
  const response = await fetch(`${API_URL}?action=getSampleByCode&category=${category}&kodeSampel=${encodeURIComponent(kodeSampel)}`);
  
  if (!response.ok) {
    throw new Error('Gagal terhubung ke server. Coba lagi nanti.');
  }
  
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || 'Terjadi kesalahan pada server.');
  }
  
  return result.data;
};
