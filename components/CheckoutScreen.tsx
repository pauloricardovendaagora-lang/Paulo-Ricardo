
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CreditCard, ChevronRight, Check, Star, Users, Clock, ArrowRight } from 'lucide-react';

const CheckoutScreen: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos em segundos
  const [activeUsers, setActiveUsers] = useState(142);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
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
    setIsProcessing(true);
    setTimeout(() => {
      // Link atualizado para o Checkout da Cakto
      window.location.href = 'https://pay.cakto.com.br/32ispaq_706676';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-y-auto pb-10">
      {/* Header Seguro */}
      <div className="bg-[#111] border-b border-white/5 py-4 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl bg-opacity-80">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-[#25D366]" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Checkout Seguro</span>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          <Clock size={14} className="text-red-500 animate-pulse" />
          <span className="text-[10px] font-black text-red-500 tabular-nums">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Banner de Reserva */}
      <div className="bg-[#25D366]/10 border-b border-[#25D366]/20 py-2 px-6 flex items-center justify-center gap-3">
        <Users size={14} className="text-[#25D366]" />
        <span className="text-[10px] font-bold text-[#25D366] uppercase tracking-widest">
          {activeUsers} usuários visualizando esta oferta agora
        </span>
      </div>

      <div className="p-6 space-y-8 max-w-sm mx-auto w-full">
        {/* Resumo do Produto */}
        <div className="space-y-4 animate-slide-up">
          <div className="bg-zinc-900/50 rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Lock size={120} />
            </div>
            <h2 className="text-2xl font-black italic uppercase leading-tight tracking-tighter mb-2">Sistema Operador Invisível</h2>
            
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-zinc-600 line-through text-lg font-bold">R$ 197,00</span>
              <span className="text-3xl font-black text-[#25D366]">R$ 67,00</span>
            </div>
            <p className="text-[#25D366] text-[10px] font-bold uppercase mt-1">Economia de R$ 130,00 aplicada via link restrito</p>
          </div>
        </div>

        {/* Benefícios Rápidos */}
        <div className="grid gap-3">
          {[
            'Acesso Imediato via E-mail',
            'Garantia Incondicional de 7 dias',
            'Área de Membros Criptografada'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <div className="bg-[#25D366]/20 p-1 rounded-full">
                <Check size={12} className="text-[#25D366]" />
              </div>
              {item}
            </div>
          ))}
        </div>

        {/* Formulário Simulado */}
        <div className="space-y-4 animate-slide-up delay-150">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-2">Informações de Acesso</label>
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-5 px-6 text-sm focus:outline-none focus:border-[#25D366] transition-all placeholder:text-zinc-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-2">Método de Pagamento</label>
            <div className="w-full">
              <div className="bg-[#25D366]/5 border border-[#25D366]/40 rounded-2xl p-4 flex items-center justify-between cursor-pointer shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#25D366] p-2 rounded-lg">
                    <span className="text-black font-black text-[10px]">PIX</span>
                  </div>
                  <span className="text-[12px] font-bold text-white uppercase tracking-tighter">Pagamento via PIX</span>
                </div>
                <span className="text-[9px] font-bold text-[#25D366] uppercase">Aprovação Imediata</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Finalização */}
        <div className="pt-4 space-y-4">
          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-[#25D366] text-black py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(37,211,102,0.3)] active:scale-95 transition-all group"
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                VALIDANDO...
              </div>
            ) : (
              <>
                FINALIZAR INSCRIÇÃO
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 py-2 border-t border-white/5">
             <div className="flex flex-col items-center">
               <span className="text-xl font-black italic">4.9/5</span>
               <div className="flex gap-0.5">
                 {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-[#25D366] text-[#25D366]" />)}
               </div>
             </div>
             <div className="h-8 w-px bg-white/5"></div>
             <p className="text-[9px] text-zinc-500 uppercase font-bold leading-tight tracking-widest text-center">
               Plataforma 100% segura <br /> Processado por Cakto
             </p>
          </div>
        </div>
      </div>

      {/* Footer Legal */}
      <div className="px-8 text-center space-y-2 opacity-30 mt-auto">
        <p className="text-[8px] uppercase tracking-widest">© 2025 Operador Invisível - Protocolo de Acesso Privado</p>
        <div className="flex justify-center gap-4 text-[8px] font-bold uppercase tracking-tighter">
          <span>Políticas</span>
          <span>Privacidade</span>
          <span>Termos</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
