import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School'; 
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function EditorSidebar({ activeTab, onChangeTab }) {
    const menuItems = [
        { id: 'home', label: 'Home / Início', icon: <HomeIcon /> },
        { id: 'about', label: 'Sobre Mim', icon: <PersonIcon /> },
        { id: 'services', label: 'Serviços & Treinamentos', icon: <SchoolIcon /> },
        { id: 'contact', label: 'Contato', icon: <ContactMailIcon /> },
    ];

    return (
        <List component="nav" sx={{ p: 1 }}>
            {menuItems.map((item) => (
                <ListItemButton
                    key={item.id}
                    selected={activeTab === item.id}
                    onClick={() => onChangeTab(item.id)}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&.Mui-selected': {
                            bgcolor: '#009688', // Verde Petróleo
                            color: 'white',
                            '&:hover': { bgcolor: '#00796b' },
                            '& .MuiListItemIcon-root': { color: 'white' }
                        }
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: activeTab === item.id ? 'white' : 'inherit' }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
                    {activeTab === item.id && <ArrowForwardIosIcon sx={{ fontSize: 12, color: 'white' }} />}
                </ListItemButton>
            ))}
        </List>
    );
}