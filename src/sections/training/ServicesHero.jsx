import { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';

// ! :: PLACEHOLDER DE DADOS ::
/**
 * @description Quando o Firebase estiver ativo, esta constante será substituída pelos dados vindos do Firestore.
 */
const INITIAL_DATA = {
    title: 'Treinamentos | Coaching | Palestras',
    subtitle: 'Soluções completas para o seu desenvolvimento e da sua empresa.'
};

/**
 * @description Sessão Hero para a seção de Serviços de Treinamento.
 * @returns {JSX.Element} Sessão ServicesHero
 */
export default function ServicesHero() {
    // Estado para os textos do Hero
    const [heroData, setHeroData] = useState(INITIAL_DATA);

    return (
        <Box sx={{ py: 8, backgroundColor: '#00A6A6', textAlign: 'center' }}>
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        mb: 2
                    }}
                >
                    {heroData.title}
                </Typography>
                <Typography variant="h6" color="#FFFFFF">
                    {heroData.subtitle}
                </Typography>
            </Container>
        </Box>
    );
}