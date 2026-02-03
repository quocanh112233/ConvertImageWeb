import { useAppStore } from './store/useAppStore';
import { DropZone } from './components/DropZone';
import { ConfigPanel } from './components/ConfigPanel';
import { Processing } from './components/Processing';
import { Result } from './components/Result';
import { Github, Info } from 'lucide-react';

function App() {
  const step = useAppStore((state) => state.step);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white font-bold p-1 px-2 rounded-lg text-sm">PY</div>
            <span className="font-bold text-xl tracking-tight text-slate-800">CONVERTER</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center py-10 px-6">
        <div className="max-w-4xl mx-auto w-full">

          {step === 'initial' && (
            <div className="text-center mb-10 animate-fade-in-down">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                BIẾN ĐỔI ẢNH CỦA BẠN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">TRONG TÍCH TẮC</span>
              </h1>
              <p className="text-slate-500 text-lg">Công cụ chuyển đổi ảnh mạnh mẽ, hỗ trợ mọi định dạng phổ biến và khoa học.</p>
            </div>
          )}

          <div className="transition-all duration-500 ease-in-out">
            {step === 'initial' && <DropZone />}
            {step === 'selected' && <ConfigPanel />}
            {step === 'converting' && <Processing />}
            {step === 'result' && <Result />}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Py-Converter. Powered by FastApi & React.</p>
      </footer>
    </div>
  );
}

export default App;
