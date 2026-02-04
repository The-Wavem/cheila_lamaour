import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Toolbar, AppBar, IconButton, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 260;

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Itens do Menu (Fácil de adicionar mais depois)
    const menuItems = [
        { text: 'Visão Geral', icon: <DashboardIcon />, path: '/admin' },
        { text: 'Blog & Artigos', icon: <ArticleIcon />, path: '/admin/blog' },
        { text: 'Leads (Contatos)', icon: <PeopleIcon />, path: '/admin/leads' },
    ];

    const drawerContent = (
        <Box sx={{ height: '100%', bgcolor: '#009688', color: 'white' }}> {/* Fundo Verde Petróleo */}
            <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    Cheila Lamour
                </Typography>
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            sx={{
                                bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent', // Destaque no item ativo
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                            }}
                        >
                            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {/* Botão Sair separado visualmente */}
                <ListItem disablePadding sx={{ mt: 4 }}>
                    <ListItemButton onClick={() => alert("Função de Logout aqui")}>
                        <ListItemIcon sx={{ color: '#ffcccb' }}><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Sair" sx={{ color: '#ffcccb' }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* App Bar Superior (Mobile) */}
            <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, bgcolor: 'white', color: '#333', boxShadow: 1 }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Painel Administrativo
                    </Typography>
                    <Avatar sx={{ bgcolor: '#C5A669' }}>CL</Avatar> {/* Avatar da Cheila */}
                </Toolbar>
            </AppBar>

            {/* Sidebar (Drawer) */}
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(!mobileOpen)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
                    {drawerContent}
                </Drawer>
                <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
                    {drawerContent}
                </Drawer>
            </Box>

            {/* Conteúdo das Páginas */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh', bgcolor: '#f4f4f4' }}>
                <Toolbar /> {/* Espaço para a AppBar não cobrir o conteúdo */}
                <Outlet /> {/* AQUI É ONDE AS PÁGINAS (DASHBOARD, BLOG) SERÃO RENDERIZADAS */}
            </Box>
        </Box>
    );
}