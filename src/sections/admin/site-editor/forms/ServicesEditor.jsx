import { useState } from 'react';
import {
    Box, TextField, Typography, Button, IconButton, Stack, CircularProgress,
    Accordion, AccordionSummary, AccordionDetails, InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LabelIcon from '@mui/icons-material/Label'; // Ícone para o "Rótulo"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// --- PALETA DA MARCA ---
const BRAND = {
    teal: '#009688',
    gold: '#C5A669',
    bg: '#F4F6F8',
    lightGold: '#FDFCF5'
};

const initialFormData = {
    hero: {
        title: 'Treinamentos | Coaching',
        subtitle: 'Soluções completas para o seu desenvolvimento e da sua empresa.'
    },
    services: [
        {
            id: 1,
            label: 'Pessoal',
            title: 'Desenvolvimento Pessoal',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
            description: 'Estrategias para sair do ponto A ao ponto B com foco em desenvolvimento pessoal.',
            topics: ['Foco', 'Disciplina'],
            buttonText: 'Tenho Interesse'
        },
          {
            id: 2,
            label: 'Proficional',
            title: 'Desenvolvimento Profissional',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
            description: 'Estrategias para sair do ponto A ao ponto B com foco em desenvolvimento pessoal.',
            topics: ['Foco', 'Disciplina'],
            buttonText: 'Tenho Interesse'
        }
    ]
};

export default function ServicesEditor({ setIsDirty, onSaveSuccess }) {
    const [formData, setFormData] = useState(initialFormData);
    const [imageLoadState, setImageLoadState] = useState({});

    const handleChange = () => setIsDirty && setIsDirty(true);
    const handleSave = async () => {
        // MURILO: CHAME A API AQUI enviando o formData
        console.log('JSON Serviços:', formData); //remover futuramente
        onSaveSuccess && onSaveSuccess();
    };

    // --- FUNÇÕES DE MANIPULAÇÃO ---
    const handleAddTopic = (cardId) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.map(c => c.id === cardId ? { ...c, topics: [...c.topics, ''] } : c)
        }));
        handleChange();
    };

    const handleRemoveTopic = (cardId, idx) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.map(c => c.id === cardId ? { ...c, topics: c.topics.filter((_, i) => i !== idx) } : c)
        }));
        handleChange();
    };

    const handleTopicChange = (cardId, idx, val) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.map(c => c.id === cardId ? { ...c, topics: c.topics.map((t, i) => i === idx ? val : t) } : c)
        }));
        handleChange();
    };

    const handleServiceChange = (serviceId, field, value) => {
        if (field === 'image') {
            setImageLoadState(prev => ({
                ...prev,
                [serviceId]: value ? 'loading' : 'empty'
            }));
        }

        setFormData(prev => ({
            ...prev,
            services: prev.services.map(service =>
                service.id === serviceId ? { ...service, [field]: value } : service
            )
        }));
        handleChange();
    };

    const handleAddService = () => {
        setFormData(prev => {
            const nextId = prev.services.length
                ? Math.max(...prev.services.map(service => service.id || 0)) + 1
                : 1;

            return {
                ...prev,
                services: [
                    ...prev.services,
                    {
                        id: nextId,
                        label: '',
                        title: '',
                        image: '',
                        description: '',
                        topics: [''],
                        buttonText: 'Tenho Interesse'
                    }
                ]
            };
        });
        handleChange();
    };

    const handleRemoveService = (serviceId) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.filter(service => service.id !== serviceId)
        }));
        setImageLoadState(prev => {
            const next = { ...prev };
            delete next[serviceId];
            return next;
        });
        handleChange();
    };

    const handleHeroChange = (field, val) => {
        setFormData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                [field]: val
            }
        }));
        handleChange();
    };

    const accordionStyle = {
        elevation: 0,
        sx: {
            mb: 3, borderRadius: '8px !important', border: '1px solid #eee',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { borderLeft: `4px solid ${BRAND.gold}`, bgcolor: 'white' }
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: BRAND.bg }}>

            {/* --- TOPO FIXO --- */}
            <Box sx={{
                p: { xs: 2, sm: 3 },
                borderBottom: '1px solid #e0e0e0', 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between', 
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: { xs: 2, sm: 0 },
                bgcolor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
                <Box>
                    <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold', color: '#333' }}>
                        Serviços e Treinamentos
                    </Typography>
                </Box>
                <Button
                    variant="contained" startIcon={<SaveIcon />} onClick={handleSave}
                    sx={{ bgcolor: BRAND.teal, fontWeight: 'bold', '&:hover': { bgcolor: '#00796b' } }}
                >
                    Salvar Tudo
                </Button>
            </Box>

            {/* --- ÁREA DE SCROLL --- */}
            <Box sx={{ p: { xs: 2, md: 4 }, overflowY: 'auto', flexGrow: 1 }}>

                {/* 1. HERO (CAPA DA PÁGINA) */}
                <Accordion defaultExpanded {...accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
                        <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>1. HERO (CAPA DA PÁGINA)</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <TextField
                                label="TÍTULO PRINCIPAL (H1)" fullWidth variant="filled"
                                InputProps={{ disableUnderline: true, style: { fontSize: '1.2rem', fontWeight: 'bold' } }}
                                value={formData.hero.title}
                                onChange={(e) => handleHeroChange('title', e.target.value)}
                                sx={{ bgcolor: BRAND.bg, borderRadius: 1 }}
                            />
                            <TextField
                                label="SUBTÍTULO / DESCRIÇÃO" fullWidth multiline rows={2} variant="outlined"
                                value={formData.hero.subtitle}
                                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                            />
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                {/* 2. CONFIGURAÇÃO DAS ABAS (SERVIÇOS) */}
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, mt: 4 }}>
                    <Box sx={{ width: 4, height: 24, bgcolor: BRAND.gold, borderRadius: 1 }} />
                    <Typography variant="h6" color="#333" fontWeight="bold" sx={{ fontFamily: '"Playfair Display", serif' }}>
                        2. Gerenciar Abas de Serviços
                    </Typography>
                </Stack>

                <Stack spacing={2.5}>
                    {formData.services.map((service) => (
                        
                        <Accordion
                            key={service.id}
                            elevation={0}
                            sx={{
                                borderRadius: '10px !important',
                                border: '1px solid #e7e7e7',
                                '&:before': { display: 'none' },
                                '&.Mui-expanded': {
                                    borderLeft: `4px solid ${BRAND.gold}`,
                                    bgcolor: 'white'
                                }
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
                                <Typography fontWeight="bold" color={BRAND.teal}>
                                    {service.label || 'Novo Serviço'}
                                </Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveService(service.id);
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </AccordionSummary>

                            <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                                <Stack spacing={3}>
                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                        <TextField
                                            label="Nome da Aba"
                                            size="small"
                                            value={service.label || ''}
                                            onChange={(e) => handleServiceChange(service.id, 'label', e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LabelIcon sx={{ fontSize: 16, color: BRAND.gold }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{ width: { xs: '100%', md: '35%' } }}
                                        />
                                        <TextField
                                            label="Título Interno"
                                            fullWidth
                                            size="small"
                                            value={service.title || ''}
                                            onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                                        />
                                    </Stack>

                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                        <TextField
                                            label="URL da Imagem"
                                            fullWidth
                                            size="small"
                                            placeholder="https://..."
                                            value={service.image || ''}
                                            onChange={(e) => handleServiceChange(service.id, 'image', e.target.value)}
                                        />
                                        <TextField
                                            label="Texto do Botão"
                                            fullWidth
                                            size="small"
                                            value={service.buttonText || ''}
                                            onChange={(e) => handleServiceChange(service.id, 'buttonText', e.target.value)}
                                        />
                                    </Stack>

                                    <Box
                                        sx={{
                                            border: '1px dashed #d9d9d9',
                                            borderRadius: 2,
                                            p: 1.5,
                                            bgcolor: '#fcfcfc'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: 170,
                                                borderRadius: 1.5,
                                                overflow: 'hidden',
                                                bgcolor: '#f2f2f2',
                                                border: '1px solid #ececec',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative'
                                            }}
                                        >
                                            {service.image ? (
                                                <Box
                                                    component="img"
                                                    key={service.image}
                                                    src={service.image}
                                                    alt={service.title || 'Preview do serviço'}
                                                    onLoad={() => setImageLoadState(prev => ({ ...prev, [service.id]: 'loaded' }))}
                                                    onError={() => setImageLoadState(prev => ({ ...prev, [service.id]: 'error' }))}
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        display: imageLoadState[service.id] === 'error' ? 'none' : 'block'
                                                    }}
                                                />
                                            ) : (
                                                <Typography variant="body2" sx={{ color: '#8a8a8a' }}>
                                                    Cole uma URL para visualizar a imagem
                                                </Typography>
                                            )}

                                            {service.image && imageLoadState[service.id] !== 'loaded' && imageLoadState[service.id] !== 'error' && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        bgcolor: 'rgba(255,255,255,0.65)'
                                                    }}
                                                >
                                                    <CircularProgress size={24} sx={{ color: BRAND.teal }} />
                                                </Box>
                                            )}

                                            {imageLoadState[service.id] === 'error' && (
                                                <Typography variant="body2" sx={{ color: '#c0392b', fontWeight: 600 }}>
                                                    Nao foi possivel carregar esta imagem
                                                </Typography>
                                            )}
                                        </Box>

                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                                            {!service.image && (
                                                <Typography variant="caption" sx={{ color: '#8a8a8a' }}>
                                                    Aguardando URL da imagem
                                                </Typography>
                                            )}

                                            {service.image && imageLoadState[service.id] === 'loaded' && (
                                                <>
                                                    <CheckCircleOutlineIcon sx={{ fontSize: 18, color: '#2e7d32' }} />
                                                    <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 600 }}>
                                                        Imagem carregada com sucesso
                                                    </Typography>
                                                </>
                                            )}

                                            {service.image && imageLoadState[service.id] === 'error' && (
                                                <>
                                                    <ErrorOutlineIcon sx={{ fontSize: 18, color: '#c0392b' }} />
                                                    <Typography variant="caption" sx={{ color: '#c0392b', fontWeight: 600 }}>
                                                        URL invalida ou imagem indisponivel
                                                    </Typography>
                                                </>
                                            )}

                                            {service.image && (!imageLoadState[service.id] || imageLoadState[service.id] === 'loading') && (
                                                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                                    Carregando preview...
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Box>

                                    <TextField
                                        label="Descrição"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        value={service.description || ''}
                                        onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                                        placeholder="Resumo do serviço..."
                                    />

                                    <Box>
                                        <Typography variant="caption" fontWeight="bold" color={BRAND.teal}>
                                            O QUE ESTÁ INCLUSO (LISTA):
                                        </Typography>
                                        <Stack spacing={1.5} sx={{ mt: 2 }}>
                                            {(service.topics || []).map((topic, index) => (
                                                <Stack direction="row" spacing={1} key={index} alignItems="center">
                                                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: BRAND.gold }} />
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        placeholder="Item do serviço..."
                                                        variant="standard"
                                                        InputProps={{ disableUnderline: true, style: { fontSize: '0.95rem' } }}
                                                        sx={{ bgcolor: '#FAFAFA', px: 2, py: 0.5, borderRadius: 1 }}
                                                        value={topic}
                                                        onChange={(e) => handleTopicChange(service.id, index, e.target.value)}
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        sx={{ color: '#ffcccb', '&:hover': { color: 'error.main' } }}
                                                        onClick={() => handleRemoveTopic(service.id, index)}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
                                            ))}

                                            <Button
                                                startIcon={<AddCircleIcon />}
                                                size="small"
                                                onClick={() => handleAddTopic(service.id)}
                                                sx={{ alignSelf: 'flex-start', color: BRAND.gold, fontWeight: 'bold', mt: 1 }}
                                            >
                                                Adicionar Tópico
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    ))}

                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                        <Button
                            onClick={handleAddService}
                            startIcon={<AddCircleIcon />}
                            sx={{
                                border: `2px dashed ${BRAND.gold}`,
                                color: BRAND.teal,
                                fontWeight: 'bold',
                                px: 4,
                                py: 1.2,
                                borderRadius: 2,
                                textTransform: 'none',
                                bgcolor: BRAND.lightGold,
                                '&:hover': {
                                    bgcolor: '#f7f0dd',
                                    borderColor: BRAND.teal
                                }
                            }}
                        >
                            + Adicionar Nova Aba de Serviço
                        </Button>
                    </Box>
                </Stack>

            </Box>
        </Box>
    );
}