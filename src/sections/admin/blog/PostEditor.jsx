import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import {
    Box, Container, TextField, Button, Select, MenuItem,
    FormControl, InputLabel, Stack, IconButton, Typography, Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import { useDirtyProtection } from '@/hooks/useDirtyProtection';
import ToastNotification from '@/components/ui/ToastNotification';
import UnsavedChangesModal from '@/components/ui/UnsavedChangesModal'; // <--- Importamos o Modal

export default function PostEditor() {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');

    // Estados de Controle
    const [isDirty, setIsDirty] = useState(false);
    const [showUnsavedModal, setShowUnsavedModal] = useState(false); // <--- Estado do Modal
    const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

    // Proteção de Navegação (Navegador/Aba)
    useDirtyProtection(isDirty);

    // Handler Genérico para marcar como sujo
    const markAsDirty = () => {
        if (!isDirty) setIsDirty(true);
    };

    const handleGoBack = () => {
        if (isDirty) {
            // Se tiver alterações, abre o modal
            setShowUnsavedModal(true);
        } else {
            // Se estiver limpo, volta direto
            navigate('/admin/blog');
        }
    };

    // 3. CONFIRMAR SAÍDA NO MODAL
    const handleConfirmDiscard = () => {
        setIsDirty(false); // Limpa o sujo
        setShowUnsavedModal(false);
        navigate('/admin/blog'); // Executa a saída
    };

    const handleSaveDraft = () => {
        console.log("Salvando Rascunho...", { title, category, content });

        // Simulação de delay de API
        setTimeout(() => {
            setIsDirty(false); // Limpa estado sujo
            setToast({ open: true, message: 'Rascunho salvo com sucesso!', type: 'success' });
        }, 500);
    };

    const handlePublish = () => {
        if (!title || !content) {
            setToast({ open: true, message: 'Preencha o título e o conteúdo antes de publicar.', type: 'error' });
            return;
        }

        console.log("Publicando Artigo...", { title, category, content });

        setIsDirty(false);
        setToast({ open: true, message: 'Artigo publicado!', type: 'success' });

        // Redireciona após publicar 
        setTimeout(() => navigate('/admin/blog'), 1000);
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ],
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f4', pb: 10 }}>
            <ToastNotification
                open={toast.open}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, open: false })}
            />

            {/*  MODAL DE AVISO CONECTADO */}
            <UnsavedChangesModal
                open={showUnsavedModal}
                onContinueEditing={() => setShowUnsavedModal(false)}
                onDiscardChanges={handleConfirmDiscard}
            />

            {/* --- BARRA DE TOPO (Navegação + Ações) --- */}
            <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0', py: 2, px: 3, position: 'sticky', top: 0, zIndex: 10 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">

                    {/* Esquerda: Voltar (Agora usando handleGoBack) */}
                    <IconButton onClick={handleGoBack}>
                        <ArrowBackIcon />
                    </IconButton>

                    {/* Direita: Ações */}
                    <Stack direction="row" spacing={2}>
                        <Button startIcon={<VisibilityIcon />} sx={{ color: '#666' }}>
                            Preview
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<SaveIcon />}
                            color="primary"
                            onClick={handleSaveDraft}
                        >
                            Salvar Rascunho
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SendIcon />}
                            sx={{ bgcolor: '#009688', '&:hover': { bgcolor: '#00796b' } }}
                            onClick={handlePublish}
                        >
                            Publicar Agora
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            {/* --- ÁREA DE ESCRITA --- */}
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Paper elevation={0} sx={{ p: 6, borderRadius: 2 }}>

                    {/* 1. Título Gigante */}
                    <TextField
                        fullWidth
                        placeholder="Título do Artigo"
                        variant="standard"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); markAsDirty(); }}
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
                                onChange={(e) => { setCategory(e.target.value); markAsDirty(); }}
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
                            onChange={markAsDirty}
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
                            onChange={(val) => { setContent(val); markAsDirty(); }}
                            modules={modules}
                            placeholder="Comece a escrever seu artigo incrível aqui..."
                        />
                    </Box>

                </Paper>
            </Container>
        </Box>
    );
}