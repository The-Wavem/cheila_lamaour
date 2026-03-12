import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
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
            <Box sx={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'rgba(0, 166, 166, 0.05)',
                filter: 'blur(60px)',
                zIndex: 0
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '20%',
                left: '8%',
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                background: 'rgba(181, 149, 32, 0.05)',
                filter: 'blur(50px)',
                zIndex: 0
            }} />

            <Typography
                variant="h6"
                sx={{
                    color: '#B59520',
                    fontSize: '25px',
                    fontWeight: '600',
                    mb: 2,
                    textAlign: 'center',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}
            >
                {servicesData.title}
            </Typography>

            <Typography
                variant="h3"
                sx={{
                    color: '#007070',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    mb: 2,
                    textAlign: 'center',
                    letterSpacing: '-0.5px'
                }}
            >
                {servicesData.subtitle}
            </Typography>

            <Box sx={{
                width: '100px',
                height: '5px',
                background: 'linear-gradient(90deg, transparent 0%, #007070 50%, transparent 100%)',
                mt: 2,
                mb: 8,
                borderRadius: '3px'
            }} />

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
                    <Card
                        key={index}
                        sx={{
                            flex: 1,
                            maxWidth: '350px',
                            bgcolor: 'white',
                            borderRadius: '24px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: '1px solid rgba(0, 166, 166, 0.1)',
                            position: 'relative',
                            overflow: 'visible',
                            '&:hover': {
                                transform: 'translateY(-12px)',
                                boxShadow: '0 20px 50px rgba(0, 166, 166, 0.15)',
                                '& .icon-circle': {
                                    transform: 'scale(1.1) rotate(10deg)',
                                    boxShadow: '0 12px 30px rgba(0, 166, 166, 0.3)'
                                },
                                '& .saiba-mais': {
                                    gap: 2
                                }
                            },
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '5px',
                                background: 'linear-gradient(90deg, #00A6A6, #FBAE36)',
                                borderRadius: '24px 24px 0 0',
                                opacity: 0,
                                transition: 'opacity 0.3s ease'
                            },
                            '&:hover::before': {
                                opacity: 1
                            }
                        }}
                    >
                        <CardContent sx={{ p: 5 }}>
                            <Box
                                className="icon-circle"
                                sx={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #00A6A6 0%, #007070 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    mb: 4,
                                    boxShadow: '0 8px 20px rgba(0, 166, 166, 0.25)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '10%',
                                        left: '10%',
                                        width: '30%',
                                        height: '30%',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        borderRadius: '50%',
                                        filter: 'blur(8px)'
                                    }
                                }}
                            >
                                {service.icon}
                            </Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#007070',
                                    fontWeight: 'bold',
                                    fontSize: '22px',
                                    mb: 2,
                                    lineHeight: 1.3
                                }}
                            >
                                {service.title}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    lineHeight: 1.8,
                                    mb: 4,
                                    fontSize: '15px'
                                }}
                            >
                                {service.description}
                            </Typography>

                            <Box
                                className="saiba-mais"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: '#B59520',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    transition: 'gap 0.3s ease',
                                    '&:hover': {
                                        color: '#007070'
                                    }
                                }}
                            >
                                <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>
                                    Saiba mais
                                </Typography>
                                <ArrowForwardIcon sx={{ fontSize: 18 }} />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Box sx={{
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
            }}>
                <Typography
                    component={Link}
                    to="/servicos"
                    sx={{
                        textDecoration: 'none',
                        color: '#007070',
                        fontSize: '18px',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        mb: 2,
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                            color: '#00A6A6',
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    {servicesData.view_all_text}
                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Typography>

                <Box sx={{
                    width: '300px',
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent 0%, #007070 50%, transparent 100%)',
                    borderRadius: '2px'
                }} />
            </Box>
        </Box>
    );
};

export default HomeServices;