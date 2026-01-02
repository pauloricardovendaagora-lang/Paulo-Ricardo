
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
    <div className="min-h-[100dvh] bg-black text-white flex flex-col relative overflow-y-auto pb-10">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
      
      {/* Content Area */}
      <div className="flex-1 flex flex-col p-6 pt-12 space-y-8 animate-slide-up relative z-10">
        <div className="flex justify-center">
          <div className="bg-green-500/10 p-4 rounded-full border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <ShieldCheck className="w-14 h-14 text-green-500" />
          </div>
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none glitch-text">Você agora é Invisível</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            O acesso que você desbloqueou não é para todos. A partir deste momento, as regras mudaram.
          </p>
        </div>

        <div className="grid gap-3">
          {[
            { icon: <Zap className="text-yellow-500 w-7 h-7" />, title: "Algoritmo de Fuga", desc: "Identifique padrões antes do fechamento." },
            { icon: <Target className="text-red-500 w-7 h-7" />, title: "Mira de Precisão", desc: "Resultados focados em ROI real." },
            { icon: <Lock className="text-blue-500 w-7 h-7" />, title: "Segurança Máxima", desc: "Proteja seus ganhos fora do radar." }
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-4 rounded-2xl flex items-center gap-4 transition-all active:bg-zinc-800">
              <div className="shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-black text-sm uppercase italic tracking-tight">{item.title}</h4>
                <p className="text-[12px] text-zinc-500 leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Section (Forçado no final mas dentro da rolagem) */}
      <div className="p-6 pt-4 space-y-5 relative z-10">
        <div className="text-center">
          <span className="text-green-500 font-black text-[10px] tracking-[0.3em] uppercase animate-pulse">Acesso Liberado com Sucesso</span>
        </div>
        
        <button 
          onClick={handleFinalClick}
          className="w-full bg-[#25D366] text-black py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-[0_15px_40px_rgba(37,211,102,0.4)] group"
        >
          OBTER MINHA PROVA AGORA
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-[10px] text-zinc-600 uppercase tracking-tighter font-bold">
          Oferta temporária. IP de acesso registrado em log de segurança.
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] z-0 bg-[length:100%_4px] opacity-20" />
    </div>
  );
};

export default OfferScreen;
