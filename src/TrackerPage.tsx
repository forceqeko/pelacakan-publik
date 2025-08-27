// Lokasi: src/TrackerPage.tsx (di proyek pelacakan-publik)

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Info, FlaskConical, Calendar, CheckCircle, Loader2, Frown, PackageSearch, FileText, Hourglass, Clock } from 'lucide-react';
import { fetchSampleByCode, type Sample, type Category } from './lib/api';

// Tipe untuk satu item riwayat
type HistoryItem = {
    status: string;
    timestamp: string;
};

// Komponen untuk menampilkan hasil pencarian dalam bentuk timeline
function SearchResult({ sample }: { sample: Sample }) {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    // Updated workflow stages to match new internal app process
    const allStages = [
        "Menunggu",
        "Disetujui Admin", 
        "Sampel Diterima",
        "Proses Uji",
        "Selesai"
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
    
    // Find the last completed stage based on status history
    const lastCompletedStageIndex = (() => {
        let lastIndex = -1;
        for (let i = 0; i < allStages.length; i++) {
            const stage = allStages[i];
            const hasStage = history.some(h => h.status.toLowerCase() === stage.toLowerCase());
            if (hasStage) {
                lastIndex = i;
            }
        }
        return lastIndex;
    })();

    const getStatusIcon = (isCompleted: boolean, isCurrent: boolean) => {
        if (isCompleted) {
            // Checkmark for all completed stages
            return <CheckCircle className="text-white" />;
        }
        if (isCurrent) {
            // Loading spinner only for the stage that is currently in progress
            return <Loader2 className="text-white animate-spin" />;
        }
        // Hourglass for pending/future stages
        return <Hourglass className="text-white" />;
    };

    return (
        <div className="mt-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden card-entrance hover-lift">
            {/* Header dengan gradient */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-teal-600 font-medium">Hasil Pelacakan</p>
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mt-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                                <FileText size={24} className="text-white"/>
                            </div>
                            {sample['Kode Sampel']}
                        </h2>
                    </div>
                    
                    {/* Status badge */}
                    <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-white/50">
                        <span className="text-sm font-medium text-gray-600">Status Terkini</span>
                        <div className="text-lg font-bold text-teal-600">
                            {lastCompletedStageIndex >= 0 ? allStages[lastCompletedStageIndex] : 'Belum Dimulai'}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Info cards dengan enhanced design */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50 hover:shadow-md hover:scale-105 transition-all duration-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                <FlaskConical size={16} className="text-white"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium">Nama Komoditas</p>
                                <p className="text-sm font-semibold text-gray-800 truncate">{sample['Nama Komoditas / Nama Ilmiah'] || '-'}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50 hover:shadow-md hover:scale-105 transition-all duration-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <Info size={16} className="text-white"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium">Target Pengujian</p>
                                <p className="text-sm font-semibold text-gray-800 truncate">{sample['Target HPI / HPIK'] || '-'}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200/50 hover:shadow-md hover:scale-105 transition-all duration-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Calendar size={16} className="text-white"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium">Tanggal Pengambilan</p>
                                <p className="text-sm font-semibold text-gray-800">{new Date(sample['Tanggal Pengambilan Sampel']).toLocaleDateString('id-ID')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Clock size={24} className="text-teal-600" />
                    Riwayat Status
                </h3>
                
                <ol className="relative">
                    {allStages.map((stage, index) => {
                        const historyEntry = history.find(h => h.status.toLowerCase() === stage.toLowerCase());
                        const hasThisStage = !!historyEntry;
                        const isCompleted = hasThisStage;
                        const isCurrent = !hasThisStage && index === lastCompletedStageIndex + 1;

                        return (
                            <li key={stage} className="mb-6 ml-8 group">
                                <span className={`absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 ring-4 ring-white shadow-lg transition-all group-hover:scale-110 ${
                                    isCurrent ? 'bg-teal-500' : (isCompleted ? 'bg-green-500' : 'bg-gray-400')
                                }`}>
                                    {getStatusIcon(isCompleted, isCurrent)}
                                </span>
                                
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/50 hover:bg-white hover:shadow-md transition-all duration-200">
                                    <h3 className={`text-lg font-semibold ${isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {stage}
                                    </h3>
                                    {historyEntry && (
                                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar size={14} />
                                            <time>
                                                {new Date(historyEntry.timestamp).toLocaleString('id-ID', { 
                                                    dateStyle: 'long', 
                                                    timeStyle: 'short' 
                                                })}
                                            </time>
                                        </div>
                                    )}
                                    {!historyEntry && index > lastCompletedStageIndex && (
                                        <p className="text-sm text-gray-400 mt-1">Menunggu tahap sebelumnya selesai</p>
                                    )}
                                </div>
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
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 animate-fade-in-up hover-lift">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold gradient-text">
                        Lacak Status Sampel Anda
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Pantau progress pengujian sampel secara real-time
                    </p>
                </div>
                
                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <select 
                                value={selectedCategory} 
                                onChange={e => setSelectedCategory(e.target.value as Category)}
                                className="peer w-full h-14 px-4 pt-4 pb-2 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all bg-white"
                            >
                                <option value="ikan">Ikan</option>
                                <option value="hewan">Hewan</option>
                                <option value="tumbuhan">Tumbuhan</option>
                            </select>
                            <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all">
                                Kategori Sampel
                            </label>
                        </div>
                        
                        <div className="md:col-span-2 relative">
                            <input
                                type="text"
                                placeholder=" "
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="peer w-full h-14 px-4 pt-4 pb-2 pr-12 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all bg-white"
                            />
                            <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all">
                                Kode Sampel (Contoh: KI-20240811-0001)
                            </label>
                            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading} 
                        className="w-full h-14 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Search size={20} />
                            {isLoading ? 'Mencari...' : 'Lacak Sampel'}
                        </span>
                    </button>
                </form>
            </div>

            <div className="mt-8">
                {!executedSearch.term && (
                    <div className="flex flex-col items-center justify-center p-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 animate-fade-in-up">
                        <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mb-6 animate-float">
                            <PackageSearch className="text-teal-600" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">Siap Melacak Sampel</h3>
                        <p className="text-gray-500 mt-2 text-center">Masukkan kode sampel di atas untuk melihat status pengujian</p>
                    </div>
                )}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center p-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20">
                        <div className="relative mb-6">
                            <div className="w-16 h-16 border-4 border-teal-200 rounded-full animate-spin"></div>
                            <div className="w-16 h-16 border-4 border-teal-600 rounded-full animate-spin absolute top-0 left-0" style={{borderTopColor: 'transparent'}}></div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">{loadingMessage}</h3>
                        <p className="text-gray-500 mt-2">Mohon tunggu sebentar</p>
                    </div>
                )}
                {isError && (
                    <div className="flex flex-col items-center justify-center p-16 bg-red-50/80 backdrop-blur-lg border-2 border-red-200 rounded-2xl shadow-lg">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                            <Frown className="text-red-500" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-red-700">Terjadi Kesalahan</h3>
                        <p className="text-red-600 mt-2 text-center">{(error as Error).message}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Coba Lagi
                        </button>
                    </div>
                )}
                {isSuccess && sample && <SearchResult sample={sample} />}
            </div>
        </div>
    );
}
