
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Phone, Video, MoreVertical, Send, Mic, Plus, Camera, CheckCheck, Signal, Wifi, Play, Pause, Loader2 } from 'lucide-react';
import { Message } from '../types';

const MESSAGE_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3';
const PROFILE_IMAGE_URL = 'https://res.cloudinary.com/dwhekgupo/image/upload/v1767325801/avatar_haker_ads_p3zmug.jpg';
const VOICE_NOTE_URL = 'https://res.cloudinary.com/dwhekgupo/video/upload/v1767454353/a66c8668-6c2e-416e-8ef8-ad1bf40908f4_1_hyt4hm.mp3';

interface WhatsAppChatProps {
  onComplete: () => void;
  onExit: () => void;
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ onComplete, onExit }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState('0:00');
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const notifyAudioRef = useRef<HTMLAudioElement | null>(null);
  const voicePlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    notifyAudioRef.current = new Audio(MESSAGE_SOUND_URL);
    notifyAudioRef.current.load();

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => {
      clearInterval(timer);
      if (voicePlayerRef.current) {
        voicePlayerRef.current.pause();
        voicePlayerRef.current = null;
      }
    };
  }, []);

  const playNotifySound = () => {
    if (notifyAudioRef.current) {
      notifyAudioRef.current.currentTime = 0;
      notifyAudioRef.current.play().catch(() => {});
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
    { text: "é pq aceita jogar invisível", delay: 1200, read: true },
    { type: 'audio', audioUrl: VOICE_NOTE_URL, delay: 2000, read: true }
  ];

  useEffect(() => {
    let currentStep = 0;
    const addMessage = async () => {
      if (currentStep >= fullCopy.length) {
        setShowChoices(true);
        return;
      }

      const step = fullCopy[currentStep];
      setIsTyping(true);
      
      const typingTime = step.type === 'audio' ? 2000 : Math.min(Math.max((step.text?.length || 0) * 25, 1200), 3000);
      await new Promise(r => setTimeout(r, typingTime));
      setIsTyping(false);

      const newMessage: Message = {
        id: Date.now().toString(),
        text: step.text,
        audioUrl: step.audioUrl,
        type: (step.type as any) || 'text',
        sender: 'operator',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: step.read ? 'read' : 'delivered'
      };

      setMessages(prev => [...prev, newMessage]);
      playNotifySound(); 
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

  const formatAudioTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVoiceNote = (id: string, url: string) => {
    if (playingAudioId === id && voicePlayerRef.current) {
      voicePlayerRef.current.pause();
      setPlayingAudioId(null);
      return;
    }

    if (voicePlayerRef.current) {
      voicePlayerRef.current.pause();
      voicePlayerRef.current = null;
    }

    setLoadingAudioId(id);
    
    const audio = new Audio(url);
    audio.preload = "auto";
    voicePlayerRef.current = audio;

    audio.ontimeupdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(progress);
        setAudioCurrentTime(formatAudioTime(audio.currentTime));
      }
    };

    audio.oncanplaythrough = () => {
      setLoadingAudioId(null);
      setPlayingAudioId(id);
    };

    audio.onended = () => {
      setPlayingAudioId(null);
      setAudioProgress(0);
      setAudioCurrentTime('0:00');
    };

    audio.onerror = () => {
      setLoadingAudioId(null);
      setPlayingAudioId(null);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setLoadingAudioId(null);
        setPlayingAudioId(null);
      });
    }
  };

  // Waveform de alta densidade para visual premium
  const waveformHeights = [25, 40, 15, 55, 30, 70, 20, 45, 35, 80, 25, 60, 40, 75, 20, 50, 30, 85, 40, 65, 30, 55, 25, 75, 45, 90, 25, 60, 40, 70, 30, 50, 25, 45, 15, 55, 30, 65, 40, 75, 20, 45, 35, 50, 25];

  return (
    <div className="flex flex-col h-screen bg-[#0b141a] relative overflow-hidden">
      {/* iOS 17 Status Bar */}
      <div className="w-full flex justify-between items-center px-8 pt-3 pb-1 absolute top-0 z-50 bg-[#1c1c1e]/90 backdrop-blur-xl border-b border-white/5">
        <span className="text-[14px] font-bold text-white">{currentTime}</span>
        <div className="flex items-center gap-1.5 text-white">
          <Signal size={14} />
          <Wifi size={14} />
          <div className="w-6 h-3 border border-white/40 rounded-sm relative p-[1px]">
             <div className="h-full bg-white rounded-px w-[82%]"></div>
          </div>
        </div>
      </div>

      {/* Header WhatsApp */}
      <div className="bg-[#1c1c1e]/95 backdrop-blur-xl border-b border-white/10 pt-12 pb-2 px-3 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-1">
          <ChevronLeft className="text-[#007aff] w-8 h-8 cursor-pointer" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden border border-white/5 shadow-lg">
               <img src={PROFILE_IMAGE_URL} alt="Operator" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-[17px] font-semibold text-white leading-tight">Operador Invisível</h1>
              <p className="text-[12px] text-[#25D366] leading-tight font-medium">
                {isTyping ? 'escrevendo...' : 'online'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 text-[#007aff]">
          <Video className="w-6 h-6" />
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-6 h-6" />
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 pt-6 space-y-4 scroll-smooth bg-[url('https://res.cloudinary.com/dwhekgupo/image/upload/v1737042045/bg_chat_whatsapp_pmnmty.png')] bg-repeat bg-[length:400px]">
        <div className="flex justify-center mb-6">
          <span className="bg-[#182229]/95 backdrop-blur-md text-[#ffd279]/80 text-[11px] px-3 py-1.5 rounded-lg shadow-sm uppercase font-bold tracking-wider border border-white/5">
            🔒 Criptografia de ponta a ponta
          </span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col animate-slide-up">
            <div className={`max-w-[92%] rounded-2xl p-2 relative shadow-md transition-all duration-300 ${
              msg.sender === 'user' ? 'bg-[#005c4b] self-end rounded-tr-none' : 'bg-[#202c33] self-start rounded-tl-none border border-white/5'
            }`}>
              
              {msg.type === 'audio' ? (
                <div className="flex items-center gap-3 p-1.5 min-w-[280px]">
                  {/* Avatar com Badge de Microfone */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 grayscale shadow-lg">
                      <img src={PROFILE_IMAGE_URL} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 bg-[#202c33] p-0.5 rounded-full shadow-md">
                      <Mic size={14} className="text-[#25D366]" fill="currentColor" />
                    </div>
                  </div>

                  {/* Player de Áudio */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                      {/* Botão Play/Pause Circular */}
                      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                        <button 
                          onClick={() => toggleVoiceNote(msg.id, msg.audioUrl!)}
                          className="text-white relative z-10 active:scale-90 transition-transform"
                        >
                          {loadingAudioId === msg.id ? (
                            <Loader2 className="animate-spin w-6 h-6 text-[#25D366]" />
                          ) : (
                            playingAudioId === msg.id ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" className="ml-1" />
                          )}
                        </button>
                        
                        {/* Círculo de Progresso */}
                        <svg className="absolute inset-0 -rotate-90 w-full h-full">
                          <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" fill="none" />
                          {(playingAudioId === msg.id || loadingAudioId === msg.id) && (
                            <circle
                              cx="20"
                              cy="20"
                              r="18"
                              stroke="#25D366"
                              strokeWidth="2.5"
                              fill="none"
                              strokeDasharray="113"
                              strokeDashoffset={113 - (113 * audioProgress) / 100}
                              strokeLinecap="round"
                              className="transition-all duration-150 ease-linear"
                            />
                          )}
                        </svg>
                      </div>

                      {/* Waveform Dinâmica */}
                      <div className="flex-1 flex items-end gap-[1.5px] h-7 relative">
                        {waveformHeights.map((h, i) => {
                          const barProgress = (i / waveformHeights.length) * 100;
                          const isPlayed = playingAudioId === msg.id && barProgress < audioProgress;
                          return (
                            <div 
                              key={i} 
                              className={`flex-1 rounded-full transition-all duration-300 ${
                                isPlayed ? 'bg-[#53bdeb]' : 'bg-zinc-600'
                              } ${playingAudioId === msg.id ? 'animate-pulse' : ''}`} 
                              style={{ 
                                height: `${h}%`,
                                minHeight: '2px'
                              }} 
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Meta Info Áudio */}
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] text-zinc-400 font-bold tabular-nums">
                        {playingAudioId === msg.id ? audioCurrentTime : '1:16'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-white/30 font-medium">{msg.timestamp}</span>
                        <CheckCheck className="w-4 h-4 text-[#53bdeb]" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[15.5px] text-white pr-12 pl-1 leading-relaxed">{msg.text}</p>
                  <div className="absolute bottom-1 right-2 flex items-center gap-1">
                    <span className="text-[10px] text-white/40">{msg.timestamp}</span>
                    <CheckCheck className={`w-3.5 h-3.5 ${msg.status === 'read' ? 'text-[#53bdeb]' : 'text-white/30'}`} />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="bg-[#202c33] self-start border border-white/5 rounded-xl rounded-tl-none p-3 flex items-center gap-1.5 animate-pulse shadow-md">
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></div>
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></div>
          </div>
        )}

        {showChoices && (
          <div className="space-y-4 pt-10 pb-10 animate-slide-up">
            <button onClick={onComplete} className="w-full bg-[#25D366] text-black py-5 rounded-2xl font-black text-xl shadow-[0_15px_35px_rgba(37,211,102,0.3)] animate-jump flex items-center justify-center gap-2">
              ➡️ Continuar em silêncio
            </button>
            <button onClick={onExit} className="w-full bg-white/5 text-red-500 py-4 rounded-xl font-bold border border-red-500/20 active:bg-red-500/10 transition-colors">
              ➡️ Sair agora
            </button>
          </div>
        )}
      </div>

      {/* Footer Bar WhatsApp */}
      <div className="bg-[#1c1c1e] px-2 py-3 pb-10 flex items-center gap-3 border-t border-white/5 relative z-10 shrink-0">
        <Plus className="text-[#007aff] w-7 h-7" />
        <div className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center justify-between">
          <span className="text-white/30 text-[15px]">Mensagem</span>
          <Send className="text-white/10 w-5 h-5" />
        </div>
        <div className="flex items-center gap-4 text-[#007aff] px-1">
          <Camera className="w-7 h-7" />
          <Mic className="w-7 h-7" />
        </div>
      </div>

      {/* Home Indicator iOS */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20" />
    </div>
  );
};

export default WhatsAppChat;
