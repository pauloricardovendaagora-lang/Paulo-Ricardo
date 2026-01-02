
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

  const SECRET_KEY = "INVISIVEL_2025";

  useEffect(() => {
    audioRef.current = new Audio(CLICK_SOUND);
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    if (audioRef.current) audioRef.current.play().catch(() => {});
    setIsLocked(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 font-mono">
        <div className="absolute top-0 w-full flex justify-between p-6 opacity-60 text-xs">
          <span>{currentTime}</span>
          <div className="flex gap-2"><Signal size={12}/><Wifi size={12}/><BatteryCharging size={12}/></div>
        </div>
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-red-500/20 blur-2xl animate-pulse" />
            <div className="bg-zinc-900 border border-red-500/40 p-6 rounded-3xl relative">
              <Lock size={48} className="text-red-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black uppercase text-white tracking-tighter">Acesso Restrito</h2>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Protocolo TikTok_Inversion v2.0</p>
          </div>
          <button 
            onClick={handleUnlock}
            className="w-full bg-[#00ff41] text-black py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(0,255,65,0.3)] active:scale-95 transition-all"
          >
            Quebrar Criptografia
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-black flex flex-col relative overflow-hidden select-none">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={HACKED_VIDEO_URL}
          className="w-full h-full object-cover"
          playsInline
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsVideoEnded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Top Header TikTok */}
      <div className="absolute top-10 left-0 right-0 z-20 flex justify-center gap-6">
        <span className="text-white/60 font-bold text-sm">Seguindo</span>
        <span className="text-white font-bold text-sm border-b-2 border-white pb-1">Para Você</span>
        <Search className="absolute right-6 top-0 text-white" size={24} />
      </div>

      {/* Side Actions (TikTok Style) */}
      <div className="absolute right-3 bottom-32 z-20 flex flex-col items-center gap-5">
        <div className="relative mb-2">
          <div className="w-12 h-12 rounded-full border border-white overflow-hidden">
            <img src={PROFILE_IMAGE_URL} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#fe2c55] rounded-full p-0.5">
            <Plus size={12} className="text-white" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Heart size={35} className="text-white fill-white/10" />
          <span className="text-[11px] font-bold text-white mt-1">1.2M</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle size={35} className="text-white fill-white/10" />
          <span className="text-[11px] font-bold text-white mt-1">45.8K</span>
        </div>
        <div className="flex flex-col items-center">
          <Share2 size={35} className="text-white fill-white/10" />
          <span className="text-[11px] font-bold text-white mt-1">92K</span>
        </div>
        <div className="animate-spin-slow mt-4">
          <div className="w-10 h-10 rounded-full bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center">
            <div className="w-4 h-4 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom Info (TikTok Style) */}
      <div className="absolute left-4 bottom-24 z-20 max-w-[70%] space-y-2">
        <h4 className="font-bold text-white text-base">@operador_invisivel</h4>
        <p className="text-sm text-white leading-snug">
          O sistema não quer que você veja isso. Hackeamos a central de dados para liberar sua prova. 🔓
        </p>
        <div className="flex items-center gap-2">
          <Music size={14} className="text-white" />
          <marquee className="text-xs text-white font-medium w-40">Som Original - Operador Invisível</marquee>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-16 left-0 w-full h-0.5 bg-white/20 z-20">
        <div className="h-full bg-white transition-all duration-300" style={{ width: `${videoProgress}%` }} />
      </div>

      {/* TikTok Tab Bar */}
      <div className="h-16 bg-black border-t border-white/10 flex items-center justify-around px-2 pb-2 relative z-20">
        <div className="flex flex-col items-center opacity-100"><Home size={22} className="text-white" /><span className="text-[9px] mt-1">Início</span></div>
        <div className="flex flex-col items-center opacity-50"><Search size={22} className="text-white" /><span className="text-[9px] mt-1">Amigos</span></div>
        <PlusSquare size={40} className="text-white" />
        <div className="flex flex-col items-center opacity-50"><MessageCircle size={22} className="text-white" /><span className="text-[9px] mt-1">Caixa de...</span></div>
        <div className="flex flex-col items-center opacity-50"><User size={22} className="text-white" /><span className="text-[9px] mt-1">Perfil</span></div>
      </div>

      {/* Overlay Final (Botão Aparece aqui) */}
      {isVideoEnded && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-fade-in overflow-y-auto">
          <div className="w-full max-w-sm flex flex-col gap-8 py-10">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-[#00ff41] p-5 rounded-full shadow-[0_0_50px_#00ff41] animate-bounce">
                  <Zap className="w-12 h-12 text-black" fill="black" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-white text-3xl font-black italic uppercase leading-tight tracking-tighter">Prova Final Obtida</h2>
                <p className="text-zinc-400 text-sm leading-relaxed px-2">
                  Você viu com seus próprios olhos. Agora o acesso total está a um clique de distância. Não deixe o sistema fechar a brecha.
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
            <p className="text-[10px] text-zinc-600 text-center uppercase tracking-widest">Sessão expira em 3 minutos</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default TikTokHack;
