import React from 'react';
import Hero from '@sections/home/Hero';
import Hero2 from '@/sections/home/Hero2';
import Servicos from '@/sections/home/Servicos'

/**
 * @description 
 * Página Home pública do sistema, renderiza a seção Hero.
 * Lembre das regras passadas nos arquivos de explicação.
 * @returns {JSX.Element} Componente Home
 */
const Home = () => {
    return (
        <>
            <Hero />
            <Hero2 />
            <Servicos/>
        </>
    );
};

export default Home;