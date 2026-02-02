import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tabs,
    Tab,
    Paper,
    Stack
} from '@mui/material';
import Grid from '@mui/material/Grid'; // Atualizado para Grid2 no MUI v6
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// ! :: PLACEHOLDER DE DADOS ::
const INITIAL_DATA = [
    {
        id: 'pessoal',
        label: 'Para Você', // Nome curto para a aba
        title: 'Desenvolvimento Pessoal',
        description: 'Potencialize quem você é. Descubra suas forças e elimine as travas que impedem seu crescimento pessoal.',
        // Placeholder de imagem: trocar por URLs reais de fotos de eventos/palestras
        image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=1000&auto=format&fit=crop',
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
        label: 'Para Carreira',
        title: 'Desenvolvimento Profissional',
        description: 'Estratégias de alto impacto para alavancar sua carreira e liderança no ambiente corporativo.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
        items: [
            'Liderança e Gestão de Pessoas',
            'Comunicação Assertiva',
            'Inteligência Emocional no Trabalho',
            'Gestão de Conflitos',
            'Produtividade e Alta Performance'
        ]
    },
    {
        id: 'mentorias',
        label: 'Exclusive',
        title: 'Mentorias VIP',
        description: 'Acompanhamento próximo e personalizado para quem busca resultados extraordinários em tempo recorde.',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop',
        items: [
            'Sessões 1:1 Exclusivas',
            'Plano de Ação Personalizado',
            'Acesso direto via WhatsApp',
            'Análise de Cenários Críticos',
            'Leitura do "Código de barras de gente"'
        ]
    }
];

/**
 * @todo Componentizar cada parte (Tabs, TabPanel, ServiceDetails) para melhorar legibilidade e manutenção
 * @todo Adicionar animações/transições entre mudanças de abas
 * @todo Aplicar Firebase para carregar os dados reais dos serviços
 * @returns Componente ServicesList que exibe uma lista de serviços com navegação por abas
 */
export default function ServicesList() {
    const [services, setServices] = useState(INITIAL_DATA);
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Pega o serviço ativo baseado na aba selecionada
    const currentService = services[activeTab];

    return (
        <Box sx={{ py: 8, backgroundColor: '#fff' }}>
            <Container maxWidth="lg">

                {/* Cabeçalho da Seção */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="overline" sx={{ color: '#C5A669', fontWeight: 'bold', letterSpacing: 2 }}>
                        NOSSAS SOLUÇÕES
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#333', fontWeight: 'bold', mt: 1 }}>
                        Escolha como quer evoluir hoje
                    </Typography>
                </Box>

                {/* Navegação por Abas */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4, display: 'flex', justifyContent: 'center' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{
                            '& .MuiTab-root': { fontSize: '1.1rem', fontWeight: 500, textTransform: 'none', px: 4 },
                            '& .Mui-selected': { color: '#009688 !important' },
                            '& .MuiTabs-indicator': { backgroundColor: '#009688' }
                        }}
                    >
                        {services.map((service, index) => (
                            <Tab key={index} label={service.label} />
                        ))}
                    </Tabs>
                </Box>

                {/* Conteúdo da Aba Ativa */}
                <Paper
                    elevation={0}
                    sx={{ p: 0, overflow: 'hidden', borderRadius: 4, bgcolor: '#f9f9f9' }}
                >
                    <Grid container>
                        {/* Coluna da Imagem (Visual) */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box
                                component="img"
                                src={currentService.image}
                                alt={currentService.title}
                                sx={{
                                    width: '100%',
                                    height: { xs: 300, md: '100%' },
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </Grid>

                        {/* Coluna do Texto (Conteúdo) */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Box sx={{ p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                                <Typography variant="h4" component="h3" sx={{ color: '#009688', fontWeight: 'bold', mb: 2 }}>
                                    {currentService.title}
                                </Typography>

                                <Typography variant="body1" sx={{ color: '#555', mb: 4, lineHeight: 1.8 }}>
                                    {currentService.description}
                                </Typography>

                                <Box sx={{ mb: 4 }}>
                                    <List>
                                        {currentService.items.map((item, idx) => (
                                            <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                                                <ListItemIcon sx={{ minWidth: 35 }}>
                                                    <CheckCircleIcon sx={{ color: '#C5A669' }} fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>

                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        backgroundColor: '#009688',
                                        color: '#fff',
                                        py: 1.5,
                                        px: 4,
                                        width: 'fit-content',
                                        '&:hover': { backgroundColor: '#00796b' }
                                    }}
                                >
                                    Quero saber mais sobre {currentService.label}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

            </Container>
        </Box>
    );
}