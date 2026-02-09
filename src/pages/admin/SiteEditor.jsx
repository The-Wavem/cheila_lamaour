import { useState } from 'react';
import { Box, Paper, Typography, Drawer, Button, useMediaQuery, useTheme, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import EditorSidebar from '@/sections/admin/site-editor/EditorSidebar';
import HomeEditor from '@/sections/admin/site-editor/forms/HomeEditor';
import ServicesEditor from '@/sections/admin/site-editor/forms/ServicesEditor';
import ContactEditor from '@/sections/admin/site-editor/forms/ContactEditor';
import AboutEditor from '@/sections/admin/site-editor/forms/AboutEditor';
import { useDirtyProtection } from '@/hooks/useDirtyProtection';
import UnsavedChangesModal from '@/components/ui/UnsavedChangesModal';
import ToastNotification from '@/components/ui/ToastNotification';
import { BRAND } from '@/theme/branding';

export default function SiteEditor() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detecta se é mobile/tablet
  
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Estado para o menu mobile
  const [isDirty, setIsDirty] = useState(false);
  
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);

  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

  useDirtyProtection(isDirty);

  // --- LÓGICA DE NAVEGAÇÃO ---
  const handleTabRequest = (newTabId) => {
    setSidebarOpen(false); // <--- Fecha o menu mobile IMEDIATAMENTE ao clicar

    if (activeTab === newTabId) {
        return;
    }

    if (isDirty) {
      setPendingTab(newTabId);
      setShowUnsavedModal(true);
    } else {
      setActiveTab(newTabId);
    }
  };

  const handleConfirmDiscard = () => {
    setIsDirty(false);
    setShowUnsavedModal(false);
    if (pendingTab) {
      setActiveTab(pendingTab);
      setPendingTab(null);
    }
  };

  const handleSaveSuccess = () => {
    setIsDirty(false);
    setToast({ open: true, message: 'Alterações salvas com sucesso!', type: 'success' });
  };

  const renderActiveForm = () => {
    const props = { setIsDirty, onSaveSuccess: handleSaveSuccess };

    switch (activeTab) {
      case 'home': return <HomeEditor {...props} />;
      case 'services': return <ServicesEditor {...props} />;
      case 'contact': return <ContactEditor {...props} />;
      case 'about': return <AboutEditor {...props} />;
      default: return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', gap: 3 }}>
      <UnsavedChangesModal 
        open={showUnsavedModal} 
        onContinueEditing={() => setShowUnsavedModal(false)} 
        onDiscardChanges={handleConfirmDiscard} 
      />
      <ToastNotification 
        open={toast.open} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, open: false })} 
      />

      {/* --- MENU MOBILE (Layout Orgânico e Compacto) --- */}
      {isMobile && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 1.5, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
              Editando página:
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: BRAND.primary, lineHeight: 1.2, textTransform: 'capitalize' }}>
              {activeTab === 'home' ? 'Início' : 
               activeTab === 'services' ? 'Serviços' : 
               activeTab === 'contact' ? 'Contato' : 
               activeTab === 'about' ? 'Sobre' : activeTab}
            </Typography>
          </Box>
          <Button 
            startIcon={<MenuIcon />} 
            onClick={() => setSidebarOpen(true)}
            size="small"
            variant="outlined"
            sx={{ 
              borderRadius: 2, 
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': { borderColor: BRAND.primary, bgcolor: 'action.hover' }
            }}
          >
            Menu
          </Button>
        </Paper>
      )}

      <Box sx={{ display: 'flex', gap: 3, flexGrow: 1, position: 'relative' }}>
        
        {/* --- SIDEBAR DESKTOP (Fixa) --- */}
        {!isMobile && (
          <Paper sx={{ width: 280, flexShrink: 0, overflow: 'hidden', height: 'fit-content' }} elevation={2}>
            <Box sx={{ p: 3, bgcolor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
              <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                ESTRUTURA DO SITE
              </Typography>
            </Box>
            <EditorSidebar activeTab={activeTab} onChangeTab={handleTabRequest} />
          </Paper>
        )}

        {/* --- SIDEBAR MOBILE (Drawer) --- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          PaperProps={{ sx: { width: 280 } }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: BRAND.primary, color: 'white' }}>
            <Typography fontWeight="bold">Navegação</Typography>
            <IconButton onClick={() => setSidebarOpen(false)} sx={{ color: 'white' }}><CloseIcon /></IconButton>
          </Box>
          <EditorSidebar activeTab={activeTab} onChangeTab={handleTabRequest} />
        </Drawer>

        {/* --- ÁREA DE EDIÇÃO --- */}
        <Paper sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '600px' }} elevation={2}>
          {renderActiveForm()}
        </Paper>
      </Box>
    </Box>
  );
}