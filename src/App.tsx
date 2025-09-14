// Lokasi: src/App.tsx (di proyek pelacakan-publik)

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Instagram, Facebook, Youtube, Video } from 'lucide-react';
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={logo} alt="Logo BKHIT" className="w-10 h-10 rounded-full" />
                  <h4 className="text-lg font-bold">BKHIT Sulawesi Utara</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex flex-col gap-1">
                    <p className="flex items-start gap-2">
                      <span>📍</span>
                      <span>JL. AA Maramis. No. 283.</span>
                    </p>
                    <p className="flex items-start gap-2 ml-5">
                      <span>Lapangan. Mapanget. Kota Manado. 95258</span>
                    </p>
                  </div>
                  <p className="flex items-center gap-2">
                    <span>📧</span>
                    <span>karantinasulut@karantinaindonesia.go.id</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <h5 className="font-semibold mb-3 text-white">Media Sosial BKHIT Sulut</h5>
                <div className="space-y-2 text-sm text-gray-300">
                  <p className="flex items-center justify-end gap-2">
                    <span>@karantinasulawesiutara</span>
                    <Instagram size={16} />
                  </p>
                  <p className="flex items-center justify-end gap-2">
                    <span>Karantina Sulawesi Utara</span>
                    <Facebook size={16} />
                  </p>
                  <p className="flex items-center justify-end gap-2">
                    <span>@karantinasulawesiutara</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-300">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </p>
                  <p className="flex items-center justify-end gap-2">
                    <span>Karantina Sulawesi Utara</span>
                    <Youtube size={16} />
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} BKHIT Sulawesi Utara. Semua Hak Cipta Dilindungi.</p>
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
