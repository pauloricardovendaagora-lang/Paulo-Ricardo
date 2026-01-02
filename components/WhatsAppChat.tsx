
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Phone, Video, MoreVertical, Send, Mic, Plus, Camera, CheckCheck, Signal, Wifi } from 'lucide-react';
import { Message } from '../types';

const MESSAGE_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3';
const PROFILE_IMAGE_URL = 'https://res.cloudinary.com/dwhekgupo/image/upload/v1767325801/avatar_haker_ads_p3zmug.jpg';

interface WhatsAppChatProps {
  onComplete: () => void;
  onExit: () => void;
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ onComplete, onExit }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inicializa o áudio
    audioRef.current = new Audio(MESSAGE_SOUND_URL);
    
    // Atualiza o relógio da barra de status
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Áudio bloqueado pelo navegador", e));
    }
  };

  const fullCopy = [
    { text: "vc não devia ter chegado até aqui", delay: 800 },
    { text: "isso já passou do ponto de curiosidade", delay: 1000 },
    { text: "se alguém perceber", delay: 800 },
    { text: "o acesso cai", delay: 1200 },
    { text: "e eu desapareço", delay: 1500, read: true },
    { text: "então presta atenção", delay: 800 },
    { text: "o sistema não foi feito pra vc ganhar", delay: 800 },
    { text: "foi feito pra vc gastar", delay: 1200 },
    { text: "eu descobri como jogar fora disso", delay: 1500 },
    { text: "mas isso não pode vazar", delay: 1200 },
    { text: "se vc continuar", delay: 1000 },
    { text: "é pq aceita jogar invisível", delay: 1200 },
    { text: "depois de entender tudo que tenho para te mostrar você ira anunciar com custo baixo e ter roi absurdos", delay: 1800 },
    { text: "vou te mostrar como, você só precisa garantir que vai ficar em silêncio", delay: 1500, read: true },
  ];

  useEffect(() => {
    let currentStep = 0;

    const addMessage = async () => {
      if (currentStep >= fullCopy.length) {
        setShowChoices(true);
        return;
      }

      const step = fullCopy[currentStep];

      // Exibe status digitando antes de CADA mensagem
      setIsTyping(true);
      const typingTime = Math.min(Math.max(step.text.length * 25, 1200), 3000);
      await new Promise(r => setTimeout(r, typingTime));
      setIsTyping(false);

      const newMessage: Message = {
        id: Date.now().toString(),
        text: step.text,
        sender: 'operator',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: step.read ? 'read' : 'delivered'
      };

      setMessages(prev => [...prev, newMessage]);
      playSound(); 
      currentStep++;

      setTimeout(addMessage, step.delay);
    };

    addMessage();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showChoices]);

  return (
    <div className="flex flex-col h-screen bg-[#0b141a] relative overflow-hidden">
      {/* Background Pattern Overlay (Dark) */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none ios-bg-whatsapp filter invert"></div>

      {/* Barra de Status iOS 17 - Dark Mode */}
      <div className="w-full flex justify-between items-center px-8 pt-3 pb-1 absolute top-0 z-50 bg-[#1c1c1e]/90 backdrop-blur-xl border-b border-white/5">
        <span className="text-[14px] font-bold text-white">{currentTime}</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-4 h-4 text-white" />
          <Wifi className="w-4 h-4 text-white" />
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-3 border border-white/40 rounded-sm relative p-[1px]">
               <div className="h-full bg-white rounded-px" style={{ width: '82%' }}></div>
               <div className="absolute -right-1 top-1 w-0.5 h-1 bg-white/40 rounded-r-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Header do WhatsApp - Dark Mode */}
      <div className="bg-[#1c1c1e]/95 backdrop-blur-xl border-b border-white/10 pt-12 pb-2 px-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-1">
          <ChevronLeft className="text-[#007aff] w-8 h-8 cursor-pointer" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white overflow-hidden border border-white/5 shadow-lg">
               <img src={PROFILE_IMAGE_URL} alt="Operator" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-[17px] font-semibold text-white leading-tight tracking-tight">Operador Invisível</h1>
              <p className="text-[12px] text-[#8696a0] leading-tight">
                {isTyping ? 'escrevendo...' : 'online'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 text-[#007aff]">
          <Video className="w-6 h-6" />
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-6 h-6 text-[#007aff]" />
        </div>
      </div>

      {/* Chat Area - Dark Mode */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 pt-6 space-y-3 scroll-smooth relative z-0"
      >
        <div className="flex justify-center mb-6">
          <span className="bg-[#182229]/80 backdrop-blur-md text-[#ffd279]/80 text-[11px] px-3 py-1.5 rounded-lg shadow-sm uppercase font-bold tracking-wider border border-white/5">
            🔒 Criptografia de ponta a ponta
          </span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col animate-slide-up">
            <div className={`max-w-[85%] rounded-xl p-2.5 relative shadow-md ${
              msg.sender === 'user' 
              ? 'bg-[#005c4b] self-end rounded-tr-none' 
              : 'bg-[#202c33] self-start rounded-tl-none border border-white/5'
            }`}>
              <p className="text-[15.5px] text-white pr-12 leading-relaxed tracking-tight">{msg.text}</p>
              <div className="absolute bottom-1 right-2 flex items-center gap-1">
                <span className="text-[10px] text-white/50">{msg.timestamp}</span>
                {msg.sender === 'operator' && (
                  <CheckCheck className={`w-3.5 h-3.5 ${msg.status === 'read' ? 'text-[#53bdeb]' : 'text-white/40'}`} />
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="bg-[#202c33] self-start border border-white/5 rounded-xl rounded-tl-none p-3 shadow-md flex items-center gap-1.5 animate-pulse mb-2">
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></div>
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></div>
          </div>
        )}

        {showChoices && (
          <div className="space-y-4 pt-8 pb-10 animate-slide-up">
            <button 
              onClick={onComplete}
              className="w-full bg-[#25D366] text-black py-5 rounded-2xl font-black text-xl hover:brightness-110 active:scale-95 transition-all shadow-[0_15px_35px_rgba(37,211,102,0.3)] animate-jump flex items-center justify-center gap-2"
            >
              ➡️ Continuar em silêncio
            </button>
            <button 
              onClick={onExit}
              className="w-full bg-white/5 backdrop-blur-md text-red-500 py-4 rounded-xl font-bold text-lg border border-red-500/20 hover:bg-red-500/10 active:scale-95 transition-all shadow-sm"
            >
              ➡️ Sair agora
            </button>
          </div>
        )}
      </div>

      {/* Footer Input Bar - Dark Mode */}
      <div className="bg-[#1c1c1e] px-2 py-3 pb-10 flex items-center gap-3 border-t border-white/5 relative z-10">
        <Plus className="text-[#007aff] w-7 h-7" />
        <div className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center justify-between">
          <span className="text-white/30 text-[15px]">Mensagem</span>
          <div className="flex items-center gap-2">
            {isTyping && <span className="text-[9px] text-[#25D366] font-black animate-pulse uppercase tracking-widest">Digitando...</span>}
            <Send className="text-white/10 w-5 h-5" />
          </div>
        </div>
        <Camera className="text-[#007aff] w-7 h-7" />
        <Mic className="text-[#007aff] w-7 h-7" />
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20" />
    </div>
  );
};

export default WhatsAppChat;
