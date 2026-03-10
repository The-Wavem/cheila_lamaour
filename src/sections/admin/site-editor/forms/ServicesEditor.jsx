import { useState } from 'react';
import {
    Box, TextField, Typography, Button, IconButton, Paper, Grid, Stack,
    Accordion, AccordionSummary, AccordionDetails, Divider, InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';
import LabelIcon from '@mui/icons-material/Label'; // Ícone para o "Rótulo"

// --- PALETA DA MARCA ---
const BRAND = {
    teal: '#009688',
    gold: '#C5A669',
    bg: '#F4F6F8',
    lightGold: '#FDFCF5'
};

const initialCards = [
    {
        id: 1,
        label: 'Pessoal', // Nome curto da aba
        title: 'Desenvolvimento Pessoal',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
        description: 'Estratégias para sair do ponto A ao ponto B, focando em inteligência emocional.',
        topics: ['Mapeamento de perfil', 'Mentalidade e atitude', 'Psicologia dos relacionamentos']
    },
    {
        id: 2,
        label: 'Profissional',
        title: 'Desenvolvimento Profissional',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        description: 'Acelere sua carreira com ferramentas práticas de gestão e liderança.',
        topics: ['Carreira', 'Liderança', 'Transição de Carreira']
    }
];

export default function ServicesEditor({ setIsDirty, onSaveSuccess }) {
    const [cards, setCards] = useState(initialCards);

    const handleChange = () => setIsDirty && setIsDirty(true);
    const handleSave = () => onSaveSuccess && onSaveSuccess();

    // --- FUNÇÕES DE MANIPULAÇÃO ---
    const handleAddTopic = (cardId) => {
        setCards(cards.map(c => c.id === cardId ? { ...c, topics: [...c.topics, ''] } : c));
        handleChange();
    };

    const handleRemoveTopic = (cardId, idx) => {
        setCards(cards.map(c => c.id === cardId ? { ...c, topics: c.topics.filter((_, i) => i !== idx) } : c));
        handleChange();
    };

    const handleTopicChange = (cardId, idx, val) => {
        setCards(cards.map(c => c.id === cardId ? { ...c, topics: c.topics.map((t, i) => i === idx ? val : t) } : c));
        handleChange();
    };

    const handleCardChange = (cardId, field, val) => {
        setCards(cards.map(c => c.id === cardId ? { ...c, [field]: val } : c));
        handleChange();
    };

    // Estilo "Gold Accordion" para o Hero
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
                                defaultValue="Treinamentos | Coaching | Palestras" onChange={handleChange}
                                sx={{ bgcolor: BRAND.bg, borderRadius: 1 }}
                            />
                            <TextField
                                label="SUBTÍTULO / DESCRIÇÃO" fullWidth multiline rows={2} variant="outlined"
                                defaultValue="Soluções completas para o seu desenvolvimento e da sua empresa." onChange={handleChange}
                            />
                            <TextField
                                label="IMAGEM DE FUNDO (URL)" fullWidth size="small" placeholder="https://..."
                                InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon sx={{ color: '#ccc' }} /></InputAdornment> }}
                                onChange={handleChange}
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

                <Grid container spacing={3}>
                    {cards.map((card, index) => (
                        <Grid size={{ xs: 12, xl: 6 }} key={card.id}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3, borderRadius: 2,
                                    borderTop: `4px solid ${BRAND.gold}`,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                    bgcolor: 'white'
                                }}
                            >

                                {/* Cabeçalho Visual da Aba */}
                                <Box sx={{ mb: 3, bgcolor: BRAND.lightGold, p: 2, borderRadius: 2, border: '1px dashed #e0d0a0' }}>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                        <Box sx={{ bgcolor: BRAND.teal, color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>
                                            {index + 1}
                                        </Box>
                                        <Typography variant="caption" fontWeight="bold" color={BRAND.gold}>
                                            CONFIGURAÇÃO DA ABA
                                        </Typography>
                                    </Stack>

                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                        <TextField
                                            label="Rótulo do Botão (Aba)" size="small"
                                            value={card.label || ''} onChange={(e) => handleCardChange(card.id, 'label', e.target.value)}
                                            InputProps={{ startAdornment: <InputAdornment position="start"><LabelIcon sx={{ fontSize: 16, color: BRAND.gold }} /></InputAdornment> }}
                                            helperText="Ex: Pessoal (Curto)"
                                            sx={{ bgcolor: 'white', width: { xs: '100%', sm: '40%' } }}
                                        />
                                        <TextField
                                            label="Título Completo (H1)" fullWidth size="small"
                                            value={card.title} onChange={(e) => handleCardChange(card.id, 'title', e.target.value)}
                                            sx={{ bgcolor: 'white' }}
                                        />
                                    </Stack>
                                </Box>

                                {/* Imagem e Descrição */}
                                <Stack spacing={3} sx={{ mb: 3 }}>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
                                        <Box
                                            sx={{
                                                width: { xs: '100%', sm: 100 }, height: { xs: 120, sm: 80 }, 
                                                bgcolor: '#f0f0f0', borderRadius: 2, flexShrink: 0,
                                                backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center',
                                                border: '1px solid #ddd'
                                            }}
                                        />
                                        <Stack spacing={2} sx={{ width: '100%' }}>
                                            <TextField
                                                label="URL da Imagem de Destaque" fullWidth size="small"
                                                value={card.image} onChange={(e) => handleCardChange(card.id, 'image', e.target.value)}
                                                placeholder="https://..."
                                            />
                                            <TextField
                                                label="Descrição do Serviço" fullWidth multiline rows={2} size="small"
                                                value={card.description} onChange={(e) => handleCardChange(card.id, 'description', e.target.value)}
                                                placeholder="Resumo..."
                                            />
                                        </Stack>
                                    </Stack>
                                </Stack>

                                <Divider sx={{ my: 2 }} />

                                {/* Lista Dinâmica de Tópicos */}
                                <Typography variant="caption" fontWeight="bold" color={BRAND.teal}>O QUE ESTÁ INCLUSO (LISTA):</Typography>
                                <Stack spacing={1.5} sx={{ mt: 2 }}>
                                    {card.topics.map((topic, index) => (
                                        <Stack direction="row" spacing={1} key={index} alignItems="center">
                                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: BRAND.gold }} />
                                            <TextField
                                                fullWidth size="small" placeholder="Item do serviço..." variant="standard"
                                                InputProps={{ disableUnderline: true, style: { fontSize: '0.95rem' } }}
                                                sx={{ bgcolor: '#FAFAFA', px: 2, py: 0.5, borderRadius: 1 }}
                                                value={topic} onChange={(e) => handleTopicChange(card.id, index, e.target.value)}
                                            />
                                            <IconButton size="small" sx={{ color: '#ffcccb', '&:hover': { color: 'error.main' } }} onClick={() => handleRemoveTopic(card.id, index)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    ))}

                                    <Button
                                        startIcon={<AddCircleIcon />} size="small" onClick={() => handleAddTopic(card.id)}
                                        sx={{ alignSelf: 'flex-start', color: BRAND.gold, fontWeight: 'bold', mt: 1 }}
                                    >
                                        Adicionar Item
                                    </Button>
                                </Stack>

                            </Paper>
                        </Grid>
                    ))}
                </Grid>

            </Box>
        </Box>
    );
}