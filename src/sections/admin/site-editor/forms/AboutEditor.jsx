import { useState } from 'react';
import {
    Box, TextField, Typography, Button, Divider, Stack,
    Accordion, AccordionSummary, AccordionDetails, IconButton, Paper
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Ícone de Livro

export default function AboutEditor() {
    // Estado para os Livros (Lista Dinâmica)
    const [books, setBooks] = useState([
        { id: 1, title: 'Create Your Own Business', author: 'James Murdor', link: '#' }
    ]);

    const handleAddBook = () => {
        setBooks([...books, { id: Date.now(), title: '', author: '', link: '' }]);
    };

    const handleRemoveBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    const handleBookChange = (id, field, value) => {
        setBooks(books.map(book => book.id === id ? { ...book, [field]: value } : book));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Topo Fixo */}
            <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white' }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold">Editando: Sobre Mim</Typography>
                    <Typography variant="caption" color="text.secondary">Gerencie sua biografia e biblioteca.</Typography>
                </Box>
                <Button variant="contained" startIcon={<SaveIcon />} sx={{ bgcolor: '#009688' }}>
                    Salvar Alterações
                </Button>
            </Box>

            {/* Área de Scroll */}
            <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1, bgcolor: '#f4f4f4' }}>

                {/* --- 1. BIO PRINCIPAL --- */}
                <Accordion defaultExpanded elevation={0} sx={{ mb: 2, borderRadius: '8px !important' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" fontWeight="bold" color="primary">1. BIOGRAFIA E APRESENTAÇÃO</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={3}>
                            <TextField
                                label="NOME DE APRESENTAÇÃO"
                                fullWidth
                                defaultValue="Cheila Lamour"
                            />
                            <TextField
                                label="SUBTÍTULO / CARGO"
                                fullWidth
                                defaultValue="Liderança Feminina e Gestão Humanizada em Curitiba e Online"
                            />
                            <Divider />

                            <Typography variant="caption" color="text.secondary" fontWeight="bold">CREDENCIAIS & PRÊMIOS</Typography>
                            <TextField
                                label="TEXTO DE DESTAQUE (PRÊMIOS)"
                                fullWidth
                                multiline
                                rows={2}
                                defaultValue="Embaixadora da Divine Academie Française des Arts Lettres et Culture"
                                helperText="Aparece em destaque logo abaixo do título."
                            />

                            <Typography variant="caption" color="text.secondary" fontWeight="bold">A HISTÓRIA (TEXTO LONGO)</Typography>
                            <TextField
                                label="TEXTO COMPLETO DA BIO"
                                fullWidth
                                multiline
                                rows={8}
                                defaultValue="Trabalho com projetos de Estruturas Metálicas desde que me formei..."
                                helperText="Este é o texto principal que conta sua jornada da engenharia até a mentoria."
                            />
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                {/* --- 2. BIBLIOTECA AUTORAL (LIVROS) --- */}
                <Accordion elevation={0} sx={{ borderRadius: '8px !important' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <MenuBookIcon color="primary" fontSize="small" />
                            <Typography variant="subtitle1" fontWeight="bold" color="primary">2. BIBLIOTECA AUTORAL</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Adicione aqui seus livros, e-books ou materiais ricos.
                        </Typography>

                        <Stack spacing={2}>
                            {books.map((book, index) => (
                                <Paper key={book.id} variant="outlined" sx={{ p: 2, bgcolor: '#fafafa' }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                        <Typography variant="caption" fontWeight="bold">LIVRO #{index + 1}</Typography>
                                        <IconButton size="small" color="error" onClick={() => handleRemoveBook(book.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>

                                    <Stack spacing={2}>
                                        <Stack direction="row" spacing={2}>
                                            <TextField
                                                label="Título do Livro"
                                                fullWidth
                                                size="small"
                                                value={book.title}
                                                onChange={(e) => handleBookChange(book.id, 'title', e.target.value)}
                                            />
                                            <TextField
                                                label="Autor / Subtítulo"
                                                fullWidth
                                                size="small"
                                                value={book.author}
                                                onChange={(e) => handleBookChange(book.id, 'author', e.target.value)}
                                            />
                                        </Stack>

                                        <Stack direction="row" spacing={2}>
                                            <TextField
                                                label="URL da Capa (Imagem)"
                                                fullWidth
                                                size="small"
                                                placeholder="https://..."
                                            />
                                            <TextField
                                                label="Link de Compra (Botão)"
                                                fullWidth
                                                size="small"
                                                value={book.link}
                                                placeholder="https://amazon.com..."
                                                onChange={(e) => handleBookChange(book.id, 'link', e.target.value)}
                                            />
                                        </Stack>
                                    </Stack>
                                </Paper>
                            ))}

                            <Button
                                startIcon={<AddCircleIcon />}
                                onClick={handleAddBook}
                                sx={{ alignSelf: 'flex-start', color: '#C5A669' }}
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