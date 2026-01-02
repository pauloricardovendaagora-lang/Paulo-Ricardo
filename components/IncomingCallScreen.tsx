
import React, { useEffect, useRef, useState } from 'react';
import { Phone, MessageSquare, Bell, Volume2, VolumeX, Signal, Wifi } from 'lucide-react';

const CALL_AUDIO_URL = 'https://res.cloudinary.com/dwhekgupo/video/upload/v1767214755/videoplayback_1_rwt1ix.mp4';

interface IncomingCallScreenProps {
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({ onAccept, onDecline }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ringtoneRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    // Inicializa o áudio (mesmo som da Etapa 4)
    ringtoneRef.current = new Audio(CALL_AUDIO_URL);
    ringtoneRef.current.loop = true;

    const playRingtone = () => {
      if (ringtoneRef.current && ringtoneRef.current.paused) {
        ringtoneRef.current.play().catch(e => console.log("Áudio aguardando interação", e));
      }
    };

    // Tenta tocar imediatamente
    playRingtone();

    // Listener para garantir que o áudio toque após qualquer interação se o autoplay for bloqueado
    const events = ['click', 'touchstart', 'mousedown'];
    events.forEach(event => window.addEventListener(event, playRingtone, { once: true }));

    // Atualiza o relógio
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    // Ativa vibração física se o navegador suportar
    const startVibration = () => {
      if ('vibrate' in navigator) {
        navigator.vibrate([400, 100, 400, 1500]);
      }
    };

    const vibrationInterval = setInterval(startVibration, 2500);
    startVibration();

    return () => {
      clearInterval(timer);
      clearInterval(vibrationInterval);
      if (ringtoneRef.current) {
        ringtoneRef.current.pause();
        ringtoneRef.current = null;
      }
      events.forEach(event => window.removeEventListener(event, playRingtone));
      if ('vibrate' in navigator) {
        navigator.vibrate(0);
      }
    };
  }, []);

  const handleAccept = () => {
    onAccept();
  };

  const handleDecline = () => {
    onDecline();
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-between py-20 px-10 relative overflow-hidden">
      {/* Barra de Status iOS 17 */}
      <div className="w-full flex justify-between items-center px-8 pt-4 absolute top-0 z-50">
        <span className="text-[15px] font-semibold drop-shadow-md">{currentTime}</span>
        <div className="flex items-center gap-1.5 drop-shadow-md">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-3 border border-white rounded-sm relative p-[1px]">
               <div className="h-full bg-white rounded-px" style={{ width: '85%' }}></div>
               <div className="absolute -right-1 top-1 w-0.5 h-1 bg-white rounded-r-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Vídeo de fundo em loop */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={CALL_AUDIO_URL}
          className="w-full h-full object-cover opacity-50 grayscale-[0.5]"
          loop
          muted
          autoPlay
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90" />
      </div>
      
      <div className="text-center mt-10 animate-slide-up z-10">
        <p className="text-gray-300 text-lg uppercase tracking-[0.25em] mb-2 font-medium opacity-90 drop-shadow-md">WhatsApp</p>
        <h1 className="text-[42px] font-bold tracking-tight leading-tight drop-shadow-2xl">Operador Invisível</h1>
      </div>

      <div className="w-full flex justify-around mb-8 text-white z-10">
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-all group-active:bg-white/10">
            <Bell className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] drop-shadow-sm">Lembrar</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-all group-active:bg-white/10">
            <MessageSquare className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] drop-shadow-sm">Mensagem</span>
        </div>
      </div>

      <div className="w-full flex justify-between items-center mb-12 px-2 z-10">
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={handleDecline}
            className="w-[78px] h-[78px] rounded-full bg-[#FF3B30] flex items-center justify-center active:scale-90 transition-all shadow-xl"
          >
            <Phone className="w-9 h-9 rotate-[135deg] fill-current text-white" />
          </button>
          <span className="text-[15px] font-semibold tracking-wide drop-shadow-md">Recusar</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={handleAccept}
            className="w-[78px] h-[78px] rounded-full bg-[#34C759] flex items-center justify-center active:scale-95 transition-all shadow-xl animate-vibrate"
          >
            <Phone className="w-9 h-9 fill-current text-white" />
          </button>
          <span className="text-[15px] font-semibold tracking-wide drop-shadow-md">Aceitar</span>
        </div>
      </div>

      <div className="absolute bottom-3 w-36 h-1.5 bg-white/40 rounded-full z-10" />
    </div>
  );
};

export default IncomingCallScreen;
