// Lokasi: src/lib/api.ts (di proyek pelacakan-publik)

const API_URL = "https://script.google.com/macros/s/AKfycbyzEEtqUHq0AJB8eKriDX2kx4zQhFkL3sd4Nh-CX5XNiH5uq-34shq1bwmPZ_zfRNfJ/exec";

export type Category = 'ikan' | 'hewan' | 'tumbuhan';

// --- PERUBAHAN DI SINI: Menambahkan Riwayat Status ---
export type Sample = {
  'Kode Sampel': string;
  'Spesies': string;
  'Lokasi Asal': string;
  'Tanggal Pengambilan Sampel': string;
  'Nama Pemilik': string;
  'Status': string;
  'Progress': string;
  'Hasil': string; 
  'Riwayat Status': string; // Ini akan berisi JSON string dari riwayat
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
