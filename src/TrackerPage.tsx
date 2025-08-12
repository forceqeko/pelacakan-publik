// Lokasi: src/TrackerPage.tsx (di proyek pelacakan-publik)

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Info, FlaskConical, Calendar, CheckCircle, XCircle, Loader2, Frown, PackageSearch, Clock, FileText } from 'lucide-react';
import { fetchSampleByCode, type Sample } from './lib/api';

// Komponen untuk menampilkan hasil pencarian
function SearchResult({ sample }: { sample: Sample }) {
    const getStatusInfo = (status: string, hasil: string) => {
        const s = status.toLowerCase();
        const h = hasil?.toLowerCase();

        if (s === 'selesai') {
            if (h === 'positif') return { text: 'Selesai (Positif)', color: 'bg-red-100 text-red-700', icon: <XCircle /> };
            if (h === 'negatif') return { text: 'Selesai (Negatif)', color: 'bg-green-100 text-green-700', icon: <CheckCircle /> };
            return { text: 'Selesai', color: 'bg-gray-100 text-gray-700', icon: <CheckCircle /> };
        }
        if (s.includes('proses')) return { text: status, color: 'bg-yellow-100 text-yellow-700', icon: <Clock /> };
        return { text: 'Menunggu', color: 'bg-blue-100 text-blue-700', icon: <Clock /> };
    };

    const statusInfo = getStatusInfo(sample.Status, sample.Hasil);

    return (
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in border-t-4 border-teal-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-4">
                <div>
                    <p className="text-sm text-gray-500">Hasil Pelacakan</p>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FileText size={24} className="text-teal-600"/>
                        {sample['Kode Sampel']}
                    </h2>
                </div>
                <div className={`mt-4 sm:mt-0 flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold text-sm ${statusInfo.color}`}>
                    {statusInfo.icon}
                    <span>{statusInfo.text}</span>
                </div>
            </div>

            <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
                <p className="text-md font-semibold text-gray-700">Progress Terakhir:</p>
                <p className="text-lg text-gray-900">{sample.Progress || 'Belum ada progress'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 mt-4 border-t">
                <div className="flex items-center gap-3">
                    <FlaskConical className="text-gray-400" size={20} />
                    <div>
                        <p className="text-xs text-gray-500">Spesies</p>
                        <p className="font-semibold">{sample.Spesies}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Info className="text-gray-400" size={20} />
                    <div>
                        <p className="text-xs text-gray-500">Asal</p>
                        <p className="font-semibold">{sample['Lokasi Asal']}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Calendar className="text-gray-400" size={20} />
                    <div>
                        <p className="text-xs text-gray-500">Tgl. Diterima</p>
                        <p className="font-semibold">{new Date(sample['Tanggal Kedatangan Sampel']).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TrackerPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [executedSearch, setExecutedSearch] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('Mencari Sampel...');

    const { data: sample, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['sample', executedSearch],
        queryFn: () => fetchSampleByCode(executedSearch),
        enabled: !!executedSearch,
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

        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [isLoading]);


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setExecutedSearch(searchTerm.trim());
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Lacak Status Sampel Anda</h2>
                <p className="text-center text-gray-500 mt-2">Masukkan Kode Sampel yang Anda terima untuk melihat progress pengujian.</p>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mt-6">
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
                        {isLoading ? <Loader2 className="animate-spin" size={20}/> : <Search size={18} />}
                        <span>{isLoading ? 'Mencari...' : 'Lacak'}</span>
                    </button>
                </form>
            </div>

            <div className="mt-8">
                {/* --- PERUBAHAN DI SINI: Mengembalikan card untuk semua state --- */}
                {!executedSearch && (
                    <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-xl shadow-lg">
                        <PackageSearch className="text-gray-400 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-700">Menunggu Kode Sampel</h3>
                        <p className="text-gray-500">Silakan masukkan kode untuk memulai pelacakan.</p>
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
