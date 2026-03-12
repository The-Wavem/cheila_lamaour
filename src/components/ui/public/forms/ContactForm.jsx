import React, { useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PublicButton from '@/components/ui/public/base/PublicButton';
import PublicTextField from '@/components/ui/public/base/PublicTextField';
import { saveContactMessage } from '@/services/homeAPI';

const ContactForm = ({ submitButtonText = 'Enviar Mensagem' }) => {
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

    return (
        <>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                <PublicTextField
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    sx={{}}
                />

                <PublicTextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                />

                <PublicTextField
                    label="Mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    multiline
                    rows={6}
                    sx={{ gridRow: 'span 2' }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <PublicButton
                        variant="publicPrimary"
                        disabled={isSending}
                        onClick={handleSubmit}
                        endIcon={!isSending && <SendIcon />}
                        sx={{
                            padding: '18px'
                        }}
                    >
                        {isSending ? 'Enviando...' : submitButtonText}
                    </PublicButton>

                    <PublicTextField
                        label="Telefone (Opcional)"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
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
        </>
    );
};

export default ContactForm;