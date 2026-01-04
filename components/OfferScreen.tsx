
import React, { useRef, useEffect, useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Activity, 
  ArrowRight, 
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Cpu,
  Layers,
  Skull
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

      {/* Header Fixo */}
      <div className="flex items-center justify-between p-6 z-50 shrink-0 bg-black/60 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
          <span className="text-[12px] font-bold text-[#22c55e] uppercase tracking-widest">CONEXÃO SEGURA</span>
        </div>
        <div className="bg-[#1a0a0a] px-3 py-1.5 rounded-lg border border-red-900/30">
          <span className="text-red-500 font-black text-sm tabular-nums tracking-widest">{formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* Área de Conteúdo Rolável */}
      <div className="flex-1 overflow-y-auto z-10 p-4 space-y-6 custom-scrollbar pb-32">
        
        {/* Metric Grid 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#141414] border border-white/5 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 opacity-50">
              <TrendingUp size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">ROI ATUAL</span>
            </div>
            <div className="text-[32px] font-black text-[#22c55e] leading-none tracking-tighter">12.4x</div>
          </div>

          <div className="bg-[#141414] border border-white/5 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 opacity-50">
              <DollarSign size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">CUSTO MÉDIO</span>
            </div>
            <div className="text-[28px] font-black text-[#3b82f6] leading-none tracking-tighter">R$ 0,12</div>
          </div>

          <div className="bg-[#141414] border border-white/5 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 opacity-50">
              <Target size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">CONVERSÃO</span>
            </div>
            <div className="text-[32px] font-black text-[#a855f7] leading-none tracking-tighter">8.9%</div>
          </div>

          <div className="bg-[#141414] border border-white/5 p-5 rounded-[2rem] space-y-3 relative overflow-hidden group">
            <div className="flex items-center gap-2 opacity-50">
              <Activity size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">ALGORITMO</span>
            </div>
            <div className="text-[22px] font-black text-[#f97316] leading-none tracking-tighter uppercase italic animate-pulse">BURLADO</div>
          </div>
        </div>

        {/* Headline de Impacto */}
        <div className="px-2 space-y-3">
          <h2 className="text-2xl font-black italic uppercase leading-none tracking-tighter text-white">
            PARE DE PAGAR CARO POR CLIQUE
          </h2>
          <p className="text-xs text-zinc-500 font-bold leading-relaxed uppercase">
            Não é criativo. Não é segmentação. É como você treina o algoritmo no início. <span className="text-white">Errou ali, você paga caro pra sempre.</span>
          </p>
        </div>

        {/* Real-Time Graph */}
        <div className="bg-[#141414] border border-white/5 rounded-[2.5rem] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">Performance em Tempo Real</h3>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-[#22c55e] rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />
              ))}
            </div>
          </div>
          <div className="h-32 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
              <path d="M0,130 Q40,40 80,110 T160,80 T240,100 T320,50 T400,100" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" className="animate-graph-line" />
            </svg>
          </div>
        </div>

        {/* Sistema Russo Section */}
        <div className="bg-[#00ff41]/5 border border-[#00ff41]/20 p-6 rounded-[2rem] space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Skull size={40} /></div>
          <h3 className="text-[#00ff41] font-black text-lg uppercase italic tracking-tighter leading-none">
            SISTEMA RUSSO DE ANÚNCIOS
          </h3>
          <p className="text-xs text-zinc-400 font-medium leading-relaxed">
            Uma estrutura fora do mainstream. Pouco conhecida no Brasil. <span className="text-[#00ff41]">Não convence o algoritmo. Condiciona.</span>
          </p>
        </div>

        {/* O Mecanismo */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Layers size={16} className="text-[#00ff41]" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">O MECANISMO</h4>
          </div>
          <div className="grid gap-3">
            {[
              "CPC médio de R$0,15",
              "ROI de 10x ou mais",
              "Resultado com baixo orçamento",
              "Funciona até pra iniciante"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#141414] border border-white/5 p-4 rounded-2xl">
                <CheckCircle2 size={18} className="text-[#22c55e]" />
                <span className="text-xs font-bold uppercase tracking-tight text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparação */}
        <div className="bg-gradient-to-r from-red-500/5 to-transparent border border-white/5 p-6 rounded-[2rem] space-y-4">
          <h4 className="text-[11px] font-black uppercase text-zinc-500 tracking-widest">MÉTODO COMUM vs SISTEMA</h4>
          <div className="flex justify-between items-center text-xs font-black italic">
            <div className="text-red-500 uppercase">Método comum: <br/> paga caro.</div>
            <ArrowRight size={14} className="text-zinc-700" />
            <div className="text-[#00ff41] uppercase text-right">Sistema Russo: <br/> manda no leilão.</div>
          </div>
        </div>

        {/* Não é curso */}
        <div className="bg-[#141414] border-l-4 border-[#00ff41] p-6 space-y-2">
          <div className="flex items-center gap-2 text-[#00ff41]">
            <Zap size={18} fill="currentColor" />
            <h3 className="font-black text-xl uppercase tracking-tighter italic">NÃO É CURSO</h3>
          </div>
          <p className="text-sm text-zinc-100 font-black uppercase tracking-[0.15em] leading-tight">
            É SISTEMA. Estrutura. Ordem. Execução.
          </p>
        </div>

        {/* Pra quem é */}
        <div className="bg-red-950/20 border border-red-900/30 p-6 rounded-[2rem] space-y-3">
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">PRA QUEM É</span>
          </div>
          <p className="text-xs font-bold text-red-100 uppercase italic">
            Pouco dinheiro. Já perdeu com tráfego. <span className="text-white bg-red-600 px-1 ml-1">Curioso fica fora.</span>
          </p>
        </div>

        {/* Frase Final */}
        <div className="text-center space-y-2 py-4">
          <h4 className="text-[14px] font-black uppercase text-white italic">DECISÃO</h4>
          <p className="text-[10px] text-zinc-500 uppercase font-black leading-tight tracking-[0.2em]">
            Ou você treina o algoritmo. <br/> Ou continua pagando caro.
          </p>
        </div>
      </div>

      {/* Rodapé CTA */}
      <div className="shrink-0 p-6 pb-12 bg-black/90 backdrop-blur-3xl border-t border-white/5 z-50">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center px-2 py-2">
            <span className="text-red-600 line-through text-4xl font-black decoration-[4px] drop-shadow-[0_0_10px_rgba(220,38,38,0.3)] italic">R$ 97</span>
          </div>

          <button 
            onClick={handleFinalClick}
            className="w-full bg-[#22c55e] text-black py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(34,197,94,0.4)] active:scale-95 transition-all group"
          >
            ACESSAR O SISTEMA AGORA
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-4 opacity-30">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Ativação Segura via Cakto</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/10 rounded-full" />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes graph-line {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-graph-line {
          animation: graph-line 3s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OfferScreen;
