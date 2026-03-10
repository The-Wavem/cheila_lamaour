import React from 'react';
import Hero from '@sections/home/Hero';
import Hero2 from '@/sections/home/Hero2';
import Servicos from '@/sections/home/Servicos';
import DataConsentBanner from '@/components/ui/DataConsentBanner';
import { useHomeAccessTracking } from '@/hooks/useHomeAccessTracking';


/**
 * @description 
 * Página Home pública do sistema, renderiza a seção Hero.
 * Lembre das regras passadas nos arquivos de explicação.
 * @returns {JSX.Element} Componente Home
 */
const Home = () => {
    const {
        showConsentBanner,
        acceptConsent,
        rejectConsent
    } = useHomeAccessTracking();

    return (
        <>
            <Hero />
            <Hero2 />
            <Servicos />
            <DataConsentBanner
                open={showConsentBanner}
                onAccept={acceptConsent}
                onReject={rejectConsent}
            />
        </>
    );
};

export default Home;