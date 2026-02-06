import { useState } from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import EditorSidebar from '@/sections/admin/site-editor/EditorSidebar';
import HomeEditor from '@/sections/admin/site-editor/forms/HomeEditor';
import ServicesEditor from '@/sections/admin/site-editor/forms/ServicesEditor';
import ContactEditor from '@/sections/admin/site-editor/forms/ContactEditor';
import AboutEditor from '@/sections/admin/site-editor/forms/AboutEditor';
import { useDirtyProtection } from '../../hooks/useDirtyProtection';

export default function SiteEditor() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDirty, setIsDirty] = useState(false);

  // Ativa a proteção do navegador (fechar aba)
  useDirtyProtection(isDirty);

  // Função Interceptadora: Só troca de aba se confirmar
  const handleTabChange = (newTabId) => {
    if (activeTab === newTabId) return;

    if (isDirty) {
      const confirmLeave = window.confirm(
        'Você tem alterações não salvas! Se mudar de aba agora, perderá tudo. Deseja sair mesmo assim?'
      );
      if (!confirmLeave) return; // Cancela a troca

      // Se confirmou, limpa o estado e troca
      setIsDirty(false);
    }

    setActiveTab(newTabId);
  };

  const renderActiveForm = () => {
    const props = { setIsDirty, isDirty };

    switch (activeTab) {
      case 'home': return <HomeEditor {...props} />;
      case 'services': return <ServicesEditor {...props} />;
      case 'about': return <AboutEditor {...props} />;
      case 'contact': return <ContactEditor {...props} />;
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
        {/* Usamos handleTabChange aqui em vez de setActiveTab direto */}
        <EditorSidebar activeTab={activeTab} onChangeTab={handleTabChange} />
      </Paper>

      {/* Coluna da Direita: Área de Edição */}
      <Paper sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} elevation={2}>
        {/* O formulário renderizado assume o controle aqui */}
        {renderActiveForm()}
      </Paper>
    </Box>
  );
}