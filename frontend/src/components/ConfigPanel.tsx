import { useAppStore } from '../store/useAppStore';
import { Play, Check } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import { clsx } from 'clsx';

const FORMATS = [
    { id: 'JPG', label: 'JPG' },
    { id: 'PNG', label: 'PNG' },
    { id: 'WEBP', label: 'WEBP' },
    { id: 'BMP', label: 'BMP' },
    { id: 'GIF', label: 'GIF' },
    { id: 'PPM', label: 'PPM' },
    { id: 'PGM', label: 'PGM' },
    { id: 'TIFF', label: 'TIFF' },
];

export const ConfigPanel = () => {
    const { file, targetFormat, setTargetFormat, startConvert, finishConvert } = useAppStore();
    const [resolution, setResolution] = useState<string>("Reading...");

    const handleConvert = async () => {
        if (!file) return;
        startConvert();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('format', targetFormat.toLowerCase());

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await axios.post(`${apiUrl}/api/convert`, formData, {
                responseType: 'blob',
            });

            // Create blob URL
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // Get filename from header or generate
            let fileName = `converted.${targetFormat.toLowerCase()}`;
            const disposition = response.headers['content-disposition'];
            if (disposition && disposition.indexOf('attachment') !== -1) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    fileName = matches[1].replace(/['"]/g, '');
                }
            }

            finishConvert(url, fileName, response.data.size);
        } catch (error) {
            console.error("Conversion failed", error);
            alert("Có lỗi xảy ra khi chuyển đổi! Vui lòng thử lại.");
            window.location.reload(); // Simple reset on error
        }
    };

    /**
     * Helper to get resolution (async).
     * For now we display placeholder or load it if fast enough. 
     * Since user didn't strictly ask for real resolution logic in requirements (just sample), 
     * we can skip complex loading or just show "Calculating..." or use a simple Image object load.
     * Let's try to load it for the "Wow" factor.
     */

    if (file && resolution === "Reading...") {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            setResolution(`${img.width} x ${img.height}`);
        }
    }

    if (!file) return null;

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-fade-in-up">
            {/* Header / File Info */}
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-3xl shrink-0">
                    🖼️
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-lg truncate" title={file.name}>{file.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                        <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                        <span>{resolution}</span>
                        <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                        <span className="uppercase">{file.name.split('.').pop()}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                <label className="block text-slate-700 font-semibold mb-3">Chuyển sang định dạng:</label>

                <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {FORMATS.map(fmt => (
                        <div
                            key={fmt.id}
                            onClick={() => setTargetFormat(fmt.id)}
                            className={clsx(
                                "flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all duration-200",
                                targetFormat === fmt.id
                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                            )}
                        >
                            <div className="flex flex-col">
                                <span className={clsx("font-bold", targetFormat === fmt.id ? "text-blue-700" : "text-slate-700")}>
                                    {fmt.label}
                                </span>
                            </div>
                            {targetFormat === fmt.id && <Check className="text-blue-600 w-5 h-5" />}
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleConvert}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Play className="fill-current w-5 h-5" />
                        BẮT ĐẦU CHUYỂN ĐỔI
                    </button>
                    <button
                        onClick={() => useAppStore.getState().reset()}
                        className="w-full mt-3 py-3 text-slate-500 hover:text-red-500 font-medium transition-colors"
                    >
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </div>
    );
};
