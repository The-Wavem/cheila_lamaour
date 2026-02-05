import { Box, TextField, Typography, Button, Divider, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function HomeEditor() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Topo do Formulário com Ação Global */}
            <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">Editando: Página Inicial</Typography>
                <Button variant="contained" startIcon={<SaveIcon />} sx={{ backgroundColor: '#009688', '&:hover': { backgroundColor: '#00796b' } }}>
                    Salvar Alterações
                </Button>
            </Box>

            {/* Conteúdo com Scroll */}
            <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1 }}>

                {/* SEÇÃO 1: HERO (Topo) */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="overline" color="primary" fontWeight="bold">SEÇÃO HERO (CAPA)</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        A primeira impressão do site. Escolha uma frase de impacto.
                    </Typography>

                    <Stack spacing={3}>
                        <TextField label="TÍTULO PRINCIPAL (HEADLINE)" fullWidth defaultValue="Liderança Feminina e Gestão Humanizada" />
                        <TextField label="SUBTÍTULO" fullWidth multiline rows={2} defaultValue="Mentora, Palestrante e Especialista em transformar carreiras." />
                        <TextField label="TEXTO DO BOTÃO (CTA)" fullWidth sx={{ maxWidth: 300 }} defaultValue="Agendar Mentoria" />
                        <TextField label="LINK DO BOTÃO" fullWidth sx={{ maxWidth: 300 }} defaultValue="/contato" />
                    </Stack>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* SEÇÃO 2: LINK BIO */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="overline" color="primary" fontWeight="bold">SEÇÃO BIO RESUMIDA</Typography>
                    {/* ... mais inputs ... */}
                </Box>

            </Box>
        </Box>
    );
}