
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Music, User, Plus, Search, Home, PlusSquare, ShieldAlert, Terminal, Lock, Check, Volume2, VolumeX, ArrowRight, Zap, Signal, Wifi, BatteryCharging } from 'lucide-react';

const HACKED_VIDEO_URL = 'https://res.cloudinary.com/dwhekgupo/video/upload/v1767314238/copy_84BC7A6C-989A-47D5-8C8F-86536831B5E9_lp9zcu.mp4';
const PROFILE_IMAGE_URL = 'https://res.cloudinary.com/dwhekgupo/image/upload/v1767325801/avatar_haker_ads_p3zmug.jpg';
const CLICK_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2556/2556-preview.mp3';

interface TikTokHackProps {
  onComplete: () => void;
}

const TikTokHack: React.FC<TikTokHackProps> = ({ onComplete }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [videoProgress, setVideoProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(CLICK_SOUND);
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Garante que o vídeo inicie assim que sair da tela de bloqueio
  useEffect(() => {
    if (!isLocked && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Autoplay bloqueado. Tentando tocar com mute.", error);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }
  }, [isLocked]);

  const handleUnlock = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    if ('vibrate' in navigator) navigator.vibrate(40);
    setIsLocked(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 font-mono relative overflow-hidden">
        {/* Status Bar */}
        <div className="absolute top-0 w-full flex justify-between p-6 opacity-60 text-xs">
          <span>{currentTime}</span>
          <div className="flex gap-2"><Signal size={12}/><Wifi size={12}/><BatteryCharging size={12}/></div>
        </div>
        
        <div className="text-center space-y-8 z-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-[#00ff41]/20 blur-3xl animate-pulse" />
            <div className="bg-zinc-900 border border-[#00ff41]/40 p-8 rounded-[2.5rem] relative">
              <Lock size={60} className="text-[#00ff41] animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-black uppercase text-white tracking-tighter">Acesso Restrito</h2>
            <p className="text-[#00ff41] text-[10px] uppercase tracking-[0.3em] font-bold">Protocolo TikTok_Inversion</p>
          </div>

          <button 
            onClick={handleUnlock}
            className="w-full bg-[#00ff41] text-black py-5 rounded-2xl font-black text-base uppercase tracking-widest shadow-[0_0_40px_rgba(0,255,65,0.4)] active:scale-95 transition-all animate-bounce"
          >
            Quebrar Criptografia
          </button>
        </div>

        {/* Scanlines effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-black flex flex-col relative overflow-hidden select-none">
      {/* Video Container */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          src={HACKED_VIDEO_URL}
          className="w-full h-full object-cover"
          playsInline
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsVideoEnded(true)}
        />
        {/* Gradients to improve readability */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Top Header - Standard TikTok */}
      <div className="absolute top-12 left-0 right-0 z-20 flex justify-center items-center gap-6">
        <div className="relative">
          <span className="text-white/60 font-bold text-[15px]">Seguindo</span>
        </div>
        <div className="relative">
          <span className="text-white font-bold text-[15px] pb-1">Para Você</span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white" />
        </div>
        <Search className="absolute right-6 top-0 text-white opacity-90" size={24} />
      </div>

      {/* Side Actions - Standard TikTok (Right Side) */}
      <div className="absolute right-3 bottom-36 z-20 flex flex-col items-center gap-5">
        <div className="relative mb-3">
          <div className="w-12 h-12 rounded-full border border-white overflow-hidden shadow-lg">
            <img src={PROFILE_IMAGE_URL} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#fe2c55] rounded-full p-0.5 border-2 border-white">
            <Plus size={12} className="text-white" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="p-1">
            <Heart size={36} className="text-white fill-white shadow-sm" />
          </div>
          <span className="text-[11px] font-bold text-white mt-1 drop-shadow-md">1.2M</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="p-1">
            <MessageCircle size={36} className="text-white fill-white shadow-sm" />
          </div>
          <span className="text-[11px] font-bold text-white mt-1 drop-shadow-md">45.8K</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="p-1">
            <Share2 size={36} className="text-white fill-white shadow-sm" />
          </div>
          <span className="text-[11px] font-bold text-white mt-1 drop-shadow-md">92K</span>
        </div>

        {/* Music Disc Spin */}
        <div className="mt-4 relative animate-spin-slow">
          <div className="w-11 h-11 rounded-full bg-zinc-800 border-[8px] border-zinc-900 flex items-center justify-center">
            <div className="w-4 h-4 bg-zinc-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom Info - Standard TikTok (Left Side) */}
      <div className="absolute left-4 bottom-28 z-20 max-w-[75%] space-y-3">
        <h4 className="font-bold text-white text-[17px] drop-shadow-md">@operador_invisivel</h4>
        <p className="text-[15px] text-white leading-[1.3] drop-shadow-md font-medium">
          O sistema não quer que você veja isso. Hackeamos a central de dados para liberar sua prova. 🔓
        </p>
        <div className="flex items-center gap-2 pt-1">
          <Music size={14} className="text-white animate-pulse" />
          <div className="overflow-hidden w-40">
            <p className="text-xs text-white font-semibold whitespace-nowrap animate-marquee">
              Som Original - Operador Invisível — Som Original - Operador Invisível
            </p>
          </div>
        </div>
      </div>

      {/* Control: Mute Toggle (Top Right) */}
      <div className="absolute top-24 right-4 z-30">
        <button 
          onClick={toggleMute}
          className="p-2.5 bg-black/30 backdrop-blur-md rounded-full border border-white/10"
        >
          {isMuted ? <VolumeX className="text-red-500" size={20} /> : <Volume2 className="text-[#00ff41]" size={20} />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-[4.5rem] left-0 w-full h-0.5 bg-white/20 z-20">
        <div className="h-full bg-white transition-all duration-300" style={{ width: `${videoProgress}%` }} />
      </div>

      {/* Tab Bar - Standard TikTok */}
      <div className="h-20 bg-black border-t border-white/10 flex items-center justify-around px-2 pb-6 relative z-20">
        <div className="flex flex-col items-center text-white"><Home size={24} /><span className="text-[10px] mt-1 font-bold">Início</span></div>
        <div className="flex flex-col items-center text-white/40"><Search size={24} /><span className="text-[10px] mt-1 font-bold">Amigos</span></div>
        <div className="relative px-2">
           <div className="bg-white rounded-lg h-8 w-11 flex items-center justify-center relative">
              <div className="absolute -left-1 w-full h-full bg-[#69C9D0] rounded-lg -z-10" />
              <div className="absolute -right-1 w-full h-full bg-[#EE1D52] rounded-lg -z-10" />
              <PlusSquare size={20} className="text-black" />
           </div>
        </div>
        <div className="flex flex-col items-center text-white/40"><MessageCircle size={24} /><span className="text-[10px] mt-1 font-bold">Caixa</span></div>
        <div className="flex flex-col items-center text-white/40"><User size={24} /><span className="text-[10px] mt-1 font-bold">Perfil</span></div>
      </div>

      {/* Overlay Final de Sucesso */}
      {isVideoEnded && (
        <div className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-fade-in overflow-y-auto">
          <div className="w-full max-w-sm flex flex-col gap-8 py-10">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-[#00ff41] p-6 rounded-full shadow-[0_0_60px_#00ff41] animate-bounce">
                  <Zap className="w-12 h-12 text-black" fill="black" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-white text-3xl font-black italic uppercase leading-tight tracking-tighter">Acesso Total Concedido</h2>
                <p className="text-zinc-400 text-sm leading-relaxed px-4">
                  O sistema foi quebrado com sucesso. Você viu a prova. Agora, o próximo passo é garantir sua vaga no círculo interno.
                </p>
              </div>
            </div>
            
            <button 
              onClick={onComplete}
              className="w-full bg-[#00ff41] text-black py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(0,255,65,0.6)] uppercase tracking-tighter active:scale-95 transition-all"
            >
              LIBERAR MEU ACESSO
              <ArrowRight size={24} />
            </button>
            <p className="text-[10px] text-[#00ff41] text-center uppercase tracking-[0.3em] font-bold animate-pulse">Sessão Segura Ativa</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TikTokHack;
