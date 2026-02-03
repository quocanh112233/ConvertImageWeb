import { create } from 'zustand';

interface AppState {
    step: 'initial' | 'selected' | 'converting' | 'result';
    file: File | null;
    targetFormat: string;
    convertedFileUrl: string | null;
    convertedFileName: string | null;
    originalSize: number;
    outputSize: number | null;

    setFile: (file: File) => void;
    setTargetFormat: (format: string) => void;
    startConvert: () => void;
    finishConvert: (url: string, fileName: string, size: number) => void;
    reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    step: 'initial',
    file: null,
    targetFormat: 'JPG',
    convertedFileUrl: null,
    convertedFileName: null,
    originalSize: 0,
    outputSize: null,

    setFile: (file) => set({ file, originalSize: file.size, step: 'selected', targetFormat: 'JPG' }), // Reset format on new file
    setTargetFormat: (format) => set({ targetFormat: format }),
    startConvert: () => set({ step: 'converting' }),
    finishConvert: (url, fileName, size) => set({
        step: 'result',
        convertedFileUrl: url,
        convertedFileName: fileName,
        outputSize: size
    }),
    reset: () => set({
        step: 'initial',
        file: null,
        convertedFileUrl: null,
        convertedFileName: null,
        outputSize: null
    }),
}));
