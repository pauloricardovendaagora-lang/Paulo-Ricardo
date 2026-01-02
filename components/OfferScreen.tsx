
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
    <div className="flex flex-col min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth bg-black pb-24">
        {/* Decoração de Fundo */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
        
        {/* Conteúdo Principal */}
        <div className="flex flex-col p-6 pt-16 space-y-12 animate-slide-up relative z-10">
          <div className="flex justify-center">
            <div className="bg-green-500/10 p-6 rounded-full border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)] animate-pulse">
              <ShieldCheck className="w-16 h-16 text-green-500" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none glitch-text">Você agora é Invisível</h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-[95%] mx-auto font-medium italic">
              O acesso foi interceptado com sucesso. A partir deste momento, você opera fora do sistema comum.
            </p>
          </div>

          <div className="grid gap-5">
            {[
              { icon: <Zap className="text-yellow-500 w-8 h-8" />, title: "Algoritmo de Fuga", desc: "Identifique padrões antes que o sistema principal detecte sua operação." },
              { icon: <Target className="text-red-500 w-8 h-8" />, title: "Mira de Precisão", desc: "Resultados diretos em ROI e escala sem bloqueios comuns." },
              { icon: <Lock className="text-blue-500 w-8 h-8" />, title: "Segurança de Dados", desc: "Criptografia total em cada anúncio e campanha rodada." }
            ].map((item, idx) => (
              <div key={idx} className="bg-zinc-900/60 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] flex items-center gap-5 transition-all active:bg-zinc-800 shadow-2xl">
                <div className="shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-black text-base uppercase italic tracking-tight">{item.title}</h4>
                  <p className="text-[13px] text-zinc-500 leading-tight font-medium italic">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Seção de Botão (Dentro do Scroll para garantir visibilidade) */}
          <div className="pt-8 space-y-8 flex flex-col items-center">
            <div className="text-center">
              <span className="text-green-500 font-black text-[11px] tracking-[0.4em] uppercase animate-pulse">Acesso Total Concedido</span>
            </div>
            
            <button 
              onClick={handleFinalClick}
              className="w-full bg-[#25D366] text-black py-7 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-[0_25px_60px_rgba(37,211,102,0.5)] group animate-bounce"
            >
              OBTER MINHA PROVA
              <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="space-y-4 pb-12">
                <p className="text-center text-[10px] text-zinc-600 uppercase tracking-tighter font-bold opacity-60 px-6 leading-relaxed">
                  Aviso de Segurança: Este link é criptografado e exclusivo para o seu endereço IP. O compartilhamento causará a suspensão imediata do token.
                </p>
                <div className="h-1 w-32 bg-white/10 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Camada fixa de scanlines para ambientação */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] z-0 bg-[length:100%_4px] opacity-10" />
    </div>
  );
};

export default OfferScreen;
