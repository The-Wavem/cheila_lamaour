import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import {
    Box, Container, TextField, Button, Select, MenuItem,
    FormControl, InputLabel, Stack, IconButton, Typography, Paper, Divider,
    Menu, ListItemIcon, ListItemText, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions
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
import AddIcon from '@mui/icons-material/Add';
import { useDirtyProtection } from '@/hooks/useDirtyProtection';
import ToastNotification from '@/components/ui/overlays/ToastNotification';
import UnsavedChangesModal from '@/components/ui/overlays/UnsavedChangesModal';
import { BRAND } from '@/theme/branding';

export default function PostEditor() {
  const navigate = useNavigate();
  
  // --- ESTADOS DE METADADOS ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');

  // --- LÓGICA DE CATEGORIAS DINÂMICAS ---
  const [category, setCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState(['Carreira', 'Liderança', 'Mindset', 'Relacionamentos']);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

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

  // --- FUNÇÕES DE CATEGORIA ---
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (value === 'NEW_CATEGORY_ACTION') {
      setCategoryModalOpen(true);
    } else {
      setCategory(value);
      markAsDirty();
    }
  };

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      setAvailableCategories([...availableCategories, newCategoryName]);
      setCategory(newCategoryName);
      markAsDirty();
      setNewCategoryName('');
      setCategoryModalOpen(false);
      setToast({ open: true, message: 'Nova categoria adicionada!', type: 'success' });
    }
  };

  // --- FUNÇÕES DE NAVEGAÇÃO/SALVAMENTO ---
  const handleConfirmDiscard = () => {
    setIsDirty(false); 
    setShowUnsavedModal(false);
    navigate('/admin/blog'); 
  };

  const handleSaveDraft = () => {
    setTimeout(() => {
      setIsDirty(false); 
      setToast({ open: true, message: 'Rascunho salvo com sucesso!', type: 'success' });
    }, 500);
  };

  const handlePublish = () => {
    if (!title || !blocks[0].content) {
      setToast({ open: true, message: 'Preencha o título e o conteúdo.', type: 'error' });
      return;
    }
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
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND.background, pb: 20 }}>
      {/* COMPONENTES DE FEEDBACK VISUAL */}
      <ToastNotification open={toast.open} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, open: false })} />
      <UnsavedChangesModal open={showUnsavedModal} onContinueEditing={() => setShowUnsavedModal(false)} onDiscardChanges={handleConfirmDiscard} />
      
      {/* --- BARRA DE TOPO (HEADER) --- */}
      <Box sx={{ 
        bgcolor: 'white', borderBottom: `1px solid ${BRAND.border}`, py: 2, px: 3, 
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: BRAND.shadowSoft
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton onClick={handleGoBack} sx={{ color: BRAND.textPrimary }}>
            <ArrowBackIcon />
          </IconButton>
          
          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined" 
              startIcon={<SaveIcon />} 
              onClick={handleSaveDraft}
              sx={{ 
                borderColor: BRAND.secondary, color: BRAND.secondary, fontWeight: 'bold',
                '&:hover': { borderColor: '#A68B5B', bgcolor: BRAND.secondaryLight }
              }}
            >
              Salvar Rascunho
            </Button>
            <Button 
              variant="contained" 
              startIcon={<SendIcon />} 
              onClick={handlePublish}
              sx={{ 
                bgcolor: BRAND.primary, fontWeight: 'bold', boxShadow: 'none',
                '&:hover': { bgcolor: BRAND.primaryDark, boxShadow: BRAND.shadowHover } 
              }}
            >
              Publicar
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Container maxWidth="md" sx={{ mt: 5 }}>
        {/* PAPEL PRINCIPAL (Estilo Carta) */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 8 }, borderRadius: 3, boxShadow: BRAND.shadowSoft }}>
          
          {/* --- CABEÇALHO (METADADOS) --- */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="overline" color={BRAND.secondary} fontWeight="bold" sx={{ letterSpacing: 1.5 }}>
              CRIANDO NOVO ARTIGO
            </Typography>
            
            <TextField
              fullWidth placeholder="Digite o Título Aqui..." variant="standard" multiline
              value={title} onChange={(e) => { setTitle(e.target.value); markAsDirty(); }}
              InputProps={{ 
                disableUnderline: true, 
                style: { fontSize: '2.5rem', fontWeight: 800, color: BRAND.textPrimary, lineHeight: 1.2, fontFamily: BRAND.fontFamilyHeader }
              }}
              sx={{ mb: 3, mt: 1 }}
            />
            
            <TextField
              fullWidth placeholder="Escreva um resumo curto e instigante..." multiline rows={2} variant="filled"
              value={description} onChange={(e) => { setDescription(e.target.value); markAsDirty(); }}
              InputProps={{ disableUnderline: true, style: { fontSize: '1.1rem', color: BRAND.textSecondary, fontStyle: 'italic' } }}
              sx={{ mb: 4, bgcolor: '#F7FAFC', borderRadius: 2 }}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              {/* SELECT DE CATEGORIA COM "CRIAR NOVA" */}
              <FormControl sx={{ minWidth: 240 }}>
                <InputLabel sx={{ color: BRAND.primary }}>Categoria</InputLabel>
                <Select 
                  value={category} label="Categoria" 
                  onChange={handleCategoryChange}
                  sx={{ 
                    borderRadius: 2, 
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: BRAND.primary },
                    color: BRAND.primary, fontWeight: 'medium'
                  }}
                >
                  {availableCategories.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <MenuItem value="NEW_CATEGORY_ACTION" sx={{ color: BRAND.secondary, fontWeight: 'bold' }}>
                    <AddIcon fontSize="small" sx={{ mr: 1 }} /> Criar Nova Categoria
                  </MenuItem>
                </Select>
              </FormControl>
              
              <TextField 
                fullWidth label="Link da Imagem de Capa" 
                value={coverImage} onChange={(e) => { setCoverImage(e.target.value); markAsDirty(); }}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: BRAND.primary } }}
              />
            </Stack>
          </Box>

          <Divider sx={{ mb: 6, borderColor: '#eee' }}>
            <Box sx={{ bgcolor: '#fff', px: 2 }}>
               <DragIndicatorIcon sx={{ color: '#ccc' }} /> 
            </Box>
          </Divider>

          {/* --- CONSTRUTOR DE BLOCOS (Renderização Completa) --- */}
          <Stack spacing={0} sx={{ position: 'relative' }}>
            <Box sx={{ 
              position: 'absolute', left: -22, top: 20, bottom: 20, width: 2, 
              bgcolor: '#f0f0f0', display: { xs: 'none', md: 'block' } 
            }} />

            {blocks.map((block, index) => (
              <Box 
                key={block.id} 
                sx={{ 
                  position: 'relative', mb: 3, transition: 'all 0.3s',
                  '&:hover': { transform: 'translateX(5px)' }, 
                  '&:hover .block-actions': { opacity: 1, visibility: 'visible' },
                  '&:hover .block-indicator': { bgcolor: BRAND.secondary }
                }}
              >
                {/* Indicador Visual */}
                <Box className="block-indicator" sx={{ 
                  position: 'absolute', left: -27, top: 24, width: 12, height: 12, borderRadius: '50%', 
                  bgcolor: '#e0e0e0', border: `2px solid white`, zIndex: 2, transition: '0.3s',
                  display: { xs: 'none', md: 'block' }
                }} />

                {/* Ações Laterais */}
                <Box className="block-actions" sx={{ 
                  position: 'absolute', left: -75, top: 15, 
                  display: 'flex', flexDirection: 'column', gap: 0.5,
                  opacity: 0, visibility: 'hidden', transition: '0.2s', zIndex: 5
                }}>
                  <Tooltip title="Mover Cima" placement="left"><IconButton size="small" onClick={() => moveBlock(index, 'up')} disabled={index === 0}><KeyboardArrowUpIcon fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Excluir" placement="left"><IconButton size="small" color="error" onClick={() => removeBlock(block.id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Mover Baixo" placement="left"><IconButton size="small" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}><KeyboardArrowDownIcon fontSize="small" /></IconButton></Tooltip>
                </Box>

                {/* CONTEÚDO */}
                <Box sx={{ 
                    position: 'relative',
                    borderLeft: `4px solid transparent`,
                    '&:hover': { borderLeftColor: BRAND.secondaryLight },
                    pl: 2
                }}>
                  {/* 1. TEXTO */}
                  {block.type === 'text' && (
                    <Box sx={{ 
                      '.ql-container': { fontSize: '1.15rem', fontFamily: BRAND.fontFamilyBody, color: BRAND.textPrimary, lineHeight: 1.8 },
                      '.ql-editor': { padding: '10px 0' },
                      '.ql-toolbar': { border: 'none', borderBottom: '1px dashed #eee', mb: 1 }
                    }}>
                      <ReactQuill theme="snow" value={block.content} onChange={(val) => updateBlock(block.id, 'content', val)} modules={quillModules} placeholder="Digite seu texto aqui..." />
                    </Box>
                  )}

                  {/* 2. IMAGEM */}
                  {block.type === 'image' && (
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#FAFAFA', border: '1px solid #eee', borderRadius: 2 }}>
                       {block.url ? (
                        <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 1 }}>
                          <Box component="img" src={block.url} sx={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} />
                        </Box>
                      ) : (
                        <Box sx={{ py: 6, textAlign: 'center', color: '#999', border: '2px dashed #ddd', borderRadius: 2 }}>
                          <AddPhotoAlternateIcon sx={{ fontSize: 40, mb: 1, color: BRAND.secondary }} />
                          <Typography variant="body2">Visualização da Imagem</Typography>
                        </Box>
                      )}
                      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <TextField fullWidth size="small" placeholder="URL da imagem..." value={block.url} onChange={(e) => updateBlock(block.id, 'url', e.target.value)} sx={{ bgcolor: 'white' }} />
                        <TextField fullWidth size="small" placeholder="Legenda..." value={block.caption} onChange={(e) => updateBlock(block.id, 'caption', e.target.value)} sx={{ bgcolor: 'white' }} />
                      </Stack>
                    </Paper>
                  )}

                  {/* 3. CITAÇÃO */}
                  {block.type === 'quote' && (
                    <Paper elevation={0} sx={{ p: 4, bgcolor: BRAND.secondaryLight, borderLeft: `4px solid ${BRAND.secondary}`, borderRadius: '0 8px 8px 0' }}>
                      <FormatQuoteIcon sx={{ fontSize: 40, color: BRAND.secondary, opacity: 0.3, mb: -2 }} />
                      <TextField
                        fullWidth multiline rows={2} placeholder="Frase de impacto..." variant="standard"
                        InputProps={{ disableUnderline: true, style: { fontSize: '1.6rem', fontStyle: 'italic', color: '#5D4037', fontFamily: BRAND.fontFamilyHeader } }}
                        value={block.content} onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                      />
                    </Paper>
                  )}

                  {/* 4. VÍDEO */}
                  {block.type === 'video' && (
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, color: '#C53030' }}>
                        <YouTubeIcon /> <Typography fontWeight="bold">Vídeo do YouTube</Typography>
                      </Stack>
                      <TextField fullWidth size="small" placeholder="Cole a URL do vídeo..." value={block.url} onChange={(e) => updateBlock(block.id, 'url', e.target.value)} sx={{ bgcolor: 'white' }} />
                    </Paper>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>

          {/* --- BOTÃO ADICIONAR --- */}
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleOpenMenu}
              startIcon={<AddCircleIcon />}
              sx={{ 
                borderRadius: 50, px: 5, py: 1.5,
                border: `1px solid ${BRAND.secondary}`, color: BRAND.secondary,
                bgcolor: 'white', fontWeight: 'bold',
                boxShadow: BRAND.shadowSoft,
                transition: '0.3s',
                '&:hover': { bgcolor: BRAND.secondary, color: 'white', transform: 'scale(1.05)' }
              }}
            >
              Adicionar Conteúdo
            </Button>
          </Box>

          <Menu
            anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}
            PaperProps={{ sx: { mt: 1.5, minWidth: 220, borderRadius: 3, boxShadow: BRAND.shadowHover } }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Typography variant="overline" sx={{ px: 2, py: 1, color: '#999', fontWeight: 'bold' }}>ESCOLHA UM BLOCO</Typography>
            <MenuItem onClick={() => addBlock('text')} sx={{ py: 1.5 }}><ListItemIcon><TextFieldsIcon sx={{ color: BRAND.primary }} /></ListItemIcon><ListItemText primary="Parágrafo" /></MenuItem>
            <MenuItem onClick={() => addBlock('image')} sx={{ py: 1.5 }}><ListItemIcon><AddPhotoAlternateIcon sx={{ color: BRAND.secondary }} /></ListItemIcon><ListItemText primary="Imagem" /></MenuItem>
            <MenuItem onClick={() => addBlock('quote')} sx={{ py: 1.5 }}><ListItemIcon><FormatQuoteIcon sx={{ color: '#5D4037' }} /></ListItemIcon><ListItemText primary="Citação" /></MenuItem>
            <Divider />
            <MenuItem onClick={() => addBlock('video')} sx={{ py: 1.5 }}><ListItemIcon><YouTubeIcon color="error" /></ListItemIcon><ListItemText primary="Vídeo" /></MenuItem>
          </Menu>

        </Paper>
      </Container>

      {/* --- MODAL DE CRIAR CATEGORIA --- */}
      <Dialog 
        open={isCategoryModalOpen} 
        onClose={() => setCategoryModalOpen(false)} 
        PaperProps={{ sx: { borderRadius: 3, p: 1, minWidth: 320 } }}
      >
        <DialogTitle sx={{ fontFamily: BRAND.fontFamilyHeader, fontWeight: 'bold', color: BRAND.textPrimary }}>
          Nova Categoria
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Digite o nome da nova categoria para adicionar à lista.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            label="Nome da Categoria"
            placeholder="Ex: Finanças, Podcast..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateCategory()}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setCategoryModalOpen(false)} sx={{ color: BRAND.textSecondary, fontWeight: 'bold' }}>Cancelar</Button>
          <Button 
            variant="contained" onClick={handleCreateCategory} disabled={!newCategoryName.trim()}
            sx={{ bgcolor: BRAND.secondary, fontWeight: 'bold', '&:hover': { bgcolor: '#A68B5B' } }}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}