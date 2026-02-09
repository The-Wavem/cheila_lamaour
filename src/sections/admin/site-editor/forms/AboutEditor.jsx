import { useState } from 'react';
import {
    Box, TextField, Typography, Button, Divider, Stack,
    Accordion, AccordionSummary, AccordionDetails, IconButton, Paper
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// --- PALETA DA MARCA ---
const BRAND = {
    teal: '#009688',
    gold: '#C5A669',
    bg: '#F4F6F8',
    lightGold: '#FDFCF5',
    paper: '#FFFFFF'
};

export default function AboutEditor({ setIsDirty, onSaveSuccess }) {

    const [books, setBooks] = useState([
        { id: 1, title: 'Create Your Own Business', author: 'James Murdor', link: '#' }
    ]);

    const handleChange = () => setIsDirty && setIsDirty(true);
    const handleSave = () => onSaveSuccess && onSaveSuccess();

    // --- LÓGICA DE LISTA (LIVROS) ---
    const handleAddBook = () => {
        setBooks([...books, { id: Date.now(), title: '', author: '', link: '' }]);
        handleChange();
    };

    const handleRemoveBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
        handleChange();
    };

    const handleBookChange = (id, field, value) => {
        setBooks(books.map(book => book.id === id ? { ...book, [field]: value } : book));
        handleChange();
    };

    // Estilo Padrão dos Accordions
    const accordionStyle = {
        elevation: 0,
        sx: {
            mb: 2, borderRadius: '8px !important', border: '1px solid #eee',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { borderLeft: `4px solid ${BRAND.gold}`, bgcolor: BRAND.paper }
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
                        Editando: Sobre Mim
                    </Typography>
                </Box>
                <Button 
                    variant="contained" startIcon={<SaveIcon />} onClick={handleSave}
                    sx={{ bgcolor: BRAND.teal, fontWeight: 'bold', '&:hover': { bgcolor: '#00796b' } }}
                >
                    Salvar Alterações
                </Button>
            </Box>

            {/* --- ÁREA DE CONTEÚDO --- */}
            <Box sx={{ p: { xs: 2, md: 4 }, overflowY: 'auto', flexGrow: 1 }}>

                {/* 1. BIOGRAFIA PRINCIPAL */}
                <Accordion defaultExpanded {...accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
                        <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>1. BIOGRAFIA E APRESENTAÇÃO</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                <TextField 
                                    label="NOME DE APRESENTAÇÃO" fullWidth variant="filled" 
                                    InputProps={{ disableUnderline: true }} sx={{ bgcolor: BRAND.bg, borderRadius: 1 }}
                                    defaultValue="Cheila Lamour" onChange={handleChange} 
                                />
                                <TextField 
                                    label="SUBTÍTULO / CARGO" fullWidth variant="filled" 
                                    InputProps={{ disableUnderline: true }} sx={{ bgcolor: BRAND.bg, borderRadius: 1 }}
                                    defaultValue="Liderança Feminina e Gestão Humanizada" onChange={handleChange} 
                                />
                            </Stack>
                            
                            <Divider sx={{ borderColor: '#eee' }} />
                            
                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold">CREDENCIAIS & PRÊMIOS</Typography>
                                <TextField 
                                    fullWidth multiline rows={2} variant="outlined" sx={{ mt: 1 }}
                                    defaultValue="Embaixadora da Divine Academie Française des Arts Lettres et Culture"
                                    onChange={handleChange}
                                    helperText="Destaque logo abaixo do nome."
                                />
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight="bold">A HISTÓRIA (TEXTO LONGO)</Typography>
                                <TextField 
                                    fullWidth multiline rows={8} variant="outlined" sx={{ mt: 1 }}
                                    placeholder="Escreva sua trajetória aqui..."
                                    defaultValue={`Trabalho com projetos de Estruturas Metálicas desde que me formei na UFPR.

Com mais de 25 anos de experiência organizacional e liderando equipes, percebi que o maior desafio não era técnico, mas humano.

Busquei especializações em Liderança Humanizada, Coaching e Análise Comportamental para transformar minha carreira e hoje ajudar outras mulheres a fazerem o mesmo.`}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                {/* 2. BIBLIOTECA AUTORAL (REPEATER) */}
                <Accordion {...accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <MenuBookIcon sx={{ color: BRAND.teal }} fontSize="small" />
                            <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>2. BIBLIOTECA AUTORAL</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3, bgcolor: BRAND.lightGold }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Adicione aqui seus livros e materiais. Eles aparecerão em formato de carrossel.
                        </Typography>

                        <Stack spacing={2}>
                            {books.map((book, index) => (
                                <Paper key={book.id} elevation={0} sx={{ p: 3, bgcolor: 'white', border: '1px solid #e0e0e0', borderRadius: 2 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Box sx={{ width: 24, height: 24, bgcolor: BRAND.teal, color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>{index + 1}</Box>
                                            <Typography variant="subtitle2" fontWeight="bold">Detalhes do Livro</Typography>
                                        </Stack>
                                        <IconButton size="small" color="error" onClick={() => handleRemoveBook(book.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                    
                                    <Stack spacing={2}>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <TextField label="Título do Livro" fullWidth size="small" value={book.title} onChange={(e) => handleBookChange(book.id, 'title', e.target.value)} />
                                            <TextField label="Autor / Subtítulo" fullWidth size="small" value={book.author} onChange={(e) => handleBookChange(book.id, 'author', e.target.value)} />
                                        </Stack>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <TextField label="URL da Capa" fullWidth size="small" placeholder="https://..." onChange={handleChange} />
                                            <TextField label="Link de Compra" fullWidth size="small" value={book.link} onChange={(e) => handleBookChange(book.id, 'link', e.target.value)} />
                                        </Stack>
                                    </Stack>
                                </Paper>
                            ))}
                            
                            <Button 
                                startIcon={<AddCircleIcon />} onClick={handleAddBook}
                                sx={{ alignSelf: 'flex-start', color: BRAND.gold, fontWeight: 'bold', mt: 1 }}
                            >
                                Adicionar Novo Livro
                            </Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>

            </Box>
        </Box>
    );
}