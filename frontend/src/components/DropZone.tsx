import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { clsx } from 'clsx';

export const DropZone = () => {
    const setFile = useAppStore(state => state.setFile);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        // Simple validation checks if needed
        setFile(file);
    };

    return (
        <div
            className={clsx(
                "relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto border-2 border-dashed rounded-3xl transition-all duration-300 p-12 cursor-pointer group",
                isDragging ? "border-blue-500 bg-blue-50 scale-105" : "border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
        >
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept="image/*"
                onChange={handleChange}
            />

            <div className="bg-blue-100 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-10 h-10 text-blue-600" />
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-slate-700">Kéo thả ảnh vào đây</h3>
                <p className="text-slate-500 text-lg">hoặc bấm để chọn file</p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 opacity-60">
                {['PNG', 'JPG', 'WEBP', 'BMP', 'GIF', 'PPM', 'PGM', 'TIFF'].map(fmt => (
                    <span key={fmt} className="px-3 py-1 bg-slate-200 rounded-md text-xs font-semibold text-slate-600">
                        {fmt}
                    </span>
                ))}
            </div>
        </div>
    );
}
