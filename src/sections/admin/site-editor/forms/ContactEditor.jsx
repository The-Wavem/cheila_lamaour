import {
    Box, TextField, Typography, Button, Divider, Stack,
    Paper, InputAdornment
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function ContactEditor() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Topo Fixo */}
            <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white' }}>
                <Box>
                    <Typography variant="h6" fontWeight="bold">Editando: Página de Contato</Typography>
                    <Typography variant="caption" color="text.secondary">Gerencie os textos e canais de atendimento.</Typography>
                </Box>
                <Button variant="contained" startIcon={<SaveIcon />} sx={{ bgcolor: '#009688' }}>
                    Salvar Alterações
                </Button>
            </Box>

            {/* Área de Scroll */}
            <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1, bgcolor: '#f4f4f4' }}>

                {/* --- 1. SEÇÃO HERO (TEXTOS DE BOAS-VINDAS) --- */}
                <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                        1. CABEÇALHO (HERO)
                    </Typography>
                    <Stack spacing={3}>
                        <TextField
                            label="TÍTULO PRINCIPAL"
                            fullWidth
                            defaultValue="VAMOS CONVERSAR"
                            helperText="Aparece grande no topo da página."
                        />
                        <TextField
                            label="SUBTÍTULO DE IMPACTO"
                            fullWidth
                            defaultValue="Dê o próximo passo rumo à sua essência."
                        />
                        <TextField
                            label="TEXTO DE APOIO (DESCRIÇÃO)"
                            fullWidth
                            multiline
                            rows={3}
                            defaultValue="Seja para alavancar sua carreira, equilibrar sua vida pessoal ou liderar com propósito. Estou aqui para guiar sua jornada de transformação."
                        />
                    </Stack>
                </Paper>

                {/* --- 2. CANAIS DE CONTATO --- */}
                <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                        2. DADOS DE CONTATO
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Esses dados aparecem tanto na página de contato quanto no rodapé do site.
                    </Typography>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                        <TextField
                            label="TELEFONE / WHATSAPP"
                            fullWidth
                            defaultValue="(41) 9 9999-9999"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <WhatsAppIcon color="success" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="E-MAIL OFICIAL"
                            fullWidth
                            defaultValue="cheila@gmail.com"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                </Paper>

                {/* --- 3. ÁREA DE FORMULÁRIO E AGENDA --- */}
                <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                        3. FORMULÁRIO E AGENDA
                    </Typography>

                    <Stack spacing={4}>
                        {/* Bloco do Formulário */}
                        <Box>
                            <Typography variant="caption" fontWeight="bold" color="text.secondary">TEXTOS DO FORMULÁRIO</Typography>
                            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                                <TextField label="TÍTULO DO FORMULÁRIO" fullWidth defaultValue="Envie uma mensagem" />
                                <TextField label="INSTRUÇÃO" fullWidth defaultValue="Preencha o Formulário abaixo" />
                            </Stack>
                        </Box>

                        <Divider />

                        {/* Bloco da Agenda (Widget Lateral) */}
                        <Box>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                <CalendarMonthIcon color="primary" />
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">WIDGET "AGENDA ABERTA"</Typography>
                            </Stack>

                            <Stack spacing={2}>
                                <TextField label="TÍTULO DO CARD" fullWidth defaultValue="Agenda Aberta" />
                                <TextField
                                    label="TEXTO EXPLICATIVO"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    defaultValue="Verifique meus horários disponíveis em tempo real e reserve o seu sem burocracia."
                                />
                                <TextField label="TEXTO DE STATUS" fullWidth defaultValue="Sessões de 'definição de tempo' disponíveis para a próxima semana." />
                            </Stack>
                        </Box>
                    </Stack>
                </Paper>

            </Box>
        </Box>
    );
}