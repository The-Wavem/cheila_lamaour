import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Snackbar, Alert } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Link } from 'react-router-dom';
import { getServicesData, getTestimonialsData, getContactData, saveContactMessage } from '@/services/homeAPI';
const DEFAULT_SERVICES_DATA = {
    title: 'Serviços Prestados',
    subtitle: 'Soluções completas de mentoria',
    view_all_text: 'Ver página completa de serviços',
    cards: [
        {
            title: 'Desenvolvimento Profissional',
            description: "Estratégias para sair do ponto A ao ponto B. Evite perder tempo 'batendo cabeça' e acelere sua..."
        },
        {
            title: 'Desenvolvimento Pessoas',
            description: "Estratégias para sair do ponto A ao ponto B. Evite perder tempo 'batendo cabeça' e acelere sua..."
        },
        {
            title: 'Treinamentos',
            description: "Estratégias para sair do ponto A ao ponto B. Evite perder tempo 'batendo cabeça' e acelere sua..."
        }
    ]
};

const DEFAULT_TESTIMONIAL = {
    client_name: 'Nome Cliente',
    text: 'A mentoria com a Cheila foi um divisor de águas na minha carreira. A clareza que obtive sobre meus objetivos e a confiança para liderar mudaram minha trajetória.'
};

const DEFAULT_CONTACT_DATA = {
    title: 'Entre em contato',
    subtitle: 'Seu próximo passo começa aqui!',
    submit_button_text: 'Enviar Mensagem'
};

