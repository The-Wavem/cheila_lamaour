import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new'; // Alterado de 'react-quill'
import 'react-quill-new/dist/quill.snow.css'; // Alterado o caminho do CSS

import {
    Box, Container, TextField, Button, Select, MenuItem,
    FormControl, InputLabel, Stack, IconButton, Typography, Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

export default function PostEditor() {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    // Configuração da Barra de Ferramentas (Toolbar)
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }], // H1, H2, Normal
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean'] // Remover formatação
        ],
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f4', pb: 10 }}>
            {/* --- BARRA DE TOPO (Navegação + Ações) --- */}
            <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0', py: 2, px: 3, position: 'sticky', top: 0, zIndex: 10 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">

                    {/* Esquerda: Voltar */}
                    <IconButton onClick={() => navigate('/admin/blog')}>
                        <ArrowBackIcon />
                    </IconButton>

                    {/* Direita: Ações */}
                    <Stack direction="row" spacing={2}>
                        <Button startIcon={<VisibilityIcon />} sx={{ color: '#666' }}>
                            Preview
                        </Button>
                        <Button variant="outlined" startIcon={<SaveIcon />} color="primary">
                            Salvar Rascunho
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SendIcon />}
                            sx={{ bgcolor: '#009688', '&:hover': { bgcolor: '#00796b' } }}
                        >
                            Publicar Agora
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            {/* --- ÁREA DE ESCRITA (Papel Centralizado) --- */}
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Paper elevation={0} sx={{ p: 6, borderRadius: 2 }}>

                    {/* 1. Título Gigante */}
                    <TextField
                        fullWidth
                        placeholder="Título do Artigo"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            style: { fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }
                        }}
                        sx={{ mb: 4 }}
                    />

                    {/* 2. Metadados (Categoria + Capa) */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Categoria</InputLabel>
                            <Select
                                value={category}
                                label="Categoria"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem value="Carreira">Carreira</MenuItem>
                                <MenuItem value="Liderança">Liderança</MenuItem>
                                <MenuItem value="Mindset">Mindset</MenuItem>
                                <MenuItem value="Relacionamentos">Relacionamentos</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="URL da Imagem de Capa"
                            placeholder="https://..."
                            helperText="Recomendado: Use imagens do Unsplash ou seus uploads"
                            variant="outlined"
                        />
                    </Stack>

                    {/* 3. Editor de Conteúdo (React Quill) */}
                    <Box sx={{
                        '.ql-container': { border: 'none', fontSize: '1.1rem', fontFamily: 'Roboto' },
                        '.ql-editor': { minHeight: '300px', padding: 0 },
                        '.ql-toolbar': { border: 'none', borderBottom: '1px solid #eee', marginBottom: '20px' }
                    }}>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            placeholder="Comece a escrever seu artigo incrível aqui..."
                        />
                    </Box>

                </Paper>
            </Container>
        </Box>
    );
}