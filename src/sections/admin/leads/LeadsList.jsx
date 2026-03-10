import { useState } from 'react';
import { 
  Box, Typography, Button, IconButton, Chip, Stack, Tooltip, Paper, 
  useTheme, useMediaQuery, Card, CardContent, CardActions 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { BRAND } from '@/theme/branding';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';

const mockLeads = [
  { id: 1, email: 'contato@empresa.com.br', date: '04/02/2026', origin: 'Newsletter' },
  { id: 2, email: 'arthur.alves@gmail.com', date: '03/02/2026', origin: 'Contato' },
  { id: 3, email: 'julia.mendes@hotmail.com', date: '01/02/2026', origin: 'E-book Liderança' },
];

export default function LeadsList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [rows, setRows] = useState(mockLeads);
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  // --- AÇÕES ---
  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    // Aqui você poderia ativar um Toast Notification
    alert(`Email copiado: ${email}`);
  };

  const RequestDelete = (id) => {
    setDeleteModal({ open: true, id });
  };

  const ConfirmDelete = () => {
    if (deleteModal.id) {
      setRows(rows.filter((row) => row.id !== deleteModal.id));
      setDeleteModal({ open: false, id: null });
    }
  };

  // --- COLUNAS DESKTOP ---
  const columns = [
    { 
      field: 'email', headerName: 'E-mail', flex: 1, minWidth: 250, 
      renderCell: (p) => <Typography variant="body2" fontWeight="bold" color="text.primary">{p.value}</Typography> 
    },
    { 
      field: 'origin', headerName: 'Origem', width: 180, 
      renderCell: (p) => (
        <Chip 
          label={p.value} size="small" 
          sx={{ 
            bgcolor: BRAND.secondaryLight, 
            color: BRAND.secondary, 
            border: `1px solid ${BRAND.secondary}40`,
            fontWeight: 600
          }} 
        />
      ) 
    },
    { field: 'date', headerName: 'Data', width: 150, align: 'center', headerAlign: 'center' },
    {
      field: 'actions', headerName: 'Ações', width: 120, sortable: false, align: 'right', headerAlign: 'right',
      renderCell: (params) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end" width="100%">
          <Tooltip title="Copiar">
            <IconButton size="small" onClick={() => handleCopy(params.row.email)} sx={{ color: BRAND.primary }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton size="small" color="error" onClick={() => RequestDelete(params.row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  // --- RENDERIZÃO MOBILE (CARDS) ---
  const renderMobileList = () => (
    <Stack spacing={2}>
      {rows.map((row) => (
        <Card key={row.id} variant="outlined" sx={{ borderRadius: 2, borderColor: '#eee' }}>
          <CardContent sx={{ pb: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
              <Chip 
                label={row.origin} size="small" 
                sx={{ bgcolor: BRAND.secondaryLight, color: BRAND.secondary, fontSize: '0.7rem', height: 24, fontWeight: 'bold' }} 
              />
              <Typography variant="caption" color="text.secondary">{row.date}</Typography>
            </Stack>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ wordBreak: 'break-all' }}>
              {row.email}
            </Typography>
          </CardContent>
          <CardActions sx={{ borderTop: '1px solid #f9f9f9', justifyContent: 'flex-end', p: 1 }}>
            <Button 
                startIcon={<ContentCopyIcon />} size="small" 
                sx={{ color: BRAND.primary, textTransform: 'none' }}
                onClick={() => handleCopy(row.email)}
            >
                Copiar
            </Button>
            <Button 
                startIcon={<DeleteIcon />} size="small" color="error" 
                sx={{ textTransform: 'none' }}
                onClick={() => RequestDelete(row.id)}
            >
                Excluir
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );

  return (
    <>
      {/* MODAL DE CONFIRMAÇÃO */}
      <ConfirmDeleteModal 
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null })}
        onConfirm={ConfirmDelete}
        title="Remover Lead?"
        description="Você está prestes a excluir este contato da sua base. Ele não receberá mais comunicações."
      />

      <Paper 
        elevation={0} 
        sx={{ 
          width: '100%', bgcolor: 'white', 
          p: { xs: 2, sm: 4 }, 
          borderRadius: 3, 
          boxShadow: BRAND.shadowSoft 
        }}
      >
        
        {/* HEADER */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }} spacing={2}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ fontFamily: BRAND.fontFamilyHeader, fontWeight: 'bold', color: '#333' }}>
              Lista de Leads
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">Total capturado:</Typography>
              <Chip label={rows.length} size="small" sx={{ bgcolor: BRAND.primary, color: 'white', fontWeight: 'bold' }} />
            </Stack>
          </Box>

          <Button 
            variant="outlined" startIcon={<FileDownloadIcon />} disabled={rows.length === 0}
            fullWidth={isMobile}
            sx={{ 
              borderColor: BRAND.primary, color: BRAND.primary, fontWeight: 'bold', 
              '&:hover': { borderColor: BRAND.primaryDark, bgcolor: '#E0F2F1' } 
            }}
          >
            Exportar CSV
          </Button>
        </Stack>

        {/* CONTEÚDO PRINCIPAL */}
        {rows.length > 0 ? (
          isMobile ? renderMobileList() : (
            <DataGrid
              rows={rows} columns={columns}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              pageSizeOptions={[10, 25]} disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': { bgcolor: '#FAFAFA', color: BRAND.primary, fontWeight: 'bold' },
                '& .MuiDataGrid-row:hover': { bgcolor: BRAND.secondaryLight },
                '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f0f0' }
              }}
            />
          )
        ) : (
          <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#FAFAFA', borderRadius: 2, border: '1px dashed #ddd' }}>
            <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: BRAND.secondary, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" color="text.secondary">Nenhum lead capturado ainda.</Typography>
          </Box>
        )}
      </Paper>
    </>
  );
}