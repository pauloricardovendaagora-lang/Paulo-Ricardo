
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Music, User, Plus, Search, Home, PlusSquare, ShieldAlert, Copy, Check, Terminal, Lock, Unlock, Zap, Loader2, MousePointer2, Volume2, VolumeX, ArrowRight, AlertTriangle, Signal, Wifi, BatteryCharging } from 'lucide-react';

const HACKED_VIDEO_URL = 'https://res.cloudinary.com/dwhekgupo/video/upload/v1767314238/copy_84BC7A6C-989A-47D5-8C8F-86536831B5E9_lp9zcu.mp4';
const GLITCH_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2443/2443-preview.mp3';
const UNLOCK_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2556/2556-preview.mp3';
const PROFILE_IMAGE_URL = 'https://res.cloudinary.com/dwhekgupo/image/upload/v1767325801/avatar_haker_ads_p3zmug.jpg';

interface TikTokHackProps {
  onComplete: () => void;
}

const TikTokHack: React.FC<TikTokHackProps> = ({ onComplete }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [copied, setCopied] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Inicia desmutado
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [duration, setDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [backgroundLogs, setBackgroundLogs] = useState<string[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioGlitchRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockRef = useRef<HTMLAudioElement | null>(null);

  const SECRET_KEY = "INVISIVEL_2025";

  useEffect(() => {
    audioGlitchRef.current = new Audio(GLITCH_SOUND_URL);
    audioUnlockRef.current = new Audio(UNLOCK_SOUND_URL);
    if (audioGlitchRef.current) audioGlitchRef.current.volume = 0.4;
    
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    const logPool = [
      "SEARCHING_TARGET...", "ENCRYPTING_NODE_X21", "BYPASSING_TIKTOK_AUTH...", 
      "STREAMING_PIPELINE_INIT", "INJECTING_PAYLOAD", "SIGNAL_DEGRADATION_DETECTED",
      "HIDDEN_MODE_ACTIVE", "OVERRIDING_RESTRICTIONS", "FETCHING_DATA_BLOB..."
    ];
    
    const logInterval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      setBackgroundLogs(prev => [randomLog, ...prev.slice(0, 15)]);
    }, 400);

    return () => {
      clearInterval(clockTimer);
      clearInterval(logInterval);
    };
  }, []);

  const playGlitchSound = () => {
    if (audioGlitchRef.current) {
      audioGlitchRef.current.currentTime = 0;
      audioGlitchRef.current.play().catch(e => console.log("Audio glitch bloqueado", e));
    }
  };

  useEffect(() => {
    if (!isLocked) {
      // Quando desbloqueia, força a reprodução com som
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(e => {
          console.warn("Autoplay com som falhou, tentando mudo como fallback", e);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
            setIsMuted(true);
          }
        });
      }

      const glitchLoop = () => {
        const timeout = Math.random() * 2000 + 800;
        setTimeout(() => {
          setIsGlitching(true);
          setGlitchIntensity(Math.random());
          playGlitchSound();
          
          const duration = Math.random() * 800 + 200;
          setTimeout(() => {
            setIsGlitching(false);
            setGlitchIntensity(0);
            glitchLoop();
          }, duration);
        }, timeout);
      };
      
      glitchLoop();
    }
  }, [isLocked]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(SECRET_KEY);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUnlock = () => {
    if (passwordValue !== SECRET_KEY) return;
    setIsUnlocking(true);
    
    // Tocar o som de desbloqueio IMEDIATAMENTE no clique para "acordar" o contexto de áudio do navegador
    if (audioUnlockRef.current) {
      audioUnlockRef.current.play().catch(e => console.log("Erro ao tocar som de desbloqueio", e));
    }
    
    // Vibração tátil
    if ('vibrate' in navigator) navigator.vibrate([50, 30, 50]);

    setTimeout(() => {
      setIsLocked(false);
      setIsUnlocking(false);
      setIsMuted(false); // Garante que o estado visual do ícone de som esteja como "ligado"
    }, 1500);
  };

  const handlePaste = () => {
    setPasswordValue(SECRET_KEY);
    if ('vibrate' in navigator) navigator.vibrate(20);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setVideoCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleVideoEnd = () => setIsVideoEnded(true);

  const getHeadline = () => {
    if (videoCurrentTime > 0 && videoCurrentTime <= 6) {
      return "Esse perfil pode cair a qualquer momento nao era para voce ter acesso a isso fique até o final e veja a prova";
    }
    if (duration > 0 && videoCurrentTime >= (duration - 6)) {
      return "Ja que chegou até aqui vou lhe dizer qual proximo passo";
    }
    return "";
  };

  if (isLocked) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center relative p-6 font-mono overflow-hidden">
        {/* Barra de Status Celular no Bloqueio */}
        <div className="w-full flex justify-between items-center px-8 pt-3 pb-1 absolute top-0 z-50 text-[12px] text-[#00ff41]/80">
          <span className="font-bold">{currentTime}</span>
          <div className="flex items-center gap-2">
            <Signal size={14} />
            <Wifi size={14} />
            <div className="flex items-center gap-1 border border-[#00ff41]/40 rounded-sm px-1 py-0.5">
              <span className="text-[9px]">88%</span>
              <BatteryCharging size={12} className="animate-pulse" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10 pointer-events-none p-4 overflow-hidden">
          {backgroundLogs.map((log, i) => (
            <div key={i} className="text-[10px] text-[#00ff41] whitespace-nowrap animate-slide-up">
              [{new Date().toLocaleTimeString()}] {log}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-30" />

        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[90%] z-50 animate-slide-up">
          <div className="bg-zinc-900/95 backdrop-blur-3xl border border-[#00ff41]/40 rounded-2xl p-4 flex items-center justify-between shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3">
              <Terminal size={18} className="text-[#00ff41]" />
              <div className="flex flex-col">
                <span className="text-[9px] text-[#00ff41]/70 font-bold uppercase tracking-widest">Sua Credencial</span>
                <span className="text-white text-sm font-bold tracking-tighter">{SECRET_KEY}</span>
              </div>
            </div>
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-[11px] uppercase ${copied ? 'bg-green-600 text-white' : 'bg-[#00ff41] text-black hover:brightness-110 active:scale-95'}`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>

        <div className="w-full max-w-sm flex flex-col items-center gap-8 z-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#00ff41]/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="w-28 h-28 bg-zinc-900/50 rounded-[2.5rem] flex items-center justify-center border border-[#00ff41]/30 shadow-2xl relative overflow-hidden">
               <ShieldAlert size={56} className={`text-red-500 transition-all duration-500 ${isUnlocking ? 'animate-ping' : 'animate-pulse'}`} />
               <div className="absolute inset-0 bg-red-500/5 rounded-[2.5rem] animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-red-600 p-2 rounded-full border-4 border-black shadow-lg">
              <Lock size={18} className="text-white" />
            </div>
          </div>

          <div className="text-center space-y-3 px-4">
            <h2 className="text-white text-2xl font-black tracking-tight uppercase leading-none glitch-text">Acesso Bloqueado</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-8 bg-[#00ff41]/30" />
              <p className="text-[#00ff41] text-[11px] font-bold uppercase tracking-[0.25em] animate-pulse italic">
                -- Injeção de Token Requerida --
              </p>
              <div className="h-[1px] w-8 bg-[#00ff41]/30" />
            </div>
          </div>

          <div className="w-full space-y-6">
            <div 
              onClick={handlePaste}
              className={`w-full relative border-2 rounded-3xl p-7 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 transform ${
                passwordValue 
                ? 'border-[#00ff41] bg-[#00ff41]/10 shadow-[0_0_40px_rgba(0,255,101,0.3)]' 
                : 'border-[#00ff41]/40 bg-zinc-900/40 hover:border-[#00ff41] animate-pulse shadow-[0_0_20px_rgba(0,255,65,0.1)]'
              }`}
            >
              {!passwordValue && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 animate-bounce">
                  <div className="bg-[#00ff41] text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-tighter">Colar via Terminal</div>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full transition-all duration-500 ${passwordValue ? 'bg-[#00ff41] text-black rotate-[360deg]' : 'bg-white/5 text-[#00ff41] animate-bounce'}`}>
                  {passwordValue ? <Check size={28} /> : <Terminal size={28} />}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[17px] font-black tracking-tighter transition-colors ${passwordValue ? 'text-[#00ff41]' : 'text-white'}`}>
                    {passwordValue ? "TOKEN_VALIDADO_OK" : "BYPASS_RESTRICTION"}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.2em]">
                    {passwordValue ? "ENCRYPT_DONE" : "WAITING_COMMAND..."}
                  </span>
                </div>
              </div>
            </div>

            <button
              disabled={!passwordValue || isUnlocking}
              onClick={handleUnlock}
              className={`w-full py-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
                passwordValue 
                ? 'bg-[#00ff41] text-black shadow-[0_15px_50px_rgba(0,255,65,0.5)] active:scale-95 hover:brightness-110' 
                : 'bg-zinc-800/50 text-zinc-700 cursor-not-allowed border border-white/5 opacity-50'
              }`}
            >
              {isUnlocking ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  EXEC_EXPLOIT...
                </>
              ) : (
                <>
                  <Unlock size={20} className={passwordValue ? 'animate-bounce' : ''} />
                  FORÇAR ACESSO
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col relative overflow-hidden select-none">
      <div 
        className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-75 ${isGlitching ? 'opacity-60' : 'opacity-0'}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_2px] opacity-40" />

      <div className="absolute inset-0 z-0 bg-black flex items-center justify-center overflow-hidden">
        {isGlitching && (
          <div className="absolute inset-0 z-40 bg-red-600/10 pointer-events-none mix-blend-overlay animate-pulse" />
        )}
        
        <video
          ref={videoRef}
          src={HACKED_VIDEO_URL}
          className={`w-full h-full object-contain pointer-events-none transition-all duration-75 ${
            isGlitching 
            ? `scale-150 skew-x-12 blur-[4px] brightness-200 contrast-200 grayscale-[0.8]` 
            : 'scale-100 blur-0 brightness-100 contrast-100 grayscale-0'
          }`}
          style={{
            filter: isGlitching ? `hue-rotate(${glitchIntensity * 180}deg) saturate(3) invert(${glitchIntensity > 0.8 ? 0.3 : 0})` : 'none',
            transform: isGlitching ? `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)` : 'none'
          }}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
        />
      </div>

      <div className="absolute top-24 right-4 z-50">
        <button 
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = !videoRef.current.muted;
              setIsMuted(videoRef.current.muted);
            }
          }}
          className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 active:scale-90 transition-all shadow-lg"
        >
          {isMuted ? <VolumeX className="text-red-500" size={24} /> : <Volume2 className="text-[#00ff41]" size={24} />}
        </button>
      </div>

      <div className="absolute top-12 left-0 right-0 z-20 flex justify-center gap-6 font-semibold text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
        <span className="opacity-60 text-white font-medium">Seguindo</span>
        <span className="border-b-2 border-white pb-1 text-white font-bold">Para Você</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 text-center">
        {!isVideoEnded && (
          <div className="w-full max-w-xs px-4 pointer-events-none">
            <h2 className={`text-2xl font-black uppercase tracking-tighter leading-tight italic transition-all duration-75 mb-4 ${
              isGlitching ? 'text-white translate-x-4 -skew-x-12 blur-[1px]' : 'text-white drop-shadow-[0_4px_15px_rgba(0,0,0,1)]'
            }`}>
              {getHeadline()}
            </h2>
            
            <div className={`flex items-center justify-center gap-2 bg-black/60 border border-[#00ff41]/40 px-3 py-1 rounded-full backdrop-blur-md w-fit mx-auto animate-in fade-in duration-300 ${isGlitching ? 'bg-red-900/40 border-red-500/40' : ''}`}>
              {isGlitching ? (
                <AlertTriangle className="w-3 h-3 text-red-500 animate-ping" />
              ) : (
                <Loader2 className="w-3 h-3 text-[#00ff41] animate-spin" />
              )}
              <span className={`text-[9px] font-black uppercase tracking-widest ${isGlitching ? 'text-red-500' : 'text-[#00ff41]'}`}>
                {isGlitching ? 'CRITICAL_SIGNAL_LOSS' : 'EXTRACTING_PROOFS...'}
              </span>
            </div>
          </div>
        )}

        <div className="absolute right-3 bottom-32 flex flex-col items-center gap-6 z-20">
          <div className="w-12 h-12 rounded-full border-2 border-[#00ff41] p-0.5 overflow-hidden shadow-[0_0_15px_#00ff41]">
             <img src={PROFILE_IMAGE_URL} alt="Hacker" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex flex-col items-center">
            <Heart className={`w-9 h-9 ${isGlitching ? 'text-red-500 blur-[1px]' : 'fill-red-500'}`} />
            <span className="text-[12px] font-semibold text-white">1.2M</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="w-9 h-9 fill-white" />
            <span className="text-[12px] font-semibold text-white">45.2K</span>
          </div>
          <div className="flex flex-col items-center">
            <Share2 className="w-9 h-9 fill-white" />
            <span className="text-[12px] font-semibold text-white">12K</span>
          </div>
        </div>

        <div className="absolute left-4 bottom-24 right-20 z-20 text-left">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-white">@operador_invisivel</h3>
            <span className="bg-[#00ff41] text-black text-[10px] px-1.5 rounded font-black uppercase tracking-tighter">LIVE_PIRATA</span>
          </div>
          <p className="text-sm text-gray-200 line-clamp-2 drop-shadow-md">
            Sinal hackeado diretamente da central. A prova é real. <span className="font-bold text-[#00ff41]">#live #hacked #original</span>
          </p>
          <div className="flex items-center gap-2 text-white/80 mt-2">
            <Music className="w-4 h-4 animate-spin-slow" />
            <span className="text-xs">Transmissão Criptografada [AES-256]</span>
          </div>
        </div>
      </div>

      {isVideoEnded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in zoom-in duration-700">
           <div className="w-full max-w-sm flex flex-col gap-8">
              <div className="text-center space-y-6">
                 <div className="flex justify-center relative">
                    <div className="absolute inset-0 bg-[#00ff41]/20 blur-3xl animate-pulse rounded-full" />
                    <div className="bg-[#00ff41] p-6 rounded-full shadow-[0_0_80px_#00ff41] animate-bounce relative z-10">
                       <Zap className="w-16 h-16 text-black" />
                    </div>
                 </div>
                 <div className="space-y-2">
                   <h2 className="text-white text-4xl font-black italic uppercase leading-tight tracking-tighter">Acesso Total Concedido</h2>
                   <p className="text-[#00ff41] text-xs font-bold uppercase tracking-[0.2em]">Data Pack Successfully Cloned</p>
                   <p className="text-zinc-400 text-sm font-medium tracking-tight px-4 leading-relaxed">
                     O sistema foi quebrado. As informações que você viu agora são sua propriedade. Use-as sabiamente.
                   </p>
                 </div>
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); onComplete(); }}
                className="w-full bg-[#00ff41] text-black py-7 rounded-3xl font-black text-2xl flex items-center justify-center gap-3 shadow-[0_0_80px_rgba(0,255,65,0.8)] uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all animate-bounce"
              >
                OBTER SISTEMA
                <ArrowRight className="w-8 h-8" />
              </button>
           </div>
        </div>
      )}

      <div className="h-20 border-t border-white/5 bg-black flex items-center justify-around px-2 pb-6 z-20">
        <Home className="w-7 h-7 text-[#00ff41]" />
        <Search className="w-7 h-7 opacity-30 text-white" />
        <div className="w-11 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/5">
           <div className="w-8 h-full bg-black rounded-md flex items-center justify-center">
              <PlusSquare className="w-6 h-6 text-white" />
           </div>
        </div>
        <MessageCircle className="w-7 h-7 opacity-30 text-white" />
        <User className="w-7 h-7 opacity-30 text-white" />
      </div>
    </div>
  );
};

export default TikTokHack;