const ServicesSection = () => {
    const serviceIcons = [
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
        },
        {
            icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
        },
        {
            icon: <GroupsIcon sx={{ fontSize: 40 }} />,
        }
    ];

    const [servicesData, setServicesData] = useState(DEFAULT_SERVICES_DATA);
    const [testimonial, setTestimonial] = useState(DEFAULT_TESTIMONIAL);
    const [contactData, setContactData] = useState(DEFAULT_CONTACT_DATA);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: '',
        telefone: ''

    });
    // Para controlar os avisos de sucesso ou erro
    const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

    // Para desativar o botão enquanto a mensagem é enviada
    const [isSending, setIsSending] = useState(false);

    // Função para atualizar o estado conforme o utilizador digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Função que liga para a tua API e guarda no Firebase
    const handleSubmit = async () => {
        // Validação básica
        if (!formData.nome || !formData.email || !formData.mensagem) {
            setFeedback({ open: true, message: 'Por favor, preencha os campos obrigatórios.', severity: 'error' });
            return;
        }

        setIsSending(true);
        try {
            // Chama a função da tua homeAPI.js
            await saveContactMessage(formData);
            setFeedback({ open: true, message: 'Mensagem enviada com sucesso!', severity: 'success' });
            setFormData({ nome: '', email: '', mensagem: '', telefone: '' }); // Limpa os campos
        } catch (error) {
            setFeedback({ open: true, message: 'Erro ao enviar. Tente novamente.', severity: 'error' });
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const [servicesDoc, testimonialsDoc, contactDoc] = await Promise.all([
                    getServicesData(),
                    getTestimonialsData(),
                    getContactData()
                ]);

                if (servicesDoc) {
                    setServicesData((prev) => ({
                        ...prev,
                        ...servicesDoc,
                        cards: Array.isArray(servicesDoc.cards) && servicesDoc.cards.length
                            ? servicesDoc.cards
                            : prev.cards
                    }));
                }

                if (Array.isArray(testimonialsDoc?.testimonials) && testimonialsDoc.testimonials.length) {
                    const firstTestimonial = testimonialsDoc.testimonials[0];
                    setTestimonial({
                        client_name: firstTestimonial.client_name || firstTestimonial.name || DEFAULT_TESTIMONIAL.client_name,
                        text: firstTestimonial.text || DEFAULT_TESTIMONIAL.text
                    });
                }

                if (contactDoc) {
                    setContactData((prev) => ({ ...prev, ...contactDoc }));
                }
            } catch (error) {
                console.error('Erro ao carregar dados de serviços/contato:', error);
            }
        };

        loadData();
    }, []);

    const mergedServices = (servicesData.cards || DEFAULT_SERVICES_DATA.cards).map((service, index) => ({
        ...service,
        icon: serviceIcons[index]?.icon || <SchoolIcon sx={{ fontSize: 40 }} />
    }));

    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(180deg, #f5f5f5 0%, #fafafa 50%, #f5f5f5 100%)',
            padding: '100px 60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Elementos decorativos de fundo */}
            <Box sx={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'rgba(0, 166, 166, 0.05)',
                filter: 'blur(60px)',
                zIndex: 0
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '20%',
                left: '8%',
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                background: 'rgba(181, 149, 32, 0.05)',
                filter: 'blur(50px)',
                zIndex: 0
            }} />



            {/* titulo 1 */}
            <Typography
                variant="h6"
                sx={{
                    color: '#B59520',
                    fontSize: '25px',
                    fontWeight: '600',
                    mb: 2,
                    textAlign: 'center',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}
            >
                {servicesData.title}
            </Typography>

            {/* titulo 2*/}
            <Typography
                variant="h3"
                sx={{
                    color: '#007070',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    mb: 2,
                    textAlign: 'center',
                    letterSpacing: '-0.5px'
                }}
            >
                {servicesData.subtitle}
            </Typography>

            {/* risco  */}
            <Box sx={{
                width: '100px',
                height: '5px',
                background: 'linear-gradient(90deg, transparent 0%, #007070 50%, transparent 100%)',
                mt: 2,
                mb: 8,
                borderRadius: '3px'
            }} />

            {/* Cards  */}
            <Box sx={{
                display: 'flex',
                gap: 4,
                justifyContent: 'center',
                alignItems: 'stretch',
                maxWidth: '1200px',
                width: '100%',
                position: 'relative',
                zIndex: 1
            }}>
                {mergedServices.map((service, index) => (
                    <Card
                        key={index}
                        sx={{
                            flex: 1,
                            maxWidth: '350px',
                            bgcolor: 'white',
                            borderRadius: '24px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: '1px solid rgba(0, 166, 166, 0.1)',
                            position: 'relative',
                            overflow: 'visible',
                            '&:hover': {
                                transform: 'translateY(-12px)',
                                boxShadow: '0 20px 50px rgba(0, 166, 166, 0.15)',
                                '& .icon-circle': {
                                    transform: 'scale(1.1) rotate(10deg)',
                                    boxShadow: '0 12px 30px rgba(0, 166, 166, 0.3)'
                                },
                                '& .saiba-mais': {
                                    gap: 2
                                }
                            },
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '5px',
                                background: 'linear-gradient(90deg, #00A6A6, #FBAE36)',
                                borderRadius: '24px 24px 0 0',
                                opacity: 0,
                                transition: 'opacity 0.3s ease'
                            },
                            '&:hover::before': {
                                opacity: 1
                            }
                        }}
                    >
                        <CardContent sx={{ p: 5 }}>
                            {/* bola com icone*/}
                            <Box
                                className="icon-circle"
                                sx={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #00A6A6 0%, #007070 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    mb: 4,
                                    boxShadow: '0 8px 20px rgba(0, 166, 166, 0.25)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '10%',
                                        left: '10%',
                                        width: '30%',
                                        height: '30%',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        borderRadius: '50%',
                                        filter: 'blur(8px)'
                                    }
                                }}
                            >
                                {service.icon}
                            </Box>

                            {/* titulo */}
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#007070',
                                    fontWeight: 'bold',
                                    fontSize: '22px',
                                    mb: 2,
                                    lineHeight: 1.3
                                }}
                            >
                                {service.title}
                            </Typography>

                            {/* descricao */}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    lineHeight: 1.8,
                                    mb: 4,
                                    fontSize: '15px'
                                }}
                            >
                                {service.description}
                            </Typography>

                            {/* saiba mais */}
                            <Box
                                className="saiba-mais"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: '#B59520',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    transition: 'gap 0.3s ease',
                                    '&:hover': {
                                        color: '#007070'
                                    }
                                }}
                            >
                                <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>
                                    Saiba mais
                                </Typography>
                                <ArrowForwardIcon sx={{ fontSize: 18 }} />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* frase ver todos os servicos */}
            <Box sx={{
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
            }}>
                <Typography
                    component={Link}
                    to="/servicos"
                    sx={{
                        textDecoration: 'none',
                        color: '#007070',
                        fontSize: '18px',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        mb: 2,
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                            color: '#00A6A6',
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    {servicesData.view_all_text}
                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Typography>

                {/*risco linha blur */}
                <Box sx={{
                    width: '300px',
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent 0%, #007070 50%, transparent 100%)',
                    borderRadius: '2px'
                }} />
            </Box>

            {/* quadrado de avaliação  */}
            <Box sx={{
                width: '100%',
                maxWidth: '1200px',
                background: 'linear-gradient(135deg, #00A6A6 0%, #008B8B 100%)',
                borderRadius: '30px',
                padding: '80px',
                mt: 12,
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0, 166, 166, 0.25)',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }
            }}>
                {/* aspas dentro do quadrado  */}
                <FormatQuoteIcon sx={{
                    position: 'absolute',
                    top: 40,
                    right: 60,
                    fontSize: 100,
                    color: 'rgba(255, 255, 255, 0.1)',
                    transform: 'rotate(180deg)'
                }} />

                {/* logo na esquerda  */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 40,
                        left: 40,
                        width: 60,
                        height: 60,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.6rem',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)'
                        }
                    }}
                >
                    CL
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {/* estrelas  */}
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                                key={star}
                                sx={{
                                    fontSize: 45,
                                    color: '#FBAE36',
                                    filter: 'drop-shadow(0 4px 8px rgba(251, 174, 54, 0.3))',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.2) rotate(15deg)'
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    {/* avaliacao  */}
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '26px',
                            lineHeight: 1.7,
                            mb: 5,
                            maxWidth: '900px',
                            fontStyle: 'italic',
                            fontWeight: 300,
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        "{testimonial.text}"
                    </Typography>

                    {/* nome cliente - melhorado */}
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '19px',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                        }}
                    >
                        - {testimonial.client_name}
                    </Typography>
                </Box>
            </Box>

            {/* secao contato */}
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
                    backgroundSize: '200% 100%',
                }
            }}>
                {/* Elementos decorativos */}
                <AutoAwesomeIcon sx={{
                    position: 'absolute',
                    top: 30,
                    right: 40,
                    fontSize: 40,
                    color: '#FBAE36',
                    opacity: 0.2
                }} />

                {/* Tttulo  */}
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

                {/* Seção de Contato */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                    {/* Campo Nome */}
                    <TextField
                        fullWidth
                        label="Nome"
                        name="nome" // O nome deve ser igual ao que está no formData
                        value={formData.nome}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{ /* Seus estilos aqui... */ }}
                    />

                    {/* Campo Email */}
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        type="email"
                    />

                    {/* Campo Mensagem */}
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

                    {/* Coluna Direita: Botão Primeiro, Telefone Depois */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Button
                            variant="contained"
                            disabled={isSending} // Desabilita enquanto envia
                            onClick={handleSubmit} // Chama a função de envio
                            endIcon={!isSending && <SendIcon />}
                            sx={{
                                background: 'linear-gradient(135deg, #00A6A6 0%, #007070 100%)',
                                padding: '18px',
                                // Outros estilos do seu botão...
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

                {/* Feedback para o usuário (Coloque logo antes do fechamento do último </Box>) */}
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

export default ServicesSection;