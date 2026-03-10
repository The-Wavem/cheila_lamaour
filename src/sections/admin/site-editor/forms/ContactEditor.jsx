import {
    Box, TextField, Typography, Button, Divider, Stack,
    Accordion, AccordionSummary, AccordionDetails, InputAdornment
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const BRAND = {
    teal: '#009688',
    gold: '#C5A669',
    bg: '#F4F6F8',
    paper: '#FFFFFF'
};

export default function ContactEditor({ setIsDirty, onSaveSuccess }) {
    const handleChange = () => setIsDirty && setIsDirty(true);

    const handleSave = () => {
        console.log("Salvando dados (Contato)...");
        if (setIsDirty) setIsDirty(false);
        if (onSaveSuccess) onSaveSuccess();
    };

    const accordionStyle = {
        elevation: 0,
        sx: {
            mb: 2, borderRadius: '8px !important', border: '1px solid #eee',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { borderLeft: `4px solid ${BRAND.gold}`, bgcolor: BRAND.paper }
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: BRAND.bg }}>

            {/* --- TOPO FIXO --- */}
            <Box sx={{
                p: { xs: 2, sm: 3 },
                borderBottom: '1px solid #e0e0e0', 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between', 
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: { xs: 2, sm: 0 },
                bgcolor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
                <Box>
                    <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold', color: '#333' }}>
                        Editando: Contato
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Gerencie os textos e canais.</Typography>
                </Box>
                <Button
                    variant="contained" startIcon={<SaveIcon />} onClick={handleSave}
                    sx={{ bgcolor: BRAND.teal, fontWeight: 'bold', '&:hover': { bgcolor: '#00796b' } }}
                >
                    Salvar Alterações
                </Button>
            </Box>

            {/* --- ÁREA DE CONTEÚDO --- */}
            <Box sx={{ p: { xs: 2, md: 4 }, overflowY: 'auto', flexGrow: 1 }}>

                {/* 1. HERO / BOAS VINDAS */}
                <Accordion defaultExpanded {...accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
                        <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>1. CABEÇALHO (HERO)</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <TextField
                                label="TÍTULO PRINCIPAL" fullWidth variant="outlined"
                                defaultValue="VAMOS CONVERSAR" onChange={handleChange}
                                InputProps={{ style: { fontWeight: 'bold', color: BRAND.teal } }}
                            />
                            <TextField
                                label="SUBTÍTULO" fullWidth variant="outlined"
                                defaultValue="Dê o próximo passo rumo à sua essência." onChange={handleChange}
                            />
                            <TextField
                                label="DESCRIÇÃO" fullWidth multiline rows={3} variant="outlined"
                                placeholder="Texto de apoio..."
                                defaultValue="Seja para alavancar sua carreira, equilibrar sua vida pessoal ou liderar com propósito. Estou aqui para guiar sua jornada de transformação."
                                onChange={handleChange}
                            />
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                {/* 2. CANAIS DE CONTATO */}
                <Accordion {...accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
                        <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>2. DADOS DE CONTATO</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Estes dados atualizam automaticamente o Rodapé do site e os botões flutuantes.
                        </Typography>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                            <TextField
                                label="TELEFONE / WHATSAPP" fullWidth onChange={handleChange}
                                defaultValue="(41) 9 9999-9999"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><WhatsAppIcon color="success" /></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="E-MAIL OFICIAL" fullWidth onChange={handleChange}
                                defaultValue="cheila@gmail.com"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: BRAND.gold }} /></InputAdornment>,
                                }}
                            />
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                {/* 3. WIDGET DE AGENDA */}
                <Accordion {...accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>3. WIDGET "AGENDA ABERTA"</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <TextField label="TÍTULO DO CARD" fullWidth defaultValue="Agenda Aberta" onChange={handleChange} />
                            <TextField
                                label="STATUS DA AGENDA (TEXTO EXPLICATIVO)" fullWidth multiline rows={2}
                                defaultValue="Verifique meus horários disponíveis em tempo real e reserve o seu sem burocracia."
                                onChange={handleChange}
                            />
                            <TextField
                                label="NOTA DE RODAPÉ (AVISO)" fullWidth
                                defaultValue="Sessões de 'definição de tempo' disponíveis para a próxima semana."
                                helperText="Use isso para avisar se está com agenda cheia ou aberta."
                                onChange={handleChange}
                            />
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                {/* 4. FORMULÁRIO TEXTOS - Adicionado para manter paridade com a versão anterior */}
                <Accordion {...accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
                        <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>4. FORMULÁRIO TEXTOS</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3 }}>
                        <Stack spacing={4}>
                            <Box>
                                <Typography variant="caption" fontWeight="bold" color="text.secondary">TEXTOS DO FORMULÁRIO</Typography>
                                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                                    <TextField
                                        label="TÍTULO DO FORMULÁRIO"
                                        fullWidth
                                        defaultValue="Envie uma mensagem"
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        label="INSTRUÇÃO"
                                        fullWidth
                                        defaultValue="Preencha o Formulário abaixo"
                                        onChange={handleChange}
                                    />
                                </Stack>
                            </Box>

                        </Stack>
                    </AccordionDetails>
                </Accordion>

            </Box>
        </Box>
    );
}