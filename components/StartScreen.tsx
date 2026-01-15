
import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-8 text-center relative overflow-hidden font-mono">
      {/* Background Decor - Grid e Scanlines para manter a estética */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
      </div>

      <div className="z-10 space-y-10 max-w-sm animate-slide-up">
        {/* Ícone de Status Ativo */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-green-500/20 blur-3xl animate-pulse" />
          <div className="relative bg-zinc-900 border border-green-500/30 p-5 rounded-[2rem] shadow-2xl">
            <ShieldCheck size={48} className="text-green-500" />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-white text-4xl font-black italic tracking-tighter uppercase leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            O problema nunca foi orçamento.
          </h1>
          <p className="text-zinc-400 text-xl leading-snug font-bold uppercase tracking-tight">
            O próximo passo revela uma estrutura de anúncio que funciona até com <span className="text-green-500">R$7</span> — apenas para quem decidir continuar.
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={onStart}
            className="w-full bg-green-500 text-black py-7 rounded-2xl font-black text-2xl uppercase tracking-tighter shadow-[0_10px_40px_rgba(34,197,94,0.4)] active:scale-95 transition-all animate-bounce flex items-center justify-center gap-3 group"
          >
            Continuar
            <Zap className="fill-current group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 opacity-30">
          <div className="h-px w-12 bg-green-500/50" />
          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] font-bold">
            Secure Handshake Protocol v2.5
          </p>
        </div>
      </div>

      {/* Rodapé Decorativo */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none opacity-10">
        <span className="text-[10px] tracking-[1em] text-white font-black uppercase">Operador Invisível</span>
      </div>
    </div>
  );
};

export default StartScreen;
