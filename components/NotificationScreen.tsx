
import React, { useEffect, useState, useRef } from 'react';
import { ChevronUp, Signal, Wifi } from 'lucide-react';

const NOTIFICATION_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3';
const UNLOCK_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2556/2556-preview.mp3';

interface NotificationScreenProps {
  onAccept: () => void;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ onAccept }) => {
  const [visible, setVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const audioNotifyRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inicializa os áudios (já pré-carregados pelo App.tsx)
    audioNotifyRef.current = new Audio(NOTIFICATION_SOUND);
    audioUnlockRef.current = new Audio(UNLOCK_SOUND);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    // Notificação aparece após o fade-in da tela completar
    const notificationTimer = setTimeout(() => {
      setVisible(true);
      if (audioNotifyRef.current) {
        audioNotifyRef.current.play().catch(e => console.warn("Erro ao tocar som", e));
      }
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }, 1200);

    return () => {
      clearInterval(timer);
      clearTimeout(notificationTimer);
    };
  }, []);

  const handleInteraction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioUnlockRef.current) {
      audioUnlockRef.current.currentTime = 0;
      audioUnlockRef.current.play().catch(e => console.log("Áudio bloqueado", e));
    }
    
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    setTimeout(onAccept, 400);
  };

  const bgStyle = { 
    backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div 
      className="h-screen w-full relative flex flex-col items-center justify-start pt-14 px-4 overflow-hidden"
      style={bgStyle}
    >
      {/* Barra de Status iOS 17 */}
      <div className="w-full flex justify-between items-center px-8 pt-3 pb-1 absolute top-0 z-50">
        <div className="flex items-center gap-1">
          <span className="text-[14px] font-bold text-white/90">Vivo</span>
          <Signal className="w-3 h-3 text-white/90" />
        </div>
        <div className="flex items-center gap-1.5">
          <Wifi className="w-4 h-4 text-white/90" />
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-3 border border-white/40 rounded-sm relative p-[1px]">
               <div className="h-full bg-white/90 rounded-px" style={{ width: '82%' }}></div>
               <div className="absolute -right-1 top-1 w-0.5 h-1 bg-white/40 rounded-r-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay escuro leve para leitura */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px] pointer-events-none" />

      {/* Relógio iOS */}
      <div className="relative z-10 text-center mt-12 mb-10 animate-slide-up">
        <p className="text-white/90 text-xl font-medium mb-1 drop-shadow-md tracking-tight">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <h2 className="text-white text-8xl font-bold tracking-tighter drop-shadow-2xl">
          {currentTime}
        </h2>
      </div>

      {/* Banner de Notificação WhatsApp */}
      <div 
        className={`w-full max-w-[380px] bg-white/10 backdrop-blur-3xl rounded-[28px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-700 transform z-20 active:scale-95 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#25D366] rounded-md flex items-center justify-center p-0.5">
              <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
            </div>
            <span className="text-[12px] font-bold text-white/70 uppercase tracking-wider">WhatsApp</span>
          </div>
          <span className="text-[12px] text-white/60">agora</span>
        </div>
        <div>
          <h4 className="font-bold text-white text-[15px]">Operador Invisível</h4>
          <p className="text-white/90 text-[15px] leading-tight mt-0.5">vc não devia ter chegado até aqui</p>
        </div>
      </div>

      {/* Botão de Desbloqueio */}
      <div 
        onClick={handleInteraction}
        className="absolute bottom-32 left-0 right-0 flex flex-col items-center z-30 cursor-pointer animate-bounce"
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-full flex flex-col items-center gap-1 shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-90 transition-transform">
          <ChevronUp className="text-white w-6 h-6" />
          <p className="text-white font-black text-[11px] uppercase tracking-[0.4em] drop-shadow-md">
            Toque para desbloquear
          </p>
        </div>
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center pb-2">
        <div className="w-32 h-1.5 bg-white/30 rounded-full" />
      </div>
    </div>
  );
};

export default NotificationScreen;
