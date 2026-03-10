import { useState } from 'react';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Stack,
    Tabs,
    Tab,
    Paper,
    TextField
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { saveContactMessage } from '@/services/homeAPI';
import { BRAND } from '@/theme/branding';

const servicesData = [
    {
        id: 0,
        label: 'Individual',
        title: 'Mentoria individual e desenvolvimento pessoal',
        icon: <PsychologyIcon />,
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
        description: 'Para quem busca clareza, reposicionamento e tomada de decisão com apoio estratégico e sensível ao momento de vida.',
        topics: [
            'Mapeamento de perfil comportamental e crenças de bloqueio',
            'Plano de evolução com foco em confiança, posicionamento e consistência',
            'Ferramentas de inteligência emocional e comunicação assertiva',
            'Acompanhamento individual com direcionamento prático'
        ],
        audience: ['Transição de carreira', 'Fortalecimento da liderança', 'Recomeços pessoais'],
        delivery: ['Sessões 1:1', 'Plano de ação', 'Acompanhamento orientado']
    },
    {
        id: 1,
        label: 'Executivo',
        title: 'Desenvolvimento profissional e liderança executiva',
        icon: <WorkRoundedIcon />,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        description: 'Uma frente desenhada para profissionais e líderes que precisam acelerar performance com método, presença e estratégia relacional.',
        topics: [
            'Liderança assertiva com foco em cultura e resultado',
            'Tomada de decisão e gestão de prioridades em ambientes complexos',
            'Comunicação não violenta aplicada ao contexto corporativo',
            'Posicionamento executivo e influência com autenticidade'
        ],
        audience: ['Líderes em expansão', 'Gestoras e executivas', 'Profissionais em ascensão'],
        delivery: ['Mentoria executiva', 'Workshops fechados', 'Trilhas customizadas']
    },
    {
        id: 2,
        label: 'Corporativo',
        title: 'Soluções corporativas para equipes e empresas',
        icon: <BusinessCenterRoundedIcon />,
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        description: 'Projetos in-company para fortalecer cultura, liderança, vendas, comunicação e performance coletiva com aplicação prática.',
        topics: [
            'Palestras e treinamentos com recorte comportamental e estratégico',
            'Programas para liderança feminina, cultura e colaboração',
            'Mentorias para gestores e times comerciais',
            'Conteúdos adaptados ao desafio e à maturidade da equipe'
        ],
        audience: ['RH e desenvolvimento humano', 'Times de liderança', 'Equipes comerciais e operacionais'],
        delivery: ['Palestras', 'Treinamentos in-company', 'Programas sob medida']
    }
];

const differentiators = [
    {
        title: 'Visão humana com repertório executivo',
        description: 'A condução une experiência organizacional real com leitura comportamental para produzir transformação aplicável.'
    },
    {
        title: 'Estrutura clara de evolução',
        description: 'Cada trilha organiza diagnóstico, foco de atuação, entregáveis e próximos passos para evitar processos genéricos.'
    },
    {
        title: 'Estética coerente com a marca',
        description: 'A nova página trabalha a mesma paleta, elegância e contraste usados no home e no admin para fortalecer consistência.'
    }
];

