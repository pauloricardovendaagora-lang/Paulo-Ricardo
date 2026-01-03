
import React from 'react';
import { 
  Play, 
  Bell, 
  MessageSquare, 
  PhoneIncoming, 
  Phone, 
  ShieldAlert, 
  Video, 
  Terminal, 
  LayoutDashboard, 
  Database, 
  ChevronRight, 
  ShoppingCart,
  Activity,
  Zap,
  Lock
} from 'lucide-react';

interface TestNavigationProps {
  onNavigate: (stage: any) => void;
}

const TestNavigation: React.FC<TestNavigationProps> = ({ onNavigate }) => {
  const stages = [
    { id: 'start', label: '00', title: 'Sessão Inicial', sub: 'Handshake Protocol', icon: Play, color: 'text-green-500', bg: 'bg-green-500/10', goal: 'ENTRY' },
    { id: 'notification', label: '01', title: 'Interrupção', sub: 'Notificação iOS 17', icon: Bell, color: 'text-blue-400', bg: 'bg-blue-400/10', goal: 'ATTENTION' },
    { id: 'whatsapp', label: '02', title: 'Engajamento', sub: 'WhatsApp Direct', icon: MessageSquare, color: 'text-[#25D366]', bg: 'bg-[#25D366]/10', goal: 'LEAD' },
    { id: 'incoming-call', label: '03', title: 'Escalada', sub: 'Incoming Voice Call', icon: PhoneIncoming, color: 'text-red-500', bg: 'bg-red-500/10', goal: 'INTERRUPT' },
    { id: 'call', label: '04', title: 'Doutrinação', sub: 'Operador Calling', icon: Phone, color: 'text-purple-400', bg: 'bg-purple-400/10', goal: 'RETENTION' },
    { id: 'hacking-login', label: '05', title: 'Credenciais', sub: 'Hacking Terminal', icon: ShieldAlert, color: 'text-orange-500', bg: 'bg-orange-500/10', goal: 'CURIOSITY' },
    { id: 'tiktok', label: '06', title: 'Prova Social', sub: 'TikTok Inversion', icon: Video, color: 'text-pink-500', bg: 'bg-pink-500/10', goal: 'VALIDATION' },
    { id: 'offer', label: '07', title: 'Revelação', sub: 'VSL / Sales Page', icon: LayoutDashboard, color: 'text-green-400', bg: 'bg-green-400/10', goal: 'PITCH' },
    { id: 'checkout', label: '08', title: 'Conversão', sub: 'Final Checkout', icon: ShoppingCart, color: 'text-yellow-500', bg: 'bg-yellow-500/10', goal: 'MONEY' },
  ];

  return (
    <div className="h-[100dvh] bg-black text-white font-mono relative flex flex-col overflow-hidden">
      {/* Background Decor Fixo */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-0" 
           style={{ backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Header Fixo */}
      <div className="p-6 pt-12 shrink-0 relative z-20 bg-black/80 backdrop-blur-md border-b border-[#00ff41]/20">
        <div className="flex flex-col items-center">
          <div className="bg-[#00ff41]/10 p-3 rounded-2xl border border-[#00ff41]/30 mb-3 shadow-[0_0_20px_rgba(0,255,65,0.2)]">
            <Terminal size={24} className="text-[#00ff41]" />
          </div>
          <h1 className="text-lg font-black uppercase tracking-tighter text-center italic">Comando Central</h1>
          <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse shadow-[0_0_5px_#00ff41]" />
              <p className="text-[#00ff41] text-[8px] uppercase tracking-[0.4em] font-black">ROOT_ACCESS_GRANTED</p>
          </div>
        </div>
      </div>

      {/* Grid de Navegação Rolável */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth px-6 py-6 relative z-10 custom-scrollbar">
        <div className="grid gap-3">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => onNavigate(stage.id)}
              className="w-full flex items-center justify-between bg-zinc-900/40 hover:bg-zinc-800/60 border border-white/5 p-4 rounded-2xl transition-all active:scale-[0.98] group relative overflow-hidden"
            >
              {/* Goal Indicator */}
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-zinc-800/80 rounded-bl-lg">
                <span className="text-[7px] font-black tracking-widest text-zinc-500 group-hover:text-[#00ff41] transition-colors">{stage.goal}</span>
              </div>

              <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stage.bg} ${stage.color} transition-all group-hover:scale-110 shadow-lg`}>
                    <stage.icon size={18} />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-zinc-600">STG.{stage.label}</span>
                        <div className="h-px w-4 bg-zinc-800" />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#00ff41] transition-colors uppercase">{stage.title}</span>
                    <span className="text-[9px] font-medium text-zinc-500 italic">{stage.sub}</span>
                  </div>
              </div>
              <ChevronRight size={16} className="text-zinc-700 group-hover:text-[#00ff41] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        {/* System Diagnostics */}
        <div className="mt-8 p-5 rounded-3xl bg-zinc-900/20 border border-dashed border-[#00ff41]/20">
          <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity size={12} className="text-[#00ff41]" />
                <h3 className="text-[9px] font-black uppercase tracking-widest text-zinc-500">System Logs</h3>
              </div>
              <span className="text-[8px] bg-[#00ff41]/10 text-[#00ff41] px-1.5 py-0.5 rounded">STABLE</span>
          </div>
          <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-bold uppercase">
                  <span className="text-zinc-600">Funnel Integrity:</span>
                  <span className="text-[#00ff41]">98.4%</span>
              </div>
              <div className="flex justify-between text-[9px] font-bold uppercase">
                  <span className="text-zinc-600">Active Handlers:</span>
                  <span className="text-white">Socket_v2.5</span>
              </div>
              <div className="flex justify-between text-[9px] font-bold uppercase">
                  <span className="text-zinc-600">Simulation:</span>
                  <span className="text-zinc-400">Production_Mirror</span>
              </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex gap-3">
            <button 
                onClick={() => onNavigate('start')}
                className="flex-1 py-4 bg-zinc-900/80 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center justify-center gap-2 active:bg-zinc-800"
            >
                <Lock size={12} />
                Reiniciar
            </button>
            <div className="bg-[#00ff41]/10 border border-[#00ff41]/20 rounded-2xl px-4 flex items-center justify-center">
                <Zap size={14} className="text-[#00ff41] animate-pulse" />
            </div>
        </div>

        {/* Safe Area Spacing */}
        <div className="h-10" />
      </div>

      {/* Scanlines Effect Fixo */}
      <div className="fixed inset-0 pointer-events-none z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-20" />
      
      {/* iOS Style Home Indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full pointer-events-none z-[110]" />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TestNavigation;
