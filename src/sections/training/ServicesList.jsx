import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// ! :: PLACEHOLDER DE DADOS ::
/**
 *  @description Quando o Firebase estiver ativo, esta constante será substituída pelos dados vindos do Firestore.
 *  @constant {Array<Object>} INITIAL_DATA - Dados iniciais de serviços.
 */
const INITIAL_DATA = [
    {
        id: 'pessoal',
        title: 'Desenvolvimento Pessoal',
        items: [
            'Mapeamento de perfil comportamental',
            'Mentalidade e atitude',
            'Conhecimento x competência',
            'Psicologia dos relacionamentos',
            'Teoria dos Estados de Poder'
        ]
    },
    {
        id: 'profissional',
        title: 'Desenvolvimento Profissional',
        items: [
            'Mapeamento de perfil comportamental',
            'Mentalidade e atitude',
            'Conhecimento x competência',
            'Psicologia dos relacionamentos',
            'Teoria dos Estados de Poder'
        ]
    },
    {
        id: 'mentorias',
        title: 'Mentorias',
        items: [
            'Mapeamento de perfil comportamental',
            'Mentalidade e atitude',
            'Conhecimento x competência',
            'Psicologia dos relacionamentos',
            'Leitura do "Código de barras de gente"'
        ]
    }
];

/**
 * @description Sessão que exibe a lista de serviços oferecidos.
 * Cada serviço é apresentado em um cartão com título, lista de itens e botão de solicitação.
 * @returns {JSX.Element} Sessão ServicesList
 */
export default function ServicesList() {
    // Estado que armazenará os serviços. Inicia com o placeholder, mas será preenchido pela API futuramente.
    const [services, setServices] = useState(INITIAL_DATA);

    return (
        <Box sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>

                    {services.map((service) => (
                        <Grid key={service.id || service.title} size={{ xs: 12, md: 4 }} sx={{ boxShadow: 3 }}>

                            {/* Card que podemos componentizar */}
                            <Card sx={{ height: '100%', borderTop: '4px solid #C5A669', display: 'flex', flexDirection: 'column' }}>


                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" sx={{ color: '#009688', fontWeight: 'bold', mb: 3 }}>
                                        {service.title}
                                    </Typography>

                                    <List>
                                        {service.items.map((item, index) => (
                                            <ListItem key={index} disableGutters>
                                                <ListItemIcon sx={{ minWidth: 35 }}>
                                                    <CheckCircleIcon sx={{ color: '#C5A669' }} fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary={item} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>

                                <Box sx={{ p: 2 }}>
                                    {/* Botão que podemos componentizar */}
                                    <Button variant="contained" fullWidth sx={{ backgroundColor: '#009688', '&:hover': { backgroundColor: '#00796b' } }}>
                                        Solicitar
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}

                </Grid>
            </Container>
        </Box>
    );
}