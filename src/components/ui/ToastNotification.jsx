import { Snackbar, Alert, Slide } from '@mui/material';

function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

export default function ToastNotification({ open, onClose, message, type = 'success' }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000} // Some sozinho em 4 segundos
            onClose={onClose}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Canto superior direito
            sx={{ mt: 7 }} // Margem para não ficar em cima do Header
        >
            <Alert
                onClose={onClose}
                severity={type}
                variant="filled"
                sx={{
                    width: '100%',
                    borderRadius: 2,
                    fontWeight: 'medium',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    // Cores personalizadas baseadas no tipo
                    bgcolor: type === 'success' ? '#009688' : undefined,
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}