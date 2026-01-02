
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

// Função de rastreamento resiliente
const trackFBEvent = (eventName: string, params?: object) => {
  try {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, params);
      console.log(`[FB Pixel] Evento disparado: ${eventName}`, params || '');
    }
  } catch (e) {
    console.warn("Erro ao disparar evento FB:", e);
  }
};

const trackFBCustomEvent = (eventName: string, params?: object) => {
  try {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', eventName, params);
      console.log(`[FB Pixel] Evento Customizado: ${eventName}`, params || '');
    }
  } catch (e) {
    console.warn("Erro ao disparar evento custom FB:", e);
  }
};

const App: React.FC = () => {
  const [stage, setStage] = useState<FunnelStage>('start');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Pré-carregamento de recursos essenciais
  useEffect(() => {
    const NOTIFY_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3';
    const audio = new Audio();
    audio.src = NOTIFY_SOUND;
    audio.load();
    console.log("App iniciado: Sistema pronto.");
  }, []);

  // Monitoramento de Etapas para o Facebook Ads
  useEffect(() => {
    switch (stage) {
      case 'start':
        trackFBEvent('PageView');
        break;
      case 'notification':
        trackFBCustomEvent('Funnel_Notification_Received');
        break;
      case 'whatsapp':
        trackFBEvent('Lead', { content_name: 'Inicio_Chat_WhatsApp' });
        break;
      case 'incoming-call':
        trackFBCustomEvent('Funnel_Incoming_Call');
        break;
      case 'call':
        trackFBCustomEvent('Funnel_Call_Answered');
        break;
      case 'hacking-login':
        trackFBCustomEvent('Funnel_Terminal_Login');
        break;
      case 'tiktok':
        trackFBEvent('ViewContent', { content_category: 'Social_Proof_Video' });
        break;
      case 'offer':
        trackFBCustomEvent('Funnel_Offer_View');
        break;
      case 'checkout':
        trackFBEvent('InitiateCheckout', { value: 67.00, currency: 'BRL' });
        break;
    }
  }, [stage]);

  const navigateTo = (nextStage: FunnelStage) => {
    setIsTransitioning(true);
    // Timer curto para animação de fade
    setTimeout(() => {
      setStage(nextStage);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 250);
  };

  return (
    <div className={`min-h-screen bg-black transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
      <div className="mx-auto max-w-[430px] min-h-screen relative overflow-hidden shadow-2xl bg-black">
        {stage === 'start' && (
          <StartScreen onStart={() => navigateTo('notification')} />
        )}
        {stage === 'notification' && (
          <NotificationScreen onAccept={() => navigateTo('whatsapp')} />
        )}
        {stage === 'whatsapp' && (
          <WhatsAppChat onComplete={() => navigateTo('incoming-call')} onExit={() => setStage('start')} />
        )}
        {stage === 'incoming-call' && (
          <IncomingCallScreen onAccept={() => navigateTo('call')} onDecline={() => setStage('start')} />
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
