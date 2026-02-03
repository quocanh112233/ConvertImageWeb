import { motion } from 'framer-motion';

export const Processing = () => {
    return (
        <div className="w-full max-w-2xl mx-auto text-center py-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 animate-pulse">Đang xử lý ảnh...</h3>

            <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden mb-8">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                />
            </div>

            <p className="text-slate-500 font-medium font-mono">
                Vui lòng chờ, engine đang đi qua numpy pixel...
            </p>
        </div>
    );
};
