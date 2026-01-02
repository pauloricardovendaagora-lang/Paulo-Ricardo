
import React, { useRef, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Zap, Target, Lock } from 'lucide-react';

const HACK_SOUND_CLICK = 'https://assets.mixkit.co/active_storage/sfx/2556/2556-preview.mp3';

interface OfferScreenProps {
  onComplete: () => void;
}

const OfferScreen: React.FC<OfferScreenProps> = ({ onComplete }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inicializa o som para o clique (não toca automaticamente)
    audioRef.current = new Audio(HACK_SOUND_CLICK);
    audioRef.current.load();
  }, []);

  const handleFinalClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Áudio bloqueado", e));
    }
    
    // Vibração tátil para reforçar o clique
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    // Pequeno delay para o som ser processado antes da transição
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col justify-between pt-16 relative overflow-hidden">
      {/* Elementos decorativos de fundo - sem som */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
      
      <div className="space-y-8 animate-slide-up relative z-10">
        <div className="flex justify-center">
          <div className="bg-green-500/10 p-4 rounded-full border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <ShieldCheck className="w-16 h-16 text-green-500" />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase glitch-text">Você agora é Invisível</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            O acesso que você desbloqueou não é para todos. A partir deste momento, as regras mudaram.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all hover:border-green-500/30">
            <Zap className="text-yellow-500 w-8 h-8 shrink-0" />
            <div>
              <h4 className="font-bold">Algoritmo de Fuga</h4>
              <p className="text-sm text-gray-400">Identifique padrões antes do sistema fechar.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all hover:border-green-500/30">
            <Target className="text-red-500 w-8 h-8 shrink-0" />
            <div>
              <h4 className="font-bold">Mira de Precisão</h4>
              <p className="text-sm text-gray-400">Resultados focados onde o lucro é real.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition-all hover:border-green-500/30">
            <Lock className="text-blue-500 w-8 h-8 shrink-0" />
            <div>
              <h4 className="font-bold">Segurança Máxima</h4>
              <p className="text-sm text-gray-400">Proteja seus ganhos fora do radar.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-10 space-y-4 relative z-10">
        <div className="text-center">
          <span className="text-green-500 font-bold text-sm tracking-widest uppercase animate-pulse">Acesso Liberado</span>
        </div>
        
        <button 
          onClick={handleFinalClick}
          className="w-full bg-[#25D366] text-black py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(37,211,102,0.4)] animate-jump group"
        >
          OBTER MINHA PROVA AGORA
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-[10px] text-gray-500 uppercase tracking-tighter">
          Oferta exclusiva e temporária. Este site se autodestruirá em breve.
        </p>
      </div>

      {/* Camada de Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-0 bg-[length:100%_4px] opacity-20" />
    </div>
  );
};

export default OfferScreen;
