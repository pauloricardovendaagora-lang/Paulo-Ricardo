
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Phone, EyeOff, AlertTriangle, Lock, ShieldAlert, Zap } from 'lucide-react';

interface InvisibleSystemRevealProps {
  onComplete: () => void;
}

const InvisibleSystemReveal: React.FC<InvisibleSystemRevealProps> = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const fullText = `hoje eu resolvi te contar como burlei o sistema, preciso te contar como gastar pouco e vender muito eu chamo isso de sistema invisivel

voce precisa entender que quem vende mais nao é quem gasta mais e sim quem fica invisivel diante do algoritimo eu disse algoritimo

vou te mostrar como eu fico invisivel para o sistema sem que ele consiga ler minha estrategia e o confundo para que ele seja obrigado a me entregar custos baixissimos

roi de 10X ou mais, esses gurus te ensinam errado por que eles nao querem que você entenda que não é o só quem tem muito orçamento que consegue performar e ter resultado

você que esta limitado e ate mesmo quebrado tambem pode ter resultado

essa mensagem vai sair do ar logo estou correndo risco mas eu nao estava mais conseguindo esconde isso

vou te ligar agora para explicar melhor,mas você tem que me prometer que nao vai printar essa mensagem nem compartilhar com ninguem por que pretendo continuar invisivel`;

  const logs = [
    "LOG: Iniciando protocolo de sombra...",
    "LOG: Bypass de firewall concluído",
    "LOG: Criptografia assimétrica ativa",
    "LOG: TRANSMISSÃO DE DADOS CRÍTICOS..."
  ];

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logs.length) {
        setSystemLogs(prev => [...prev, logs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        startTyping();
      }
    }, 500);

    return () => clearInterval(logInterval);
  }, []);

  const startTyping = () => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.substring(0, index));
      index++;
      
      if (Math.random() > 0.97) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 50);
      }

      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 1500);
      }
    }, 25);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayText, systemLogs]);

  return (
    <div className="h-screen bg-black text-[#00ff41] font-mono flex flex-col p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#00ff41 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-10" />

      {/* Header */}
      <div className="shrink-0 flex items-center justify-between mb-4 z-20 border-b border-[#00ff41]/20 pb-4 pt-4">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Fluxo_Invisivel_v2.5</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-0.5 bg-red-950/20 border border-red-900/30 rounded">
           <div className="w-1 h-1 bg-red-600 rounded-full animate-ping" />
           <span className="text-[7px] font-bold text-red-500 uppercase tracking-widest">Sinal Hostil</span>
        </div>
      </div>

      {/* Mini Logs */}
      <div className="shrink-0 space-y-0.5 mb-4 opacity-30 text-[8px] uppercase">
        {systemLogs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-zinc-600">[{new Date().toLocaleTimeString([], {second:'2-digit'})}s]</span>
            <span>{log}</span>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto z-20 custom-scrollbar relative pr-1">
        <div className={`space-y-6 transition-all duration-75 ${isGlitching ? 'translate-x-1 opacity-60 filter blur-[1px]' : 'opacity-100'}`}>
          <div className="bg-[#00ff41]/5 border border-[#00ff41]/10 p-5 rounded-2xl shadow-[0_0_50px_rgba(0,255,65,0.02)]">
             <div className="flex items-center gap-2 mb-4 opacity-30">
               <EyeOff size={12} />
               <span className="text-[8px] uppercase font-black tracking-widest">Decrypting_Message...</span>
             </div>
             
             <p className="text-[14px] leading-relaxed font-bold whitespace-pre-wrap italic tracking-tight">
               {displayText}
               <span className="w-2 h-4 bg-[#00ff41] inline-block ml-1 animate-pulse" />
             </p>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-3 bg-red-950/20 border border-red-900/20 rounded-xl">
            <AlertTriangle size={16} className="text-red-500 shrink-0" />
            <p className="text-[9px] text-red-500 font-black uppercase tracking-tighter leading-none">
              Aviso: Esta sessão expira em segundos. Não capture a tela sob risco de bloqueio de IP.
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className={`shrink-0 pt-6 pb-12 z-30 transition-all duration-1000 transform ${showButton ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="relative">
          <div className="absolute -inset-1 bg-[#00ff41] rounded-2xl blur opacity-20 animate-pulse" />
          <button 
            onClick={onComplete}
            className="w-full bg-[#00ff41] text-black py-6 rounded-2xl font-black text-xl shadow-[0_10px_40px_rgba(0,255,65,0.4)] flex items-center justify-center gap-3 active:scale-95 transition-all animate-bounce"
          >
            <Phone className="fill-current" size={24} />
            ACEITAR LIGAÇÃO AGORA
          </button>
        </div>
        
        <div className="mt-5 flex flex-col items-center gap-1 opacity-20">
           <div className="flex items-center gap-2">
             <Lock size={10} />
             <span className="text-[8px] uppercase font-black tracking-[0.2em]">Secure_Link_Established</span>
           </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default InvisibleSystemReveal;
