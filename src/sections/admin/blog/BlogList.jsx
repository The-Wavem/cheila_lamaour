import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, IconButton, Chip, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

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

    // componentizar
    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

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
        <Box sx={{ height: 500, width: '100%', bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 1 }}>
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

            {/* Tabela (DataGrid) */}
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}