import { useState } from 'react';
import { 
  Box, TextField, Typography, Button, Divider, Stack, 
  Accordion, AccordionSummary, AccordionDetails, IconButton, Paper
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function HomeEditor() {
  // Estado para os Depoimentos (Lista Dinâmica)
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Nome de exemplo', text: 'A mentoria com a Cheila foi um divisor de águas na minha carreira...' }
  ]);

  const handleAddTestimonial = () => {
    setTestimonials([...testimonials, { id: Date.now(), name: '', text: '' }]);
  };

  const handleRemoveTestimonial = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const handleTestimonialChange = (id, field, value) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Topo Fixo */}
      <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white' }}>
        <Box>
          <Typography variant="h6" fontWeight="bold">Editando: Página Inicial</Typography>
          <Typography variant="caption" color="text.secondary">Todos os textos da Home em um só lugar.</Typography>
        </Box>
        <Button variant="contained" startIcon={<SaveIcon />} sx={{ bgcolor: '#009688' }}>
          Salvar Alterações
        </Button>
      </Box>

      {/* Área de Scroll */}
      <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1, bgcolor: '#f4f4f4' }}>

        {/* --- 1. SEÇÃO HERO (CAPA) --- */}
        <Accordion defaultExpanded elevation={0} sx={{ mb: 2, borderRadius: '8px !important' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">1. SEÇÃO HERO (TOPO)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              A primeira dobra do site. Mantenha o título curto e impactante.
            </Typography>
            <Stack spacing={3}>
              <TextField label="TÍTULO PRINCIPAL (HEADLINE)" fullWidth defaultValue="Liderança Feminina e Gestão Humanizada" />
              <TextField label="SUBTÍTULO" fullWidth multiline rows={2} defaultValue="Mentora, Palestrante, Especialista em Liderança Feminina..." />
              <Stack direction="row" spacing={2}>
                <TextField label="TEXTO DO BOTÃO" fullWidth defaultValue="Entre em contato" />
                <TextField label="LINK DO BOTÃO" fullWidth defaultValue="/contato" />
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* --- 2. SEÇÃO SOBRE (QUEM É CHEILA) --- */}
        <Accordion elevation={0} sx={{ mb: 2, borderRadius: '8px !important' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">2. SEÇÃO "QUEM É CHEILA?"</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <TextField label="TÍTULO DA SEÇÃO" fullWidth defaultValue="Minha História" />
              <TextField 
                label="FRASE DE DESTAQUE (QUOTE)" 
                fullWidth 
                defaultValue="É um prazer poder apresentar meu trabalho a você!" 
                helperText="Aparece em destaque antes do texto principal."
              />
              <TextField 
                label="TEXTO DE APRESENTAÇÃO" 
                fullWidth 
                multiline 
                rows={10} 
                defaultValue={`Sou Cheila Lamour, Mentora, Palestrante, Especialista em Liderança Feminina.

Mãe, esposa, Engenheira Civil com 25 anos de experiência organizacional e mais de 150 liderados. MBA em Liderança Humanizada. Analista Comportamental, certificação em Life, Leader, Executive & Business Coach.

Aliando o conhecimento técnico às habilidades para lidar com gente, descobri meu propósito: ajudar outras pessoas a destravarem seu potencial.`}
                helperText="Use 'Enter' para criar novos parágrafos. O site respeitará essas quebras."
              />
              <TextField label="TEXTO DO BOTÃO" fullWidth defaultValue="Minha História Completa" />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* --- 3. SEÇÃO DESTAQUE DE SERVIÇOS --- */}
        <Accordion elevation={0} sx={{ mb: 2, borderRadius: '8px !important' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">3. DESTAQUE DE SERVIÇOS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Aqui você edita apenas os títulos gerais. Os cards de serviços são puxados automaticamente da aba "Serviços".
            </Typography>
            <Stack spacing={3}>
              <TextField label="TÍTULO DA SEÇÃO" fullWidth defaultValue="Serviços Prestados" />
              <TextField label="SUBTÍTULO DE IMPACTO" fullWidth defaultValue="Você é o seu maior investimento" />
              <TextField label="TEXTO DO LINK DE RODAPÉ" fullWidth defaultValue="Ver todos os serviços e treinamentos" />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* --- 4. SEÇÃO DEPOIMENTOS (REPEATER) --- */}
        <Accordion elevation={0} sx={{ mb: 2, borderRadius: '8px !important' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">4. DEPOIMENTOS (CARROSSEL)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField label="TÍTULO DA SEÇÃO" fullWidth defaultValue="Depoimentos" sx={{ mb: 3 }} />
            
            <Stack spacing={2}>
              {testimonials.map((item, index) => (
                <Paper key={item.id} variant="outlined" sx={{ p: 2, bgcolor: '#fafafa' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="caption" fontWeight="bold">DEPOIMENTO #{index + 1}</Typography>
                    <IconButton size="small" color="error" onClick={() => handleRemoveTestimonial(item.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Stack spacing={2}>
                    <TextField 
                      label="O que a pessoa falou?" 
                      multiline 
                      rows={3} 
                      fullWidth 
                      value={item.text} 
                      onChange={(e) => handleTestimonialChange(item.id, 'text', e.target.value)}
                      placeholder="A mentoria foi um divisor de águas..."
                    />
                    <TextField 
                      label="Nome do Cliente" 
                      fullWidth 
                      size="small" 
                      value={item.name} 
                      onChange={(e) => handleTestimonialChange(item.id, 'name', e.target.value)}
                    />
                  </Stack>
                </Paper>
              ))}
              
              <Button 
                startIcon={<AddCircleIcon />} 
                onClick={handleAddTestimonial}
                sx={{ alignSelf: 'flex-start', color: '#C5A669' }}
              >
                Adicionar Novo Depoimento
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* --- 5. SEÇÃO CONTATO (RODAPÉ) --- */}
        <Accordion elevation={0} sx={{ borderRadius: '8px !important' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">5. CHAMADA PARA CONTATO (FOOTER)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
              <TextField label="TÍTULO" fullWidth defaultValue="Entre em contato" />
              <TextField label="SUBTÍTULO" fullWidth defaultValue="Seu próximo passo começa aqui!" />
              <Divider />
              <Typography variant="caption" color="text.secondary">Informações de Contato (Globais)</Typography>
              <Stack direction="row" spacing={2}>
                <TextField label="TELEFONE/WHATSAPP" fullWidth defaultValue="(41) 9 9999-9999" />
                <TextField label="E-MAIL DE CONTATO" fullWidth defaultValue="contato@cheilalamour.com.br" />
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>

      </Box>
    </Box>
  );
}