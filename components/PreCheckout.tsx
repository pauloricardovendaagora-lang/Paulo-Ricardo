
import React, { useEffect, useRef } from 'react';
import { ArrowRight, ShieldAlert, ChevronDown, Zap } from 'lucide-react';

interface PreCheckoutProps {
  onContinue: () => void;
}

const PreCheckout: React.FC<PreCheckoutProps> = ({ onContinue }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="h-[100dvh] bg-[#0a0a0a] flex flex-col font-sans relative">
      {/* Background Decorativo Fixo */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Container de Rolagem Independente */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 custom-scrollbar scroll-smooth"
      >
        <div className="max-w-md mx-auto px-7 pt-16 pb-24 space-y-12">
          
          {/* Header de Alerta */}
          <div className="flex flex-col items-center text-center space-y-6 animate-slide-up">
            <div className="bg-red-500/10 p-6 rounded-full border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <ShieldAlert size={48} className="text-red-500" />
            </div>
            <h2 className="text-white text-4xl font-black uppercase italic tracking-tighter leading-[0.9]">
              Você não deveria ter <br/> chegado até aqui. <br/>
              <span className="text-red-500">Mas chegou.</span>
            </h2>
            <div className="flex flex-col items-center gap-2 opacity-50">
              <span className="text-[12px] font-black uppercase tracking-[0.4em]">Role para ler o filtro</span>
              <ChevronDown size={18} className="animate-bounce" />
            </div>
          </div>

          {/* Manifesto - Texto com Legibilidade Aprimorada */}
          <div className="space-y-10 text-zinc-300 text-xl md:text-2xl font-medium leading-relaxed">
            <p className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Então vou ser direto antes de continuar.
            </p>
            
            <p className="text-white font-black border-l-4 border-red-500 pl-6 bg-red-500/10 py-5 rounded-r-2xl animate-slide-up leading-tight" style={{ animationDelay: '0.2s' }}>
              Se você é curioso, consome conteúdo e nunca executa, pode ir embora agora.
            </p>

            <p className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Esse caminho não foi feito pra você — e isso não faz diferença pra mim.
            </p>

            <p className="text-white font-bold animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Agora, se você está no mercado digital, travado pela falta de orçamento e quer descobrir como transformar baixo orçamento em resultado, preste atenção.
            </p>

            <p className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              A partir da próxima mensagem, o funil começa. Você será conduzido por uma experiência.
            </p>

            <p className="italic text-zinc-400 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              Você não vai entender tudo no início — só no final.
            </p>

            <div className="bg-[#00ff41]/10 border border-[#00ff41]/30 p-8 rounded-[2.5rem] space-y-6 animate-slide-up shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.7s' }}>
              <p className="text-[#00ff41] font-black text-xs uppercase tracking-[0.3em] italic">
                Acesso Restrito:
              </p>
              <p className="text-white text-2xl font-bold leading-tight tracking-tight">
                E só se você realmente for quem eu procuro, vai receber acesso a uma estrutura de anúncio que funciona com apenas <span className="text-[#00ff41] font-black underline decoration-2 underline-offset-4">R$7</span> de orçamento e ainda assim gera resultado.
              </p>
            </div>

            <p className="text-center font-bold">Não vou te entregar nada de graça.</p>

            <div className="flex flex-col items-center gap-3 py-4">
               <div className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.5em]">Taxa de Filtro</div>
               <div className="flex flex-col items-center bg-zinc-900 px-12 py-7 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 italic tracking-tighter text-center">
                 <span className="text-zinc-600 line-through text-2xl font-black decoration-red-500/50 decoration-2 mb-1">R$ 197</span>
                 <span className="text-white text-6xl font-black leading-none">R$ 29,90</span>
               </div>
            </div>
            
            <p className="text-center italic opacity-70 text-lg">
              ...para mostrar uma curva no sistema que muda completamente o jogo.
            </p>

            <p className="text-center font-black uppercase tracking-[0.2em] text-zinc-500 text-sm bg-white/5 py-2 rounded-full">
              Não é uma oferta. É um filtro.
            </p>

            <p className="text-white font-bold">Quando a estrutura está correta, o orçamento deixa de ser desculpa.</p>

            <p>Se isso não faz sentido pra você, pare aqui, volte pra casa e continue tentando encontrar uma solução.</p>

            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] space-y-6 shadow-xl">
              <p className="text-white font-black uppercase tracking-tight text-sm flex items-center gap-2">
                <Zap size={16} className="text-[#00ff41] fill-current" />
                AVISO DE EXECUÇÃO
              </p>
              <p className="italic text-zinc-200 border-l-4 border-zinc-700 pl-6 text-2xl font-medium leading-snug">
                "Você não está comprando teoria — está entrando em um processo que separa quem executa de quem apenas observa."
              </p>
            </div>

            <p className="text-white font-bold">Você pode sair agora e continuar exatamente onde está. Ou entre e mude definitivamente o seu jogo.</p>

            <div className="text-center space-y-4 py-10 border-y border-white/10">
              <p className="text-xs uppercase tracking-[0.5em] opacity-40 font-black">
                A sua decisão não muda a minha vida.
              </p>
              <p className="text-3xl text-white font-black uppercase italic tracking-tighter leading-none">
                Mas pode mudar a sua.
              </p>
            </div>
          </div>

          {/* Botão de Ação Final "Vivo" e Gigante */}
          <div className="pt-6 pb-12">
            <button
              onClick={onContinue}
              className="w-full bg-[#00ff41] text-black py-8 rounded-[2.5rem] font-black text-2xl uppercase tracking-tighter shadow-[0_20px_60px_rgba(0,255,65,0.4)] active:scale-95 transition-all flex flex-col items-center justify-center gap-1 group relative overflow-hidden animate-pulse-alive"
            >
              {/* Efeito de brilho "shimmer" */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-shimmer-live pointer-events-none" />
              
              <div className="flex items-center gap-4 relative z-10">
                <span>EU QUERO A MENSAGEM</span>
                <ArrowRight className="group-hover:translate-x-3 transition-transform duration-500" size={32} />
              </div>
              <span className="text-[10px] opacity-70 font-black tracking-widest relative z-10">LIBERAR ACESSO IMEDIATO</span>
            </button>
            <p className="text-center text-[11px] mt-8 opacity-40 uppercase tracking-[0.5em] font-black leading-relaxed">
              Clique no botão acima e eu lhe enviarei uma mensagem agora.
            </p>
          </div>
        </div>
      </div>

      {/* Home Indicator iOS */}
      <div className="h-8 shrink-0 bg-black flex justify-center items-center border-t border-white/5">
        <div className="w-32 h-1.5 bg-white/20 rounded-full" />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
        
        @keyframes pulse-alive {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 60px rgba(0,255,65,0.4); }
          50% { transform: scale(1.03); box-shadow: 0 30px 80px rgba(0,255,65,0.6); }
        }
        .animate-pulse-alive {
          animation: pulse-alive 2.5s ease-in-out infinite;
        }

        @keyframes shimmer-live {
          0% { transform: translateX(-100%) skewX(-15deg); }
          30%, 100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shimmer-live {
          animation: shimmer-live 4s infinite;
        }

        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PreCheckout;
