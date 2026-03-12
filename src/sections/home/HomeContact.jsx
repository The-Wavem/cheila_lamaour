import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import { getContactData, saveContactMessage } from '@/services/homeAPI';

const DEFAULT_CONTACT_DATA = {
    title: 'Entre em contato',
    subtitle: 'Seu próximo passo começa aqui!',
    submit_button_text: 'Enviar Mensagem'
};

const HomeContact = () => {
    const [contactData, setContactData] = useState(DEFAULT_CONTACT_DATA);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: '',
        telefone: ''
    });
    const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.nome || !formData.email || !formData.mensagem) {
            setFeedback({ open: true, message: 'Por favor, preencha os campos obrigatórios.', severity: 'error' });
            return;
        }

        setIsSending(true);
        try {
            await saveContactMessage(formData);
            setFeedback({ open: true, message: 'Mensagem enviada com sucesso!', severity: 'success' });
            setFormData({ nome: '', email: '', mensagem: '', telefone: '' });
        } catch {
            setFeedback({ open: true, message: 'Erro ao enviar. Tente novamente.', severity: 'error' });
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const contactDoc = await getContactData();
                if (contactDoc) {
                    setContactData((prev) => ({ ...prev, ...contactDoc }));
                }
            } catch (error) {
                console.error('Erro ao carregar dados de contato:', error);
            }
        };

        loadData();
    }, []);

    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(180deg, #f5f5f5 0%, #fafafa 50%, #f5f5f5 100%)',
            padding: '0 60px 100px',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box sx={{
                width: '100%',
                maxWidth: '1200px',
                bgcolor: 'white',
                borderRadius: '30px',
                padding: '80px',
                mt: 12,
                boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0, 166, 166, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    background: 'linear-gradient(90deg, #00A6A6, #FBAE36, #00A6A6)',
                    backgroundSize: '200% 100%'
                }
            }}>
                <AutoAwesomeIcon sx={{
                    position: 'absolute',
                    top: 30,
                    right: 40,
                    fontSize: 40,
                    color: '#FBAE36',
                    opacity: 0.2
                }} />

                <Typography
                    variant="h4"
                    sx={{
                        color: '#007070',
                        fontSize: '42px',
                        fontWeight: 'bold',
                        mb: 2,
                        position: 'relative',
                        display: 'inline-block',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: '-8px',
                            left: 0,
                            width: '60px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #FBAE36, transparent)',
                            borderRadius: '2px'
                        }
                    }}
                >
                    {contactData.title}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        color: '#666',
                        fontSize: '20px',
                        mb: 6,
                        fontWeight: 400,
                        mt: 3
                    }}
                >
                    {contactData.subtitle}
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                    <TextField
                        fullWidth
                        label="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{}}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        type="email"
                    />

                    <TextField
                        fullWidth
                        label="Mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={6}
                        sx={{ gridRow: 'span 2' }}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Button
                            variant="contained"
                            disabled={isSending}
                            onClick={handleSubmit}
                            endIcon={!isSending && <SendIcon />}
                            sx={{
                                background: 'linear-gradient(135deg, #00A6A6 0%, #007070 100%)',
                                padding: '18px'
                            }}
                        >
                            {isSending ? 'Enviando...' : contactData.submit_button_text}
                        </Button>

                        <TextField
                            fullWidth
                            label="Telefone (Opcional)"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            variant="outlined"
                            type="tel"
                        />
                    </Box>
                </Box>

                <Snackbar
                    open={feedback.open}
                    autoHideDuration={6000}
                    onClose={() => setFeedback({ ...feedback, open: false })}
                >
                    <Alert severity={feedback.severity} sx={{ width: '100%' }}>
                        {feedback.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default HomeContact;