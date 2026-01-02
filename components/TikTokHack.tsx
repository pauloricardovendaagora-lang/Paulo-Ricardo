
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Music, User, Plus, Search, Home, PlusSquare, ShieldAlert, Copy, Check, Terminal, Lock, Unlock, Zap, Loader2, Volume2, VolumeX, ArrowRight, AlertTriangle, Signal, Wifi, BatteryCharging } from 'lucide-react';

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
  const [isMuted, setIsMuted] = useState(false);
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
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(e => {
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
    if (audioUnlockRef.current) {
      audioUnlockRef.current.play().catch(e => console.log("Erro ao tocar som", e));
    }
    if ('vibrate' in navigator) navigator.vibrate([50, 30, 50]);
    setTimeout(() => {
      setIsLocked(false);
      setIsUnlocking(false);
      setIsMuted(false);
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
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative p-6 font-mono overflow-y-auto">
        <div className="w-full flex justify-between items-center px-8 pt-4 pb-1 absolute top-0 z-50 text-[12px] text-[#00ff41]/80">
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
            <div key={i} className="text-[10px] text-[#00ff41] whitespace-nowrap">
              [{new Date().toLocaleTimeString()}] {log}
            </div>
          ))}
        </div>

        <div className="w-full max-w-sm flex flex-col items-center gap-6 z-20 pt-10 pb-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#00ff41]/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="w-24 h-24 bg-zinc-900/50 rounded-[2rem] flex items-center justify-center border border-[#00ff41]/30 relative overflow-hidden">
               <ShieldAlert size={48} className={`text-red-500 transition-all duration-500 ${isUnlocking ? 'animate-ping' : 'animate-pulse'}`} />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-red-600 p-1.5 rounded-full border-2 border-black">
              <Lock size={14} className="text-white" />
            </div>
          </div>

          <div className="text-center space-y-2 px-4">
            <h2 className="text-white text-xl font-black uppercase glitch-text">Acesso Bloqueado</h2>
            <p className="text-[#00ff41] text-[10px] font-bold uppercase tracking-widest animate-pulse italic">
              -- Injeção de Token Requerida --
            </p>
          </div>

          <div className="w-full space-y-4">
            <div 
              onClick={handlePaste}
              className={`w-full relative border-2 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 transform ${
                passwordValue ? 'border-[#00ff41] bg-[#00ff41]/10' : 'border-[#00ff41]/40 bg-zinc-900/40'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full transition-all ${passwordValue ? 'bg-[#00ff41] text-black' : 'bg-white/5 text-[#00ff41]'}`}>
                  {passwordValue ? <Check size={20} /> : <Terminal size={20} />}
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-black transition-colors ${passwordValue ? 'text-[#00ff41]' : 'text-white'}`}>
                    {passwordValue ? "TOKEN_VALIDADO" : "BYPASS_RESTRICTION"}
                  </span>
                </div>
              </div>
            </div>

            <button
              disabled={!passwordValue || isUnlocking}
              onClick={handleUnlock}
              className={`w-full py-5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                passwordValue ? 'bg-[#00ff41] text-black' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
            >
              {isUnlocking ? "EXEC_EXPLOIT..." : "FORÇAR ACESSO"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col relative overflow-hidden select-none">
      <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={HACKED_VIDEO_URL}
          className={`w-full h-full object-contain pointer-events-none transition-all duration-75 ${isGlitching ? 'scale-110 blur-[2px]' : 'scale-100 blur-0'}`}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
        />
      </div>

      <div className="absolute top-24 right-4 z-50">
        <button 
          onClick={() => { if (videoRef.current) { videoRef.current.muted = !videoRef.current.muted; setIsMuted(videoRef.current.muted); } }}
          className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10"
        >
          {isMuted ? <VolumeX className="text-red-500" size={24} /> : <Volume2 className="text-[#00ff41]" size={24} />}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 text-center">
        {!isVideoEnded && (
          <div className="w-full max-w-xs px-4 pointer-events-none">
            <h2 className="text-xl font-black uppercase text-white drop-shadow-[0_4px_15px_rgba(0,0,0,1)]">
              {getHeadline()}
            </h2>
          </div>
        )}
      </div>

      <div className="h-16 border-t border-white/5 bg-black flex items-center justify-around px-2 pb-2 z-20">
        <Home className="w-6 h-6 text-[#00ff41]" />
        <Search className="w-6 h-6 opacity-30 text-white" />
        <PlusSquare className="w-6 h-6 opacity-30 text-white" />
        <MessageCircle className="w-6 h-6 opacity-30 text-white" />
        <User className="w-6 h-6 opacity-30 text-white" />
      </div>

      {isVideoEnded && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto">
           <div className="w-full max-w-sm flex flex-col gap-6 py-10">
              <div className="text-center space-y-4">
                 <div className="flex justify-center">
                    <div className="bg-[#00ff41] p-4 rounded-full shadow-[0_0_50px_#00ff41] animate-bounce">
                       <Zap className="w-12 h-12 text-black" />
                    </div>
                 </div>
                 <div className="space-y-2">
                   <h2 className="text-white text-3xl font-black italic uppercase leading-tight tracking-tighter">Acesso Total Concedido</h2>
                   <p className="text-[#00ff41] text-[10px] font-bold uppercase tracking-[0.2em]">Data Pack Successfully Cloned</p>
                   <p className="text-zinc-400 text-sm px-4 leading-relaxed">
                     O sistema foi quebrado. As informações que você viu agora são sua propriedade. Use-as sabiamente.
                   </p>
                 </div>
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); onComplete(); }}
                className="w-full bg-[#00ff41] text-black py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(0,255,65,0.6)] uppercase tracking-tighter active:scale-95 transition-all"
              >
                OBTER SISTEMA
                <ArrowRight className="w-6 h-6" />
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default TikTokHack;
