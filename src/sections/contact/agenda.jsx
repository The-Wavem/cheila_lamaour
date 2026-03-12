import React from 'react';
import {Container,Box,Typography,TextField,Button,Paper,Grid,MenuItem,FormControl,Select} from '@mui/material';
import {CalendarMonth,Email,Phone,Instagram,ArrowForward} from '@mui/icons-material';
import Header from '@/components/layout/Header';
function Agenda() {
    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                }}
            >
                <Header />

                <Container maxWidth="lg" sx={{ mt: 8, mb: 6 }}>
                    {/* TÍTULO */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#D58000',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            mb: 1
                        }}>
                            VAMOS CONVERSAR
                        </Typography>

                        <Typography sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '48px',
                            fontWeight: 700,
                            color: '#000',
                            mb: 1
                        }}>
                            Dê o próximo passo
                        </Typography>

                        <Typography sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '36px',
                            fontWeight: 500,
                            color: '#00A6A6',
                            mb: 3
                        }}>
                            Rumo a sua essência
                        </Typography>

                        <Typography sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '14px',
                            color: '#555',
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            Seja para alavancar sua carreira, equilibrar sua vida pessoal ou liderar com propósito.
                            Estou aqui para guiar sua jornada de transformação.
                        </Typography>
                    </Box>

                    <Grid container spacing={4} alignItems="flex-start">
                        {/* CONTATOS */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                                {/* TELEFONE */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    bgcolor: '#ffffff',
                                    borderRadius: '12px',
                                    padding: '14px 12px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                    transition: '0.3s',
                                    '&:hover': { transform: 'translateX(5px)' }
                                }}>
                                    <Box sx={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: '50%',
                                        bgcolor: '#E8E8E8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Phone sx={{ color: '#00A6A6' }} />
                                    </Box>

                                    <Box>
                                        <Typography sx={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: '12px',
                                            color: '#999'
                                        }}>
                                            Telefone
                                        </Typography>

                                        <Typography sx={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: '15px',
                                            color: '#00A6A6',
                                            fontWeight: 600
                                        }}>
                                            +55 (41) 99999-9999
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* EMAIL */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    bgcolor: '#ffffff',
                                    borderRadius: '12px',
                                    padding: '14px 12px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                    transition: '0.3s',
                                    '&:hover': { transform: 'translateX(5px)' }
                                }}>
                                    <Box sx={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: '50%',
                                        bgcolor: '#E8E8E8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Email sx={{ color: '#00A6A6' }} />
                                    </Box>

                                    <Box>
                                        <Typography sx={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: '12px',
                                            color: '#999'
                                        }}>
                                            Email
                                        </Typography>

                                        <Typography sx={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: '15px',
                                            color: '#00A6A6',
                                            fontWeight: 600
                                        }}>
                                            contato@cheilalamour.com
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* INSTAGRAM */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    bgcolor: '#ffffff',
                                    borderRadius: '12px',
                                    padding: '14px 12px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                    transition: '0.3s',
                                    '&:hover': { transform: 'translateX(5px)' }
                                }}>
                                    <Box sx={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: '50%',
                                        bgcolor: '#E8E8E8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Instagram sx={{ color: '#00A6A6' }} />
                                    </Box>

                                    <Box>
                                        <Typography sx={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: '12px',
                                            color: '#999'
                                        }}>
                                            Instagram
                                        </Typography>

                                        <Typography sx={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: '15px',
                                            color: '#00A6A6',
                                            fontWeight: 600
                                        }}>
                                            @cheilalamour
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* AGENDA */}
                                <Box sx={{
                                    width: '100%',
                                    height: '160px',
                                    mt: 2,
                                    px: 2.5,
                                    borderRadius: '16px',
                                    background: '#F9F0E3',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    gap: 0.5,
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': { transform: 'translateY(-3px)' }
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CalendarMonth sx={{ fontSize: 30, color: '#E9B972' }} />
                                        <Typography sx={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: '18px',
                                            fontWeight: 600
                                        }}>
                                            Agenda aberta
                                        </Typography>
                                    </Box>

                                    <Typography sx={{
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: '12px',
                                        color: '#4F3B00'
                                    }}>
                                        Verifique horários em tempo real e reserve sem burocracia.
                                        <br />
                                        <strong>Disponível para a próxima semana.</strong>
                                    </Typography>

                                    <Box sx={{
                                        mt: 0.5,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        px: 2.5,
                                        py: 1.1,
                                        borderRadius: '999px',
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        backgroundColor: '#E9B972',
                                        transition: '0.3s',
                                        '&:hover': {
                                            backgroundColor: '#DFAE5F',
                                            '& svg': { transform: 'translateX(10px)' }
                                        }
                                    }}>
                                        Agendar sessão agora
                                        <ArrowForward sx={{ fontSize: 16, transition: '0.7s' }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        {/* FORMULÁRIO */}
                        <Grid item xs={12} md={8}>
                            <Paper sx={{
                                bgcolor: '#ffffff',
                                borderRadius: '16px',
                                padding: { xs: '24px', md: '40px' },
                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                            }}>
                                <Typography sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    mb: 1
                                }}>
                                    Envie uma mensagem
                                </Typography>

                                <Typography sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: '13px',
                                    color: '#666',
                                    mb: 4
                                }}>
                                    Preencha o formulário abaixo
                                </Typography>

                                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography sx={{ fontSize: 13, mb: 1 }}>Seu nome</Typography>
                                            <TextField fullWidth placeholder="Digite seu nome" />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Typography sx={{ fontSize: 13, mb: 1 }}>Seu email</Typography>
                                            <TextField fullWidth type="email" placeholder="Digite seu email" />
                                        </Grid>
                                    </Grid>

                                    <Box>
                                        <Typography sx={{ fontSize: 13, mb: 1 }}>Interesse principal</Typography>
                                        <FormControl fullWidth>
                                            <Select defaultValue="" displayEmpty>
                                                <MenuItem value="" disabled>
                                                    <span style={{ color: '#999' }}>Selecione uma opção</span>
                                                </MenuItem>
                                                <MenuItem value="1">Opção 1</MenuItem>
                                                <MenuItem value="2">Opção 2</MenuItem>
                                                <MenuItem value="3">Opção 3</MenuItem>
                                                <MenuItem value="4">Opção 4</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Box>
                                        <Typography sx={{ fontSize: 13, mb: 1 }}>Mensagem</Typography>
                                        <TextField fullWidth multiline rows={5} placeholder="Digite sua mensagem" />
                                    </Box>

                                    <Button variant="contained" sx={{
                                        bgcolor: '#00A6A6',
                                        borderRadius: '8px',
                                        padding: '14px 32px',
                                        fontWeight: 600,
                                        '&:hover': { bgcolor: '#008888' }
                                    }}>
                                        Enviar solicitação
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Agenda;
