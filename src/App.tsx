// Lokasi: src/App.tsx (di proyek pelacakan-publik)

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TrackerPage from './TrackerPage';
import logo from '/logo-barantin.png';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* --- PERUBAHAN DI SINI: Menambahkan class flexbox --- */}
      <div 
        className="min-h-screen font-sans flex flex-col" // Menjadikan ini container flex vertikal
        style={{
            backgroundColor: '#f1f5f9',
            backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
        }}
      >
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                  <img src={logo} alt="Logo BKHIT" className="w-12 h-12" />
                  <div>
                      <h1 className="text-xl font-bold text-gray-800">Pelacakan Sampel</h1>
                      <p className="text-sm text-gray-500">Laboratorium Karantina Ikan Sulawesi Utara</p>
                  </div>
              </div>
          </div>
        </header>
        
        {/* --- PERUBAHAN DI SINI: Menambahkan class flex-grow --- */}
        <main className="container mx-auto p-4 md:p-8 flex-grow"> {/* Membuat main content tumbuh mengisi ruang kosong */}
          <TrackerPage />
        </main>

        <footer className="text-center py-4 mt-8">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} BKHIT Sulawesi Utara. All rights reserved.</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
