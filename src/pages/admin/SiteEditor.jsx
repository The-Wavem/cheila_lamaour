import { useState } from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import EditorSidebar from '@/sections/admin/site-editor/EditorSidebar';
import HomeEditor from '@/sections/admin/site-editor/forms/HomeEditor';
import ServicesEditor from '@/sections/admin/site-editor/forms/ServicesEditor';
// Importe os outros forms (AboutEditor, ContactEditor) quando criar

export default function SiteEditor() {
  const [activeTab, setActiveTab] = useState('home');

  // Função para renderizar o form correto
  const renderActiveForm = () => {
    switch (activeTab) {
      case 'home': return <HomeEditor />;
      case 'services': return <ServicesEditor />;
      case 'about': return <Typography sx={{p:4}}>Editor da página Sobre (Em construção)</Typography>;
      case 'contact': return <Typography sx={{p:4}}>Editor da página Contato (Em construção)</Typography>;
      default: return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '85vh', gap: 3 }}>
      {/* Coluna da Esquerda: Navegação Espelhada */}
      <Paper sx={{ width: 280, flexShrink: 0, overflow: 'hidden' }} elevation={2}>
        <Box sx={{ p: 3, bgcolor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
          <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
            ESTRUTURA DO SITE
          </Typography>
        </Box>
        <EditorSidebar activeTab={activeTab} onChangeTab={setActiveTab} />
      </Paper>

      {/* Coluna da Direita: Área de Edição */}
      <Paper sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} elevation={2}>
        {/* O formulário renderizado assume o controle aqui */}
        {renderActiveForm()}
      </Paper>
    </Box>
  );
}