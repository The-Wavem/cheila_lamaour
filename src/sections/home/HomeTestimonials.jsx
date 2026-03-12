import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { getTestimonialsData } from '@/services/homeAPI';

const DEFAULT_TESTIMONIAL = {
    client_name: 'Nome Cliente',
    text: 'A mentoria com a Cheila foi um divisor de águas na minha carreira. A clareza que obtive sobre meus objetivos e a confiança para liderar mudaram minha trajetória.'
};

const HomeTestimonials = () => {
    const [testimonial, setTestimonial] = useState(DEFAULT_TESTIMONIAL);

    useEffect(() => {
        const loadData = async () => {
            try {
                const testimonialsDoc = await getTestimonialsData();

                if (Array.isArray(testimonialsDoc?.testimonials) && testimonialsDoc.testimonials.length) {
                    const firstTestimonial = testimonialsDoc.testimonials[0];
                    setTestimonial({
                        client_name: firstTestimonial.client_name || firstTestimonial.name || DEFAULT_TESTIMONIAL.client_name,
                        text: firstTestimonial.text || DEFAULT_TESTIMONIAL.text
                    });
                }
            } catch (error) {
                console.error('Erro ao carregar depoimentos:', error);
            }
        };

        loadData();
    }, []);

    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(180deg, #f5f5f5 0%, #fafafa 50%, #f5f5f5 100%)',
            padding: '0 60px',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box sx={{
                width: '100%',
                maxWidth: '1200px',
                background: 'linear-gradient(135deg, #00A6A6 0%, #008B8B 100%)',
                borderRadius: '30px',
                padding: '80px',
                mt: 12,
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0, 166, 166, 0.25)',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }
            }}>
                <FormatQuoteIcon sx={{
                    position: 'absolute',
                    top: 40,
                    right: 60,
                    fontSize: 100,
                    color: 'rgba(255, 255, 255, 0.1)',
                    transform: 'rotate(180deg)'
                }} />

                <Box
                    sx={{
                        position: 'absolute',
                        top: 40,
                        left: 40,
                        width: 60,
                        height: 60,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.6rem',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)'
                        }
                    }}
                >
                    CL
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                                key={star}
                                sx={{
                                    fontSize: 45,
                                    color: '#FBAE36',
                                    filter: 'drop-shadow(0 4px 8px rgba(251, 174, 54, 0.3))',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.2) rotate(15deg)'
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '26px',
                            lineHeight: 1.7,
                            mb: 5,
                            maxWidth: '900px',
                            fontStyle: 'italic',
                            fontWeight: 300,
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        "{testimonial.text}"
                    </Typography>

                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '19px',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                        }}
                    >
                        - {testimonial.client_name}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default HomeTestimonials;