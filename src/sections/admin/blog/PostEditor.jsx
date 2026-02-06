import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import {
    Box, Container, TextField, Button, Select, MenuItem,
    FormControl, InputLabel, Stack, IconButton, Typography, Paper, Divider,
    Menu, ListItemIcon, ListItemText, Tooltip
} from '@mui/material';

// Ícones
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // O Botão +
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Ícones do Menu de Blocos
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Hooks e Componentes
import { useDirtyProtection } from '@/hooks/useDirtyProtection'; // Verifique se o alias @ está configurado, senão use ../../../
import ToastNotification from '@/components/ui/ToastNotification';
import UnsavedChangesModal from '@/components/ui/UnsavedChangesModal';

export default function PostEditor() {
    const navigate = useNavigate();

    // --- ESTADOS DE METADADOS ---
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [coverImage, setCoverImage] = useState('');

    // --- ESTADOS DE CONTROLE ---
    const [isDirty, setIsDirty] = useState(false);
    const [showUnsavedModal, setShowUnsavedModal] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

    // Proteção de Navegação (Hook)
    useDirtyProtection(isDirty);

    // --- ESTADO DO CONSTRUTOR ---
    const [blocks, setBlocks] = useState([
        { id: 1, type: 'text', content: '' }
    ]);

    // --- ESTADO DO MENU "ADICIONAR (+)" ---
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    // --- FUNÇÕES UTILITÁRIAS ---
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

    const handleConfirmDiscard = () => {
        setIsDirty(false);
        setShowUnsavedModal(false);
        navigate('/admin/blog');
    };

    const handleSaveDraft = () => {
        console.log("Salvando Rascunho...", { title, description, category, blocks });
        setTimeout(() => {
            setIsDirty(false);
            setToast({ open: true, message: 'Rascunho salvo com sucesso!', type: 'success' });
        }, 500);
    };

    const handlePublish = () => {
        if (!title || !blocks[0].content) {
            setToast({ open: true, message: 'Preencha o título e pelo menos um bloco de conteúdo.', type: 'error' });
            return;
        }
        console.log("Publicando Artigo...", { title, description, category, blocks });
        setIsDirty(false);
        setToast({ open: true, message: 'Artigo publicado!', type: 'success' });
        setTimeout(() => navigate('/admin/blog'), 1000);
    };

    // --- FUNÇÕES DE BLOCOS ---

    const addBlock = (type) => {
        const newBlock = {
            id: Date.now(),
            type,
            content: '',
            url: '',
            caption: ''
        };
        setBlocks([...blocks, newBlock]);
        markAsDirty();
        handleCloseMenu(); // Fecha o menu após escolher
    };

    const removeBlock = (id) => {
        if (blocks.length === 1 && blocks[0].type === 'text') return;
        setBlocks(blocks.filter(b => b.id !== id));
        markAsDirty();
    };

    const moveBlock = (index, direction) => {
        const newBlocks = [...blocks];
        if (direction === 'up' && index > 0) {
            [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
        } else if (direction === 'down' && index < newBlocks.length - 1) {
            [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
        }
        setBlocks(newBlocks);
        markAsDirty();
    };

    const updateBlock = (id, field, value) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
        markAsDirty();
    };

    // Config do Quill
    const quillModules = {
        toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['link', 'clean']]
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f4', pb: 20 }}>
            {/* COMPONENTES DE FEEDBACK VISUAL */}
            <ToastNotification open={toast.open} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, open: false })} />
            <UnsavedChangesModal open={showUnsavedModal} onContinueEditing={() => setShowUnsavedModal(false)} onDiscardChanges={handleConfirmDiscard} />

            {/* BARRA DE TOPO */}
            <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0', py: 2, px: 3, position: 'sticky', top: 0, zIndex: 100 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <IconButton onClick={handleGoBack}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSaveDraft}>
                            Salvar Rascunho
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SendIcon />}
                            sx={{ bgcolor: '#009688', '&:hover': { bgcolor: '#00796b' } }}
                            onClick={handlePublish}
                        >
                            Publicar
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Paper elevation={0} sx={{ p: 6, borderRadius: 2 }}>

                    {/* CABEÇALHO (METADADOS) */}
                    <Box sx={{ mb: 6 }}>
                        <TextField
                            fullWidth placeholder="Título do Artigo" variant="standard"
                            value={title} onChange={(e) => { setTitle(e.target.value); markAsDirty(); }}
                            InputProps={{ disableUnderline: true, style: { fontSize: '2.5rem', fontWeight: 'bold', color: '#333' } }}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            fullWidth label="Descrição Curta (Resumo)" multiline rows={2}
                            value={description} onChange={(e) => { setDescription(e.target.value); markAsDirty(); }}
                            sx={{ mb: 3, bgcolor: '#fafafa' }}
                        />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
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
                                fullWidth label="URL da Imagem de Capa"
                                value={coverImage} onChange={(e) => { setCoverImage(e.target.value); markAsDirty(); }}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 6 }}>
                        <Typography variant="caption" color="text.secondary">CORPO DO ARTIGO</Typography>
                    </Divider>

                    {/* LISTA DE BLOCOS */}
                    <Stack spacing={4}>
                        {blocks.map((block, index) => (
                            <Box
                                key={block.id}
                                sx={{
                                    position: 'relative',
                                    '&:hover .block-actions': { opacity: 1, visibility: 'visible' },
                                    transition: 'all 0.3s'
                                }}
                            >
                                {/* --- BARRA LATERAL DE AÇÕES (Só aparece no hover) --- */}
                                <Box
                                    className="block-actions"
                                    sx={{
                                        position: 'absolute', left: -45, top: 0, bottom: 0,
                                        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.5,
                                        opacity: 0, visibility: 'hidden', transition: '0.2s'
                                    }}
                                >
                                    <Tooltip title="Mover para Cima" placement="left">
                                        <span>
                                            <IconButton size="small" onClick={() => moveBlock(index, 'up')} disabled={index === 0}>
                                                <KeyboardArrowUpIcon fontSize="small" />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="Excluir Bloco" placement="left">
                                        <IconButton size="small" color="error" onClick={() => removeBlock(block.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Mover para Baixo" placement="left">
                                        <span>
                                            <IconButton size="small" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}>
                                                <KeyboardArrowDownIcon fontSize="small" />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Box>

                                {/* --- RENDERIZAÇÃO DOS TIPOS DE BLOCO --- */}
                                {/* 1. TEXTO */}
                                {block.type === 'text' && (
                                    <Box sx={{ '.ql-container': { border: 'none', fontSize: '1.1rem', fontFamily: 'Roboto' }, '.ql-toolbar': { border: 'none', bgcolor: '#f9f9f9', borderRadius: 1 } }}>
                                        <ReactQuill
                                            theme="snow" value={block.content} onChange={(val) => updateBlock(block.id, 'content', val)}
                                            modules={quillModules} placeholder="Escreva seu parágrafo..."
                                        />
                                    </Box>
                                )}

                                {/* 2. IMAGEM */}
                                {block.type === 'image' && (
                                    <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fafafa', borderStyle: 'dashed' }}>
                                        <Stack spacing={2} alignItems="center">
                                            {block.url ? (
                                                <Box component="img" src={block.url} sx={{ maxHeight: 400, maxWidth: '100%', borderRadius: 1 }} />
                                            ) : (
                                                <Box sx={{ p: 4, color: 'text.secondary', textAlign: 'center' }}>
                                                    <AddPhotoAlternateIcon sx={{ fontSize: 40, mb: 1 }} />
                                                    <Typography variant="body2">Cole a URL da imagem</Typography>
                                                </Box>
                                            )}
                                            <TextField
                                                fullWidth size="small" label="URL da Imagem" value={block.url} onChange={(e) => updateBlock(block.id, 'url', e.target.value)}
                                            />
                                            <TextField
                                                fullWidth size="small" label="Legenda" variant="standard" value={block.caption} onChange={(e) => updateBlock(block.id, 'caption', e.target.value)}
                                            />
                                        </Stack>
                                    </Paper>
                                )}

                                {/* 3. CITAÇÃO */}
                                {block.type === 'quote' && (
                                    <Paper sx={{ p: 3, borderLeft: '4px solid #C5A669', bgcolor: '#fffbf0' }}>
                                        <TextField
                                            fullWidth multiline rows={2} placeholder="Frase de destaque..." variant="standard"
                                            InputProps={{ disableUnderline: true, style: { fontSize: '1.4rem', fontStyle: 'italic', color: '#555' } }}
                                            value={block.content} onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                                        />
                                    </Paper>
                                )}

                                {/* 4. VÍDEO (NOVO) */}
                                {block.type === 'video' && (
                                    <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fff0f0' }}>
                                        <Stack spacing={2} alignItems="center">
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#d32f2f' }}>
                                                <YouTubeIcon /> <Typography fontWeight="bold">Vídeo do YouTube</Typography>
                                            </Stack>
                                            <TextField
                                                fullWidth size="small" label="URL do Vídeo (Embed)" placeholder="https://youtube.com/watch?v=..."
                                                value={block.url} onChange={(e) => updateBlock(block.id, 'url', e.target.value)}
                                            />
                                        </Stack>
                                    </Paper>
                                )}

                            </Box>
                        ))}
                    </Stack>

                    {/* --- BOTÃO CENTRAL "ADICIONAR (+)" --- */}
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={handleOpenMenu}
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{
                                borderRadius: 20, px: 4, py: 1,
                                borderStyle: 'dashed', borderWidth: 2,
                                '&:hover': { borderWidth: 2, bgcolor: '#f0faff' }
                            }}
                        >
                            Adicionar Bloco
                        </Button>
                    </Box>

                    {/* MENU SUSPENSO (SPEED DIAL) */}
                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        PaperProps={{ sx: { mt: 1, minWidth: 200, borderRadius: 2 } }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Typography variant="caption" sx={{ px: 2, py: 1, color: '#999', display: 'block' }}>ESCOLHA UM TIPO</Typography>

                        <MenuItem onClick={() => addBlock('text')}>
                            <ListItemIcon><TextFieldsIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>Parágrafo de Texto</ListItemText>
                        </MenuItem>

                        <MenuItem onClick={() => addBlock('image')}>
                            <ListItemIcon><AddPhotoAlternateIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>Imagem</ListItemText>
                        </MenuItem>

                        <MenuItem onClick={() => addBlock('quote')}>
                            <ListItemIcon><FormatQuoteIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>Citação em Destaque</ListItemText>
                        </MenuItem>

                        <Divider />

                        <MenuItem onClick={() => addBlock('video')}>
                            <ListItemIcon><YouTubeIcon fontSize="small" color="error" /></ListItemIcon>
                            <ListItemText>Vídeo do YouTube</ListItemText>
                        </MenuItem>
                    </Menu>

                </Paper>
            </Container>
        </Box>
    );
}