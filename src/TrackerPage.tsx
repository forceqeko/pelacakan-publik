// Lokasi: src/TrackerPage.tsx (di proyek pelacakan-publik)

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Info, FlaskConical, Calendar, CheckCircle, Loader2, Frown, PackageSearch, FileText, Hourglass } from 'lucide-react';
import { fetchSampleByCode, type Sample, type Category } from './lib/api';

// Tipe untuk satu item riwayat
type HistoryItem = {
    status: string;
    timestamp: string;
};

// Komponen untuk menampilkan hasil pencarian dalam bentuk timeline
function SearchResult({ sample }: { sample: Sample }) {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const allStages = [
        "Menunggu",
        "Disetujui Admin",
        "Sampel sedang di Uji",
        "Sampel Selesai di Uji"
    ];

    useEffect(() => {
        try {
            const parsedHistory = JSON.parse(sample['Riwayat Status'] || '[]');
            setHistory(parsedHistory);
        } catch (e) {
            console.error("Gagal mem-parse riwayat status:", e);
            setHistory([]);
        }
    }, [sample]);
    
    const lastCompletedStageIndex = allStages.findIndex(stage => 
        stage.toLowerCase() === history[history.length - 1]?.status.toLowerCase()
    );

    // --- PERUBAHAN DI SINI: Memperbaiki logika ikon ---
    const getStatusIcon = (stage: string, isCompleted: boolean, isCurrent: boolean) => {
        if (isCurrent) {
            // Jika status saat ini adalah "Disetujui Admin", tampilkan ceklis, bukan loading
            if (stage.toLowerCase() === "disetujui admin") {
                return <CheckCircle className="text-white" />;
            }
            return <Loader2 className="text-white animate-spin" />;
        }
        if (isCompleted) return <CheckCircle className="text-white" />;
        return <Hourglass className="text-white" />;
    };

    return (
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in border-t-4 border-teal-500">
            <div className="pb-4 mb-6 border-b">
                <p className="text-sm text-gray-500">Hasil Pelacakan</p>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText size={24} className="text-teal-600"/>
                    {sample['Kode Sampel']}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2"><FlaskConical size={16} className="text-gray-400"/> <span>{sample.Spesies}</span></div>
                    <div className="flex items-center gap-2"><Info size={16} className="text-gray-400"/> <span>{sample['Lokasi Asal']}</span></div>
                    <div className="flex items-center gap-2"><Calendar size={16} className="text-gray-400"/> <span>{new Date(sample['Tanggal Pengambilan Sampel']).toLocaleDateString('id-ID')}</span></div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Riwayat Status</h3>
                <ol className="relative border-l border-gray-200">
                    {allStages.map((stage, index) => {
                        const historyEntry = history.find(h => h.status.toLowerCase() === stage.toLowerCase());
                        const isCompleted = index < lastCompletedStageIndex;
                        const isCurrent = index === lastCompletedStageIndex;

                        return (
                            <li key={stage} className="mb-8 ml-8">
                                <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white ${isCurrent ? 'bg-teal-500' : (isCompleted ? 'bg-green-500' : 'bg-gray-400')}`}>
                                    {getStatusIcon(stage, isCompleted, isCurrent)}
                                </span>
                                <h3 className={`text-lg font-semibold ${isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{stage}</h3>
                                {historyEntry && (
                                    <time className="block text-sm font-normal text-gray-400">
                                        {new Date(historyEntry.timestamp).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                                    </time>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}

export default function TrackerPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('ikan');
    const [searchTerm, setSearchTerm] = useState('');
    const [executedSearch, setExecutedSearch] = useState({ term: '', category: '' });
    const [loadingMessage, setLoadingMessage] = useState('Mencari Sampel...');

    const { data: sample, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['sample', executedSearch.category, executedSearch.term],
        queryFn: () => fetchSampleByCode(executedSearch.category as Category, executedSearch.term),
        enabled: !!executedSearch.term && !!executedSearch.category,
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        let timerId: number | undefined;
        if (isLoading) {
            timerId = setTimeout(() => {
                setLoadingMessage('Menghubungi server, ini mungkin butuh waktu lebih lama...');
            }, 3000);
        } else {
            setLoadingMessage('Mencari Sampel...');
        }
        return () => { if (timerId) clearTimeout(timerId); };
    }, [isLoading]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setExecutedSearch({ term: searchTerm.trim(), category: selectedCategory });
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Lacak Status Sampel Anda</h2>
                <p className="text-center text-gray-500 mt-2">Pilih kategori, lalu masukkan Kode Sampel untuk melihat progress pengujian.</p>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mt-6">
                    <div>
                        <select 
                            value={selectedCategory} 
                            onChange={e => setSelectedCategory(e.target.value as Category)}
                            className="h-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        >
                            <option value="ikan">Ikan</option>
                            <option value="hewan">Hewan</option>
                            <option value="tumbuhan">Tumbuhan</option>
                        </select>
                    </div>
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Contoh: KI-20240811-0001"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        />
                        <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <button type="submit" disabled={isLoading} className="px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 flex items-center justify-center gap-2 transition disabled:bg-teal-400">
                        <Search size={18} />
                        <span>Lacak</span>
                    </button>
                </form>
            </div>

            <div className="mt-8">
                {!executedSearch.term && (
                    <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-xl shadow-lg">
                        <PackageSearch className="text-gray-400 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-700">Menunggu Kode Sampel</h3>
                        <p className="text-gray-500">Silakan pilih kategori dan masukkan kode untuk memulai pelacakan.</p>
                    </div>
                )}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-xl shadow-lg">
                        <Loader2 className="animate-spin text-teal-600 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-700">{loadingMessage}</h3>
                    </div>
                )}
                {isError && (
                    <div className="flex flex-col items-center justify-center text-center p-10 bg-red-50 border border-red-200 rounded-lg shadow-lg">
                        <Frown className="text-red-500 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-red-700">Terjadi Kesalahan</h3>
                        <p className="text-red-600">{(error as Error).message}</p>
                    </div>
                )}
                {isSuccess && sample && <SearchResult sample={sample} />}
            </div>
        </div>
    );
}
