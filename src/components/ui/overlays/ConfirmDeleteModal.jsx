import { Dialog, Box, Typography, Button, Stack } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { BRAND } from '@/theme/branding'; // Ajuste o caminho conforme necessário

export default function ConfirmDeleteModal({ open, onClose, onConfirm, title, description }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          minWidth: { xs: 300, sm: 400 },
          textAlign: 'center'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2 }}>
        <Box 
          sx={{ 
            bgcolor: '#FEE2E2', 
            borderRadius: '50%', 
            width: 64, height: 64, 
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}
        >
          <WarningAmberRoundedIcon sx={{ fontSize: 32, color: '#D32F2F' }} />
        </Box>

        <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: BRAND.fontFamilyHeader }}>
            {title || 'Excluir item?'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 300, mx: 'auto' }}>
            {description || 'Essa ação não poderá ser desfeita. Tem certeza que deseja continuar?'}
            </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 2, width: '100%' }} justifyContent="center">
          <Button 
            variant="outlined" 
            onClick={onClose}
            sx={{ 
                borderRadius: 2, textTransform: 'none', fontWeight: 'bold',
                color: 'text.secondary', borderColor: '#e0e0e0',
                '&:hover': { bgcolor: '#f5f5f5', borderColor: '#ccc' }
            }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={onConfirm}
            color="error"
            disableElevation
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
          >
            Sim, excluir
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}