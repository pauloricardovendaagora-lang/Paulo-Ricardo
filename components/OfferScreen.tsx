
import React, { useRef, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Zap, Target, Lock, ChevronDown } from 'lucide-react';

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
      {/* Camada Decorativa de Fundo */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-500/15 via-green-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-10" />
      </div>

      {/* Área Principal de Conteúdo (Rolável se necessário) */}
      <div className="flex-1 flex flex-col items-center p-6 pt-12 relative z-10 w-full max-w-sm mx-auto">
        
        {/* Cabeçalho de Sucesso */}
        <div className="animate-slide-up flex flex-col items-center text-center space-y-5">
          <div className="bg-green-500/10 p-5 rounded-full border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.25)] animate-pulse">
            <ShieldCheck className="w-12 h-12 text-green-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none glitch-text">Acesso Liberado</h1>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium italic px-4">
              A prova foi autenticada. A partir de agora, o sistema reconhece você como um operador privilegiado.
            </p>
          </div>
        </div>

        {/* Grade de Benefícios (Mais compacta) */}
        <div className="w-full mt-8 space-y-3 animate-slide-up">
          {[
            { icon: <Zap className="text-yellow-500 w-6 h-6" />, title: "Operação Furtiva", desc: "Anúncios invisíveis aos bots de bloqueio." },
            { icon: <Target className="text-red-500 w-6 h-6" />, title: "ROI Exponencial", desc: "Escala real sem o custo absurdo do mercado." },
            { icon: <Lock className="text-blue-500 w-6 h-6" />, title: "Blindagem de IP", desc: "Sua operação protegida por criptografia de ponta." }
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-900/60 backdrop-blur-2xl border border-white/5 p-4 rounded-3xl flex items-center gap-4 shadow-xl">
              <div className="shrink-0 bg-white/5 p-2 rounded-xl">{item.icon}</div>
              <div className="flex-1">
                <h4 className="font-black text-[13px] uppercase italic tracking-tight">{item.title}</h4>
                <p className="text-[11px] text-zinc-500 leading-tight font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Área de CTA - Garantido Visível */}
        <div className="w-full mt-10 mb-20 space-y-6 animate-slide-up flex flex-col items-center">
          <div className="text-center flex flex-col items-center gap-2">
            <span className="text-green-500 font-black text-[10px] tracking-[0.4em] uppercase animate-pulse">Token de Acesso Pronto</span>
            <ChevronDown size={18} className="text-zinc-600 animate-bounce" />
          </div>
          
          <button 
            onClick={handleFinalClick}
            className="w-full bg-[#25D366] text-black py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_20px_50px_rgba(37,211,102,0.45)] group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              OBTER MINHA PROVA
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <div className="space-y-4 text-center">
            <p className="text-[9px] text-zinc-600 uppercase tracking-tighter font-bold opacity-60 px-4 leading-relaxed">
              Importante: Este link é rastreado por IP. <br/>Não feche esta página antes de concluir a transferência.
            </p>
            <div className="h-1 w-20 bg-white/10 rounded-full mx-auto" />
          </div>
        </div>
      </div>

      {/* Home Indicator iOS Style Fixo */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full pointer-events-none" />
      
      <style>{`
        .glitch-text { text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9; }
      `}</style>
    </div>
  );
};

export default OfferScreen;
