
import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import NotificationScreen from './components/NotificationScreen';
import WhatsAppChat from './components/WhatsAppChat';
import InvisibleSystemReveal from './components/InvisibleSystemReveal';
import IncomingCallScreen from './components/IncomingCallScreen';
import CallingScreen from './components/CallingScreen';
import HackingLogin from './components/HackingLogin';
import TikTokHack from './components/TikTokHack';
import OfferScreen from './components/OfferScreen';
import CheckoutScreen from './components/CheckoutScreen';
import TestNavigation from './components/TestNavigation';

type FunnelStage = 'start' | 'notification' | 'whatsapp' | 'invisible-system' | 'incoming-call' | 'call' | 'hacking-login' | 'tiktok' | 'offer' | 'checkout' | 'debug';

const trackFBEvent = (eventName: string, params?: object) => {
  try {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, params);
    }
  } catch (e) {
    console.warn("Erro ao disparar evento FB:", e);
  }
};

const App: React.FC = () => {
  const [stage, setStage] = useState<FunnelStage>('start');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const NOTIFY_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3';
    const audio = new Audio();
    audio.src = NOTIFY_SOUND;
    audio.load();
  }, []);

  useEffect(() => {
    switch (stage) {
      case 'start': trackFBEvent('PageView'); break;
      case 'whatsapp': trackFBEvent('Lead', { content_name: 'Inicio_Chat_WhatsApp' }); break;
      case 'invisible-system': trackFBEvent('ViewContent', { content_name: 'Narrativa_Sistema_Invisivel' }); break;
      case 'offer': trackFBEvent('ViewContent', { content_category: 'Sales_Page' }); break;
      case 'tiktok': trackFBEvent('ViewContent', { content_category: 'Social_Proof_Video' }); break;
      case 'checkout': trackFBEvent('InitiateCheckout', { value: 67.00, currency: 'BRL' }); break;
    }
  }, [stage]);

  const navigateTo = (nextStage: FunnelStage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage(nextStage);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 250);
  };

  return (
    <div className={`min-h-[100dvh] bg-black transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
      <div className="mx-auto max-w-[430px] min-h-[100dvh] relative bg-black shadow-2xl">
        {stage === 'debug' && <TestNavigation onNavigate={(s) => navigateTo(s as FunnelStage)} />}
        {stage === 'start' && <StartScreen onStart={() => navigateTo('notification')} onDebug={() => setStage('debug')} />}
        {stage === 'notification' && <NotificationScreen onAccept={() => navigateTo('whatsapp')} />}
        {stage === 'whatsapp' && <WhatsAppChat onComplete={() => navigateTo('invisible-system')} onExit={() => setStage('start')} />}
        {stage === 'invisible-system' && <InvisibleSystemReveal onComplete={() => navigateTo('incoming-call')} />}
        {stage === 'incoming-call' && <IncomingCallScreen onAccept={() => navigateTo('call')} onDecline={() => setStage('start')} />}
        {stage === 'call' && <CallingScreen onComplete={() => navigateTo('hacking-login')} />}
        {stage === 'hacking-login' && <HackingLogin onComplete={() => navigateTo('tiktok')} />}
        {stage === 'tiktok' && <TikTokHack onComplete={() => navigateTo('offer')} />}
        {stage === 'offer' && <OfferScreen onComplete={() => navigateTo('checkout')} />}
        {stage === 'checkout' && <CheckoutScreen />}
      </div>
    </div>
  );
};

export default App;
