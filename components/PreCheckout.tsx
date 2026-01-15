
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
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Container de Rolagem Independente */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 custom-scrollbar scroll-smooth"
      >
        <div className="max-w-md mx-auto px-7 pt-16 pb-20 space-y-10">
          
          {/* Header de Alerta */}
          <div className="flex flex-col items-center text-center space-y-4 animate-slide-up">
            <div className="bg-red-500/10 p-5 rounded-full border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <ShieldAlert size={40} className="text-red-500" />
            </div>
            <h2 className="text-white text-3xl font-black uppercase italic tracking-tighter leading-none">
              Você não deveria ter <br/> chegado até aqui. <br/>
              <span className="text-red-500">Mas chegou.</span>
            </h2>
            <div className="flex flex-col items-center gap-1 opacity-40">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Role para ler</span>
              <ChevronDown size={14} className="animate-bounce" />
            </div>
          </div>

          {/* Manifesto - Texto de Tamanho Médio e Legível */}
          <div className="space-y-8 text-zinc-300 text-lg md:text-xl font-medium leading-relaxed">
            <p className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Então vou ser direto antes de continuar.
            </p>
            
            <p className="text-white font-bold border-l-4 border-red-500 pl-5 bg-red-500/5 py-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Se você é curioso, consome conteúdo e nunca executa, pode ir embora agora.
            </p>

            <p className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Esse caminho não foi feito pra você — e isso não faz diferença pra mim.
            </p>

            <p className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Agora, se você está no mercado digital, travado pela falta de orçamento e ainda não realizou sua primeira venda, preste atenção.
            </p>

            <p className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              A partir da próxima mensagem, o funil começa. Você será conduzido por uma experiência.
            </p>

            <p className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              Você não vai entender tudo no início — só no final.
            </p>

            <div className="bg-[#00ff41]/5 border border-[#00ff41]/20 p-6 rounded-3xl space-y-4 animate-slide-up" style={{ animationDelay: '0.7s' }}>
              <p className="text-[#00ff41] font-black uppercase tracking-tight italic">
                Acesso Restrito:
              </p>
              <p className="text-white text-lg leading-snug">
                E só se você realmente for quem eu procuro, vai receber acesso a uma estrutura de anúncio que funciona com apenas <span className="text-[#00ff41] font-black">R$7</span> de orçamento e ainda assim gera resultado.
              </p>
            </div>

            <p>Não vou te entregar nada de graça.</p>

            <div className="flex items-center gap-4 py-2">
               <div className="h-px flex-1 bg-zinc-800" />
               <p className="text-white text-2xl font-black bg-zinc-900 px-4 py-2 rounded-xl shadow-xl border border-white/5">
                 R$ 67
               </p>
               <div className="h-px flex-1 bg-zinc-800" />
            </div>
            
            <p className="text-center italic opacity-60">
              ...para mostrar uma curva no sistema que muda completamente o jogo.
            </p>

            <p className="text-center font-black uppercase tracking-widest text-zinc-500 text-sm">
              Não é uma oferta. É um filtro.
            </p>

            <p>Quando a estrutura está correta, o orçamento deixa de ser desculpa.</p>

            <p>Se isso não faz sentido pra você, pare aqui, volte pra casa e continue tentando encontrar uma solução.</p>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4">
              <p className="text-white font-bold uppercase tracking-tight text-sm">
                Mas se decidir seguir, entenda uma coisa:
              </p>
              <p className="italic text-zinc-400 border-l-2 border-zinc-700 pl-4">
                "Você não está comprando teoria — está entrando em um processo que separa quem executa de quem apenas observa."
              </p>
            </div>

            <p>Você pode sair agora e continuar exatamente onde está. Ou entre e mude definitivamente o seu jogo.</p>

            <div className="text-center space-y-2 py-6 border-y border-white/5">
              <p className="text-sm uppercase tracking-[0.3em] opacity-40 font-black">
                A sua decisão não muda a minha vida.
              </p>
              <p className="text-lg text-white font-black uppercase italic tracking-tighter">
                Mas pode mudar a sua.
              </p>
            </div>
          </div>

          {/* Botão de Ação Final "Vivo" */}
          <div className="pt-4 pb-10">
            <button
              onClick={onContinue}
              className="w-full bg-[#00ff41] text-black py-7 rounded-[2rem] font-black text-xl uppercase tracking-tighter shadow-[0_15px_50px_rgba(0,255,65,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden animate-pulse-alive"
            >
              {/* Efeito de brilho "shimmer" que corre pelo botão */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer-live pointer-events-none" />
              
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              
              <Zap className="relative z-10 w-6 h-6 fill-current animate-bounce" />
              <span className="relative z-10">EU QUERO A MENSAGEM</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <p className="text-center text-[10px] mt-6 opacity-30 uppercase tracking-[0.4em] font-black leading-relaxed">
              Clique no botão acima e eu lhe enviarei uma mensagem agora.
            </p>
          </div>
        </div>
      </div>

      {/* Home Indicator iOS */}
      <div className="h-6 shrink-0 bg-black flex justify-center items-center">
        <div className="w-32 h-1 bg-white/20 rounded-full" />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        
        @keyframes pulse-alive {
          0%, 100% { transform: scale(1); box-shadow: 0 15px 50px rgba(0,255,65,0.4); }
          50% { transform: scale(1.02); box-shadow: 0 20px 70px rgba(0,255,65,0.6); }
        }
        .animate-pulse-alive {
          animation: pulse-alive 2s ease-in-out infinite;
        }

        @keyframes shimmer-live {
          0% { transform: translateX(-100%) skewX(-15deg); }
          25%, 100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shimmer-live {
          animation: shimmer-live 3s infinite;
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PreCheckout;
