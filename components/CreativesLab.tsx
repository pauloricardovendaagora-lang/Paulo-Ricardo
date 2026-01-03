
import React, { useState } from 'react';
import { Terminal, Image as ImageIcon, Video, FileText, ChevronLeft, Eye, Layout, Share2, Download, Zap, Clipboard, Check, Monitor } from 'lucide-react';

interface CreativesLabProps {
  onBack: () => void;
}

const CreativesLab: React.FC<CreativesLabProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'visuals' | 'copy' | 'simulation'>('copy');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const assets = [
    { type: 'video', name: 'TikTok Hack Principal', url: 'https://res.cloudinary.com/dwhekgupo/video/upload/v1767314238/copy_84BC7A6C-989A-47D5-8C8F-86536831B5E9_lp9zcu.mp4' },
    { type: 'image', name: 'Avatar do Operador', url: 'https://res.cloudinary.com/dwhekgupo/image/upload/v1767325801/avatar_haker_ads_p3zmug.jpg' },
    { type: 'image', name: 'Wallpaper Notificação', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' }
  ];

  const creativeScripts = [
    {
      id: 1,
      title: "CRIATIVO 01 — O MAPA DO ERRO",
      scenes: [
        { label: "HOOK", text: "Todo mundo acredita que tráfego é seguir boas práticas. É por isso que quase todo mundo perde.", visual: "Corte rápido de dashboards de anúncio ficando vermelhos." },
        { label: "MECANISMO", text: "O sistema não pune quem erra. Pune quem pode ser lido. Quando a estrutura se repete, o custo sobe.", visual: "Efeito de radar escaneando uma grade de rostos genéricos." },
        { label: "CTA", text: "Se você captou isso, entra agora. A próxima parte não fica exposta.", visual: "Botão pulsante verde em fundo preto absoluto." }
      ]
    },
    {
      id: 2,
      title: "CRIATIVO 02 — SINAIS FRAGMENTADOS",
      scenes: [
        { label: "HOOK", text: "Quando você faz tudo certinho, você não está seguro. Está totalmente mapeado.", visual: "Close no olho de um operador refletindo linhas de código." },
        { label: "INVERSÃO", text: "Os grandes players não competem por criatividade. Competem por invisibilidade.", visual: "Silhueta de um homem em terno sumindo em fumaça digital." },
        { label: "CTA", text: "Clique para fragmentar sua estrutura antes da próxima leitura do bot.", visual: "Efeito de glitch destruindo o logo de uma rede social." }
      ]
    },
    {
      id: 3,
      title: "CRIATIVO 03 — A ARENA VISÍVEL",
      scenes: [
        { label: "DIAGNÓSTICO", text: "Quem joga dentro do visível vira dado. Quem entende o jogo… sai antes.", visual: "Gráfico de ROI despencando para 0." },
        { label: "SOLUÇÃO", text: "Operamos com estruturas que atrasam a leitura e vendem antes da detecção.", visual: "Cronômetro acelerado parando segundos antes de um alerta vermelho." },
        { label: "CTA", text: "Acesse o protocolo. Link expira em 300 segundos.", visual: "Contador digital decrescente real na tela." }
      ]
    },
    {
      id: 4,
      title: "CRIATIVO 04 — ROI FANTASMA",
      scenes: [
        { label: "AMPLIFICAÇÃO", text: "Estruturas que fragmentam sinais. É assim que 10x de ROI se torna o padrão, não a sorte.", visual: "Maços de dinheiro aparecendo através de um efeito de visão noturna." },
        { label: "MECANISMO", text: "Vender antes que o algoritmo entenda quem é você. Isso é operação invisível.", visual: "Animação de um pacote de dados passando por baixo de um muro de fogo." },
        { label: "CTA", text: "O botão está abaixo. A prova está dentro.", visual: "Seta verde apontando para baixo com brilho neon." }
      ]
    },
    {
      id: 5,
      title: "CRIATIVO 05 — SILÊNCIO LUCRATIVO",
      scenes: [
        { label: "HOOK", text: "Se você está ouvindo isso, você é a exceção. A maioria ainda está tentando 'otimizar criativo'.", visual: "Operador fechando um notebook em uma sala escura." },
        { label: "INVERSÃO", text: "Pare de ser lido. Comece a ser lucrativo. O sistema foi feito pra você gastar, eu mostro como jogar fora dele.", visual: "Efeito de zoom infinito em um código QR verde." },
        { label: "CTA", text: "Não tente entender tudo agora. Apenas entre.", visual: "Texto 'ACESSO LIBERADO' piscando em branco." }
      ]
    }
  ];

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-black text-[#00ff41] font-mono relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00ff41 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      {/* Header */}
      <div className="p-6 border-b border-[#00ff41]/20 flex items-center justify-between bg-black/80 backdrop-blur-xl relative z-20 shrink-0">
        <button onClick={onBack} className="flex items-center gap-2 text-[#00ff41] opacity-70 hover:opacity-100 transition-opacity">
          <ChevronLeft size={20} />
          <span className="text-xs uppercase font-black tracking-tighter">Voltar</span>
        </button>
        <div className="text-right">
          <h1 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 justify-end">
            <Zap size={14} fill="currentColor" />
            LAB_CRIATIVOS
          </h1>
          <span className="text-[8px] opacity-40 uppercase">Sincronização Ativa // v.2.0</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#00ff41]/10 shrink-0 relative z-10">
        {[
          { id: 'visuals', label: 'Mídia', icon: Video },
          { id: 'copy', label: 'Scripts', icon: FileText },
          { id: 'simulation', label: 'Status', icon: Monitor }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex flex-col items-center py-4 transition-all relative ${activeTab === tab.id ? 'text-[#00ff41] bg-[#00ff41]/5' : 'text-zinc-600'}`}
          >
            <tab.icon size={18} />
            <span className="text-[9px] mt-1.5 font-black uppercase tracking-tighter">{tab.label}</span>
            {activeTab === tab.id && <div className="absolute bottom-0 w-full h-0.5 bg-[#00ff41] shadow-[0_0_10px_#00ff41]" />}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 relative z-10 pb-24">
        
        {/* TAB VISUALS */}
        {activeTab === 'visuals' && (
          <div className="space-y-4 animate-slide-up">
            <p className="text-[9px] uppercase opacity-40 border-l-2 border-[#00ff41]/30 pl-3 mb-6">Database de ativos do sistema</p>
            {assets.map((asset, i) => (
              <div key={i} className="bg-zinc-900/30 border border-[#00ff41]/10 rounded-3xl overflow-hidden">
                <div className="aspect-video bg-zinc-950 relative group">
                  {asset.type === 'video' ? (
                    <video src={asset.url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                  ) : (
                    <img src={asset.url} className="w-full h-full object-cover" alt={asset.name} />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="bg-[#00ff41] text-black p-3 rounded-full shadow-lg"><Download size={20} /></button>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-[10px] font-black uppercase text-white">{asset.name}</h3>
                    <span className="text-[8px] opacity-30 uppercase">{asset.type} // h264_source</span>
                  </div>
                  <Share2 size={16} className="opacity-30" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB COPY (SCRIPTS) */}
        {activeTab === 'copy' && (
          <div className="space-y-8 animate-slide-up">
            <p className="text-[9px] uppercase opacity-40 border-l-2 border-[#00ff41]/30 pl-3">Roteiros de Alta Conversão — Protocolo Operador</p>
            
            {creativeScripts.map((script) => (
              <div key={script.id} className="space-y-3">
                <div className="flex items-center justify-between px-2">
                   <h2 className="text-[11px] font-black uppercase tracking-tighter text-[#00ff41] flex items-center gap-2">
                     <Monitor size={12} /> {script.title}
                   </h2>
                   <button 
                    onClick={() => handleCopy(script.id, script.scenes.map(s => `${s.label}: ${s.text}`).join('\n'))}
                    className="flex items-center gap-1.5 bg-[#00ff41]/10 border border-[#00ff41]/20 px-3 py-1 rounded-md active:scale-95 transition-all"
                   >
                     {copiedId === script.id ? <Check size={12} /> : <Clipboard size={12} />}
                     <span className="text-[9px] font-black uppercase">{copiedId === script.id ? 'Copiado' : 'Copiar'}</span>
                   </button>
                </div>

                <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-5 space-y-6">
                  {script.scenes.map((scene, idx) => (
                    <div key={idx} className="space-y-2 relative pl-4 border-l border-[#00ff41]/20">
                      <div className="flex items-center gap-2">
                         <span className="bg-[#00ff41] text-black text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
                           {scene.label}
                         </span>
                         <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Visual: {scene.visual}</span>
                      </div>
                      <p className="text-sm text-zinc-100 font-medium italic leading-relaxed">
                        "{scene.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB SIMULATION */}
        {activeTab === 'simulation' && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-slide-up space-y-4">
             <div className="w-16 h-16 bg-[#00ff41]/5 rounded-full flex items-center justify-center border border-dashed border-[#00ff41]/20 animate-spin-slow">
                <Zap size={24} className="opacity-40" />
             </div>
             <div className="space-y-1">
               <h3 className="text-white text-xs font-black uppercase italic">Algoritmo de Previsão</h3>
               <p className="text-[9px] text-zinc-600 max-w-[180px] mx-auto uppercase tracking-widest leading-relaxed">
                 Sincronizando com as APIs de rastreamento... Aguarde.
               </p>
             </div>
          </div>
        )}

      </div>

      {/* Footer Status */}
      <div className="p-4 border-t border-[#00ff41]/10 flex items-center justify-between text-[9px] font-black uppercase bg-black/90 backdrop-blur-xl shrink-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse shadow-[0_0_5px_#00ff41]" />
          <span>Database Local: Sincronizado</span>
        </div>
        <div className="text-zinc-600">
          Uptime: 24:12:05
        </div>
      </div>
    </div>
  );
};

export default CreativesLab;
