import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import EditorSidebar from '@/sections/admin/site-editor/EditorSidebar';
import HomeEditor from '@/sections/admin/site-editor/forms/HomeEditor';
import ServicesEditor from '@/sections/admin/site-editor/forms/ServicesEditor';
import ContactEditor from '@/sections/admin/site-editor/forms/ContactEditor';
import AboutEditor from '@/sections/admin/site-editor/forms/AboutEditor';
import { useDirtyProtection } from '@/hooks/useDirtyProtection';
import UnsavedChangesModal from '@/components/ui/UnsavedChangesModal';
import ToastNotification from '@/components/ui/ToastNotification';

export default function SiteEditor() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDirty, setIsDirty] = useState(false);
  
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);

  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

  useDirtyProtection(isDirty);

  const handleTabRequest = (newTabId) => {
    if (activeTab === newTabId) return;

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

  const handleStay = () => {
    setShowUnsavedModal(false);
    setPendingTab(null);
  };

  const handleSaveSuccess = () => {
    setIsDirty(false);
    setToast({ open: true, message: 'Alterações salvas com sucesso!', type: 'success' });
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
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
    <Box sx={{ display: 'flex', minHeight: '85vh', gap: 3 }}>
      <UnsavedChangesModal 
        open={showUnsavedModal} 
        onContinueEditing={handleStay} 
        onDiscardChanges={handleConfirmDiscard} 
      />
      <ToastNotification 
        open={toast.open} 
        message={toast.message} 
        type={toast.type} 
        onClose={handleToastClose} 
      />
      <Paper sx={{ width: 280, flexShrink: 0, overflow: 'hidden' }} elevation={2}>
        <Box sx={{ p: 3, bgcolor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
          <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
            ESTRUTURA DO SITE
          </Typography>
        </Box>
        <EditorSidebar activeTab={activeTab} onChangeTab={handleTabRequest} />
      </Paper>
      <Paper sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} elevation={2}>
        {renderActiveForm()}
      </Paper>
    </Box>
  );
}