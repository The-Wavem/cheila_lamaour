import { useState } from 'react';
import {
    Box, TextField, Typography, Button, IconButton, Paper, Grid, MenuItem, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import WorkIcon from '@mui/icons-material/Work';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BusinessIcon from '@mui/icons-material/Business';

// Mock dos Cards Existentes
const initialCards = [
    { id: 1, title: 'Desenvolvimento Pessoal', icon: 'psychology', topics: ['Inteligência Emocional', 'Mindset'] },
    { id: 2, title: 'Desenvolvimento Profissional', icon: 'work', topics: ['Carreira', 'Liderança'] }
];

export default function ServicesEditor() {
    const [cards, setCards] = useState(initialCards);

    // Ícones Disponíveis (Seletor Visual)
    const availableIcons = [
        { value: 'psychology', label: 'Mente (Pessoal)', component: <PsychologyIcon /> },
        { value: 'work', label: 'Maleta (Profissional)', component: <WorkIcon /> },
        { value: 'business', label: 'Prédio (Empresarial)', component: <BusinessIcon /> },
    ];

    // Adicionar Tópico na Lista Dinâmica
    const handleAddTopic = (cardId) => {
        const updatedCards = cards.map(card => {
            if (card.id === cardId) return { ...card, topics: [...card.topics, ''] };
            return card;
        });
        setCards(updatedCards);
    };

    // Remover Tópico
    const handleRemoveTopic = (cardId, indexTopic) => {
        const updatedCards = cards.map(card => {
            if (card.id === cardId) {
                const newTopics = card.topics.filter((_, i) => i !== indexTopic);
                return { ...card, topics: newTopics };
            }
            return card;
        });
        setCards(updatedCards);
    };

    // Atualizar Texto do Tópico
    const handleTopicChange = (cardId, indexTopic, value) => {
        const updatedCards = cards.map(card => {
            if (card.id === cardId) {
                const newTopics = [...card.topics];
                newTopics[indexTopic] = value;
                return { ...card, topics: newTopics };
            }
            return card;
        });
        setCards(updatedCards);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">Editando: Serviços</Typography>
                <Button variant="contained" startIcon={<SaveIcon />} sx={{ bgcolor: '#009688' }}>Salvar Tudo</Button>
            </Box>

            <Box sx={{ p: 4, overflowY: 'auto', bgcolor: '#f4f4f4', flexGrow: 1 }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold">CARDS DE SERVIÇOS ATIVOS</Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                    {cards.map((card) => (
                        <Grid item xs={12} xl={6} key={card.id}>
                            <Paper sx={{ p: 3, borderRadius: 2 }}>

                                {/* Cabeçalho do Card */}
                                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                                    <TextField
                                        select
                                        label="Ícone"
                                        value={card.icon}
                                        sx={{ width: 100 }}
                                    >
                                        {availableIcons.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    {option.component}
                                                </Stack>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField label="TÍTULO DO SERVIÇO" fullWidth value={card.title} />
                                </Stack>

                                {/* Lista Dinâmica de Tópicos */}
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">O QUE ESTÁ INCLUSO (LISTA):</Typography>
                                <Stack spacing={2} sx={{ mt: 1 }}>
                                    {card.topics.map((topic, index) => (
                                        <Stack direction="row" spacing={1} key={index}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                placeholder="Ex: Mentoria Individual"
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