import React, { useEffect, useState } from 'react';
import HomeHero from '@/sections/home/HomeHero';
import HomeAbout from '@/sections/home/HomeAbout';
import HomeServices from '@/sections/home/HomeServices';
import HomeTestimonials from '@/sections/home/HomeTestimonials';
import HomeContact from '@/sections/home/HomeContact';
import LoadingScreen from '@/components/ui/guards/LoadingScreen';
import { getHomeFullData } from '@/services/homeAPI';
import portrait from '@/assets/Cheila-portrait-02.png';


const mockHomeData = {
    hero: {
        headline: 'Cheila Lamour',
        subheadline: 'Mentoria, treinamentos e palestras para liderancas que desejam evoluir com estrategia e sensibilidade.',
        image: '@/assets/hero-image.png',
        experienceText: '+25 anos de experiencia em lideranca e desenvolvimento humano',
        cta_text: 'Agendar conversa inicial',
        cta_link: '/contato',
        secondary_cta_text: 'Conhecer minha historia',
        secondary_cta_link: '#sobre'
    },
    about: {
        overline: 'A HISTORIA',
        quote: 'Desenvolver pessoas e destravar potencial e o meu proposito.',
        subtitle: 'Uma trajetoria construida com proposito, lideranca e desenvolvimento humano.',
        image: portrait,
        description:
            'Sou Cheila Lamour, mentora e palestrante com trajetoria construida em gestao, lideranca e desenvolvimento de pessoas.\n\nAo longo da minha carreira, uni experiencia corporativa e metodologias praticas para apoiar mulheres, lideres e equipes em momentos de transicao e crescimento.\n\nMeu trabalho combina clareza estrategica, escuta ativa e acoes aplicaveis para gerar transformacao real.',
        button_text: 'Minha historia',
        featured_text: 'Voce e o seu maior investimento.'
    },
    services: {
        title: 'Servicos Prestados',
        subtitle: 'Solucoes personalizadas para diferentes momentos da sua jornada',
        view_all_text: 'Ver pagina completa de servicos',
        cards: [
            {
                title: 'Mentoria de Lideranca Feminina',
                description: 'Programa focado em posicionamento, comunicacao assertiva e tomada de decisao para liderancas femininas.'
            },
            {
                title: 'Treinamentos para Equipes',
                description: 'Capacitacoes praticas para fortalecer colaboracao, produtividade e cultura de alta performance nas empresas.'
            },
            {
                title: 'Palestras Corporativas',
                description: 'Conteudos inspiradores e acionaveis sobre lideranca humanizada, carreira e protagonismo profissional.'
            }
        ]
    },
    testimonials: {
        testimonials: [
            {
                client_name: 'Mariana Costa',
                text: 'A mentoria com a Cheila trouxe direcao e confianca para eu assumir um novo desafio de lideranca.'
            },
        ]
    },
    contact: {
        title: 'Vamos conversar sobre o seu proximo passo?',
        subtitle: 'Preencha o formulario e receba um direcionamento inicial para sua necessidade.',
        submit_button_text: 'Quero falar com a Cheila'
    }
};


/**
 * @description 
 * Página Home pública do sistema, renderiza a seção Hero.
 * Lembre das regras passadas nos arquivos de explicação.
 * @returns {JSX.Element} Componente Home
 */
const Home = () => {
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHomeFullData();

                const hasData =
                    data &&
                    (data.hero || data.about || data.services || data.contact ||
                        (Array.isArray(data.testimonials?.testimonials) && data.testimonials.testimonials.length > 0));

                if (hasData) {
                    setPageData({
                        hero: data.hero || mockHomeData.hero,
                        about: data.about || mockHomeData.about,
                        services: data.services || mockHomeData.services,
                        testimonials: data.testimonials || mockHomeData.testimonials,
                        contact: data.contact || mockHomeData.contact
                    });
                } else {
                    setPageData(mockHomeData);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do Firebase:', error);
                setPageData(mockHomeData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <HomeHero data={pageData.hero} />
            <HomeAbout data={pageData.about} />
            <HomeServices data={pageData.services} />
            <HomeTestimonials data={pageData.testimonials} />
            <HomeContact data={pageData.contact} />
        </>
    );
};

export default Home;