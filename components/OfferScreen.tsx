
import React, { useRef, useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Target, 
  Lock, 
  TrendingDown, 
  DollarSign, 
  Rocket, 
  AlertTriangle, 
  Cpu,
  EyeOff,
  TrendingUp,
  Activity,
  CheckCircle2
} from 'lucide-react';

const HACK_SOUND_CLICK = 'https://assets.mixkit.co/active_storage/sfx/2556/2556-preview.mp3';

interface OfferScreenProps {
  onComplete: () => void;
}

const OfferScreen: React.FC<OfferScreenProps> = ({ onComplete }) => {
  const [decrypted, setDecrypted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(HACK_SOUND_CLICK);
    audioRef.current.load();
    
    const timer = setTimeout(() => setDecrypted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleFinalClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    if ('vibrate' in navigator) navigator.vibrate(50);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white relative font-mono overflow-hidden">
      {/* Camada de Fundo Fixa */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Barra de Status de Operação Fixa */}
      <div className="shrink-0 bg-zinc-900/90 backdrop-blur-xl border-b border-[#00ff41]/20 p-4 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse shadow-[0_0_8px_#00ff41]" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#00ff41]">Fase de Revelação Ativa</span>
        </div>
        <Lock size={14} className="text-zinc-500" />
      </div>

      {/* Conteúdo Rolável Principal */}
      <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar scroll-smooth">
        <div className="max-w-[430px] mx-auto pb-32">
          
          {/* 1. HEADLINE E CONSCIENTIZAÇÃO */}
          <div className="p-8 text-center space-y-6">
            <h1 className="text-4xl font-black italic uppercase leading-[0.85] tracking-tighter glitch-text">
              A Grande Falha <br/>
              <span className="text-[#00ff41]">Foi Exposta.</span>
            </h1>

            <div className={`space-y-4 transition-all duration-1000 transform ${decrypted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="bg-[#00ff41]/5 border border-[#00ff41]/20 p-5 rounded-3xl">
                    <p className="text-zinc-400 text-[12px] leading-relaxed font-bold uppercase tracking-tight">
                        O sistema quer que você acredite que precisa de rios de dinheiro para vender.
                    </p>
                    <p className="text-white text-[13px] font-black uppercase mt-3 italic">
                        "Eles mentiram para manter você no leilão caro."
                    </p>
                </div>
            </div>
          </div>

          {/* 2. O COMPARATIVO (TABELA GAMIFICADA) */}
          <div className="px-6 space-y-6">
            {/* CARD PERDEDORES */}
            <div className="bg-zinc-900/60 border border-red-500/20 rounded-[2.5rem] p-6 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={120} className="text-red-500" />
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-red-500/10 rounded-lg">
                    <AlertTriangle size={14} className="text-red-500" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  O Jogo dos Perdedores <span className="text-red-500">(Tráfego Comum)</span>
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Público Alvo</span>
                    <span className="text-[11px] font-black text-white">Super-Competitivo</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Custo p/ Clique</span>
                    <span className="text-[11px] font-black text-red-500">R$ 1,50 — R$ 4,00</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Orçamento Min.</span>
                    <span className="text-[11px] font-black text-white">ALTO RISCO</span>
                </div>
              </div>
            </div>

            {/* DIVISOR VS */}
            <div className="flex justify-center -my-4 relative z-20">
                <div className="bg-[#00ff41] text-black px-5 py-1.5 rounded-full font-black text-[10px] uppercase tracking-tighter shadow-[0_0_20px_#00ff41]">
                    V.S.
                </div>
            </div>

            {/* CARD OPERADOR */}
            <div className="bg-zinc-900/60 border border-[#00ff41]/30 rounded-[2.5rem] p-6 relative overflow-hidden shadow-[0_0_40px_rgba(0,255,65,0.05)] group">
              <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <EyeOff size={120} className="text-[#00ff41]" />
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-[#00ff41]/10 rounded-lg">
                    <Zap size={14} fill="currentColor" className="text-[#00ff41]" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#00ff41]">
                  O Jogo do Operador <span className="text-white">(Tráfego Invisível)</span>
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#00ff41]/10 pb-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Público Alvo</span>
                    <span className="text-[11px] font-black text-[#00ff41]">Bolsões Furtivos</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#00ff41]/10 pb-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Custo p/ Clique</span>
                    <span className="text-[11px] font-black text-[#00ff41]">R$ 0,05 — R$ 0,15</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Orçamento Min.</span>
                    <span className="text-[11px] font-black text-[#00ff41]">R$ 6,00 / DIA</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. A LÓGICA DO MÉTODO (BAIXO ORÇAMENTO) */}
          <div className="px-8 py-12 space-y-10">
            <div className="space-y-2">
                <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">O Segredo dos Centavos</h2>
                <div className="h-0.5 w-12 bg-[#00ff41]" />
            </div>

            <div className="grid gap-8">
                <div className="flex gap-4">
                    <div className="shrink-0 bg-zinc-900 p-3 rounded-2xl border border-white/5 h-fit shadow-lg">
                        <Cpu className="text-[#00ff41]" size={20} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-[11px] font-black uppercase text-white tracking-widest">Anúncios que vendem sozinhos</h4>
                        <p className="text-[10px] text-zinc-500 leading-relaxed font-bold uppercase italic">
                            Você vai aprender a criar criativos que o algoritmo entende como "conteúdo orgânico", pagando o preço mais baixo possível por impressão.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="shrink-0 bg-zinc-900 p-3 rounded-2xl border border-white/5 h-fit shadow-lg">
                        <DollarSign className="text-[#00ff41]" size={20} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-[11px] font-black uppercase text-white tracking-widest">A escala do baixo orçamento</h4>
                        <p className="text-[10px] text-zinc-500 leading-relaxed font-bold uppercase italic">
                            R$ 6,00 por dia é o que você precisa para começar. No tráfego invisível, 6 reais compram o que 60 reais compram no tráfego comum. É pura matemática de arbitragem.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="shrink-0 bg-zinc-900 p-3 rounded-2xl border border-white/5 h-fit shadow-lg">
                        <Rocket className="text-[#00ff41]" size={20} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-[11px] font-black uppercase text-white tracking-widest">ROI Real em 24h</h4>
                        <p className="text-[10px] text-zinc-500 leading-relaxed font-bold uppercase italic">
                            Quando o seu custo é de centavos, qualquer venda vira lucro líquido imediato. O sistema foi desenhado para quem quer sair da teoria e ter dinheiro no bolso hoje.
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* 4. FECHAMENTO E CTA */}
          <div className="px-6 pb-20 space-y-6">
            <div className="bg-zinc-900/80 p-8 rounded-[3rem] border border-[#00ff41]/20 text-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="space-y-2">
                    <div className="flex justify-center items-center gap-2 text-[#00ff41] opacity-50">
                        <Lock size={12} />
                        <span className="text-[8px] font-black uppercase tracking-[0.4em]">Acesso Único Reservado</span>
                    </div>
                    <h3 className="text-white text-lg font-black uppercase tracking-tighter">Ative seu Protocolo</h3>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <span className="text-zinc-600 line-through text-base font-bold italic">R$ 197</span>
                    <div className="relative">
                        <span className="text-5xl font-black text-white italic tracking-tighter">R$ 67</span>
                        <div className="absolute -top-4 -right-8 bg-[#00ff41] text-black text-[8px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_#00ff41]">OFF</div>
                    </div>
                </div>

                <button 
                  onClick={handleFinalClick}
                  className="w-full bg-[#00ff41] text-black py-7 rounded-[2rem] font-black text-xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-[0_0_50px_rgba(0,255,65,0.3)] uppercase tracking-tighter group overflow-hidden"
                >
                  <span className="flex items-center gap-2">
                    LIBERAR ACESSO AGORA
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[8px] opacity-60">Sessão Segura v.2.5</span>
                </button>

                <div className="flex items-center justify-center gap-4 opacity-40">
                    <ShieldCheck size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Garantia Incondicional de 7 Dias</span>
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* iOS Style Home Indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full pointer-events-none z-50" />
      
      <style>{`
        .glitch-text { text-shadow: 2px 0 #00fff9, -2px 0 #ff00c1; }
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default OfferScreen;
