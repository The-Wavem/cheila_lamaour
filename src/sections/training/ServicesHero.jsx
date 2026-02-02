import { Box, Typography, Container } from '@mui/material';

export default function ServicesHero() {
    return (
        <Box sx={{ py: 8, backgroundColor: '#f4f4f4', textAlign: 'center' }}>
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        color: '#009688', // Verde mais escuro
                        fontWeight: 'bold',
                        mb: 2
                    }}
                >
                    Treinamentos | Coaching | Palestras
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Soluções completas para o seu desenvolvimento e da sua empresa.
                </Typography>
            </Container>
        </Box>
    );
}