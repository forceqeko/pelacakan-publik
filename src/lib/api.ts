// Lokasi: src/lib/api.ts (di proyek pelacakan-publik)

// PENTING: Pastikan URL ini sama dengan URL di aplikasi internal Anda
const API_URL = "https://script.google.com/macros/s/AKfycbx1COmbI12sIsHZOdF_VhqR8StG7hmhYSmXLIKWI_8c9fZlM91mpojRgrzWOZKRA_Ncnw/exec";

// Tipe data untuk satu sampel
export type Sample = {
  'Kode Sampel': string;
  'Spesies': string;
  'Lokasi Asal': string;
  'Tanggal Kedatangan Sampel': string;
  'Nama Pengirim': string;
  'Status': string;
  'Progress': string;
  'Hasil': string; 
};

/**
 * Mengambil data satu sampel berdasarkan kodenya.
 * Ini adalah satu-satunya fungsi API yang dibutuhkan oleh aplikasi publik.
 */
export const fetchSampleByCode = async (kodeSampel: string): Promise<Sample> => {
  if (!kodeSampel) {
    throw new Error("Kode sampel tidak boleh kosong.");
  }
  
  const response = await fetch(`${API_URL}?action=getSampleByCode&kodeSampel=${encodeURIComponent(kodeSampel)}`);
  
  if (!response.ok) {
    throw new Error('Gagal terhubung ke server. Coba lagi nanti.');
  }
  
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || 'Terjadi kesalahan pada server.');
  }
  
  return result.data;
};