export default function ServicesList() {
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        mensagem: ''
    });
    const [feedback, setFeedback] = useState({
        open: false,
        severity: 'success',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);

    const handleChange = (_, newValue) => {
        setActiveTab(newValue);
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.nome || !formData.email || !formData.mensagem) {
            setFeedback({
                open: true,
                severity: 'error',
                message: 'Preencha nome, e-mail e objetivo para enviar seu interesse.'
            });
            return;
        }

        setIsSending(true);

        try {
            await saveContactMessage({
                ...formData,
                origem: 'pagina_servicos',
                interesse: servicesData[activeTab].title
            });

            setFeedback({
                open: true,
                severity: 'success',
                message: 'Interesse enviado com sucesso. Em breve você recebe um retorno.'
            });
            setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
        } catch (error) {
            setFeedback({
                open: true,
                severity: 'error',
                message: 'Não foi possível enviar agora. Tente novamente em instantes.'
            });
        } finally {
            setIsSending(false);
        }
    };

    const activeService = servicesData[activeTab];

    return (
        <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: BRAND.background }}>
            <Container maxWidth="lg">
                <Stack spacing={{ xs: 6, md: 8 }}>
                    <Box id="trilhas" sx={{ scrollMarginTop: 120 }}>
                        <Stack spacing={2} sx={{ mb: 4, textAlign: { xs: 'left', md: 'center' } }}>
                            <Typography
                                sx={{
                                    color: BRAND.secondary,
                                    textTransform: 'uppercase',
                                    letterSpacing: 3,
                                    fontWeight: 700,
                                    fontSize: '0.82rem'
                                }}
                            >
                                Trilhas de atuação
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: BRAND.fontFamilyHeader,
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    color: BRAND.textPrimary,
                                    lineHeight: 1.1
                                }}
                            >
                                Escolha o formato que melhor responde ao seu momento.
                            </Typography>
                            <Typography
                                sx={{
                                    maxWidth: 760,
                                    mx: { xs: 0, md: 'auto' },
                                    color: BRAND.textSecondary,
                                    lineHeight: 1.8
                                }}
                            >
                                A estrutura abaixo organiza a oferta de forma mais estratégica, com linguagem clara, blocos de apoio e espaço real para conversão.
                            </Typography>
                        </Stack>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                allowScrollButtonsMobile
                                sx={{
                                    minHeight: 62,
                                    borderRadius: '999px',
                                    p: 1,
                                    bgcolor: alpha(BRAND.paper, 0.75),
                                    border: `1px solid ${alpha(BRAND.border, 0.9)}`,
                                    boxShadow: BRAND.shadowSoft,
                                    '& .MuiTabs-indicator': {
                                        display: 'none'
                                    },
                                    '& .MuiTab-root': {
                                        minHeight: 46,
                                        borderRadius: '999px',
                                        fontWeight: 700,
                                        fontSize: '0.95rem',
                                        textTransform: 'none',
                                        color: BRAND.textSecondary,
                                        '&.Mui-selected': {
                                            color: BRAND.paper,
                                            bgcolor: BRAND.primary,
                                            boxShadow: `0 8px 20px ${alpha(BRAND.primary, 0.25)}`
                                        }
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

                        <Paper
                        elevation={0}
                        sx={{
                            overflow: 'hidden',
                            borderRadius: 6,
                            bgcolor: BRAND.paper,
                            border: `1px solid ${alpha(BRAND.border, 0.95)}`,
                            boxShadow: BRAND.shadowSoft
                        }}
                    >
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.05fr' } }}>
                            <Box
                                sx={{
                                    minHeight: { xs: 320, md: '100%' },
                                    position: 'relative'
                                }}
                            >
                                <Box
                                    component="img"
                                    src={activeService.image}
                                    alt={activeService.title}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.46) 100%)'
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: 24,
                                        right: 24,
                                        bottom: 24,
                                        p: 2.5,
                                        borderRadius: 4,
                                        bgcolor: alpha('#FFFFFF', 0.14),
                                        backdropFilter: 'blur(10px)',
                                        border: `1px solid ${alpha('#FFFFFF', 0.22)}`
                                    }}
                                >
                                    <Typography sx={{ color: '#FFFFFF', fontWeight: 700, mb: 1 }}>
                                        Ideal para
                                    </Typography>
                                    <Stack direction="row" flexWrap="wrap" gap={1}>
                                        {activeService.audience.map((item) => (
                                            <Chip
                                                key={item}
                                                label={item}
                                                sx={{
                                                    color: '#FFFFFF',
                                                    bgcolor: alpha('#FFFFFF', 0.14),
                                                    border: `1px solid ${alpha('#FFFFFF', 0.18)}`
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            </Box>

                            <Box sx={{ p: { xs: 3, md: 5 } }}>
                                <Typography
                                    sx={{
                                        color: BRAND.secondary,
                                        fontWeight: 800,
                                        letterSpacing: 2,
                                        textTransform: 'uppercase',
                                        fontSize: '0.78rem',
                                        mb: 1
                                    }}
                                >
                                    Serviço em destaque
                                </Typography>

                                <Typography
                                    sx={{
                                        fontFamily: BRAND.fontFamilyHeader,
                                        fontSize: { xs: '1.9rem', md: '2.6rem' },
                                        color: BRAND.textPrimary,
                                        lineHeight: 1.1,
                                        mb: 2
                                    }}
                                >
                                    {activeService.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: BRAND.textSecondary,
                                        lineHeight: 1.8,
                                        mb: 3
                                    }}
                                >
                                    {activeService.description}
                                </Typography>

                                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
                                    {activeService.delivery.map((item) => (
                                        <Chip
                                            key={item}
                                            label={item}
                                            sx={{
                                                bgcolor: alpha(BRAND.primary, 0.08),
                                                color: BRAND.primaryDark,
                                                fontWeight: 600
                                            }}
                                        />
                                    ))}
                                </Stack>

                                <Typography sx={{ fontWeight: 700, color: BRAND.textPrimary, mb: 1.5 }}>
                                    O que essa trilha contempla
                                </Typography>

                                <List sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
                                    {activeService.topics.map((topic) => (
                                        <ListItem key={topic} disableGutters sx={{ alignItems: 'flex-start', py: 0.4 }}>
                                            <ListItemIcon sx={{ minWidth: 30, mt: 0.15 }}>
                                                <CheckCircleIcon sx={{ color: BRAND.secondary, fontSize: 20 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={topic}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
                                                    fontWeight: 500,
                                                    color: BRAND.textPrimary,
                                                    lineHeight: 1.7
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>

                                <Button
                                    component="a"
                                    href="#conversa"
                                    variant="contained"
                                    endIcon={<EastRoundedIcon />}
                                    sx={{
                                        mt: 4,
                                        bgcolor: BRAND.primary,
                                        px: 4,
                                        py: 1.4,
                                        borderRadius: '999px',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        '&:hover': {
                                            bgcolor: BRAND.primaryDark
                                        }
                                    }}
                                >
                                    Tenho interesse nesta trilha
                                </Button>
                            </Box>
                        </Box>
                        </Paper>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                            gap: 3
                        }}
                    >
                        {differentiators.map((item) => (
                            <Card
                                key={item.title}
                                sx={{
                                    borderRadius: 5,
                                    boxShadow: 'none',
                                    border: `1px solid ${alpha(BRAND.border, 0.95)}`,
                                    bgcolor: alpha(BRAND.paper, 0.96)
                                }}
                            >
                                <CardContent sx={{ p: 3.5 }}>
                                    <Box
                                        sx={{
                                            width: 54,
                                            height: 54,
                                            borderRadius: '18px',
                                            display: 'grid',
                                            placeItems: 'center',
                                            bgcolor: alpha(BRAND.secondary, 0.16),
                                            color: BRAND.secondary,
                                            mb: 2.5
                                        }}
                                    >
                                        <AutoAwesomeRoundedIcon />
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontFamily: BRAND.fontFamilyHeader,
                                            fontSize: '1.5rem',
                                            color: BRAND.textPrimary,
                                            mb: 1.5,
                                            lineHeight: 1.15
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{ color: BRAND.textSecondary, lineHeight: 1.8 }}>
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Paper
                        id="conversa"
                        elevation={0}
                        sx={{
                            scrollMarginTop: 120,
                            borderRadius: 6,
                            overflow: 'hidden',
                            background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
                            boxShadow: `0 24px 60px ${alpha(BRAND.primary, 0.25)}`
                        }}
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
                                gap: 0
                            }}
                        >
                            <Box
                                sx={{
                                    p: { xs: 3, md: 5 },
                                    color: BRAND.paper,
                                    background:
                                        `linear-gradient(180deg, ${alpha('#FFFFFF', 0.06)} 0%, transparent 100%)`
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: alpha('#FFFFFF', 0.72),
                                        textTransform: 'uppercase',
                                        letterSpacing: 3,
                                        fontWeight: 700,
                                        fontSize: '0.82rem',
                                        mb: 2
                                    }}
                                >
                                    Próximo passo
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: BRAND.fontFamilyHeader,
                                        fontSize: { xs: '2rem', md: '3rem' },
                                        lineHeight: 1.05,
                                        mb: 2.5
                                    }}
                                >
                                    Conte o que você precisa e a página já envia esse interesse para o fluxo de leads.
                                </Typography>
                                <Typography sx={{ color: alpha('#FFFFFF', 0.82), lineHeight: 1.9, mb: 3 }}>
                                    Em vez de uma vitrine passiva, a seção agora fecha com uma captação objetiva. O interesse segue com origem identificada e a trilha escolhida já vai no payload enviado.
                                </Typography>

                                <Stack spacing={1.5}>
                                    {[
                                        'Identificação da origem como pagina_servicos',
                                        `Registro do interesse atual em ${activeService.label.toLowerCase()}`,
                                        'Campos enxutos para facilitar conversão'
                                    ].map((item) => (
                                        <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                                            <TaskAltRoundedIcon sx={{ color: BRAND.secondary }} />
                                            <Typography sx={{ color: alpha('#FFFFFF', 0.88) }}>{item}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>

                            <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: BRAND.paper }}>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Nome"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <TextField
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Telefone"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Qual desafio você quer trabalhar?"
                                        name="mensagem"
                                        value={formData.mensagem}
                                        onChange={handleInputChange}
                                        fullWidth
                                        multiline
                                        minRows={4}
                                        placeholder="Descreva o contexto, o objetivo e o tipo de apoio que você espera."
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                        disabled={isSending}
                                        sx={{
                                            mt: 1,
                                            alignSelf: 'flex-start',
                                            bgcolor: BRAND.primary,
                                            px: 4,
                                            py: 1.3,
                                            borderRadius: '999px',
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            '&:hover': {
                                                bgcolor: BRAND.primaryDark
                                            }
                                        }}
                                    >
                                        {isSending ? 'Enviando...' : 'Enviar interesse'}
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Paper>
                </Stack>
            </Container>

            <Snackbar
                open={feedback.open}
                autoHideDuration={4500}
                onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
                    severity={feedback.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {feedback.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}