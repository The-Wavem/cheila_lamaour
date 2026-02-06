import { useState } from 'react';
import {
    Box, TextField, Typography, Button, IconButton, Paper, Grid, Stack,
    Accordion, AccordionSummary, AccordionDetails, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';

// Mock inicial
const initialCards = [
    {
        id: 1,
        title: 'Desenvolvimento Pessoal',
        image: 'https://exemplo.com/foto-pessoal.jpg',
        description: 'Estratégias para sair do ponto A ao ponto B, focando em inteligência emocional.',
        topics: ['Mapeamento de perfil', 'Mentalidade e atitude', 'Psicologia dos relacionamentos']
    },
    {
        id: 2,
        title: 'Desenvolvimento Profissional',
        image: 'https://exemplo.com/foto-profissional.jpg',
        description: 'Acelere sua carreira com ferramentas práticas de gestão e liderança.',
        topics: ['Carreira', 'Liderança', 'Transição de Carreira']
    }
];

// Recebe props do SiteEditor
export default function ServicesEditor({ setIsDirty, onSaveSuccess }) {
    const [cards, setCards] = useState(initialCards);

    // Função genérica para marcar como "Sujo"
    const handleChange = () => {
        if (setIsDirty) setIsDirty(true);
    };

    const handleSave = () => {
        console.log("Salvando dados (Serviços)...");
        if (setIsDirty) setIsDirty(false);
        if (onSaveSuccess) onSaveSuccess();
    };

    // --- FUNÇÕES DE MANIPULAÇÃO DA LISTA ---
    const handleAddTopic = (cardId) => {
        handleChange(); // <--- Marca sujo
        setCards(cards.map(c => c.id === cardId ? { ...c, topics: [...c.topics, ''] } : c));
    };

    const handleRemoveTopic = (cardId, idx) => {
        handleChange(); // <--- Marca sujo
        setCards(cards.map(c => c.id === cardId ? { ...c, topics: c.topics.filter((_, i) => i !== idx) } : c));
    };

    const handleTopicChange = (cardId, idx, val) => {
        handleChange(); // <--- Marca sujo
        setCards(cards.map(c => c.id === cardId ? { ...c, topics: c.topics.map((t, i) => i === idx ? val : t) } : c));
    };

    const handleCardChange = (cardId, field, val) => {
        handleChange(); // <--- Marca sujo
        setCards(cards.map(c => c.id === cardId ? { ...c, [field]: val } : c));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* --- TOPO FIXO --- */}
            <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white' }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold">Editando: Serviços e Treinamentos</Typography>
                    <Typography variant="caption" color="text.secondary">Gerencie os textos do Hero e os cards de serviço.</Typography>
                </Box>
                <Button 
                    variant="contained" 
                    startIcon={<SaveIcon />} 
                    sx={{ bgcolor: '#009688' }}
                    onClick={handleSave} // <--- Botão Salvar
                >
                    Salvar Tudo
                </Button>
            </Box>

            {/* --- ÁREA DE SCROLL --- */}
            <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1, bgcolor: '#f4f4f4' }}>

                {/* 1. SEÇÃO HERO (CAPA DA PÁGINA) */}
                <Accordion defaultExpanded elevation={0} sx={{ mb: 3, borderRadius: '8px !important' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" fontWeight="bold" color="primary">1. HERO (CAPA DA PÁGINA)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={3}>
                            <TextField
                                label="TÍTULO PRINCIPAL (H1)"
                                fullWidth
                                defaultValue="Treinamentos | Coaching | Palestras"
                                onChange={handleChange} // <--- Monitorar
                            />
                            <TextField
                                label="SUBTÍTULO / DESCRIÇÃO"
                                fullWidth
                                multiline
                                rows={2}
                                defaultValue="Soluções completas para o seu desenvolvimento e da sua empresa."
                                onChange={handleChange} // <--- Monitorar
                            />
                            <TextField
                                label="IMAGEM DE FUNDO (URL)"
                                fullWidth
                                placeholder="https://..."
                                InputProps={{ startAdornment: <ImageIcon sx={{ color: 'action.active', mr: 1 }} /> }}
                                onChange={handleChange} // <--- Monitorar
                            />
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                {/* 2. CARDS DE SERVIÇOS */}
                <Typography variant="overline" color="text.secondary" fontWeight="bold" sx={{ display: 'block', mb: 2 }}>
                    2. CARDS DE SERVIÇOS ATIVOS
                </Typography>

                <Grid container spacing={3}>
                    {cards.map((card) => (
                        <Grid item xs={12} xl={6} key={card.id}>
                            <Paper sx={{ p: 3, borderRadius: 2, borderTop: '4px solid #C5A669' }}>

                                {/* Cabeçalho do Card (Imagem + Título) */}
                                <Stack spacing={3} sx={{ mb: 3 }}>
                                    <TextField
                                        label="TÍTULO DO SERVIÇO"
                                        fullWidth
                                        value={card.title}
                                        onChange={(e) => handleCardChange(card.id, 'title', e.target.value)}
                                        InputProps={{ style: { fontWeight: 'bold', color: '#009688' } }}
                                    />

                                    <Stack direction="row" spacing={2}>
                                        <Box
                                            sx={{
                                                width: 80, height: 80, bgcolor: '#eee', borderRadius: 1,
                                                backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center',
                                                border: '1px dashed #ccc'
                                            }}
                                        />
                                        <TextField
                                            label="URL DA IMAGEM DE DESTAQUE"
                                            fullWidth
                                            size="small"
                                            value={card.image}
                                            onChange={(e) => handleCardChange(card.id, 'image', e.target.value)}
                                            placeholder="https://..."
                                            helperText="Cole o link da imagem hospedada"
                                        />
                                    </Stack>

                                    <TextField
                                        label="DESCRIÇÃO CURTA"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        value={card.description}
                                        onChange={(e) => handleCardChange(card.id, 'description', e.target.value)}
                                        placeholder="Resumo do que se trata..."
                                    />
                                </Stack>

                                <Divider sx={{ my: 2 }} />

                                {/* Lista Dinâmica de Tópicos */}
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">LISTA DE TÓPICOS (CHECKLIST):</Typography>
                                <Stack spacing={2} sx={{ mt: 1 }}>
                                    {card.topics.map((topic, index) => (
                                        <Stack direction="row" spacing={1} key={index}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                placeholder="Item do serviço..."
                                                value={topic}
                                                onChange={(e) => handleTopicChange(card.id, index, e.target.value)}
                                            />
                                            <IconButton size="small" color="error" onClick={() => handleRemoveTopic(card.id, index)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    ))}

                                    <Button
                                        startIcon={<AddCircleIcon />}
                                        size="small"
                                        onClick={() => handleAddTopic(card.id)}
                                        sx={{ alignSelf: 'flex-start', color: '#C5A669' }}
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