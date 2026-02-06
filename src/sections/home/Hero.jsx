import React from 'react';
import { AppBar, Toolbar, Box, Button, Divider, Typography } from '@mui/material';
import Imagem from '@/assets/pose1.png';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmailIcon from '@mui/icons-material/Email';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';

// teste do banco (imports):
import { db } from '../../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const Hero = () => {

// Função de demonstração:
const enviarDadosTeste = async () => {
        try {
            const docRef = await addDoc(collection(db, "teste_wavem"), {
                mensagem: "TESTE 123",
                timestamp: new Date(),
                usuario: "Demo User"
            });
            console.log("Documento escrito com ID: ", docRef.id);
            alert(`Sucesso! Dado enviado para o Firestore (ID: ${docRef.id})`);
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
            alert("Erro ao conectar com o banco.");
        }
    };
    
    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                `}
            </style>

            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                margin: 0,
                padding: 0
            }}>

                <AppBar
                    position="static"
                    color="transparent"
                    elevation={0}
                    sx={{
                        width: '100%',
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.05)'
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between', py: 2.5, px: 6 }}>

                        {/* logo esquerda-*/}
                        <Box
                            sx={{
                                width: 50,
                                height: 50,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.4rem',
                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                                }
                            }}
                        >
                            CL
                        </Box>

                        {/* navegação */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0 }}>
                            <Button
                                color="inherit"
                                href="#home"
                                sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '15px',
                                    color: '#333',
                                    textTransform: 'none',
                                    px: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: '#00A6A6',
                                        bgcolor: 'rgba(0, 166, 166, 0.05)'
                                    }
                                }}
                            >
                                Home
                            </Button>
                            <Divider orientation="vertical" flexItem sx={{ mx: 3, bgcolor: 'rgba(0, 0, 0, 0.1)' }} />
                            <Button
                                color="inherit"
                                href="#sobre"
                                sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '15px',
                                    color: '#333',
                                    textTransform: 'none',
                                    px: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: '#00A6A6',
                                        bgcolor: 'rgba(0, 166, 166, 0.05)'
                                    }
                                }}
                            >
                                Sobre Mim
                            </Button>
                            <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: 'rgba(0, 0, 0, 0.1)' }} />
                            <Button
                                component={Link}
                                to="/agenda"
                                color="inherit"
                                sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '15px',
                                    color: '#333',
                                    textTransform: 'none',
                                    px: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: '#00A6A6',
                                        bgcolor: 'rgba(0, 166, 166, 0.05)'
                                    }
                                }}
                            >
                                Agendar Mentoria
                            </Button>
                            <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: 'rgba(0, 0, 0, 0.1)' }} />
                            <Button
                                color="inherit"
                                href="#blog"
                                sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '15px',
                                    color: '#333',
                                    textTransform: 'none',
                                    px: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: '#00A6A6',
                                        bgcolor: 'rgba(0, 166, 166, 0.05)'
                                    }
                                }}
                            >
                                Blog
                            </Button>
                            <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: 'rgba(0, 0, 0, 0.1)' }} />
                            <Button
                                color="inherit"
                                href="#treinamento"
                                sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '15px',
                                    color: '#333',
                                    textTransform: 'none',
                                    px: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: '#00A6A6',
                                        bgcolor: 'rgba(0, 166, 166, 0.05)'
                                    }
                                }}
                            >
                                Treinamento
                            </Button>
                        </Box>
                        <Box sx={{ width: 50 }} />
                    </Toolbar>
                </AppBar>

                <Box sx={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #00A6A6 0%, #008B8B 100%)',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* elementos decorativos de fundo animados */}
                    <Box sx={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-5%',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        filter: 'blur(60px)',
                        zIndex: 0
                    }} />

                    {/* primeira bola*/}
                    <Box sx={{
                        position: 'absolute',
                        left: '22%',
                        top: '200px',
                        width: '250px',
                        height: '250px',
                        background: 'linear-gradient(135deg, #FBAE36 0%, #f59e0b 100%)',
                        borderRadius: '50%',
                        zIndex: 1,
                        boxShadow: '0 20px 60px rgba(251, 174, 54, 0.4)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '20%',
                            left: '20%',
                            width: '40%',
                            height: '40%',
                            background: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '50%',
                            filter: 'blur(20px)'
                        }
                    }} />

                    {/* segunda bola*/}
                    <Box sx={{
                        position: 'absolute',
                        left: '40%',
                        top: '540px',
                        width: '250px',
                        height: '250px',
                        background: 'linear-gradient(135deg, #FBAE36 0%, #f59e0b 100%)',
                        borderRadius: '50%',
                        zIndex: 1,
                        boxShadow: '0 20px 60px rgba(251, 174, 54, 0.4)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '20%',
                            left: '20%',
                            width: '40%',
                            height: '40%',
                            background: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '50%',
                            filter: 'blur(20px)'
                        }
                    }} />

                    {/*estrelas decorativas */}
                    <AutoAwesomeIcon sx={{
                        position: 'absolute',
                        top: '15%',
                        left: '10%',
                        fontSize: 30,
                        color: 'rgba(251, 174, 54, 0.6)',
                        zIndex: 1
                    }} />
                    <AutoAwesomeIcon sx={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '15%',
                        fontSize: 25,
                        color: 'rgba(255, 255, 255, 0.4)',
                        zIndex: 1
                    }} />
                    <AutoAwesomeIcon sx={{
                        position: 'absolute',
                        top: '45%',
                        left: '8%',
                        fontSize: 20,
                        color: 'rgba(251, 174, 54, 0.5)',
                        zIndex: 1
                    }} />

                    {/* Imagem */}
                    <Box
                        component="img"
                        src={Imagem}
                        alt="Cheila Lamour"
                        sx={{
                            position: 'absolute',
                            left: '15%',
                            top: '150px',
                            width: '700px',
                            height: '700px',
                            objectFit: 'cover',
                            zIndex: 2,
                            filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.3))',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)'
                            }
                        }}
                    />

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginLeft: '45%',
                        zIndex: 3
                    }}>
                        {/* icone decorativo */}
                        <AutoAwesomeIcon sx={{
                            fontSize: 45,
                            color: '#FBAE36',
                            mb: 2,
                            filter: 'drop-shadow(0 4px 8px rgba(251, 174, 54, 0.3))'
                        }} />

                        <Typography
                            variant="h1"
                            sx={{
                                fontFamily: "'Lavishly Yours', cursive",
                                fontSize: '110px',
                                color: 'white',
                                textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                lineHeight: 1.1,
                                mb: 1
                            }}
                        >
                            Cheila Lamour
                        </Typography>

                        {/* retangulo blur */}
                        <Box sx={{
                            width: '220px',
                            height: '6px',
                            background: 'linear-gradient(90deg, #FBAE36 0%, rgba(251, 174, 54, 0) 100%)',
                            mt: 2,
                            ml: 2,
                            borderRadius: '3px',
                            boxShadow: '0 2px 10px rgba(251, 174, 54, 0.4)'
                        }}>
                        </Box>

                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "'Poppins', sans-serif",
                                color: 'white',
                                mt: 3,
                                ml: 2,
                                fontSize: '1.3rem',
                                fontWeight: 400,
                                letterSpacing: '1px',
                                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            Mentorias <span style={{ color: '#FBAE36', fontSize: '1.5rem', margin: '0 8px' }}>•</span> Escritora <span style={{ color: '#FBAE36', fontSize: '1.5rem', margin: '0 8px' }}>•</span> Treinamentos
                        </Typography>

                        {/* botoes */}
                        <Box sx={{ display: 'flex', gap: 3, mt: 5, ml: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<EmailIcon />}
                                sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    bgcolor: '#FBAE36',
                                    color: 'white',
                                    px: 4,
                                    py: 1.8,
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    borderRadius: '50px',
                                    textTransform: 'none',
                                    boxShadow: '0 8px 25px rgba(251, 174, 54, 0.4)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: '#e09d2f',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 12px 35px rgba(251, 174, 54, 0.5)'
                                    }
                                }}
                            >
                                Entre em contato
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={enviarDadosTeste} // função de teste do banco
                                startIcon={<MenuBookIcon />}
                                sx={{
                                    fontFamily: "'Poppins', sans-serif",
                                    borderColor: 'white',
                                    borderWidth: '2px',
                                    color: 'white',
                                    px: 4,
                                    py: 1.8,
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    borderRadius: '50px',
                                    textTransform: 'none',
                                    backdropFilter: 'blur(10px)',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#FBAE36',
                                        borderWidth: '2px',
                                        color: '#FBAE36',
                                        background: 'rgba(251, 174, 54, 0.1)',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)'
                                    }
                                }}
                            >
                                Minha história
                            </Button>
                        </Box>

                        {/* Badge decorativo */}
                        <Box sx={{
                            mt: 6,
                            ml: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            bgcolor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            px: 3,
                            py: 1.5,
                            borderRadius: '50px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                        }}>
                            <AutoAwesomeIcon sx={{ fontSize: 20, color: '#FBAE36' }} />
                            <Typography sx={{
                                fontFamily: "'Poppins', sans-serif",
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 500
                            }}>
                                +25 anos de experiência
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Hero;