import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, IconButton, Chip, Stack, TextField, InputAdornment, Paper,
  useTheme, useMediaQuery, Card, CardContent, CardActions
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

// --- IMPORTS DOS COMPONENTES VISUAIS ---
import { BRAND } from '@/theme/branding';
import ConfirmDeleteModal from '@/components/ui/overlays/ConfirmDeleteModal';

const mockRows = [
  { id: 1, title: 'Liderança Feminina na Engenharia', category: 'Carreira', date: '12/08/2025', status: 'Publicado' },
  { id: 2, title: 'Como equilibrar vida pessoal e profissional', category: 'Mindset', date: '10/08/2025', status: 'Rascunho' },
  { id: 3, title: 'O poder da inteligência emocional', category: 'Desenvolvimento Pessoal', date: '05/08/2025', status: 'Publicado' },
];

export default function BlogList() {
  const navigate = useNavigate();
  const theme = useTheme();
  // Detecta se é mobile (abaixo de 'sm' = 600px)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState(mockRows);

  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  // --- LÓGICA DE EXCLUSÃO ---
  const requestDelete = (id) => {
    setDeleteModal({ open: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      setRows(rows.filter((row) => row.id !== deleteModal.id));
      setDeleteModal({ open: false, id: null });
    }
  };

  // Filtragem
  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Colunas para Desktop
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
          sx={{ bgcolor: '#FFF8E1', color: '#8c7636', border: '1px solid #FFE082', fontWeight: 'bold' }}
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
            color: params.value === 'Publicado' ? BRAND.primary : '#666',
            fontWeight: 'bold'
          }}
        />
      )
    },
    {
      field: 'actions', headerName: 'Ações', width: 150, sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" sx={{ color: BRAND.primary }} onClick={() => window.open(`/blog/${params.id}`, '_blank')}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: BRAND.secondary }} onClick={() => navigate(`/admin/blog/editar/${params.id}`)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => requestDelete(params.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  // Renderização da Lista para Mobile (Cards)
  const renderMobileList = () => (
    <Stack spacing={2}>
      {filteredRows.map((row) => (
        <Card key={row.id} variant="outlined" sx={{ borderRadius: 2, borderColor: '#eee' }}>
          <CardContent sx={{ pb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
              ID: {row.id} • {row.date}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: 1.3, mb: 1.5 }}>
              {row.title}
            </Typography>

            <Stack direction="row" spacing={1}>
              <Chip
                label={row.category} size="small"
                sx={{ bgcolor: '#FFF8E1', color: '#8c7636', fontSize: '0.7rem', height: 24 }}
              />
              <Chip
                label={row.status} size="small"
                sx={{
                  bgcolor: row.status === 'Publicado' ? '#E0F2F1' : '#f5f5f5',
                  color: row.status === 'Publicado' ? BRAND.primary : '#666',
                  fontSize: '0.7rem', height: 24, fontWeight: 'bold'
                }}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ borderTop: '1px solid #f9f9f9', justifyContent: 'flex-end' }}>
            <IconButton size="small" sx={{ color: BRAND.primary }} onClick={() => window.open(`/blog/${row.id}`, '_blank')}>
              <VisibilityIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: BRAND.secondary }} onClick={() => navigate(`/admin/blog/editar/${row.id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => requestDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
      {filteredRows.length === 0 && (
        <Typography variant="body2" align="center" color="text.secondary" sx={{ py: 4 }}>
          Nenhum artigo encontrado.
        </Typography>
      )}
    </Stack>
  );

  return (
    <>
      {/* MODAL PADRÃO DE DELETE */}
      <ConfirmDeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ ...deleteModal, open: false })}
        onConfirm={confirmDelete}
        title="Excluir Artigo?"
        description="Tem certeza que deseja excluir este artigo permanentemente? Esta ação não pode ser desfeita."
      />

      <Paper
        elevation={0}
        sx={{
          minHeight: 600,
          width: '100%',
          bgcolor: 'white',
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          boxShadow: BRAND.shadowSoft
        }}
      >

        {/* CABEÇALHO */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          spacing={{ xs: 2, sm: 0 }}
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontFamily: BRAND.fontFamilyHeader, fontWeight: 'bold', color: '#333' }}>
              Gerenciar Artigos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Visualize e organize todo o conteúdo.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/blog/novo')}
            fullWidth={isMobile}
            sx={{
              bgcolor: BRAND.secondary, fontWeight: 'bold', borderRadius: 2, px: 3,
              '&:hover': { bgcolor: '#A68B5B' }
            }}
          >
            Escrever Novo
          </Button>
        </Stack>

        {/* BARRA DE BUSCA */}
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

        {/* CONTEÚDO PRINCIPAL */}
        {isMobile ? renderMobileList() : (
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
                color: BRAND.primary,
                fontWeight: 'bold',
                borderBottom: `2px solid ${BRAND.secondary}`
              },
              '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f0f0' },
              '& .MuiDataGrid-row:hover': { bgcolor: '#FDFCF5' }
            }}
          />
        )}
      </Paper>
    </>
  );
}