import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Imagem from '@/assets/pose1.png';
import BackgroundGlow from '@/components/ui/public/home/BackgroundGlow';
import PublicButton from '@/components/ui/public/base/PublicButton';
import PublicCard from '@/components/ui/public/base/PublicCard';
import SectionHeader from '@/components/ui/public/base/SectionHeader';
import { PUBLIC_BRAND } from '@/theme/branding';
import { getAboutData } from '@/services/homeAPI';

const ABOUT_DEFAULTS = {
    quote: 'É um prazer poder apresentar meu trabalho a você!',
    description:
        'Sou Cheila Lamour, Mentora, Palestrante, Especialista em Liderança Feminina.\n\nMãe, esposa, Engenheira Civil com 25 anos de experiência organizacional e mais de 150 liderados. MBA em Liderança Humanizada. Analista Comportamental, certificação em Life, Leader, Executive & Business Coach.\n\nAliando o conhecimento técnico às habilidades para lidar com gente, descobri meu propósito: ajudar outras pessoas a destravarem seu potencial.',
    button_text: 'Minha história',
    featured_text: 'Você é o seu maior investimento'
};

const HomeAbout = () => {
    const [aboutData, setAboutData] = useState(ABOUT_DEFAULTS);

    useEffect(() => {
        const loadAboutData = async () => {
            try {
                const data = await getAboutData();
                if (data) {
                    setAboutData((prev) => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.error('Erro ao carregar dados da seção Sobre:', error);
            }
        };

        loadAboutData();
    }, []);

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
            width: '100%',
            margin: 0,
            padding: 0,
            position: 'relative',
            overflow: 'hidden'
        }}>
            <BackgroundGlow
                top="10%"
                left="5%"
                width="150px"
                height="150px"
                color={PUBLIC_BRAND.colors.accentSoft}
                zIndex={0}
            />

            <BackgroundGlow
                bottom="15%"
                right="10%"
                width="200px"
                height="200px"
                color="rgba(0, 169, 169, 0.1)"
                zIndex={0}
            />

            <Box sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'stretch',
                position: 'relative',
                zIndex: 1
            }}>
                <Box sx={{
                    width: '100%',
                    bgcolor: '#FDF2CA',
                    padding: '80px',
                    paddingTop: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    minHeight: '100vh',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                        pointerEvents: 'none'
                    }
                }}>
                    <Box sx={{ maxWidth: '55%' }}>
                        <SectionHeader
                            title={aboutData.quote}
                            color={PUBLIC_BRAND.colors.primaryDark}
                            decorativeLine={{
                                width: '100px',
                                height: '4px',
                                background: PUBLIC_BRAND.gradients.accentLine,
                                borderRadius: '2px',
                                mt: 1.5
                            }}
                        />
                    </Box>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#555',
                            lineHeight: 1.9,
                            fontSize: '18px',
                            maxWidth: '52%',
                            mb: 5,
                            mt: 4,
                            textAlign: 'justify',
                            position: 'relative',
                            whiteSpace: 'pre-line'
                        }}
                    >
                        {aboutData.description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', maxWidth: '52%', mt: 2 }}>
                        <PublicButton
                            variant="publicOutline"
                            sx={{
                                padding: '14px 40px',
                                fontSize: '18px',
                                boxShadow: '0 4px 15px rgba(0, 169, 169, 0.2)',
                            }}
                        >
                            {aboutData.button_text}
                        </PublicButton>
                    </Box>

                    <Box sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '45%',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        bgcolor: PUBLIC_BRAND.colors.accent,
                        opacity: 0.4
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        top: '60%',
                        left: '48%',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        bgcolor: '#00A9A9',
                        opacity: 0.3
                    }} />
                </Box>

                <Box sx={{
                    position: 'absolute',
                    right: 100,
                    top: 80,
                    bottom: 0,
                    width: '40%',
                    height: '90%',
                    background: 'linear-gradient(135deg, rgba(0, 169, 169, 0.6) 0%, rgba(0, 112, 112, 0.4) 100%)',
                    borderTopLeftRadius: '100px',
                    borderBottomLeftRadius: '50px',
                    borderTopRightRadius: '50px',
                    borderBottomRightRadius: '100px',
                    zIndex: 2,
                    bgcolor: PUBLIC_BRAND.colors.textOnDark,
                }} />

                <Box sx={{
                    position: 'absolute',
                    right: 100,
                    top: 80,
                    bottom: 0,
                    width: '40%',
                    height: '90%',
                    overflow: 'hidden',
                    borderTopLeftRadius: '100px',
                    borderBottomLeftRadius: '50px',
                    borderTopRightRadius: '50px',
                    borderBottomRightRadius: '100px',
                    zIndex: 3,
                    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.25)',
                    border: '3px solid rgba(255, 255, 255, 0.5)'
                }}>
                    <Box
                        component="img"
                        src={Imagem}
                        alt="Cheila Lamour"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        }}
                    />
                </Box>

                <PublicCard sx={{
                    position: 'absolute',
                    right: 350,
                    bottom: 100,
                    padding: '30px 55px',
                    zIndex: 4,
                    borderTopLeftRadius: '50px',
                    borderBottomLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    borderBottomRightRadius: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${PUBLIC_BRAND.colors.accentStrongSoft}`,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)'
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderTopLeftRadius: '50px',
                        borderBottomLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '50px',
                        padding: '2px',
                        background: `linear-gradient(135deg, ${PUBLIC_BRAND.colors.accent}, ${PUBLIC_BRAND.colors.primary})`,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        opacity: 0.3,
                        zIndex: -1
                    }
                }}>
                    <AutoAwesomeIcon sx={{
                        fontSize: 28,
                        color: PUBLIC_BRAND.colors.accent,
                        mr: 2
                    }} />
                    <Typography
                        sx={{
                            color: PUBLIC_BRAND.colors.primaryDark,
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {aboutData.featured_text}
                    </Typography>
                </PublicCard>
            </Box>
        </Box>
    );
};

export default HomeAbout;