import { useEffect, useState } from 'react';
import LoadingScreen from '@components/ui/guards/LoadingScreen';
import ServicesHero from '@sections/services/ServicesHero';
import ServicesList from '@sections/services/ServicesList';

const mockData = {
    hero: {
        title: 'Treinamentos | Coaching | Palestras',
        subtitle: 'Solucoes completas para o seu desenvolvimento e da sua empresa.',
        bgImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80'
    },
    services: [
        {
            id: 1,
            label: 'Pessoal',
            title: 'Desenvolvimento Pessoal',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
            description: 'Estrategias para sair do ponto A ao ponto B, com foco em inteligencia emocional e clareza de direcao.',
            topics: ['Mapeamento de perfil', 'Mentalidade e atitude', 'Psicologia dos relacionamentos'],
            buttonText: 'Tenho Interesse'
        },
        {
            id: 2,
            label: 'Profissional',
            title: 'Desenvolvimento Profissional',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            description: 'Acelere sua carreira com ferramentas praticas de gestao, lideranca e comunicacao estrategica.',
            topics: ['Carreira', 'Lideranca', 'Transicao de Carreira'],
            buttonText: 'Tenho Interesse'
        }
    ]
};

export default function ServicosPage() {
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        // MURILO: SUBSTITUA O SETTIMEOUT PELA CHAMADA DA API -> const data = await getServicesData(); setPageData(data); setIsLoading(false);
        const timer = setTimeout(() => {
            setPageData(mockData);
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <ServicesHero data={pageData.hero} />
            <ServicesList services={pageData.services} />
        </>
    );
}