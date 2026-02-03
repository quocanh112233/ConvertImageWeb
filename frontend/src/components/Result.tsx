import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { RefreshCw, CheckCircle } from 'lucide-react';

export const Result = () => {
    const { convertedFileUrl, convertedFileName, outputSize: size, reset } = useAppStore();

    useEffect(() => {
        // Auto trigger download
        if (convertedFileUrl && convertedFileName) {
            const link = document.createElement('a');
            link.href = convertedFileUrl;
            link.download = convertedFileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [convertedFileUrl, convertedFileName]);

    // Calculate size display
    const sizeDisplay = size
        ? (size / 1024 < 1000 ? `${(size / 1024).toFixed(1)} KB` : `${(size / 1024 / 1024).toFixed(2)} MB`)
        : 'Unknown size';

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100 animate-fade-in-up">
            <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                </div>

                <h2 className="text-3xl font-bold text-slate-800 mb-2">Thành công!</h2>
                <p className="text-slate-500 mb-8">File của bạn đã được tải xuống tự động.</p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-500">File mới:</span>
                        <span className="font-bold text-slate-800 break-all">{convertedFileName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500">Kích thước:</span>
                        <span className="font-bold text-blue-600">{sizeDisplay}</span>
                    </div>
                </div>

                <button
                    onClick={reset}
                    className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                >
                    <RefreshCw className="w-5 h-5" />
                    CHUYỂN ẢNH KHÁC
                </button>
            </div>
        </div>
    );
};
