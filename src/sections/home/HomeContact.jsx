import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContactForm from '@/components/ui/public/forms/ContactForm';
import SectionHeader from '@/components/ui/public/base/SectionHeader';
import { PUBLIC_BRAND } from '@/theme/branding';
import { getContactData } from '@/services/homeAPI';

const DEFAULT_CONTACT_DATA = {
    title: 'Entre em contato',
    subtitle: 'Seu próximo passo começa aqui!',
    submit_button_text: 'Enviar Mensagem'
};

const HomeContact = () => {
    const [contactData, setContactData] = useState(DEFAULT_CONTACT_DATA);

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
                bgcolor: PUBLIC_BRAND.colors.textOnDark,
                borderRadius: '30px',
                padding: '80px',
                mt: 12,
                boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
                border: `1px solid ${PUBLIC_BRAND.colors.primaryBorderSoft}`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    background: PUBLIC_BRAND.gradients.multicolorTop,
                    backgroundSize: '200% 100%'
                }
            }}>
                <AutoAwesomeIcon sx={{
                    position: 'absolute',
                    top: 30,
                    right: 40,
                    fontSize: 40,
                    color: PUBLIC_BRAND.colors.accent,
                    opacity: 0.2
                }} />

                <Box sx={{ maxWidth: '720px' }}>
                    <SectionHeader
                        title={contactData.title}
                        subtitle={contactData.subtitle}
                        color={PUBLIC_BRAND.colors.primaryDark}
                        decorativeLine={{
                            width: '60px',
                            height: '4px',
                            background: PUBLIC_BRAND.gradients.contactLine,
                            borderRadius: '2px',
                            mt: 1.5,
                            mb: 5
                        }}
                    />
                </Box>

                <ContactForm submitButtonText={contactData.submit_button_text} />
            </Box>
        </Box>
    );
};

export default HomeContact;