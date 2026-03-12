import React from 'react';
import {
    Dialog, DialogContent, DialogActions, Button, Typography, Box, Slide, IconButton
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CloseIcon from '@mui/icons-material/Close';

// Transição suave vindo de baixo
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UnsavedChangesModal({ open, onContinueEditing, onDiscardChanges }) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onContinueEditing}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    width: '100%',
                    maxWidth: 480,
                    borderTop: '6px solid #C5A669', // Dourado da marca
                    boxShadow: '0px 10px 40px rgba(0,0,0,0.1)'
                }
            }}
        >
            {/* Botão Fechar no canto */}
            <IconButton
                onClick={onContinueEditing}
                sx={{ position: 'absolute', right: 8, top: 8, color: '#999' }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ textAlign: 'center', pt: 5, pb: 3, px: 4 }}>
                {/* Ícone Pulsante */}
                <Box sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: '#FFF8E1',
                    mb: 2,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                        '0%': { boxShadow: '0 0 0 0 rgba(197, 166, 105, 0.4)' },
                        '70%': { boxShadow: '0 0 0 10px rgba(197, 166, 105, 0)' },
                        '100%': { boxShadow: '0 0 0 0 rgba(197, 166, 105, 0)' }
                    }
                }}>
                    <WarningAmberRoundedIcon sx={{ fontSize: 48, color: '#C5A669' }} />
                </Box>

                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#333' }}>
                    Alterações não salvas!
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Parece que você editou alguns campos e esqueceu de salvar. Se sair agora, <strong>todo o seu progresso será perdido.</strong>
                </Typography>

                <Box sx={{ bgcolor: '#f5f5f5', p: 1.5, borderRadius: 2, fontSize: '0.875rem', color: '#666' }}>
                    💡 <strong>Dica:</strong> Clique em "Salvar" no topo da página antes de sair.
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center', gap: 2, flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
                <Button
                    fullWidth
                    onClick={onDiscardChanges}
                    variant="outlined"
                    color="error"
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                >
                    Descartar e Sair
                </Button>
                <Button
                    fullWidth
                    onClick={onContinueEditing}
                    variant="contained"
                    sx={{
                        bgcolor: '#009688',
                        '&:hover': { bgcolor: '#00796b' },
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(0, 150, 136, 0.3)'
                    }}
                >
                    Voltar e Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
}