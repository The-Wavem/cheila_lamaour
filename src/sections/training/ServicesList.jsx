import { useState } from 'react';
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
    Fade,
    Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';

// Mock dos Dados (Futuramente virá do Firebase/Editor)
const servicesData = [
    {
        id: 0,
        label: 'Pessoal',
        title: 'Desenvolvimento Pessoal',
        icon: <PsychologyIcon />,
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
        description: 'Estratégias para sair do ponto A ao ponto B, focando em inteligência emocional e autoconhecimento.',
        topics: ['Mapeamento de perfil comportamental', 'Mentalidade e atitude', 'Conhecimento x competência', 'Psicologia dos relacionamentos']
    },
    {
        id: 1,
        label: 'Profissional',
        title: 'Desenvolvimento Profissional',
        icon: <WorkIcon />,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        description: 'Acelere sua carreira com ferramentas práticas de gestão, liderança e posicionamento de mercado.',
        topics: ['Liderança Assertiva', 'Gestão de Tempo', 'Transição de Carreira', 'Comunicação Não-Violenta']
    },
    {
        id: 2,
        label: 'Empresarial',
        title: 'Soluções Corporativas',
        icon: <BusinessIcon />,
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        description: 'Consultoria e treinamentos in-company para equipes de alta performance.',
        topics: ['Workshops de Vendas', 'Cultura Organizacional', 'Mentoria para Executivos', 'Team Building']
    }
];

export default function ServicesList() {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Pega o serviço ativo baseado na aba
    const activeService = servicesData[activeTab];

    return (
        <Box sx={{ py: 8, bgcolor: '#ffffff' }}>
            <Container maxWidth="lg">

                {/* --- NAVEGAÇÃO POR ABAS --- */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        sx={{
                            '& .MuiTabs-indicator': { backgroundColor: '#C5A669', height: 3 },
                            '& .MuiTab-root': {
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                textTransform: 'none',
                                color: '#999',
                                '&.Mui-selected': { color: '#009688' }
                            }
                        }}
                    >
                        {servicesData.map((service) => (
                            <Tab
                                key={service.id}
                                label={service.label}
                                icon={service.icon}
                                iconPosition="start"
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* --- CONTEÚDO DA ABA ATIVA (COM FADE) --- */}
                <Fade in={true} key={activeTab} timeout={500}>
                    <Paper
                        elevation={0}
                        sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden', borderRadius: 4, bgcolor: '#f9f9f9' }}
                    >

                        {/* Esquerda: Imagem */}
                        <Box
                            sx={{ width: { xs: '100%', md: '45%' }, height: { xs: 300, md: 'auto' } }}
                        >
                            <Box
                                component="img"
                                src={activeService.image}
                                alt={activeService.title}
                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Box>

                        {/* Direita: Conteúdo */}
                        <Box
                            sx={{ p: { xs: 4, md: 6 }, width: { xs: '100%', md: '55%' } }}
                        >
                            <Typography
                                variant="overline"
                                color="primary"
                                fontWeight="bold"
                                sx={{ letterSpacing: 2 }}
                            >
                                SERVIÇO EM DESTAQUE
                            </Typography>

                            <Typography
                                variant="h4"
                                sx={{ fontWeight: 'bold', color: '#333', mb: 2, mt: 1 }}
                            >
                                {activeService.title}
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 4, lineHeight: 1.7 }}
                            >
                                {activeService.description}
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                sx={{ mb: 2 }}
                            >
                                O QUE ESTÁ INCLUSO:
                            </Typography>

                            <List
                                sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}
                            >
                                {activeService.topics.map((topic, index) => (
                                    <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                            <CheckCircleIcon sx={{ color: '#C5A669', fontSize: 20 }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={topic}
                                            primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>

                            <Button
                                variant="contained"
                                size="large"
                                sx={{ mt: 5, bgcolor: '#009688', px: 5, borderRadius: 2 }}
                            >
                                Tenho Interesse
                            </Button>
                        </Box>

                    </Paper>
                </Fade>

            </Container>
        </Box>
    );
}