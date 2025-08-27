// Lokasi: src/App.tsx (di proyek pelacakan-publik)

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TrackerPage from './TrackerPage';
import logo from '/logo-barantin.png';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div 
        className="min-h-screen font-sans flex flex-col"
        style={{
            backgroundColor: '#f1f5f9',
            backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
        }}
      >
        <header className="bg-gradient-to-r from-teal-600 to-emerald-600 shadow-lg w-full sticky top-0 z-10">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                  <img src={logo} alt="Logo BKHIT" className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg" />
                  <div className="text-white">
                      <h1 className="text-xl font-bold">Pelacakan Sampel</h1>
                      <p className="text-sm text-white/80">Laboratorium BKHIT Sulawesi Utara</p>
                  </div>
              </div>
              <div className="text-white/80 text-sm hidden md:block">
                  <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Sistem Online
                  </span>
              </div>
          </div>
        </header>
        
        <main className="container mx-auto p-4 md:p-8 flex-grow w-full">
          <TrackerPage />
        </main>

        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={logo} alt="Logo BKHIT" className="w-10 h-10 rounded-full" />
                  <h4 className="text-lg font-bold">BKHIT Sulawesi Utara</h4>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Balai Karantina Hewan, Ikan dan Tumbuhan Sulawesi Utara
                </p>
                <p className="text-gray-400 text-xs">
                  Melayani inspeksi dan pengujian untuk menjaga keamanan pangan dan biosekuritas
                </p>
              </div>
              
              <div>
                <h5 className="font-semibold mb-3 text-white">Kontak Kami</h5>
                <div className="space-y-2 text-sm text-gray-300">
                  <p className="flex items-center gap-2">
                    <span>📧</span>
                    <span>info@bkhit-sulut.go.id</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📞</span>
                    <span>(0431) 123-456</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📍</span>
                    <span>Manado, Sulawesi Utara</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🌐</span>
                    <span>www.bkhit-sulut.go.id</span>
                  </p>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold mb-3 text-white">Jam Operasional</h5>
                <div className="space-y-1 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Senin - Jumat:</span>
                    <span className="text-green-400">08:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabtu:</span>
                    <span className="text-yellow-400">08:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minggu:</span>
                    <span className="text-red-400">Tutup</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-300">
                    <strong>Info:</strong> Untuk layanan darurat, hubungi hotline 24 jam di (0431) 999-888
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} BKHIT Sulawesi Utara. All rights reserved.</p>
              <p className="mt-2">Sistem Pelacakan Sampel v2.0 | Dibuat dengan ❤️ untuk melayani masyarakat</p>
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
