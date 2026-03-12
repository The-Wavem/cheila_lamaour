import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import BackgroundGlow from '@/components/ui/public/home/BackgroundGlow';
import SectionHeader from '@/components/ui/public/base/SectionHeader';
import ServiceCard from '@/components/ui/public/home/ServiceCard';
import SectionLinkCTA from '@/components/ui/public/home/SectionLinkCTA';
import { PUBLIC_BRAND } from '@/theme/branding';
import { getServicesData } from '@/services/homeAPI';

const DEFAULT_SERVICES_DATA = {
    title: 'Serviços Prestados',
    subtitle: 'Soluções completas de mentoria',
    view_all_text: 'Ver página completa de serviços',
    cards: [
        {
            title: 'Desenvolvimento Profissional',
            description: "Estratégias para sair do ponto A ao ponto B. Evite perder tempo 'batendo cabeça' e acelere sua..."
        },
        {
            title: 'Desenvolvimento Pessoas',
            description: "Estratégias para sair do ponto A ao ponto B. Evite perder tempo 'batendo cabeça' e acelere sua..."
        },
        {
            title: 'Treinamentos',
            description: "Estratégias para sair do ponto A ao ponto B. Evite perder tempo 'batendo cabeça' e acelere sua..."
        }
    ]
};

const HomeServices = () => {
    const serviceIcons = [
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
        },
        {
            icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
        },
        {
            icon: <GroupsIcon sx={{ fontSize: 40 }} />,
        }
    ];

    const [servicesData, setServicesData] = useState(DEFAULT_SERVICES_DATA);

    useEffect(() => {
        const loadData = async () => {
            try {
                const servicesDoc = await getServicesData();

                if (servicesDoc) {
                    setServicesData((prev) => ({
                        ...prev,
                        ...servicesDoc,
                        cards: Array.isArray(servicesDoc.cards) && servicesDoc.cards.length
                            ? servicesDoc.cards
                            : prev.cards
                    }));
                }
            } catch (error) {
                console.error('Erro ao carregar dados de serviços:', error);
            }
        };

        loadData();
    }, []);

    const mergedServices = (servicesData.cards || DEFAULT_SERVICES_DATA.cards).map((service, index) => ({
        ...service,
        icon: serviceIcons[index]?.icon || <SchoolIcon sx={{ fontSize: 40 }} />
    }));

    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(180deg, #f5f5f5 0%, #fafafa 50%, #f5f5f5 100%)',
            padding: '100px 60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <BackgroundGlow
                top="10%"
                right="5%"
                width="300px"
                height="300px"
                color="rgba(0, 166, 166, 0.05)"
                zIndex={0}
            />
            <BackgroundGlow
                bottom="20%"
                left="8%"
                width="250px"
                height="250px"
                color="rgba(181, 149, 32, 0.05)"
                zIndex={0}
            />

            <Box sx={{ width: '100%', maxWidth: '900px' }}>
                <SectionHeader
                    overline={servicesData.title}
                    title={servicesData.subtitle}
                    align="center"
                    color={PUBLIC_BRAND.colors.primaryDark}
                    decorativeLine={{
                        width: '100px',
                        height: '5px',
                        background: PUBLIC_BRAND.gradients.sectionLine,
                        borderRadius: '3px',
                        mt: 2,
                        mb: 8
                    }}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                gap: 4,
                justifyContent: 'center',
                alignItems: 'stretch',
                maxWidth: '1200px',
                width: '100%',
                position: 'relative',
                zIndex: 1
            }}>
                {mergedServices.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        description={service.description}
                        icon={service.icon}
                    />
                ))}
            </Box>

            <SectionLinkCTA
                text={servicesData.view_all_text}
                to="/servicos"
            />
        </Box>
    );
};

export default HomeServices;