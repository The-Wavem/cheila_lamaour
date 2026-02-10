import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Paper, Typography, Button, Grid, Stack, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import WebIcon from '@mui/icons-material/Web';
import { useDirtyProtection } from '@/hooks/useDirtyProtection'; // Ajuste o path se necessário
import ToastNotification from '@/components/ui/ToastNotification'; // Ajuste o path se necessário
import { BRAND } from '@/theme/branding';

export default function ActionWidgets() {
    const navigate = useNavigate();
    const [note, setNote] = useState('');

    // Estados de Controle (Lógica Original Mantida)
    const [isDirty, setIsDirty] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

    // Proteção contra fechamento acidental
    useDirtyProtection(isDirty);

    const handleChange = (e) => {
        setNote(e.target.value);
        if (!isDirty) setIsDirty(true);
    };

    const handleSaveNote = () => {
        // Lógica futura de salvar no Firebase/Localstorage...
        console.log("Salvando nota rápida:", note);

        // Limpa estado sujo e avisa sucesso
        setIsDirty(false);
        setToast({ open: true, message: 'Anotação salva com sucesso!', type: 'success' });
    };

    return (
        <>
            <ToastNotification
                open={toast.open}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, open: false })}
            />

            <Grid container spacing={3}>

                {/* 1. CARD DESTAQUE: EDITOR DO SITE */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        sx={{
                            p: 4, height: '100%', borderRadius: 3,
                            background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`, // Gradiente do tema
                            color: 'white', position: 'relative', overflow: 'hidden',
                            boxShadow: BRAND.shadowSoft
                        }}
                    >
                        <WebIcon sx={{ fontSize: 100, opacity: 0.15, position: 'absolute', right: -20, top: -20 }} />

                        <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: BRAND.fontFamilyHeader, mb: 1 }}>
                            Editor do Site
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 4, opacity: 0.9 }}>
                            Ajuste textos, troque fotos e gerencie as abas de serviços facilmente.
                        </Typography>

                        <Button
                            variant="contained" fullWidth onClick={() => navigate('/admin/editor')}
                            sx={{
                                bgcolor: 'white', color: BRAND.primary, fontWeight: 'bold',
                                '&:hover': { bgcolor: '#f0f0f0' }
                            }}
                        >
                            Acessar Editor Visual
                        </Button>
                    </Paper>
                </Grid>

                {/* 2. BLOCO DE NOTAS RÁPIDO (COM LÓGICA DE SALVAR) */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, height: '100%', borderRadius: 3, boxShadow: BRAND.shadowSoft, display: 'flex', flexDirection: 'column' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: BRAND.textSecondary }}>
                                ANOTAÇÕES RÁPIDAS
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={handleSaveNote}
                                sx={{ color: isDirty ? 'warning.main' : BRAND.secondary }}
                            >
                                <SaveIcon fontSize="small" />
                            </IconButton>
                        </Stack>

                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            placeholder="Ideia para o próximo post..."
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            value={note}
                            onChange={handleChange} // Usa o handler com proteção
                            sx={{
                                flexGrow: 1,
                                bgcolor: BRAND.secondaryLight, // Fundo Creme
                                p: 2, borderRadius: 2,
                                color: BRAND.textPrimary,
                                fontFamily: 'inherit'
                            }}
                        />
                        {isDirty && (
                            <Typography variant="caption" color="warning.main" sx={{ mt: 1, display: 'block', textAlign: 'right' }}>
                                * Alterações não salvas
                            </Typography>
                        )}
                    </Paper>
                </Grid>

                {/* 3. AÇÕES RÁPIDAS */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, height: '100%', borderRadius: 3, boxShadow: BRAND.shadowSoft }}>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 3, color: BRAND.textSecondary }}>
                            O QUE VOCÊ QUER FAZER?
                        </Typography>

                        <Stack spacing={2}>
                            {([
                                { label: 'Escrever Novo Artigo', icon: <AddIcon />, action: () => navigate('/admin/blog/novo') },
                                { label: 'Ver Leads (Contatos)', icon: <EditIcon />, action: () => navigate('/admin/leads') },
                                { label: 'Ver Site Online', icon: <WebIcon />, action: () => window.open('/', '_blank') }
                            ]).map((btn) => (
                                <Button
                                    key={btn.label} variant="outlined" startIcon={btn.icon} fullWidth onClick={btn.action}
                                    sx={{
                                        justifyContent: 'flex-start', color: BRAND.textPrimary, borderColor: BRAND.border,
                                        '&:hover': { borderColor: BRAND.primary, color: BRAND.primary, bgcolor: `${BRAND.primary}08` }
                                    }}
                                >
                                    {btn.label}
                                </Button>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>

            </Grid>
        </>
    );
}