import { useState } from 'react';
import { 
  Box, Typography, Button, IconButton, Chip, Stack, Tooltip, Paper 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const BRAND = {
  teal: '#009688',
  gold: '#C5A669',
  headerFont: '"Playfair Display", serif',
};

const mockLeads = [
  { id: 1, email: 'contato@empresa.com.br', date: '04/02/2026', origin: 'Newsletter' },
  { id: 2, email: 'arthur.alves@gmail.com', date: '03/02/2026', origin: 'Contato' },
];

export default function LeadsList() {
  const [rows, setRows] = useState(mockLeads);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza?')) setRows(rows.filter((row) => row.id !== id));
  };

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    alert(`Email copiado!`);
  };

  const columns = [
    { field: 'email', headerName: 'E-mail', flex: 1, minWidth: 250, renderCell: (p) => <strong>{p.value}</strong> },
    { field: 'origin', headerName: 'Origem', width: 150, renderCell: (p) => <Chip label={p.value} size="small" variant="outlined" sx={{ borderColor: BRAND.teal, color: BRAND.teal }} /> },
    { field: 'date', headerName: 'Data', width: 180 },
    {
      field: 'actions', headerName: 'Ações', width: 120, sortable: false, align: 'right', headerAlign: 'right',
      renderCell: (params) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end" width="100%">
          <Tooltip title="Copiar"><IconButton size="small" onClick={() => handleCopy(params.row.email)}><ContentCopyIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Excluir"><IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Paper elevation={0} sx={{ width: '100%', bgcolor: 'white', p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      
      {/* HEADER */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontFamily: BRAND.headerFont, fontWeight: 'bold', color: '#333' }}>
            Lista de Leads
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
             <Typography variant="body2" color="text.secondary">Total capturado:</Typography>
             <Chip label={rows.length} size="small" sx={{ bgcolor: BRAND.gold, color: 'white', fontWeight: 'bold' }} />
          </Stack>
        </Box>

        <Button 
          variant="outlined" startIcon={<FileDownloadIcon />} disabled={rows.length === 0}
          sx={{ borderColor: BRAND.teal, color: BRAND.teal, fontWeight: 'bold', '&:hover': { borderColor: '#00796b', bgcolor: '#E0F2F1' } }}
        >
          Exportar CSV
        </Button>
      </Stack>

      {/* DATA GRID */}
      {rows.length > 0 ? (
        <DataGrid
          rows={rows} columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 25]} disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': { bgcolor: '#FAFAFA', color: '#555', fontWeight: 'bold' },
            '& .MuiDataGrid-row:hover': { bgcolor: '#FDFCF5' }
          }}
        />
      ) : (
        <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#FAFAFA', borderRadius: 2, border: '1px dashed #ddd' }}>
          <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: BRAND.gold, mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" color="text.secondary">Nenhum lead capturado ainda.</Typography>
        </Box>
      )}
    </Paper>
  );
}