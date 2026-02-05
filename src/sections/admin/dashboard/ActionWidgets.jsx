import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Paper, Typography, Button, Grid, Stack, IconButton, Divider, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import WebIcon from '@mui/icons-material/Web'; // Ícone para "Site"

export default function ActionWidgets() {
    const navigate = useNavigate();
    const [note, setNote] = useState('');

    return (
        <Grid container spacing={3}>

            {/* 1. ACESSO RÁPIDO AO EDITOR DO SITE */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Paper
                    sx={{
                        p: 3, height: '100%',
                        background: 'linear-gradient(135deg, #009688 0%, #00796b 100%)', // Gradiente Verde
                        color: 'white',
                        borderRadius: 3,
                        position: 'relative', overflow: 'hidden'
                    }}
                >
                    <WebIcon sx={{ fontSize: 80, opacity: 0.2, position: 'absolute', right: -10, top: -10 }} />

                    <Typography variant="h6" fontWeight="bold" gutterBottom>Editor do Site</Typography>
                    <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                        Precisa alterar um telefone, texto da Bio ou adicionar um livro novo?
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => navigate('/admin/editor')}
                        sx={{ bgcolor: 'white', color: '#009688', '&:hover': { bgcolor: '#f0f0f0' }, fontWeight: 'bold' }}
                    >
                        Acessar Editor Visual
                    </Button>
                </Paper>
            </Grid>

            {/* 2. BLOCO DE NOTAS RÁPIDO (ANOTE) */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                            ANOTAÇÕES RÁPIDAS
                        </Typography>
                        <IconButton size="small" color="primary">
                            <SaveIcon fontSize="small" />
                        </IconButton>
                    </Stack>

                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="Ideia para o próximo post..."
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        sx={{ flexGrow: 1, bgcolor: '#fffbf0', p: 1, borderRadius: 1 }} // Corzinha de Post-it suave
                    />
                </Paper>
            </Grid>

            {/* 3. AÇÕES RÁPIDAS (BOTÕES) */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="text.secondary" sx={{ mb: 2 }}>
                        O QUE VOCÊ QUER FAZER?
                    </Typography>

                    <Stack spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            fullWidth
                            onClick={() => navigate('/admin/blog/novo')}
                            sx={{ justifyContent: 'flex-start', color: '#333', borderColor: '#e0e0e0' }}
                        >
                            Escrever Novo Artigo
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            fullWidth
                            onClick={() => navigate('/admin/leads')}
                            sx={{ justifyContent: 'flex-start', color: '#333', borderColor: '#e0e0e0' }}
                        >
                            Ver Últimos Leads
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<WebIcon />}
                            fullWidth
                            onClick={() => window.open('/', '_blank')}
                            sx={{ justifyContent: 'flex-start', color: '#333', borderColor: '#e0e0e0' }}
                        >
                            Ver Site Online
                        </Button>
                    </Stack>
                </Paper>
            </Grid>

        </Grid>
    );
}