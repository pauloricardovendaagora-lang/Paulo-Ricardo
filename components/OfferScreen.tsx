
import React, { useRef, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Zap, Target, Lock } from 'lucide-react';

const HACK_SOUND_CLICK = 'https://assets.mixkit.co/active_storage/sfx/2556/2556-preview.mp3';

interface OfferScreenProps {
  onComplete: () => void;
}

const OfferScreen: React.FC<OfferScreenProps> = ({ onComplete }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(HACK_SOUND_CLICK);
    audioRef.current.load();
  }, []);

  const handleFinalClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    if ('vibrate' in navigator) navigator.vibrate(50);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div className="min-h-[100dvh] bg-black text-white flex flex-col relative overflow-y-auto overflow-x-hidden">
      {/* Decoração de Fundo */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
      
      {/* Área de Conteúdo */}
      <div className="flex-1 flex flex-col p-6 pt-16 space-y-10 animate-slide-up relative z-10">
        <div className="flex justify-center">
          <div className="bg-green-500/10 p-5 rounded-full border border-green-500/40 shadow-[0_0_40px_rgba(34,197,94,0.25)]">
            <ShieldCheck className="w-16 h-16 text-green-500" />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none glitch-text">Você agora é Invisível</h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-[90%] mx-auto">
            O acesso que você desbloqueou é exclusivo. A partir deste momento, as regras mudaram para você.
          </p>
        </div>

        <div className="grid gap-4">
          {[
            { icon: <Zap className="text-yellow-500 w-8 h-8" />, title: "Algoritmo de Fuga", desc: "Identifique padrões antes do fechamento." },
            { icon: <Target className="text-red-500 w-8 h-8" />, title: "Mira de Precisão", desc: "Resultados focados em ROI real e imediato." },
            { icon: <Lock className="text-blue-500 w-8 h-8" />, title: "Segurança Máxima", desc: "Proteja seus ganhos fora do radar comum." }
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] flex items-center gap-5 transition-all active:bg-zinc-800">
              <div className="shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-black text-base uppercase italic tracking-tight">{item.title}</h4>
                <p className="text-[13px] text-zinc-500 leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Ação (Garante que o botão apareça com rolagem) */}
      <div className="p-6 pt-10 pb-16 space-y-6 relative z-10">
        <div className="text-center">
          <span className="text-green-500 font-black text-[11px] tracking-[0.3em] uppercase animate-pulse">Protocolo de Acesso Finalizado</span>
        </div>
        
        <button 
          onClick={handleFinalClick}
          className="w-full bg-[#25D366] text-black py-7 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-[0_20px_50px_rgba(37,211,102,0.4)] group"
        >
          OBTER MINHA PROVA
          <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-[10px] text-zinc-600 uppercase tracking-tighter font-bold opacity-60">
          Sessão segura. Link restrito ao seu endereço IP.
        </p>
      </div>

      {/* Efeito de Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] z-0 bg-[length:100%_4px] opacity-20" />
    </div>
  );
};

export default OfferScreen;
