
import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import NotificationScreen from './components/NotificationScreen';
import WhatsAppChat from './components/WhatsAppChat';
import IncomingCallScreen from './components/IncomingCallScreen';
import CallingScreen from './components/CallingScreen';
import HackingLogin from './components/HackingLogin';
import TikTokHack from './components/TikTokHack';
import OfferScreen from './components/OfferScreen';
import CheckoutScreen from './components/CheckoutScreen';

type FunnelStage = 'start' | 'notification' | 'whatsapp' | 'incoming-call' | 'call' | 'hacking-login' | 'tiktok' | 'offer' | 'checkout';

const App: React.FC = () => {
  const [stage, setStage] = useState<FunnelStage>('start');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // URLs críticas para pré-carregamento
  const BG_IMAGE_ETAPA_1 = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop";
  const NOTIFY_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3';

  useEffect(() => {
    const img = new Image();
    img.src = BG_IMAGE_ETAPA_1;
    const audio = new Audio();
    audio.src = NOTIFY_SOUND;
    audio.load();
  }, []);

  const navigateTo = (nextStage: FunnelStage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage(nextStage);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className={`min-h-screen bg-black transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="mx-auto max-w-[430px] min-h-screen relative overflow-hidden shadow-2xl bg-black">
        {stage === 'start' && (
          <StartScreen onStart={() => navigateTo('notification')} />
        )}
        {stage === 'notification' && (
          <NotificationScreen onAccept={() => navigateTo('whatsapp')} />
        )}
        {stage === 'whatsapp' && (
          <WhatsAppChat onComplete={() => navigateTo('incoming-call')} onExit={() => navigateTo('start')} />
        )}
        {stage === 'incoming-call' && (
          <IncomingCallScreen onAccept={() => navigateTo('call')} onDecline={() => navigateTo('start')} />
        )}
        {stage === 'call' && (
          <CallingScreen onComplete={() => navigateTo('hacking-login')} />
        )}
        {stage === 'hacking-login' && (
          <HackingLogin onComplete={() => navigateTo('tiktok')} />
        )}
        {stage === 'tiktok' && (
          <TikTokHack onComplete={() => navigateTo('offer')} />
        )}
        {stage === 'offer' && (
          <OfferScreen onComplete={() => navigateTo('checkout')} />
        )}
        {stage === 'checkout' && (
          <CheckoutScreen />
        )}
      </div>
    </div>
  );
};

export default App;
