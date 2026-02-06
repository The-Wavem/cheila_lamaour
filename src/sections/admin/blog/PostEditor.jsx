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
import AddCircleIcon from '@mui/icons-material/AddCircle'; 
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

// Hooks e Componentes
import { useDirtyProtection } from '@/hooks/useDirtyProtection';
import ToastNotification from '@/components/ui/ToastNotification';
import UnsavedChangesModal from '@/components/ui/UnsavedChangesModal';

// --- PALETA DA MARCA (CONSTANTES) ---
const BRAND = {
  teal: '#009688',
  tealDark: '#00796b',
  gold: '#C5A669',
  goldLight: '#FDFCF5', // Fundo creme bem suave
  bg: '#F4F6F8',
  text: '#2D3748'
};

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
  const [blocks, setBlocks] = useState([{ id: 1, type: 'text', content: '' }]);

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
      setShowUnsavedModal(true);
    } else {
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
    const newBlock = { id: Date.now(), type, content: '', url: '', caption: '' };
    setBlocks([...blocks, newBlock]);
    markAsDirty();
    handleCloseMenu();
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

  const quillModules = {
    toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'clean']]
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND.bg, pb: 20 }}>
      {/* COMPONENTES DE FEEDBACK VISUAL */}
      <ToastNotification open={toast.open} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, open: false })} />
      <UnsavedChangesModal open={showUnsavedModal} onContinueEditing={() => setShowUnsavedModal(false)} onDiscardChanges={handleConfirmDiscard} />
      
      {/* --- BARRA DE TOPO (HEADER) --- */}
      <Box sx={{ 
        bgcolor: 'white', borderBottom: '1px solid #E0E0E0', py: 2, px: 3, 
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton onClick={handleGoBack} sx={{ color: BRAND.text }}>
            <ArrowBackIcon />
          </IconButton>
          
          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined" 
              startIcon={<SaveIcon />} 
              onClick={handleSaveDraft}
              sx={{ 
                borderColor: BRAND.gold, color: BRAND.gold, fontWeight: 'bold',
                '&:hover': { borderColor: '#A68B5B', bgcolor: BRAND.goldLight }
              }}
            >
              Salvar Rascunho
            </Button>
            <Button 
              variant="contained" 
              startIcon={<SendIcon />} 
              onClick={handlePublish}
              sx={{ 
                bgcolor: BRAND.teal, fontWeight: 'bold', boxShadow: 'none',
                '&:hover': { bgcolor: BRAND.tealDark, boxShadow: '0 4px 10px rgba(0,150,136,0.3)' } 
              }}
            >
              Publicar
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Container maxWidth="md" sx={{ mt: 5 }}>
        {/* PAPEL PRINCIPAL (Estilo Carta) */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 8 }, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          
          {/* --- CABEÇALHO (METADADOS) --- */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="overline" color={BRAND.gold} fontWeight="bold" sx={{ letterSpacing: 1.5 }}>
              CRIANDO NOVO ARTIGO
            </Typography>
            
            <TextField
              fullWidth placeholder="Digite o Título Aqui..." variant="standard" multiline
              value={title} onChange={(e) => { setTitle(e.target.value); markAsDirty(); }}
              InputProps={{ 
                disableUnderline: true, 
                style: { fontSize: '2.5rem', fontWeight: 800, color: '#1A202C', lineHeight: 1.2, fontFamily: 'serif' } // Fonte Serifada para Título
              }}
              sx={{ mb: 3, mt: 1 }}
            />
            
            <TextField
              fullWidth placeholder="Escreva um resumo curto e instigante..." multiline rows={2} variant="filled"
              value={description} onChange={(e) => { setDescription(e.target.value); markAsDirty(); }}
              InputProps={{ disableUnderline: true, style: { fontSize: '1.1rem', color: '#4A5568', fontStyle: 'italic' } }}
              sx={{ mb: 4, bgcolor: '#F7FAFC', borderRadius: 2 }}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel sx={{ color: BRAND.teal }}>Categoria Principal</InputLabel>
                <Select 
                  value={category} label="Categoria Principal" 
                  onChange={(e) => { setCategory(e.target.value); markAsDirty(); }}
                  sx={{ 
                    borderRadius: 2, 
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: BRAND.teal },
                    color: BRAND.teal, fontWeight: 'medium'
                  }}
                >
                  <MenuItem value="Carreira">Carreira</MenuItem>
                  <MenuItem value="Liderança">Liderança</MenuItem>
                  <MenuItem value="Mindset">Mindset</MenuItem>
                  <MenuItem value="Relacionamentos">Relacionamentos</MenuItem>
                </Select>
              </FormControl>
              
              <TextField 
                fullWidth label="Link da Imagem de Capa" 
                value={coverImage} onChange={(e) => { setCoverImage(e.target.value); markAsDirty(); }}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: BRAND.teal } }}
              />
            </Stack>
          </Box>

          <Divider sx={{ mb: 6, borderColor: '#eee' }}>
            <Box sx={{ bgcolor: '#fff', px: 2 }}>
               <DragIndicatorIcon sx={{ color: '#ccc' }} /> 
            </Box>
          </Divider>

          {/* --- CONSTRUTOR DE BLOCOS (A Mágica Visual) --- */}
          <Stack spacing={0} sx={{ position: 'relative' }}>
            {/* Linha vertical conectora (sutil) */}
            <Box sx={{ 
              position: 'absolute', left: -22, top: 20, bottom: 20, width: 2, 
              bgcolor: '#f0f0f0', display: { xs: 'none', md: 'block' } 
            }} />

            {blocks.map((block, index) => (
              <Box 
                key={block.id} 
                sx={{ 
                  position: 'relative', mb: 3, transition: 'all 0.3s',
                  '&:hover': { transform: 'translateX(5px)' }, // Leve movimento ao passar o mouse
                  '&:hover .block-actions': { opacity: 1, visibility: 'visible' },
                  '&:hover .block-indicator': { bgcolor: BRAND.gold } // A bolinha fica dourada no hover
                }}
              >
                
                {/* Indicador Visual do Bloco (A Bolinha na linha) */}
                <Box className="block-indicator" sx={{ 
                  position: 'absolute', left: -27, top: 24, width: 12, height: 12, borderRadius: '50%', 
                  bgcolor: '#e0e0e0', border: `2px solid white`, zIndex: 2, transition: '0.3s',
                  display: { xs: 'none', md: 'block' }
                }} />

                {/* Ações Laterais Flutuantes */}
                <Box className="block-actions" sx={{ 
                  position: 'absolute', left: -75, top: 15, 
                  display: 'flex', flexDirection: 'column', gap: 0.5,
                  opacity: 0, visibility: 'hidden', transition: '0.2s', zIndex: 5
                }}>
                  <Tooltip title="Mover Cima" placement="left"><IconButton size="small" onClick={() => moveBlock(index, 'up')} disabled={index === 0}><KeyboardArrowUpIcon fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Excluir" placement="left"><IconButton size="small" color="error" onClick={() => removeBlock(block.id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Mover Baixo" placement="left"><IconButton size="small" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}><KeyboardArrowDownIcon fontSize="small" /></IconButton></Tooltip>
                </Box>

                {/* --- CONTEÚDO DO BLOCO (Com design melhorado) --- */}
                <Box sx={{ 
                    position: 'relative',
                    borderLeft: `4px solid transparent`,
                    '&:hover': { borderLeftColor: BRAND.goldLight }, // Borda sutil no hover
                    pl: 2
                }}>

                  {/* 1. TEXTO (Editor Limpo) */}
                  {block.type === 'text' && (
                    <Box sx={{ 
                      '.ql-container': { fontSize: '1.15rem', fontFamily: 'Roboto, sans-serif', color: '#333', lineHeight: 1.8 },
                      '.ql-editor': { padding: '10px 0' },
                      '.ql-toolbar': { border: 'none', borderBottom: '1px dashed #eee', mb: 1 }
                    }}>
                      <ReactQuill theme="snow" value={block.content} onChange={(val) => updateBlock(block.id, 'content', val)} modules={quillModules} placeholder="Digite seu texto aqui..." />
                    </Box>
                  )}

                  {/* 2. IMAGEM (Card Elegante) */}
                  {block.type === 'image' && (
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#FAFAFA', border: '1px solid #eee', borderRadius: 2 }}>
                       {block.url ? (
                        <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 1 }}>
                          <Box component="img" src={block.url} sx={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} />
                        </Box>
                      ) : (
                        <Box sx={{ py: 6, textAlign: 'center', color: '#999', border: '2px dashed #ddd', borderRadius: 2 }}>
                          <AddPhotoAlternateIcon sx={{ fontSize: 40, mb: 1, color: BRAND.gold }} />
                          <Typography variant="body2">Visualização da Imagem</Typography>
                        </Box>
                      )}
                      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <TextField fullWidth size="small" placeholder="Cole o link da imagem (https://...)" value={block.url} onChange={(e) => updateBlock(block.id, 'url', e.target.value)} 
                          sx={{ bgcolor: 'white' }} 
                        />
                        <TextField fullWidth size="small" placeholder="Legenda da foto" value={block.caption} onChange={(e) => updateBlock(block.id, 'caption', e.target.value)} 
                          sx={{ bgcolor: 'white' }} 
                        />
                      </Stack>
                    </Paper>
                  )}

                  {/* 3. CITAÇÃO (Estilo Revista) */}
                  {block.type === 'quote' && (
                    <Paper elevation={0} sx={{ p: 4, bgcolor: BRAND.goldLight, borderLeft: `4px solid ${BRAND.gold}`, borderRadius: '0 8px 8px 0' }}>
                      <FormatQuoteIcon sx={{ fontSize: 40, color: BRAND.gold, opacity: 0.3, mb: -2 }} />
                      <TextField
                        fullWidth multiline rows={2} placeholder="Digite a frase de impacto..." variant="standard"
                        InputProps={{ disableUnderline: true, style: { fontSize: '1.6rem', fontStyle: 'italic', color: '#5D4037', fontFamily: 'serif' } }}
                        value={block.content} onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                      />
                    </Paper>
                  )}

                  {/* 4. VÍDEO */}
                  {block.type === 'video' && (
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, color: '#C53030' }}>
                        <YouTubeIcon /> <Typography fontWeight="bold">Incorporar Vídeo</Typography>
                      </Stack>
                      <TextField fullWidth size="small" placeholder="Cole a URL do YouTube" value={block.url} onChange={(e) => updateBlock(block.id, 'url', e.target.value)} sx={{ bgcolor: 'white' }} />
                    </Paper>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>

          {/* --- BOTÃO DE ADICIONAR (Visual Dourado) --- */}
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleOpenMenu}
              startIcon={<AddCircleIcon />}
              sx={{ 
                borderRadius: 50, px: 5, py: 1.5,
                border: `1px solid ${BRAND.gold}`,
                color: BRAND.gold,
                bgcolor: 'white',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(197, 166, 105, 0.15)',
                transition: '0.3s',
                '&:hover': { bgcolor: BRAND.gold, color: 'white', transform: 'scale(1.05)', boxShadow: '0 6px 20px rgba(197, 166, 105, 0.4)' }
              }}
            >
              Adicionar Conteúdo
            </Button>
          </Box>

          {/* MENU SUSPENSO (Estilizado) */}
          <Menu
            anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}
            PaperProps={{ sx: { mt: 1.5, minWidth: 220, borderRadius: 3, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' } }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Typography variant="overline" sx={{ px: 2, py: 1, color: '#999', fontWeight: 'bold' }}>ESCOLHA UM BLOCO</Typography>
            <MenuItem onClick={() => addBlock('text')} sx={{ py: 1.5 }}><ListItemIcon><TextFieldsIcon sx={{ color: BRAND.teal }} /></ListItemIcon><ListItemText primary="Parágrafo" /></MenuItem>
            <MenuItem onClick={() => addBlock('image')} sx={{ py: 1.5 }}><ListItemIcon><AddPhotoAlternateIcon sx={{ color: BRAND.gold }} /></ListItemIcon><ListItemText primary="Imagem" /></MenuItem>
            <MenuItem onClick={() => addBlock('quote')} sx={{ py: 1.5 }}><ListItemIcon><FormatQuoteIcon sx={{ color: '#5D4037' }} /></ListItemIcon><ListItemText primary="Citação de Destaque" /></MenuItem>
            <Divider />
            <MenuItem onClick={() => addBlock('video')} sx={{ py: 1.5 }}><ListItemIcon><YouTubeIcon color="error" /></ListItemIcon><ListItemText primary="Vídeo do YouTube" /></MenuItem>
          </Menu>

        </Paper>
      </Container>
    </Box>
  );
}