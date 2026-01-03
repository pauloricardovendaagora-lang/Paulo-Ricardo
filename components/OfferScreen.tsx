
import React, { useRef, useEffect, useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Activity, 
  ArrowRight, 
  Lock,
  Zap,
  ShieldCheck,
  Timer
} from 'lucide-react';

const HACK_SOUND_CLICK = 'https://assets.mixkit.co/active_storage/sfx/2556/2556-preview.mp3';

interface OfferScreenProps {
  onComplete: () => void;
}

const OfferScreen: React.FC<OfferScreenProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5:00 minutos
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(HACK_SOUND_CLICK);
    
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinalClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    if ('vibrate' in navigator) navigator.vibrate(50);
    setTimeout(onComplete, 400);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white relative font-mono overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* Header - Conexão Segura / Timer */}
      <div className="flex items-center justify-between p-6 z-20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
          <span className="text-[12px] font-bold text-[#22c55e] uppercase tracking-widest">Conexão Segura</span>
        </div>
        <div className="bg-[#1a0a0a] px-3 py-1.5 rounded-lg border border-red-900/30">
          <span className="text-red-500 font-black text-sm tabular-nums tracking-widest">{formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* Main Content - Dashboard Area */}
      <div className="flex-1 overflow-y-auto z-10 p-4 space-y-4 custom-scrollbar">
        
        {/* Metric Grid 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* ROI Card */}
          <div className="bg-[#141414] border border-white/5 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 opacity-50">
              <TrendingUp size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">ROI ATUAL</span>
            </div>
            <div className="text-[32px] font-black text-[#22c55e] leading-none tracking-tighter">
              12.4x
            </div>
          </div>

          {/* CUSTO MEDIO Card */}
          <div className="bg-[#141414] border border-white/5 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 opacity-50">
              <DollarSign size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">CUSTO MÉDIO</span>
            </div>
            <div className="text-[28px] font-black text-[#3b82f6] leading-none tracking-tighter">
              R$ 0,12
            </div>
          </div>

          {/* CONVERSÃO Card */}
          <div className="bg-[#141414] border border-white/5 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 opacity-50">
              <Target size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">CONVERSÃO</span>
            </div>
            <div className="text-[32px] font-black text-[#a855f7] leading-none tracking-tighter">
              8.9%
            </div>
          </div>

          {/* ALGORITMO Card */}
          <div className="bg-[#141414] border border-white/5 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 opacity-50">
              <Activity size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">ALGORITMO</span>
            </div>
            <div className="text-[22px] font-black text-[#f97316] leading-none tracking-tighter uppercase italic animate-pulse">
              BURLADO
            </div>
          </div>

        </div>

        {/* Real-Time Graph Section */}
        <div className="bg-[#141414] border border-white/5 rounded-[2.5rem] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Performance em Tempo Real</h3>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-[#22c55e] rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />
              ))}
            </div>
          </div>

          <div className="h-40 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M0,130 Q40,40 80,110 T160,80 T240,100 T320,50 T400,100 L400,150 L0,150 Z" 
                fill="url(#lineGrad)" 
                className="animate-graph-fill"
              />
              <path 
                d="M0,130 Q40,40 80,110 T160,80 T240,100 T320,50 T400,100" 
                fill="none" 
                stroke="#22c55e" 
                strokeWidth="4" 
                strokeLinecap="round"
                className="animate-graph-line"
              />
            </svg>
          </div>
        </div>

        {/* Persuasion Text Area */}
        <div className="py-6 px-2 space-y-4">
          <p className="text-[13px] text-zinc-400 font-bold uppercase italic leading-tight">
            Este é o resultado da estrutura que você está prestes a ativar. O sistema invisível burla o leilão e entrega conversão máxima por centavos.
          </p>
          <div className="flex items-center gap-2 text-[#22c55e]">
            <Zap size={16} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-widest">Última vaga disponível para seu IP</span>
          </div>
        </div>

      </div>

      {/* Footer - Final CTA Area */}
      <div className="shrink-0 p-6 pb-12 bg-black/80 backdrop-blur-3xl border-t border-white/5 z-30">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-zinc-500 font-bold uppercase text-[10px]">Acesso Vitalício</span>
            <div className="flex items-baseline gap-2">
              <span className="text-zinc-600 line-through text-xs">R$ 197</span>
              <span className="text-2xl font-black text-white">R$ 67</span>
            </div>
          </div>

          <button 
            onClick={handleFinalClick}
            className="w-full bg-[#22c55e] text-black py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(34,197,94,0.4)] active:scale-95 transition-all group"
          >
            LIBERAR MEU ACESSO
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-4 opacity-30">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Ativação Segura via Cakto</span>
          </div>
        </div>
      </div>

      {/* iOS Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/10 rounded-full" />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes graph-fill {
          from { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
          to { opacity: 1; transform: scaleY(1); }
        }
        .animate-graph-fill {
          animation: graph-fill 1.5s ease-out forwards;
        }

        @keyframes graph-line {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-graph-line {
          animation: graph-line 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OfferScreen;
