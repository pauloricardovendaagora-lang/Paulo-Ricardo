
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Music, User, Plus, Search, Home, PlusSquare, Lock, Volume2, VolumeX, ArrowRight, Zap, Signal, Wifi, BatteryCharging, ShieldAlert, Activity, AlertCircle } from 'lucide-react';

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
  const [showHackingText, setShowHackingText] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(CLICK_SOUND);
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    
    setIsLocked(false);
    setShowHackingText(true);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play();
          }
        });
      }
      setTimeout(() => setShowHackingText(false), 3000);
    }, 100);
    
    if ('vibrate' in navigator) navigator.vibrate(40);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (isLocked) {
    return (
      <div className="h-[100dvh] bg-black flex flex-col items-center justify-center p-8 font-mono relative overflow-hidden">
        <div className="absolute top-0 w-full flex justify-between p-6 opacity-60 text-xs text-white">
          <span>{currentTime}</span>
          <div className="flex gap-2"><Signal size={12}/><Wifi size={12}/><BatteryCharging size={12}/></div>
        </div>
        
        <div className="text-center space-y-8 z-10 animate-slide-up">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-[#00ff41]/20 blur-3xl animate-pulse" />
            <div className="bg-zinc-900 border border-[#00ff41]/40 p-8 rounded-[2.5rem] relative shadow-2xl">
              <Lock size={60} className="text-[#00ff41]" />
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
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-black flex flex-col relative overflow-hidden select-none">
      {/* Camada do Vídeo com Glitch Contínuo */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        <div className="relative w-full h-full animate-glitch-container">
          <video
            ref={videoRef}
            src={HACKED_VIDEO_URL}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoEnded ? 'opacity-20' : 'opacity-100'}`}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsVideoEnded(true)}
          />
          
          {/* Efeitos de Interferência Persistentes */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Ruído digital */}
            <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWUoW9kf6/giphy.gif')] opacity-[0.05] mix-blend-screen animate-flicker" />
            {/* Linhas de scan */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
            {/* Vinheta Hacker */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            {/* Flash de instabilidade */}
            <div className="absolute inset-0 bg-[#00ff41]/5 opacity-10 animate-noise pointer-events-none" />
          </div>

          {/* Badge de Sinal Instável */}
          {!isVideoEnded && (
            <div className="absolute top-28 left-4 flex items-center gap-2 bg-red-600/30 backdrop-blur-md border border-red-500/50 px-3 py-1.5 rounded-full animate-pulse z-30">
              <Activity size={14} className="text-red-500" />
              <span className="text-[10px] text-red-500 font-black uppercase tracking-widest">Sinal Instável: 12%</span>
            </div>
          )}
        </div>
      </div>

      {/* Alerta de Injeção de Código */}
      {showHackingText && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg animate-fade-in pointer-events-none">
          <div className="text-center space-y-6 max-w-xs px-6">
            <ShieldAlert size={80} className="text-[#00ff41] mx-auto animate-pulse" />
            <div className="space-y-2">
              <h3 className="font-mono text-[#00ff41] text-2xl font-black uppercase tracking-tighter italic animate-glitch">Transmissão Clandestina</h3>
              <p className="font-mono text-[#00ff41] text-[10px] leading-tight opacity-80 font-bold uppercase tracking-widest">
                Interceptando feed original...<br/>
                Injetando metadados...<br/>
                <span className="text-white">CONEXÃO ESTABELECIDA</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cabeçalho Superior TikTok */}
      <div className="absolute top-12 left-0 right-0 z-30 flex justify-center items-center gap-8">
        <span className="text-white/60 font-bold text-[16px] drop-shadow-lg">Seguindo</span>
        <div className="relative">
          <span className="text-white font-bold text-[16px] drop-shadow-lg">Para Você</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-white shadow-lg" />
        </div>
        <Search className="absolute right-6 top-0 text-white drop-shadow-lg" size={24} />
      </div>

      {/* Interações Laterais (DIREITA) */}
      <div className="absolute right-3 bottom-36 z-30 flex flex-col items-center gap-6">
        <div className="relative mb-2">
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-2xl">
            <img src={PROFILE_IMAGE_URL} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#fe2c55] rounded-full p-0.5 border-2 border-white">
            <Plus size={12} className="text-white" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Heart size={36} className="text-white fill-white drop-shadow-xl" />
          <span className="text-[12px] font-bold text-white mt-1 drop-shadow-md">1.2M</span>
        </div>

        <div className="flex flex-col items-center">
          <MessageCircle size={36} className="text-white fill-white drop-shadow-xl" />
          <span className="text-[12px] font-bold text-white mt-1 drop-shadow-md">45.8K</span>
        </div>

        <div className="flex flex-col items-center">
          <Share2 size={36} className="text-white fill-white drop-shadow-xl" />
          <span className="text-[12px] font-bold text-white mt-1 drop-shadow-md">92K</span>
        </div>

        <div className="mt-4 relative animate-spin-slow">
          <div className="w-12 h-12 rounded-full bg-zinc-800 border-[10px] border-zinc-900 flex items-center justify-center shadow-2xl">
            <div className="w-4 h-4 bg-zinc-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Informações Inferiores (ESQUERDA) */}
      <div className="absolute left-4 bottom-28 z-30 max-w-[75%] space-y-3 text-left">
        <div className="flex items-center gap-2">
           <h4 className="font-bold text-white text-[17px] drop-shadow-xl">@operador_invisivel</h4>
           <div className="bg-red-600 px-2 py-0.5 rounded animate-pulse">
              <span className="text-[8px] text-white font-black uppercase tracking-tighter">Ao Vivo</span>
           </div>
        </div>
        <p className="text-[15px] text-white leading-tight drop-shadow-xl font-medium italic animate-flicker">
          A PROVA ESTÁ AQUI. ELES NÃO PODEM APAGAR O QUE JÁ FOI VISTO. 🔓
        </p>
        <div className="flex items-center gap-2 pt-1">
          <Music size={14} className="text-white animate-pulse" />
          <div className="overflow-hidden w-44">
            <p className="text-xs text-white font-semibold whitespace-nowrap animate-marquee">
              Som Original - Operador Invisível — Som Original - Operador Invisível
            </p>
          </div>
        </div>
      </div>

      {/* Controle de Som */}
      <div className="absolute top-24 right-4 z-40">
        <button 
          onClick={toggleMute}
          className="p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl active:scale-90 transition-transform"
        >
          {isMuted ? <VolumeX className="text-red-500" size={22} /> : <Volume2 className="text-[#00ff41]" size={22} />}
        </button>
      </div>

      {/* Barra de Progresso Hacker */}
      <div className="absolute bottom-[5rem] left-0 w-full h-0.5 bg-white/10 z-30">
        <div className="h-full bg-[#00ff41] transition-all duration-300 shadow-[0_0_20px_#00ff41]" style={{ width: `${videoProgress}%` }} />
      </div>

      {/* Abas Inferiores Fixas */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-black border-t border-white/10 flex items-center justify-around px-2 pb-6 z-40">
        <div className="flex flex-col items-center text-white"><Home size={26} /><span className="text-[10px] mt-1 font-bold">Início</span></div>
        <div className="flex flex-col items-center text-white/40"><Search size={26} /><span className="text-[10px] mt-1 font-bold">Amigos</span></div>
        <div className="relative px-2">
           <div className="bg-white rounded-lg h-9 w-12 flex items-center justify-center relative">
              <div className="absolute -left-1.5 w-full h-full bg-[#69C9D0] rounded-lg -z-10" />
              <div className="absolute -right-1.5 w-full h-full bg-[#EE1D52] rounded-lg -z-10" />
              <PlusSquare size={24} className="text-black" />
           </div>
        </div>
        <div className="flex flex-col items-center text-white/40"><MessageCircle size={26} /><span className="text-[10px] mt-1 font-bold">Caixa</span></div>
        <div className="flex flex-col items-center text-white/40"><User size={26} /><span className="text-[10px] mt-1 font-bold">Perfil</span></div>
      </div>

      {/* Overlay de Encerramento (Sinal Perdido) */}
      {isVideoEnded && (
        <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 animate-fade-in">
          {/* Estática pesada de fundo */}
          <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWUoW9kf6/giphy.gif')] opacity-20 mix-blend-screen pointer-events-none" />
          
          <div className="w-full max-w-sm flex flex-col gap-10 relative z-10 text-center">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-red-600 p-6 rounded-full shadow-[0_0_60px_rgba(220,38,38,0.8)] animate-pulse">
                  <AlertCircle className="w-14 h-14 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="inline-block bg-white text-black px-4 py-1.5 rounded text-[11px] font-black uppercase tracking-widest shadow-xl">
                   CONEXÃO ENCERRADA PELO HOST
                </div>
                <h2 className="text-white text-4xl font-black italic uppercase leading-tight tracking-tighter glitch-text">Sinal Expirou</h2>
                <p className="text-zinc-400 text-base leading-relaxed px-4 font-medium italic">
                  O sistema detectou o vazamento e derrubou o sinal. Você tem 60 segundos para garantir seu acesso antes que seu IP seja bloqueado.
                </p>
              </div>
            </div>
            
            <button 
              onClick={onComplete}
              className="w-full bg-[#00ff41] text-black py-7 rounded-2xl font-black text-2xl flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(0,255,65,0.7)] uppercase tracking-tighter active:scale-95 transition-all animate-jump"
            >
              RECUPERAR ACESSO
              <ArrowRight size={28} />
            </button>

            <div className="flex flex-col items-center gap-3">
               <p className="text-[11px] text-[#00ff41] text-center uppercase tracking-[0.3em] font-black animate-pulse">SESSÃO FINALIZADA COM SUCESSO</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes glitch-container {
          0% { transform: translate(0); }
          2% { transform: translate(-2px, 2px); }
          4% { transform: translate(2px, -2px); }
          6% { transform: translate(0); }
          100% { transform: translate(0); }
        }
        .animate-glitch-container { animation: glitch-container 3s infinite; }

        @keyframes flicker {
          0% { opacity: 0.05; }
          5% { opacity: 0.15; }
          10% { opacity: 0.03; }
          15% { opacity: 0.1; }
          100% { opacity: 0.06; }
        }
        .animate-flicker { animation: flicker 0.1s infinite; }

        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(-1%, 1%); }
          40% { transform: translate(1%, -1%); }
        }
        .animate-noise { animation: noise 0.05s steps(1) infinite; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { display: inline-block; animation: marquee 10s linear infinite; }

        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }

        .glitch-text { text-shadow: 3px 0 #ff00c1, -3px 0 #00fff9; }
      `}</style>
    </div>
  );
};

export default TikTokHack;
