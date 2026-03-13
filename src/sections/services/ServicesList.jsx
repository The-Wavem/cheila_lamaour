import { useState } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    Typography
} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { BRAND } from '../../theme/branding.js';

export default function ServicesList({ services = [] }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (_, newValue) => {
        setActiveTab(newValue);
    };

    if (!services.length) {
        return null;
    }

    const safeTabIndex = Math.min(activeTab, services.length - 1);
    const activeService = services[safeTabIndex];

    return (
        <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: BRAND.background }}>
            <Container maxWidth="lg">
                <Box id="trilhas" sx={{ scrollMarginTop: 120 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 3, md: 4 } }}>
                        <Tabs
                            value={safeTabIndex}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            sx={{
                                '& .MuiTabs-indicator': {
                                    height: 3,
                                    borderRadius: '3px',
                                    backgroundColor: BRAND.secondary
                                },
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    color: BRAND.textSecondary,
                                    minHeight: 52,
                                    px: { xs: 1.5, md: 2.5 }
                                },
                                '& .MuiTab-root.Mui-selected': {
                                    color: BRAND.primary
                                }
                            }}
                        >
                            {services.map((service, index) => (
                                <Tab key={service.id || index} label={service.label || service.title || `Servico ${index + 1}`} />
                            ))}
                        </Tabs>
                    </Box>

                    <Paper
                        elevation={0}
                        sx={{
                            bgcolor: 'white',
                            borderRadius: 3,
                            border: `1px solid ${BRAND.border}`,
                            p: { xs: 3, md: 6 }
                        }}
                    >
                        <Grid container spacing={4} alignItems="stretch">
                            <Grid size={{ xs: 12, md: 5 }}>
                                <Box
                                    component="img"
                                    src={activeService.image}
                                    alt={activeService.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        minHeight: { xs: 240, md: 360 },
                                        borderRadius: 2,
                                        objectFit: 'cover'
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 7 }}>
                                <Typography
                                    sx={{
                                        fontFamily: BRAND.fontFamilyHeader,
                                        fontSize: { xs: '1.9rem', md: '2.5rem' },
                                        lineHeight: 1.15,
                                        color: BRAND.textPrimary,
                                        mb: 2
                                    }}
                                >
                                    {activeService.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: BRAND.textSecondary,
                                        lineHeight: 1.8,
                                        mb: 2.5
                                    }}
                                >
                                    {activeService.description}
                                </Typography>

                                <List sx={{ p: 0, mb: 2.5 }}>
                                    {(activeService.topics || []).map((topic) => (
                                        <ListItem key={topic} disableGutters sx={{ alignItems: 'flex-start', py: 0.5 }}>
                                            <ListItemIcon sx={{ minWidth: 30, mt: 0.2 }}>
                                                <CheckRoundedIcon sx={{ color: BRAND.secondary, fontSize: 20 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={topic}
                                                primaryTypographyProps={{
                                                    color: BRAND.textPrimary,
                                                    lineHeight: 1.7
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>

                                <Button
                                    component="a"
                                    href="#conversa"
                                    variant="contained"
                                    sx={{
                                        mt: 1,
                                        bgcolor: BRAND.primary,
                                        color: BRAND.paper,
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        px: 3,
                                        py: 1.2,
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor: BRAND.primaryDark
                                        }
                                    }}
                                >
                                    {activeService.buttonText || 'Tenho interesse neste servico'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}