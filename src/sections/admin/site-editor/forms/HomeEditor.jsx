import { useState } from 'react';
import {
  Box, TextField, Typography, Button, Divider, Stack,
  Accordion, AccordionSummary, AccordionDetails, IconButton, Paper
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const BRAND = {
  teal: '#009688',
  gold: '#C5A669',
  bg: '#F4F6F8',
  lightGold: '#FDFCF5'
};

export default function HomeEditor({ setIsDirty, onSaveSuccess }) {
  // --- LÓGICA DE ESTADO (Herdada e Mantida) ---
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Nome de exemplo', text: 'A mentoria com a Cheila foi um divisor de águas na minha carreira...' }
  ]);

  const handleChange = () => {
    if (setIsDirty) setIsDirty(true);
  };

  const handleSave = () => {
    console.log("Salvando dados da Home...");
    // Aqui virá a lógica do Firebase
    
    if (setIsDirty) setIsDirty(false);
    onSaveSuccess && onSaveSuccess();
  };

  const handleAddTestimonial = () => {
    handleChange();
    setTestimonials([...testimonials, { id: Date.now(), name: '', text: '' }]);
  };

  const handleRemoveTestimonial = (id) => {
    handleChange();
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const handleTestimonialChange = (id, field, value) => {
    handleChange();
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  // --- ESTILOS CUSTOMIZADOS ---
  const accordionStyle = {
    elevation: 0,
    sx: {
      mb: 2, borderRadius: '8px !important', border: '1px solid #eee',
      '&:before': { display: 'none' }, // Remove linha padrão do MUI
      '&.Mui-expanded': { borderLeft: `4px solid ${BRAND.gold}`, bgcolor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: BRAND.bg }}>
      
      {/* TOPO FIXO */}
      <Box sx={{ 
        p: { xs: 2, sm: 3 }, // Padding menor no mobile
        borderBottom: '1px solid #e0e0e0', 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, // Empilha no mobile
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' }, // Botão esticado no mobile
        gap: { xs: 2, sm: 0 },
        bgcolor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <Box>
          <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold', color: '#333' }}>
            Editando: Página Inicial
          </Typography>
          <Typography variant="caption" color="text.secondary">Gerencie os textos e seções da Home.</Typography>
        </Box>
        <Button 
          variant="contained" startIcon={<SaveIcon />} onClick={handleSave}
          sx={{ bgcolor: BRAND.teal, fontWeight: 'bold', '&:hover': { bgcolor: '#00796b' } }}
          fullWidth={false} // Apenas para resetar prop se necessário
        >
          Salvar Alterações
        </Button>
      </Box>

      {/* ÁREA DE CONTEÚDO SCROLLÁVEL */}
      <Box sx={{ p: { xs: 2, md: 4 }, overflowY: 'auto', flexGrow: 1 }}>

        {/* --- 1. SEÇÃO HERO --- */}
        <Accordion defaultExpanded {...accordionStyle}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
            <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>1. SEÇÃO HERO (TOPO)</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: BRAND.lightGold, p: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              A primeira impressão é a que fica. Defina a manchete principal do site.
            </Typography>
            <Stack spacing={3}>
              <TextField 
                label="TÍTULO PRINCIPAL (HEADLINE)" fullWidth variant="filled"
                InputProps={{ disableUnderline: true, style: { fontSize: '1.2rem', fontWeight: 'bold' } }}
                onChange={handleChange}
                defaultValue="Liderança Feminina e Gestão Humanizada"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <TextField 
                label="SUBTÍTULO" fullWidth multiline rows={2} variant="filled" 
                defaultValue="Mentora, Palestrante, Especialista em Liderança Feminina..."
                InputProps={{ disableUnderline: true }} sx={{ bgcolor: 'white', borderRadius: 1 }} onChange={handleChange} 
              />
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField label="Texto do Botão" fullWidth size="small" defaultValue="Entre em contato" sx={{ bgcolor: 'white' }} onChange={handleChange} />
                <TextField label="Link do Botão" fullWidth size="small" defaultValue="/contato" sx={{ bgcolor: 'white' }} onChange={handleChange} />
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* --- 2. SEÇÃO SOBRE --- */}
        <Accordion {...accordionStyle}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
            <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>2. QUEM É CHEILA?</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Stack spacing={3}>
              <TextField 
                label="TÍTULO DA SEÇÃO" fullWidth variant="outlined" size="small" 
                defaultValue="Minha História" onChange={handleChange} 
              />
              <TextField
                label="FRASE DE DESTAQUE (QUOTE)" fullWidth variant="filled"
                defaultValue="É um prazer poder apresentar meu trabalho a você!"
                InputProps={{ disableUnderline: true, style: { fontStyle: 'italic', color: BRAND.gold } }}
                sx={{ bgcolor: BRAND.lightGold }}
                onChange={handleChange}
              />
              <TextField 
                label="TEXTO DA BIO" fullWidth multiline rows={8} variant="outlined" 
                placeholder="Escreva sobre sua trajetória..."
                defaultValue={`Sou Cheila Lamour, Mentora, Palestrante, Especialista em Liderança Feminina...\n\nAliando o conhecimento técnico às habilidades para lidar com gente, descobri meu propósito.`}
                onChange={handleChange} 
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* --- 3. SERVIÇOS --- */}
        <Accordion {...accordionStyle}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
            <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>3. DESTAQUE DE SERVIÇOS</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Edite os títulos da seção. Os cards são automáticos.
            </Typography>
            <Stack spacing={3}>
              <TextField label="Título da Seção" fullWidth size="small" defaultValue="Serviços Prestados" onChange={handleChange} />
              <TextField label="Subtítulo de Impacto" fullWidth size="small" defaultValue="Você é o seu maior investimento" onChange={handleChange} />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* --- 4. DEPOIMENTOS --- */}
        <Accordion {...accordionStyle}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
            <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>4. DEPOIMENTOS</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Stack spacing={2}>
              {testimonials.map((item, index) => (
                <Paper key={item.id} sx={{ p: 2, bgcolor: '#FAFAFA', border: '1px dashed #ccc', position: 'relative' }} elevation={0}>
                   <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" fontWeight="bold" color={BRAND.teal}>DEPOIMENTO #{index+1}</Typography>
                      <IconButton size="small" color="error" onClick={() => handleRemoveTestimonial(item.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                   </Stack>
                   <Stack spacing={2} sx={{ mt: 1 }}>
                     <TextField 
                        fullWidth multiline rows={2} 
                        placeholder="O que o cliente disse?" 
                        variant="outlined" size="small"
                        value={item.text}
                        onChange={(e) => handleTestimonialChange(item.id, 'text', e.target.value)}
                        sx={{ bgcolor: 'white' }}
                     />
                     <TextField 
                        fullWidth placeholder="Nome do Cliente" 
                        variant="standard" size="small"
                        value={item.name}
                        onChange={(e) => handleTestimonialChange(item.id, 'name', e.target.value)}
                     />
                   </Stack>
                </Paper>
              ))}
              <Button 
                startIcon={<AddCircleIcon />} 
                onClick={handleAddTestimonial}
                sx={{ color: BRAND.gold, fontWeight: 'bold', alignSelf: 'flex-start' }}
              >
                Adicionar Depoimento
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* --- 5. RODAPÉ (CONTATO) --- */}
        <Accordion {...accordionStyle}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: BRAND.gold }} />}>
            <Typography variant="subtitle1" fontWeight="bold" color={BRAND.teal}>5. RODAPÉ DE CONTATO</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
             <Stack spacing={3}>
                <TextField label="Título Final" fullWidth size="small" defaultValue="Entre em contato" onChange={handleChange} />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="Telefone/WhatsApp" fullWidth size="small" defaultValue="(41) 9 9999-9999" onChange={handleChange} />
                  <TextField label="E-mail" fullWidth size="small" defaultValue="contato@cheilalamour.com.br" onChange={handleChange} />
                </Stack>
             </Stack>
          </AccordionDetails>
        </Accordion>

      </Box>
    </Box>
  );
}