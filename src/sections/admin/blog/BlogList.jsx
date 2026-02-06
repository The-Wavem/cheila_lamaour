import { useState, useEffect, useMemo } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, IconButton, Chip, Stack, TextField, InputAdornment } from '@mui/material'; // Adicionado TextField e InputAdornment
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

// Dados MOCK (Fictícios) para visualizar enquanto o Back-end não conecta
const mockRows = [
    { id: 1, title: 'Liderança Feminina na Engenharia', category: 'Carreira', date: '12/08/2025', status: 'Publicado' },
    { id: 2, title: 'Como equilibrar vida pessoal e profissional', category: 'Mindset', date: '10/08/2025', status: 'Rascunho' },
    { id: 3, title: 'O poder da inteligência emocional', category: 'Desenvolvimento Pessoal', date: '05/08/2025', status: 'Publicado' },
    // ... adicione mais para testar a paginação
];

export default function BlogList() {
    const navigate = useNavigate();
    const [rows, setRows] = useState(mockRows);
    
    // Estado para o Input
    const [searchTerm, setSearchTerm] = useState('');
    
    // Estado para o Filtro (Lógica - Atualiza com atraso)
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // EFEITO DEBOUNCE
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const filteredRows = useMemo(() => {
        return rows.filter((row) => 
            row.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [rows, debouncedSearch]); // Só recalcula quando a lista original ou o termo 'final' (após delay) mudar

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'title',
            headerName: 'Título do Artigo',
            flex: 1, // Ocupa o espaço restante
            minWidth: 250
        },
        {
            field: 'category',
            headerName: 'Categoria',
            width: 180,
            renderCell: (params) => (
                <Chip label={params.value} size="small" variant="outlined" color="primary" />
            )
        },
        { field: 'date', headerName: 'Data', width: 120 },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={params.value === 'Publicado' ? 'success' : 'warning'} // Verde se publicado, Amarelo se rascunho
                />
            )
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    {/* Botão Ver (Redireciona para o blog público) */}
                    <IconButton size="small" color="info" onClick={() => window.open(`/blog/${params.id}`, '_blank')}>
                        <VisibilityIcon fontSize="small" />
                    </IconButton>

                    {/* Botão Editar */}
                    <IconButton size="small" color="primary" onClick={() => navigate(`/admin/blog/editar/${params.id}`)}>
                        <EditIcon fontSize="small" />
                    </IconButton>

                    {/* Botão Excluir */}
                    <IconButton size="small" color="error" onClick={() => handleDelete(params.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%', bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 1 }}>
            {/* Cabeçalho da Seção */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight="bold" color="#333">
                    Gerenciar Artigos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/blog/novo')} // Redireciona para criação
                    sx={{ bgcolor: '#C5A669', '&:hover': { bgcolor: '#A68B5B' } }} // Cor Dourada da marca
                >
                    Novo Artigo
                </Button>
            </Stack>

            {/* Barra de Pesquisa */}
            <TextField 
                label="Buscar artigo por título..." 
                variant="outlined" 
                size="small" 
                fullWidth
                sx={{ mb: 2, bgcolor: 'white' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Tabela (DataGrid) */}
            <DataGrid
                rows={filteredRows}
                columns={columns}
                autoHeight 
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}