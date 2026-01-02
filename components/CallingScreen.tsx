
import React, { useState, useEffect, useRef } from 'react';
import { Phone, MicOff, Video, Speaker, Plus, Info, Signal, Wifi, VolumeX } from 'lucide-react';

const CALL_AUDIO_URL = 'https://res.cloudinary.com/dwhekgupo/video/upload/v1767325297/e0f3ee61-cb10-4db5-849c-7e7ccde9a54e_1_ycnfku.mp3';

interface CallingScreenProps {
  onComplete: () => void;
}

const CallingScreen: React.FC<CallingScreenProps> = ({ onComplete }) => {
  const [seconds, setSeconds] = useState(0);
  const [currentCaption, setCurrentCaption] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Roteiro sincronizado com o tempo exato do áudio
  const captions = [
    { time: 0, text: "Escuta..." },
    { time: 1, text: "Não posso falar muito." },
    { time: 2, text: "Eles estão me monitorando agora." },
    { time: 5, text: "Na real, eles monitoram o padrão de todos." },
    { time: 9, text: "Meu, seu, de todo mundo que tenta subir anúncio." },
    { time: 13, text: "A maior parte das pessoas que anunciam falham, queimam dinheiro achando que o problema é criativo ou a falta de orçamento." },
    { time: 21, text: "Eu saí da arena no dia que entendi o jogo." },
    { time: 24, text: "Não era sobre anunciar mais, era sobre jogar diferente." },
    { time: 29, text: "Isso pode até parecer conversa fiada mas venho a dias sofrendo ameaças." },
    { time: 34, text: "Eles realmente não querem que eu te mostre nada disso." },
    { time: 37, text: "Vou te mostrar o que eu faço todos os dias para ter ROI de 10x ou mais e com custo baixíssimo." },
    { time: 43, text: "E não vem com essa história de nutra na gringa." },
    { time: 47, text: "O que eu faço funciona para qualquer produto ou serviço info e até e-commerce." },
    { time: 52, text: "Vou te mostrar e depois sumir do radar." },
    { time: 57, text: "Eu tô correndo risco agora, os maiores players do mercado estão me caçando." },
    { time: 63, text: "Por isso presta atenção." },
    { time: 65, text: "Vou te mostrar onde deixei a prova." },
    { time: 68, text: "Agora você vai acessar meu tiktok." },
    { time: 70, text: "Esse perfil é restrito." },
    { time: 71, text: "Nem todo mundo tem acesso ele vai sair do ar a qualquer momento." },
    { time: 74, text: "Não perde essa chance agora." }
  ];

  useEffect(() => {
    // Inicia o áudio imediatamente
    audioRef.current = new Audio(CALL_AUDIO_URL);
    audioRef.current.play().catch(e => console.log("Autoplay bloqueado, aguardando interação", e));

    const timer = setInterval(() => {
      setSeconds(prev => {
        const next = prev + 1;
        // Finaliza após a última fala + pequeno tempo de leitura (total aprox 78s)
        if (next >= 78) {
          clearInterval(timer);
          onComplete();
        }
        return next;
      });
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onComplete]);

  useEffect(() => {
    // Encontra a legenda atual com base no tempo exato
    const active = [...captions].reverse().find(c => seconds >= c.time);
    if (active) {
      setCurrentCaption(active.text);
    }
  }, [seconds]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#1C1C1E] to-black flex flex-col items-center justify-between text-white relative">
      {/* Barra de Status iOS 17 */}
      <div className="w-full flex justify-between items-center px-8 pt-4 absolute top-0 z-50">
        <span className="text-[15px] font-semibold">{time}</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-3 border border-white/40 rounded-sm relative p-[1px]">
               <div className="h-full bg-white rounded-px" style={{ width: '65%' }}></div>
               <div className="absolute -right-1 top-1 w-0.5 h-1 bg-white/40 rounded-r-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Info do Contato */}
      <div className="text-center animate-slide-up mt-24">
        <h1 className="text-[34px] font-semibold mb-1 text-white">Operador Invisível</h1>
        <p className="text-[17px] text-gray-400 mb-2">celular</p>
        <p className="text-[20px] font-medium tabular-nums">{formatTime(seconds)}</p>
      </div>

      {/* Caixa de Legendas Dinâmicas */}
      <div className="w-full flex flex-col items-center gap-12 px-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 min-h-[160px] w-full flex items-center justify-center text-center italic text-lg border border-white/10 shadow-2xl transition-all duration-300">
           "{currentCaption || "Conectando sinal seguro..."}"
        </div>

        {/* Teclado de Chamada iOS */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-[300px]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
              <MicOff className="w-8 h-8" />
            </div>
            <span className="text-xs font-medium text-gray-300">mudo</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
              <Plus className="w-8 h-8" />
            </div>
            <span className="text-xs font-medium text-gray-300">adicionar</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
              <Video className="w-8 h-8" />
            </div>
            <span className="text-xs font-medium text-gray-300">FaceTime</span>
          </div>
          <button 
            onClick={toggleMute}
            className="flex flex-col items-center gap-2"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-[#34C759]'}`}>
              {isMuted ? <VolumeX className="w-8 h-8" /> : <Speaker className="w-8 h-8" />}
            </div>
            <span className={`text-xs font-medium ${isMuted ? 'text-red-500' : 'text-[#34C759]'}`}>
              {isMuted ? 'sem som' : 'viva-voz'}
            </span>
          </button>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
              <Info className="w-8 h-8" />
            </div>
            <span className="text-xs font-medium text-gray-300">contatos</span>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-40">
             <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-white/20"></div>
            </div>
            <span className="text-xs font-medium text-gray-300">teclado</span>
          </div>
        </div>
      </div>

      {/* Botão de Desligar */}
      <div className="pb-16">
        <button 
          onClick={onComplete}
          className="w-[72px] h-[72px] rounded-full bg-[#FF3B30] flex items-center justify-center active:scale-90 transition-transform shadow-xl"
        >
          <Phone className="w-8 h-8 rotate-[135deg] fill-current" />
        </button>
      </div>

      <div className="absolute bottom-2 w-32 h-1 bg-white/20 rounded-full"></div>
    </div>
  );
};

export default CallingScreen;
