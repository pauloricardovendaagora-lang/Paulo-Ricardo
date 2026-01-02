
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
      audioRef.current.play().catch(e => console.log("Áudio bloqueado", e));
    }
    if ('vibrate' in navigator) navigator.vibrate(50);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col relative overflow-y-auto">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
      
      <div className="space-y-6 animate-slide-up relative z-10 flex-1 flex flex-col pt-10 pb-6">
        <div className="flex justify-center">
          <div className="bg-green-500/10 p-3 rounded-full border border-green-500/50">
            <ShieldCheck className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase glitch-text">Você agora é Invisível</h1>
          <p className="text-gray-400 text-base leading-relaxed">
            O acesso que você desbloqueou não é para todos. A partir deste momento, as regras mudaram.
          </p>
        </div>

        <div className="grid gap-3">
          {[
            { icon: <Zap className="text-yellow-500 w-6 h-6" />, title: "Algoritmo de Fuga", desc: "Identifique padrões antes do fechamento." },
            { icon: <Target className="text-red-500 w-6 h-6" />, title: "Mira de Precisão", desc: "Resultados focados em ROI real." },
            { icon: <Lock className="text-blue-500 w-6 h-6" />, title: "Segurança Máxima", desc: "Proteja ganhos fora do radar." }
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex items-center gap-4">
              <div className="shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-bold text-sm">{item.title}</h4>
                <p className="text-[11px] text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-10 space-y-4 relative z-10 mt-4">
        <div className="text-center">
          <span className="text-green-500 font-bold text-[10px] tracking-widest uppercase animate-pulse">Acesso Liberado</span>
        </div>
        
        <button 
          onClick={handleFinalClick}
          className="w-full bg-[#25D366] text-black py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] group"
        >
          OBTER MINHA PROVA AGORA
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-[9px] text-gray-600 uppercase tracking-tighter">
          Oferta exclusiva e temporária. Este site se autodestruirá em breve.
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] z-0 bg-[length:100%_4px] opacity-20" />
    </div>
  );
};

export default OfferScreen;
