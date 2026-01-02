
import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, CreditCard, ChevronRight, Check, Star, Users, Clock, ArrowRight, User, Phone, Mail } from 'lucide-react';

const CLICK_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2556/2556-preview.mp3';

const CheckoutScreen: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos em segundos
  const [activeUsers, setActiveUsers] = useState(142);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(CLICK_SOUND);
    audioRef.current.load();

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const userInterval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(userInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePayment = () => {
    if (isProcessing) return;

    // Tocar som de confirmação no clique
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Áudio bloqueado", e));
    }

    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    setIsProcessing(true);
    
    // Simula uma pequena validação/atraso para aumentar a percepção de valor
    setTimeout(() => {
      // Link do Checkout da Cakto
      window.location.href = 'https://pay.cakto.com.br/32ispaq_706676';
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white font-sans relative">
      {/* Background decorativo estático */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-500/5 via-transparent to-transparent z-0" />
      
      {/* Header Fixo de Segurança */}
      <div className="bg-[#111]/90 border-b border-white/5 py-4 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-[#25D366]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Checkout Criptografado</span>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <Clock size={14} className="text-red-500 animate-pulse" />
          <span className="text-[11px] font-black text-red-500 tabular-nums">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Banner de Urgência Social */}
      <div className="bg-[#25D366]/10 border-b border-[#25D366]/20 py-2.5 px-6 flex items-center justify-center gap-3 relative z-10">
        <Users size={14} className="text-[#25D366]" />
        <span className="text-[10px] font-bold text-[#25D366] uppercase tracking-widest text-center">
          {activeUsers} Operadores estão tentando acessar essa vaga agora
        </span>
      </div>

      {/* Área de Conteúdo Rolável */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10">
        <div className="p-6 pb-24 space-y-8 max-w-sm mx-auto w-full animate-slide-up">
          
          {/* Resumo da Oferta */}
          <div className="bg-zinc-900/40 rounded-[2.5rem] p-7 border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <Lock size={120} />
            </div>
            <div className="relative z-10">
              <span className="text-[9px] font-black text-[#25D366] uppercase tracking-[0.3em] mb-2 block">Protocolo Ativado</span>
              <h2 className="text-2xl font-black italic uppercase leading-none tracking-tighter mb-4">Sistema Operador Invisível</h2>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-zinc-600 line-through text-lg font-bold">R$ 197,00</span>
                  <span className="text-3xl font-black text-[#25D366]">R$ 67,00</span>
                </div>
                <p className="text-[#25D366] text-[10px] font-black uppercase tracking-tighter opacity-80">
                  Desconto de 65% liberado para o seu IP
                </p>
              </div>
            </div>
          </div>

          {/* Formulário de Identificação */}
          <div className="space-y-6">
            <div className="flex flex-col gap-1 px-2">
              <h3 className="text-[11px] uppercase font-black tracking-[0.3em] text-zinc-500">Dados de Ativação</h3>
              <div className="h-px w-10 bg-green-500/30"></div>
            </div>

            <div className="space-y-4">
              {/* Campo Nome */}
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Primeiro Nome" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 transition-all placeholder:text-zinc-600 font-medium"
                />
              </div>

              {/* Campo Telefone */}
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Phone size={18} />
                </div>
                <input 
                  type="tel" 
                  placeholder="WhatsApp (com DDD)" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 transition-all placeholder:text-zinc-600 font-medium"
                />
              </div>

              {/* Campo E-mail */}
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 transition-all placeholder:text-zinc-600 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Opção de Pagamento */}
          <div className="space-y-4">
            <div className="bg-[#25D366]/5 border border-[#25D366]/30 rounded-[2rem] p-5 flex items-center justify-between shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="bg-[#25D366] p-2.5 rounded-xl shadow-[0_0_15px_rgba(37,211,102,0.4)]">
                  <CreditCard size={20} className="text-black" />
                </div>
                <div>
                  <span className="text-[13px] font-black text-white uppercase tracking-tighter block leading-none">Pagamento via PIX</span>
                  <span className="text-[10px] font-bold text-[#25D366] uppercase mt-1 block">Aprovação em segundos</span>
                </div>
              </div>
              <div className="bg-green-500/20 w-5 h-5 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#25D366] rounded-full shadow-[0_0_8px_#25D366]"></div>
              </div>
            </div>
          </div>

          {/* Botão de Finalização com CTA forte */}
          <div className="pt-4 space-y-6">
            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-7 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-3 transition-all relative overflow-hidden active:scale-95 shadow-[0_20px_60px_rgba(37,211,102,0.4)] ${
                isProcessing ? 'bg-zinc-800 text-zinc-500' : 'bg-[#25D366] text-black hover:brightness-110 animate-bounce-subtle'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                  VALIDANDO...
                </div>
              ) : (
                <>
                  ATIVAR MEU ACESSO
                  <ChevronRight size={28} className="animate-pulse" />
                </>
              )}
            </button>

            {/* Garantias e Prova Social */}
            <div className="flex items-center justify-between py-6 border-t border-white/5">
               <div className="flex flex-col items-start">
                 <div className="flex gap-0.5 mb-1">
                   {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-[#25D366] text-[#25D366]" />)}
                 </div>
                 <span className="text-[11px] font-black italic">4.9/5 Avaliações</span>
               </div>
               <div className="h-10 w-px bg-white/5"></div>
               <div className="text-right">
                 <p className="text-[9px] text-zinc-500 uppercase font-black leading-tight tracking-[0.2em]">
                   Ambiente 100% Seguro <br /> <span className="text-white">Processado por Cakto</span>
                 </p>
               </div>
            </div>

            {/* Footer de Segurança */}
            <div className="text-center space-y-3 opacity-40">
              <p className="text-[8px] uppercase tracking-[0.4em] font-bold">
                Criptografia Militar 256-bit AES <br/> 
                Protocolo de Segurança Ativo para {new Date().getFullYear()}
              </p>
              <div className="flex justify-center gap-6 text-[8px] font-black uppercase tracking-tighter">
                <span>Termos de Uso</span>
                <span>Políticas de Privacidade</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Home Indicator iOS Style Fixo */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/10 rounded-full pointer-events-none z-50" />
      
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .glitch-text { text-shadow: 3px 0 #ff00c1, -3px 0 #00fff9; }
        
        /* Ajuste para evitar o corte do botão em mobile browsers */
        @supports (-webkit-touch-callout: none) {
          .min-h-screen { min-height: -webkit-fill-available; }
        }
      `}</style>
    </div>
  );
};

export default CheckoutScreen;
