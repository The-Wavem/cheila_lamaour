import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Button, Typography, IconButton, Chip, Stack, TextField, InputAdornment, Paper 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

// --- PALETA DA MARCA ---
const BRAND = {
  teal: '#009688',
  gold: '#C5A669',
  bg: '#F4F6F8',
  headerFont: '"Playfair Display", serif', // Exemplo de fonte editorial
};

const mockRows = [
  { id: 1, title: 'Liderança Feminina na Engenharia', category: 'Carreira', date: '12/08/2025', status: 'Publicado' },
  { id: 2, title: 'Como equilibrar vida pessoal e profissional', category: 'Mindset', date: '10/08/2025', status: 'Rascunho' },
  { id: 3, title: 'O poder da inteligência emocional', category: 'Desenvolvimento Pessoal', date: '05/08/2025', status: 'Publicado' },
];

export default function BlogList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState(mockRows);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  // Filtragem (Busca)
  const filteredRows = rows.filter((row) => 
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'title', headerName: 'Título do Artigo', flex: 1, minWidth: 250,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="#333">{params.value}</Typography>
      )
    },
    { 
      field: 'category', headerName: 'Categoria', width: 180,
      renderCell: (params) => (
        <Chip 
          label={params.value} size="small" 
          sx={{ 
            bgcolor: '#FFF8E1', color: '#8c7636', border: '1px solid #FFE082', fontWeight: 'bold' 
          }} 
        />
      )
    },
    { field: 'date', headerName: 'Data', width: 120 },
    { 
      field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} size="small" variant="filled"
          sx={{ 
            bgcolor: params.value === 'Publicado' ? '#E0F2F1' : '#f5f5f5',
            color: params.value === 'Publicado' ? BRAND.teal : '#666',
            fontWeight: 'bold'
          }}
        />
      )
    },
    {
      field: 'actions', headerName: 'Ações', width: 150, sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
           <IconButton size="small" sx={{ color: BRAND.teal }} onClick={() => window.open(`/blog/${params.id}`, '_blank')}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: BRAND.gold }} onClick={() => navigate(`/admin/blog/editar/${params.id}`)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(params.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Paper elevation={0} sx={{ height: 600, width: '100%', bgcolor: 'white', p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      
      {/* CABEÇALHO */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontFamily: BRAND.headerFont, fontWeight: 'bold', color: '#333' }}>
            Gerenciar Artigos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Visualize e organize todo o conteúdo do blog.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => navigate('/admin/blog/novo')} 
          sx={{ 
            bgcolor: BRAND.gold, fontWeight: 'bold', borderRadius: 2, px: 3,
            '&:hover': { bgcolor: '#A68B5B' } 
          }}
        >
          Escrever Novo
        </Button>
      </Stack>

      {/* BARRA DE BUSCA ESTILIZADA */}
      <TextField 
        fullWidth
        placeholder="Buscar por título..." 
        variant="outlined" 
        size="small" 
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#FAFAFA' } }}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#ccc' }} /></InputAdornment>,
        }}
      />

      {/* TABELA CUSTOMIZADA */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
        pageSizeOptions={[6, 12]}
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: '#FAFAFA', 
            color: BRAND.teal, 
            fontWeight: 'bold',
            borderBottom: `2px solid ${BRAND.gold}`
          },
          '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f0f0' },
          '& .MuiDataGrid-row:hover': { bgcolor: '#FDFCF5' } // Hover Creme
        }}
      />
    </Paper>
  );
}