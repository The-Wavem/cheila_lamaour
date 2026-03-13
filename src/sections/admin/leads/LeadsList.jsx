import { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, IconButton, Chip, Stack, Tooltip, Paper, useTheme, useMediaQuery, Card, CardContent, CardActions, CircularProgress, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { BRAND } from '@/theme/branding';
import ConfirmDeleteModal from '@/components/ui/overlays/ConfirmDeleteModal';
import { fetchContactMessages, deleteContactMessage } from '@/services/ContactAPI';
  const formatPreview = (text) => { 
  if (!text) return '—'; // Retorna um travessão se estiver vazio
  const normalized = typeof text === 'string' ? text : JSON.stringify(text); 
  const clean = normalized.replace(/\s+/g, ' ').trim(); 
  return clean.length > 120 ? `${clean.slice(0, 120)}…` : clean; 
};
export default function LeadsList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const loadLeads = async () => {
    setLoading(true); setError(null);
    try { const messages = await fetchContactMessages(); setRows(messages); setSelectedLead(messages[0] ?? null); }
    catch (err) { console.error(err); setError('Não foi possível carregar os contatos. Tente novamente em alguns segundos.'); setRows([]); setSelectedLead(null); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadLeads(); }, []);
  useEffect(() => { if (selectedLead && !rows.find((row) => row.id === selectedLead.id)) setSelectedLead(rows[0] ?? null); }, [rows, selectedLead]);

  const handleCopy = (value) => { if (!value) return; navigator.clipboard.writeText(value); alert(`Copiado: ${value}`); };
  const requestDelete = (id) => { if (!id) return; setDeleteModal({ open: true, id }); };
  const confirmDelete = async () => {
    if (!deleteModal.id) return; setIsDeleting(true); setError(null);
    try { await deleteContactMessage(deleteModal.id); setRows((prev) => prev.filter((row) => row.id !== deleteModal.id)); if (selectedLead?.id === deleteModal.id) setSelectedLead(null); setDeleteModal({ open: false, id: null }); }
    catch (err) { console.error(err); setError('Não conseguimos remover o contato agora. Tente novamente em instantes.'); }
    finally { setIsDeleting(false); }
  };

  const detailEntries = useMemo(() => {
    if (!selectedLead) return [];
    return Object.entries(selectedLead.raw || {}).map(([key, value]) => ({ label: key.replace(/_/g, ' '), value: typeof value === 'object' ? JSON.stringify(value) : value }));
  }, [selectedLead]);

  const columns = [
    { field: 'name', headerName: 'Nome', width: 180, renderCell: (params) => (<Typography variant="body2" fontWeight="bold" color="text.primary">{params.value}</Typography>) },
    { field: 'email', headerName: 'E-mail', flex: 1, minWidth: 200, renderCell: (params) => (<Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{params.value}</Typography>) },
    { field: 'interest', headerName: 'Interesse', width: 170, renderCell: (params) => (<Chip label={params.value} size="small" sx={{ bgcolor: BRAND.secondaryLight, color: BRAND.secondary, border: `1px solid ${BRAND.secondary}40`, fontWeight: 600 }} />) },
    { field: 'messageBody', headerName: 'Mensagem', flex: 1.4, minWidth: 260, renderCell: (params) => (<Tooltip title={params.value || 'Sem mensagem'}><Typography variant="body2" color="text.secondary">{formatPreview(params.value)}</Typography></Tooltip>) },
    { field: 'createdAtLabel', headerName: 'Data', width: 160, align: 'center', headerAlign: 'center' },
    { field: 'actions', headerName: 'apaguei sem querer', width: 120, sortable: false, align: 'right', headerAlign: 'right', renderCell: (params) => (
      <Stack direction="row" spacing={1} justifyContent="flex-end" width="100%">
        <Tooltip title="Copiar e-mail"><IconButton size="small" onClick={() => handleCopy(params.row.email)} sx={{ color: BRAND.primary }}><ContentCopyIcon fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Excluir"><IconButton size="small" color="error" onClick={() => requestDelete(params.row.id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
      </Stack>
    )},
  ];

  const renderMobileList = () => (
    <Stack spacing={2}>
      {rows.map((row) => (
        <Card key={row.id} variant="outlined" sx={{ borderRadius: 2, borderColor: '#ddd' }} onClick={() => setSelectedLead(row)}>
          <CardContent sx={{ pb: 0 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Chip label={row.origin} size="small" sx={{ bgcolor: BRAND.secondaryLight, color: BRAND.secondary, fontSize: '0.7rem', height: 24, fontWeight: 'bold' }} />
              <Typography variant="caption" color="text.secondary">{row.createdAtLabel}</Typography>
            </Stack>
            <Typography variant="subtitle1" fontWeight="bold">{row.name || row.email}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>{row.email}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>{formatPreview(row.messageBody)}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
            <Button startIcon={<ContentCopyIcon />} size="small" sx={{ color: BRAND.primary, textTransform: 'none' }} onClick={() => handleCopy(row.email)}>Copiar</Button>
            <Button startIcon={<DeleteIcon />} size="small" color="error" sx={{ textTransform: 'none' }} onClick={() => requestDelete(row.id)}>Excluir</Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );

  const renderDetails = () => (
    <Paper elevation={0} sx={{ mt: 4, p: 3, borderRadius: 3, border: '1px solid #f0f0f0', bgcolor: '#fafafa' }}>
      <Stack spacing={1}>
        <Typography variant="subtitle1" fontWeight="bold">Campos enviados</Typography>
        {selectedLead ? detailEntries.map((entry, index) => (
          <Stack key={`${entry.label}-${index}`} direction="row" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">{entry.label}</Typography>
            <Typography variant="body2" sx={{ textAlign: 'right', maxWidth: 400 }}>{entry.value || 'Ã¢â‚¬â€'}</Typography>
          </Stack>
        )) : (<Typography variant="body2" color="text.secondary">Clique em um lead acima para ver todos os campos enviados.</Typography>)}
      </Stack>
    </Paper>
  );

  return (
    <>
      <ConfirmDeleteModal open={deleteModal.open} onClose={() => setDeleteModal({ open: false, id: null })} onConfirm={confirmDelete} isLoading={isDeleting} title="Remover Lead?" description="VocÃª estÃ¡ prestes a excluir este contato da sua base. Ele nÃ£o receberÃ¡ mais nenhuma comunicaÃ§Ã£o." />
      <Paper elevation={0} sx={{ width: '100%', bgcolor: 'white', p: { xs: 2, sm: 4 }, borderRadius: 3, boxShadow: BRAND.shadowSoft }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }} spacing={2}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ fontFamily: BRAND.fontFamilyHeader, fontWeight: 'bold', color: '#333' }}>Lista de Leads</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">Total capturado:</Typography>
              <Chip label={rows.length} size="small" sx={{ bgcolor: BRAND.primary, color: 'white', fontWeight: 'bold' }} />
            </Stack>
          </Box>
          <Button variant="outlined" startIcon={<FileDownloadIcon />} disabled={rows.length === 0} fullWidth={isMobile} sx={{ borderColor: BRAND.primary, color: BRAND.primary, fontWeight: 'bold', '&:hover': { borderColor: BRAND.primaryDark, bgcolor: '#E0F2F1' } }}>Exportar CSV</Button>
        </Stack>
        {loading && (<Stack direction="row" justifyContent="center" sx={{ mb: 2 }}><CircularProgress size={24} /></Stack>)}
        {error && (<Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>)}
        {rows.length > 0 ? (isMobile ? renderMobileList() : (
          <DataGrid rows={rows} columns={columns} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} pageSizeOptions={[10, 25]} disableRowSelectionOnClick autoHeight onRowClick={(params) => setSelectedLead(params.row)} sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: '#FAFAFA', color: BRAND.primary, fontWeight: 'bold' }, '& .MuiDataGrid-row:hover': { bgcolor: BRAND.secondaryLight }, '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f0f0' } }} />
        )) : (
          <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#FAFAFA', borderRadius: 2, border: '1px dashed #ddd' }}>
            <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: BRAND.secondary, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" color="text.secondary">Nenhum lead capturado ainda.</Typography>
          </Box>
        )}
      </Paper>
      {renderDetails()}
    </>
  );
}
