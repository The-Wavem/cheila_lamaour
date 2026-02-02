import { Box, Container, Grid, Typography, Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Ícone de check

export default function ServicesList() {
    return (
        <Box sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>

                    {/* --- BLOCO 1: Desenvolvimento Pessoal --- */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card sx={{ height: '100%', borderTop: '4px solid #C5A669', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" sx={{ color: '#009688', fontWeight: 'bold', mb: 3 }}>
                                    Desenvolvimento Pessoal
                                </Typography>

                                <List>
                                    {['Mapeamento de perfil comportamental', 'Mentalidade e atitude', 'Conhecimento x competência', 'Psicologia dos relacionamentos', 'Teoria dos Estados de Poder'].map((item) => (
                                        <ListItem key={item} disableGutters>
                                            <ListItemIcon sx={{ minWidth: 35 }}>
                                                <CheckCircleIcon sx={{ color: '#C5A669' }} fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary={item} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>

                            <Box sx={{ p: 2 }}>
                                <Button variant="contained" fullWidth sx={{ backgroundColor: '#009688', '&:hover': { backgroundColor: '#00796b' } }}>
                                    Solicitar
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* --- BLOCO 2: Desenvolvimento Profissional --- */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card sx={{ height: '100%', borderTop: '4px solid #C5A669', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" sx={{ color: '#009688', fontWeight: 'bold', mb: 3 }}>
                                    Desenvolvimento Profissional
                                </Typography>

                                <List>
                                    {['Mapeamento de perfil comportamental', 'Mentalidade e atitude', 'Conhecimento x competência', 'Psicologia dos relacionamentos', 'Teoria dos Estados de Poder'].map((item) => (
                                        <ListItem key={item} disableGutters>
                                            <ListItemIcon sx={{ minWidth: 35 }}>
                                                <CheckCircleIcon sx={{ color: '#C5A669' }} fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary={item} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>

                            <Box sx={{ p: 2 }}>
                                <Button variant="contained" fullWidth sx={{ backgroundColor: '#009688', '&:hover': { backgroundColor: '#00796b' } }}>
                                    Solicitar
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* --- BLOCO 3: Mentorias --- */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card sx={{ height: '100%', borderTop: '4px solid #C5A669', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" sx={{ color: '#009688', fontWeight: 'bold', mb: 3 }}>
                                    Mentorias
                                </Typography>

                                <List>
                                    {['Mapeamento de perfil comportamental', 'Mentalidade e atitude', 'Conhecimento x competência', 'Psicologia dos relacionamentos', 'Leitura do "Código de barras de gente"'].map((item) => (
                                        <ListItem key={item} disableGutters>
                                            <ListItemIcon sx={{ minWidth: 35 }}>
                                                <CheckCircleIcon sx={{ color: '#C5A669' }} fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary={item} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>

                            <Box sx={{ p: 2 }}>
                                <Button variant="contained" fullWidth sx={{ backgroundColor: '#009688', '&:hover': { backgroundColor: '#00796b' } }}>
                                    Solicitar
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}