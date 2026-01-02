
import React from 'react';
import { Play, Bell, MessageSquare, PhoneIncoming, Phone, ShieldAlert, Video, ShoppingCart, Terminal } from 'lucide-react';

interface TestNavigationProps {
  onNavigate: (stage: any) => void;
}

const TestNavigation: React.FC<TestNavigationProps> = ({ onNavigate }) => {
  const stages = [
    { id: 'start', label: 'Início (Sessão Criptografada)', icon: Play, color: 'bg-green-500' },
    { id: 'notification', label: 'Etapa 1: Notificação iOS', icon: Bell, color: 'bg-blue-500' },
    { id: 'whatsapp', label: 'Etapa 2: Chat WhatsApp', icon: MessageSquare, color: 'bg-[#25D366]' },
    { id: 'incoming-call', label: 'Etapa 3: Chamada Recebida', icon: PhoneIncoming, color: 'bg-red-500' },
    { id: 'call', label: 'Etapa 4: Conversa Operador', icon: Phone, color: 'bg-zinc-700' },
    { id: 'hacking-login', label: 'Etapa 5: Terminal Hacking', icon: ShieldAlert, color: 'bg-orange-500' },
    { id: 'tiktok', label: 'Etapa 6: TikTok Hackeado', icon: Video, color: 'bg-pink-500' },
    { id: 'offer', label: 'Etapa 7: Oferta Final', icon: ShoppingCart, color: 'bg-purple-500' },
  ];

  return (
    <div className="h-screen bg-[#0a0a0a] text-white p-8 overflow-y-auto font-mono">
      <div className="flex flex-col items-center mb-10 pt-8">
        <div className="bg-[#00ff41]/10 p-3 rounded-2xl border border-[#00ff41]/30 mb-4">
          <Terminal size={40} className="text-[#00ff41]" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter text-center">Dashboard de Testes</h1>
        <p className="text-[#00ff41] text-[10px] uppercase tracking-[0.3em] font-bold mt-2">Operador Invisível v1.0</p>
      </div>

      <div className="grid gap-3">
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => onNavigate(stage.id)}
            className="w-full flex items-center gap-4 bg-zinc-900/50 hover:bg-zinc-800 border border-white/5 p-4 rounded-2xl transition-all active:scale-95 group"
          >
            <div className={`p-3 rounded-xl ${stage.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all`}>
              <stage.icon size={24} className={stage.color.replace('bg-', 'text-')} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold tracking-tight">{stage.label}</span>
              <span className="text-[9px] uppercase opacity-40 tracking-widest">Jump to {stage.id}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-zinc-900/30 border border-dashed border-white/10">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 text-center">Instruções de Teste</h3>
        <ul className="text-[10px] space-y-2 text-zinc-400">
          <li className="flex gap-2"><span>•</span> Use o botão "Debug Menu" no topo de cada tela para voltar aqui.</li>
          <li className="flex gap-2"><span>•</span> Certifique-se de interagir com a página para liberar o áudio automático.</li>
          <li className="flex gap-2"><span>•</span> Teste as transições de saída (Recusar/Sair) para validar o fluxo negativo.</li>
        </ul>
      </div>

      <div className="h-20" /> {/* Espaçador final */}
    </div>
  );
};

export default TestNavigation;
