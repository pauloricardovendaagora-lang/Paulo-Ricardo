
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Lock, ShieldCheck, Cpu, Signal, Wifi, BatteryCharging, Copy, Check, Loader2, ArrowRight } from 'lucide-react';

const HACK_SOUND_COPY = 'https://assets.mixkit.co/active_storage/sfx/2641/2641-preview.mp3';
const HACK_SOUND_ACCESS = 'https://assets.mixkit.co/active_storage/sfx/2556/2556-preview.mp3';
const TYPING_SOUND = 'https://assets.mixkit.co/active_storage/sfx/1110/1110-preview.mp3';

interface HackingLoginProps {
  onComplete: () => void;
}

const HackingLogin: React.FC<HackingLoginProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const audioCopyRef = useRef<HTMLAudioElement | null>(null);
  const audioAccessRef = useRef<HTMLAudioElement | null>(null);
  const audioTypingRef = useRef<HTMLAudioElement | null>(null);

  const SECRET_KEY = "INVISIVEL_2025";

  const hackMessages = [
    "> Bypass inicial completo...",
    "> Localizando servidor de dados...",
    "> Injetando credenciais @operador...",
    `> Chave gerada: ${SECRET_KEY}`,
    "> ACESSO RESTRITO LIBERADO."
  ];

  useEffect(() => {
    audioCopyRef.current = new Audio(HACK_SOUND_COPY);
    audioAccessRef.current = new Audio(HACK_SOUND_ACCESS);
    audioTypingRef.current = new Audio(TYPING_SOUND);
    if (audioTypingRef.current) audioTypingRef.current.volume = 0.3;
  }, []);

  const playSound = (audioRef: React.RefObject<HTMLAudioElement | null>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Áudio bloqueado", e));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    let currentMsg = 0;
    const logInterval = setInterval(() => {
      if (currentMsg < hackMessages.length) {
        setLogs(prev => [...prev, hackMessages[currentMsg]]);
        playSound(audioTypingRef);
        currentMsg++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setShowLogin(true), 600);
      }
    }, 400);

    return () => {
      clearInterval(timer);
      clearInterval(logInterval);
    };
  }, []);

  const handleCopy = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(SECRET_KEY);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = SECRET_KEY;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.warn("Falha ao copiar token");
    }
    
    setCopied(true);
    playSound(audioCopyRef);
    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  const handleStartInvasion = () => {
    if (isRedirecting) return;
    
    // Se ainda não copiou, o botão primeiro copia e depois já inicia o processo de saída
    if (!copied) {
      handleCopy();
    }

    console.log("Comando recebido: Iniciando TikTok Bypass...");
    setIsRedirecting(true);
    playSound(audioAccessRef);
    
    if ('vibrate' in navigator) navigator.vibrate([50, 30, 50]);

    // Delay mínimo apenas para o feedback visual do clique
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div className="h-screen bg-black text-[#00ff41] font-mono flex flex-col relative overflow-hidden">
      {/* Camada de Scanlines (Z-index baixo para não cobrir botões) */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-10 bg-[length:100%_4px] opacity-20" />
      
      {/* Barra de Status Hacker */}
      <div className="w-full flex justify-between items-center px-6 pt-3 absolute top-0 z-[60] text-[12px] opacity-80 pointer-events-none">
        <span className="font-bold">{currentTime}</span>
        <div className="flex items-center gap-2">
          <Signal size={14} />
          <Wifi size={14} />
          <div className="flex items-center gap-1 border border-[#00ff41]/40 rounded-sm px-1 py-0.5">
            <span className="text-[9px]">99%</span>
            <BatteryCharging size={12} className="animate-pulse" />
          </div>
        </div>
      </div>

      {/* Terminal Logs */}
      <div className="mt-16 px-6 space-y-1 text-[10px] md:text-xs opacity-60 pointer-events-none z-20">
        {logs.map((log, i) => (
          <div key={i} className="animate-slide-up flex gap-2">
            <span className="text-white/30">[{new Date().getSeconds()}s]</span>
            {log}
          </div>
        ))}
      </div>

      {/* Painel de Login (Z-index ALTO para garantir clique) */}
      <div className={`flex-1 flex flex-col items-center justify-center p-8 transition-all duration-700 transform z-50 ${showLogin ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="w-full max-w-[380px] bg-zinc-900/95 border border-[#00ff41]/30 rounded-[32px] p-8 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,255,65,0.2)]">
          
          <div className="flex flex-col items-center mb-8 pointer-events-none">
            <div className="w-16 h-16 bg-[#00ff41]/10 rounded-full flex items-center justify-center mb-4 border border-[#00ff41]/20 animate-pulse">
              <ShieldCheck size={32} className="text-[#00ff41]" />
            </div>
            <h2 className="text-white text-xl font-black tracking-tighter uppercase text-center leading-tight">Painel de Acesso</h2>
            <p className="text-[#00ff41] text-[10px] tracking-widest uppercase mt-1">Siga os passos abaixo:</p>
          </div>

          <div className="space-y-6 relative">
            {/* Passo 1: Copiar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center pointer-events-none px-1">
                <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">1. Copie o Token</label>
                {copied && <span className="text-[10px] text-[#00ff41] font-bold animate-pulse">PRONTO!</span>}
              </div>
              <button 
                onClick={handleCopy}
                type="button"
                className={`w-full bg-black/60 border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300 active:scale-95 shadow-inner ${copied ? 'border-[#00ff41]/60 bg-[#00ff41]/5' : 'border-[#00ff41]/30 hover:border-[#00ff41]'}`}
              >
                <span className={`font-bold tracking-widest text-lg ${copied ? 'text-white' : 'text-[#00ff41]'}`}>{SECRET_KEY}</span>
                <div className={`p-2 rounded-lg transition-all ${copied ? 'text-[#00ff41]' : 'text-[#00ff41]/40 bg-white/5'}`}>
                  {copied ? <Check size={22} strokeWidth={3} /> : <Copy size={22} />}
                </div>
              </button>
            </div>

            {/* Passo 2: Avançar */}
            <div className="pt-2">
              <button
                onClick={handleStartInvasion}
                type="button"
                className={`w-full py-6 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-tighter shadow-xl relative overflow-hidden active:scale-95 cursor-pointer pointer-events-auto ${
                  isRedirecting 
                  ? 'bg-zinc-800 text-zinc-500' 
                  : copied 
                    ? 'bg-[#00ff41] text-black font-black shadow-[0_0_40px_rgba(0,255,65,0.4)]' 
                    : 'bg-zinc-800 text-white/60 font-bold border border-white/5 animate-pulse'
                }`}
              >
                {isRedirecting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    <span className="text-xs">Processando...</span>
                  </div>
                ) : (
                  <>
                    <Cpu size={22} />
                    <span className="text-base">2. Acessar TikTok</span>
                    {copied && <ArrowRight size={20} className="animate-bounce-x" />}
                  </>
                )}
              </button>
              
              <div className="mt-4 flex flex-col items-center gap-1 pointer-events-none">
                <p className="text-[9px] text-center text-zinc-500 uppercase tracking-[0.15em] font-medium">
                  {copied ? "TOKEN_VALIDADO: ACESSO PERMITIDO" : "COPIE O TOKEN PARA LIBERAR O ACESSO"}
                </p>
                <div className="h-[1px] w-20 bg-[#00ff41]/20 mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo de Fundo (Apenas Decorativo) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-5 pointer-events-none z-0">
        <Terminal size={140} />
      </div>

      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default HackingLogin;
