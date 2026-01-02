
import React from 'react';
import { ShieldAlert, Zap } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-8 text-center relative overflow-hidden font-mono">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]" />
      </div>

      <div className="z-10 space-y-8 max-w-xs animate-slide-up">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-green-500/20 blur-3xl animate-pulse" />
          <div className="relative bg-zinc-900 border border-green-500/30 p-6 rounded-[2.5rem] shadow-2xl">
            <ShieldAlert size={60} className="text-green-500 animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-white text-3xl font-black italic tracking-tighter uppercase leading-tight">
            Sessão Criptografada
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed font-bold uppercase tracking-widest">
            Acesso Restrito: Nível 01
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-green-500 text-black py-6 rounded-2xl font-black text-xl uppercase tracking-tighter shadow-[0_0_50px_rgba(34,197,94,0.4)] hover:scale-105 active:scale-95 transition-all animate-jump flex items-center justify-center gap-2"
        >
          <Zap className="fill-current" />
          Acessar Sistema
        </button>

        <p className="text-[10px] text-zinc-600 uppercase tracking-widest leading-loose">
          Ao entrar, você concorda em manter a invisibilidade do sistema.
        </p>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-[9px] text-zinc-800 uppercase tracking-[0.5em] font-bold">
        Secure Handshake Protocol v2.5
      </div>
    </div>
  );
};

export default StartScreen;
