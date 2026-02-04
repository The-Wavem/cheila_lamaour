import { Box, Typography } from '@mui/material';
import BlogList from '@/sections/admin/blog/BlogList';

export default function BlogManager() {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Blog & Conteúdo
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Visualize, edite ou exclua as postagens do site.
                </Typography>
            </Box>

            {/* A Seção de Listagem entra aqui */}
            <BlogList />
        </Box>
    );
}