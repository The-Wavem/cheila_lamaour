import React from 'react';
import HomeHero from '@/sections/home/HomeHero';
import HomeAbout from '@/sections/home/HomeAbout';
import HomeServices from '@/sections/home/HomeServices';
import HomeTestimonials from '@/sections/home/HomeTestimonials';
import HomeContact from '@/sections/home/HomeContact';
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
            <HomeHero />
            <HomeAbout />
            <HomeServices />
            <HomeTestimonials />
            <HomeContact />
            <DataConsentBanner
                open={showConsentBanner}
                onAccept={acceptConsent}
                onReject={rejectConsent}
            />
        </>
    );
};

export default Home;