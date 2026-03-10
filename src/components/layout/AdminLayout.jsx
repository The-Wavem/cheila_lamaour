import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Toolbar, AppBar, IconButton, Avatar, Typography, Tooltip, Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import WebIcon from '@mui/icons-material/Web'; 
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { signOutAdmin } from '@services/auth';
import { useAuth } from '@hooks/useAuth';

const drawerWidth = 260; // Largura quando aberto
const collapsedWidth = 70; // Largura quando fechado

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false); // Estado para o menu mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado Desktop

    const menuItems = [
        { text: 'Visão Geral', icon: <DashboardIcon />, path: '/admin' },
        { text: 'Blog & Artigos', icon: <ArticleIcon />, path: '/admin/blog' },
        { text: 'Leads (Contatos)', icon: <PeopleIcon />, path: '/admin/leads' },
        { text: 'Editor do Site', icon: <WebIcon />, path: '/admin/editor' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSidebarCollapse = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNavigation = (path) => {
        setMobileOpen(false); // Fecha o menu mobile IMEDIATAMENTE
        navigate(path);
    };

    const handleLogout = async () => {
        await signOutAdmin();
        setMobileOpen(false);
        navigate('/admin/login', { replace: true });
    };

    const drawerContent = (
        <Box sx={{ height: '100%', bgcolor: '#009688', color: 'white', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Header do Menu */}
            <Toolbar sx={{ justifyContent: 'space-between', px: [1, 2] }}>
                {/* CORREÇÃO 1: Título sempre visível no Mobile (xs), condicional no Desktop (sm) */}
                <Typography 
                    variant="subtitle1" 
                    fontWeight="bold" 
                    noWrap
                    sx={{
                        display: { xs: 'block', sm: isSidebarOpen ? 'block' : 'none' }
                    }}
                >
                    Cheila Lamour
                </Typography>
                
                <IconButton onClick={handleSidebarCollapse} sx={{ color: 'white', display: { xs: 'none', sm: 'flex' } }}>
                    {isSidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
            </Toolbar>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

            <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: 'white' }}>
                    {(user?.email || 'A').charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ display: { xs: 'block', sm: isSidebarOpen ? 'block' : 'none' }, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight="bold" noWrap>
                        Acesso autorizado
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.85 }} noWrap>
                        {user?.email || 'Administrador'}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

            <List sx={{ flexGrow: 1, mt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                        <Tooltip title={isSidebarOpen ? "" : item.text} placement="right"> 
                            {/* Dica: Tooltip vazia se menu aberto, texto se fechado (só desktop precisa disso) */}
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)} // <--- ALTERADO: Usa a nova função
                                sx={{
                                    minHeight: 48,
                                    // CORREÇÃO 2: Alinhamento sempre inicial no Mobile
                                    justifyContent: { xs: 'initial', sm: isSidebarOpen ? 'initial' : 'center' },
                                    px: 2.5,
                                    bgcolor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        // CORREÇÃO 3: Margem sempre 2 no Mobile
                                        mr: { xs: 2, sm: isSidebarOpen ? 2 : 'auto' },
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    // CORREÇÃO 4: Opacidade sempre 1 no Mobile
                                    sx={{ 
                                        opacity: { xs: 1, sm: isSidebarOpen ? 1 : 0 }, 
                                        whiteSpace: 'nowrap' 
                                    }}
                                />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>

            {/* Botão Sair (Fixo embaixo) */}
            <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={!isSidebarOpen ? "Sair" : ""} placement="right">
                        <ListItemButton 
                            onClick={handleLogout}
                            sx={{ 
                                minHeight: 48, 
                                justifyContent: { xs: 'initial', sm: isSidebarOpen ? 'initial' : 'center' }, 
                                px: 2.5 
                            }}
                        >
                            <ListItemIcon 
                                sx={{ 
                                    minWidth: 0, 
                                    mr: { xs: 2, sm: isSidebarOpen ? 2 : 'auto' }, 
                                    justifyContent: 'center', 
                                    color: '#ffcccb' 
                                }}
                            >
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Sair" 
                                sx={{ 
                                    opacity: { xs: 1, sm: isSidebarOpen ? 1 : 0 }, 
                                    color: '#ffcccb' 
                                }} 
                            />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* App Bar Superior (Só Mobile) */}
            <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${isSidebarOpen ? drawerWidth : collapsedWidth}px)` }, ml: { sm: `${isSidebarOpen ? drawerWidth : collapsedWidth}px` }, bgcolor: 'white', color: '#333', boxShadow: 1, transition: 'width 0.3s, margin 0.3s', display: { sm: 'none' } }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">Painel Admin</Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar (Mobile - Drawer Temporário) */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
            >
                {drawerContent}
            </Drawer>

            {/* Sidebar (Desktop - Variante Persistente com Largura Dinâmica) */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: isSidebarOpen ? drawerWidth : collapsedWidth,
                    flexShrink: 0, 
                    transition: 'width 0.3s', 
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: isSidebarOpen ? drawerWidth : collapsedWidth,
                        transition: 'width 0.3s',
                        overflowX: 'hidden'
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>

            {/* Conteúdo Principal */}
            <Box component="main" sx={{
                flexGrow: 1,
                p: 3,
                width: '100%', // Ocupar o espaço restante disponibilizado pelo Flexbox
                minHeight: '100vh',
                bgcolor: '#f4f4f4',
                overflowX: 'hidden' // Prevenir scroll horizontal indesejado
            }}>
                {/* Espaçador apenas no mobile */}
                <Toolbar sx={{ display: { sm: 'none' } }} />
                <Outlet />
            </Box>
        </Box>
    );
}