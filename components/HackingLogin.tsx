
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
    // Inicializar sons
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
        playSound(audioTypingRef); // Som de digitação para cada log
        currentMsg++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setShowLogin(true), 800);
      }
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(logInterval);
    };
  }, []);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(SECRET_KEY);
      setCopied(true);
      playSound(audioCopyRef); // Som de hakeamento na etapa 1
    } catch (err) {
      console.error("Erro ao copiar", err);
      setCopied(true);
      playSound(audioCopyRef);
    }
  };

  const handleStartInvasion = () => {
    if (!copied) return;
    
    playSound(audioAccessRef); // Som de hakeamento na etapa 2
    setIsRedirecting(true);
    // Transição suave para a próxima etapa
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <div className="h-screen bg-black text-[#00ff41] font-mono flex flex-col relative overflow-hidden">
      {/* Barra de Status Hacker */}
      <div className="w-full flex justify-between items-center px-6 pt-3 absolute top-0 z-50 text-[12px] opacity-80">
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

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-40 bg-[length:100%_4px]" />
      
      <div className="mt-16 px-6 space-y-1 text-[10px] md:text-xs opacity-60">
        {logs.map((log, i) => (
          <div key={i} className="animate-slide-up flex gap-2">
            <span className="text-white/30">[{new Date().getSeconds()}s]</span>
            {log}
          </div>
        ))}
      </div>

      <div className={`flex-1 flex flex-col items-center justify-center p-8 transition-all duration-700 transform ${showLogin ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="w-full max-w-sm bg-zinc-900/80 border border-[#00ff41]/20 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,65,0.1)]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#00ff41]/10 rounded-full flex items-center justify-center mb-4 border border-[#00ff41]/20 animate-pulse">
              <ShieldCheck size={32} className="text-[#00ff41]" />
            </div>
            <h2 className="text-white text-xl font-black tracking-tighter uppercase text-center leading-tight">Painel de Acesso</h2>
            <p className="text-[#00ff41] text-[10px] tracking-widest uppercase mt-1">Siga os passos abaixo:</p>
          </div>

          <div className="space-y-6">
            {/* Passo 1: Copiar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest ml-1">1. Copie o Token</label>
                {copied && <span className="text-[10px] text-green-500 font-bold animate-pulse">PRONTO!</span>}
              </div>
              <div 
                onClick={handleCopy}
                className={`bg-black/40 border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${copied ? 'border-green-500/50 bg-green-500/10' : 'border-[#00ff41]/30 hover:border-[#00ff41]'}`}
              >
                <span className={`font-bold tracking-widest text-lg ${copied ? 'text-white' : 'text-[#00ff41]'}`}>{SECRET_KEY}</span>
                <div className={`p-2 rounded-lg transition-all ${copied ? 'text-green-500' : 'text-[#00ff41] bg-white/5'}`}>
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </div>
              </div>
            </div>

            {/* Passo 2: Avançar */}
            <div className="pt-2">
              <button
                disabled={!copied || isRedirecting}
                onClick={handleStartInvasion}
                className={`w-full py-5 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-tighter shadow-lg relative overflow-hidden ${
                  isRedirecting 
                  ? 'bg-zinc-800 text-zinc-500 cursor-wait' 
                  : copied 
                    ? 'bg-[#00ff41] text-black font-black shadow-[0_0_25px_rgba(0,255,65,0.4)] active:scale-95 hover:brightness-110' 
                    : 'bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed'
                }`}
              >
                {isRedirecting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    <span className="text-xs">Redirecionando...</span>
                  </div>
                ) : (
                  <>
                    <Cpu size={20} />
                    <span className="text-sm">2. Acessar TikTok</span>
                    {copied && <ArrowRight size={18} className="animate-bounce-x" />}
                  </>
                )}
              </button>
              <p className="text-[9px] text-center text-zinc-600 mt-3 uppercase tracking-widest">
                Você precisará colar a chave no próximo passo
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-10">
        <Terminal size={100} />
      </div>

      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default HackingLogin;
