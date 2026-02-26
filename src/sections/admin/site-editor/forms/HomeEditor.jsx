import { useEffect, useState } from 'react';
import {
  Box, TextField, Typography, Button, Divider, Stack,
  Accordion, AccordionSummary, AccordionDetails, IconButton, Paper
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getHomeFullData, updateHomeData } from '@/services/homeAPI';

const BRAND = {
  teal: '#009688',
  gold: '#C5A669',
  bg: '#F4F6F8',
  lightGold: '#FDFCF5'
};

export default function HomeEditor({ setIsDirty, onSaveSuccess }) {
  const DEFAULT_FORM = {
    hero: {
      headline: 'Cheila Lamour',
      subheadline: 'Mentorias - Escritora - Treinamentos',
      cta_text: 'Entre em contato',
      cta_link: '/contato',
      secondary_cta_text: 'Minha história',
      secondary_cta_link: '#sobre',
      experienceText: '+25 anos de experiência'
    },
    about: {
      quote: 'É um prazer poder apresentar meu trabalho a você!',
      description:
        'Sou Cheila Lamour, Mentora, Palestrante, Especialista em Liderança Feminina.\n\nMãe, esposa, Engenheira Civil com 25 anos de experiência organizacional e mais de 150 liderados. MBA em Liderança Humanizada. Analista Comportamental, certificação em Life, Leader, Executive & Business Coach.\n\nAliando o conhecimento técnico às habilidades para lidar com gente, descobri meu propósito: ajudar outras pessoas a destravarem seu potencial.',
      button_text: 'Minha história',
      featured_text: 'Você é o seu maior investimento'
    },
    services: {
      title: 'Serviços Prestados',
      subtitle: 'Soluções completas de mentoria',
      view_all_text: 'Ver todos os serviços e treinamentos',
      cards: [
        {
          title: 'Desenvolvimento Profissional',
          description: "Estratégias para sair do ponto A ao ponto B. Evite perder tempo 'batendo cabeça' e acelere sua..."
        },
        {
          title: 'Desenvolvimento Pessoas',
          description: "Estratégias para sair do ponto A ao ponto B. Evite perder tempo 'batendo cabeça' e acelere sua..."
        },
        {
          title: 'Treinamentos',
          description: "Estratégias para sair do ponto A ao ponto B. Evite perder tempo 'batendo cabeça' e acelere sua..."
        }
      ]
    },
    testimonials: [
      {
        id: 1,
        client_name: 'Nome Cliente',
        text: 'A mentoria com a Cheila foi um divisor de águas na minha carreira.'
      }
    ],
    contact: {
      title: 'Entre em contato',
      subtitle: 'Seu próximo passo começa aqui!',
      submit_button_text: 'Enviar Mensagem'
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_FORM);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getHomeFullData();
        if (!data) {
          return;
        }

        const normalizedTestimonials = (data.testimonials || []).map((item, index) => ({
          id: item.id || Date.now() + index,
          client_name: item.client_name || item.name || '',
          text: item.text || ''
        }));

        setFormData({
          hero: { ...DEFAULT_FORM.hero, ...(data.hero || {}) },
          about: { ...DEFAULT_FORM.about, ...(data.about || {}) },
          services: {
            ...DEFAULT_FORM.services,
            ...(data.services || {}),
            cards: Array.isArray(data.services?.cards) && data.services.cards.length
              ? data.services.cards
              : DEFAULT_FORM.services.cards
          },
          testimonials: normalizedTestimonials.length ? normalizedTestimonials : DEFAULT_FORM.testimonials,
          contact: { ...DEFAULT_FORM.contact, ...(data.contact || {}) }
        });
      } catch (error) {
        console.error('Erro ao carregar dados da Home no editor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = () => {
    if (setIsDirty) setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateHomeData(formData);
      if (setIsDirty) setIsDirty(false);
      onSaveSuccess && onSaveSuccess();
    } catch (error) {
      console.error('Erro ao salvar dados da Home:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateNestedField = (section, field, value) => {
    handleChange();
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateServiceCardField = (index, field, value) => {
    handleChange();
    setFormData((prev) => {
      const nextCards = [...prev.services.cards];
      nextCards[index] = {
        ...nextCards[index],
        [field]: value
      };

      return {
        ...prev,
        services: {
          ...prev.services,
          cards: nextCards
        }
      };
    });
  };

  const handleAddTestimonial = () => {
    handleChange();
    setFormData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { id: Date.now(), client_name: '', text: '' }]
    }));
  };

  const handleRemoveTestimonial = (id) => {
    handleChange();
    setFormData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((testimonial) => testimonial.id !== id)
    }));
  };

  const handleTestimonialChange = (id, field, value) => {
    handleChange();
    setFormData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial) =>
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
      )
    }));
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
          disabled={isLoading || isSaving}
          sx={{ bgcolor: BRAND.teal, fontWeight: 'bold', '&:hover': { bgcolor: '#00796b' } }}
          fullWidth={false} // Apenas para resetar prop se necessário
        >
          {isSaving ? 'Salvando...' : 'Salvar Alterações'}
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
                value={formData.hero.headline}
                onChange={(e) => updateNestedField('hero', 'headline', e.target.value)}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <TextField 
                label="SUBTÍTULO" fullWidth multiline rows={2} variant="filled" 
                value={formData.hero.subheadline}
                InputProps={{ disableUnderline: true }} sx={{ bgcolor: 'white', borderRadius: 1 }} onChange={(e) => updateNestedField('hero', 'subheadline', e.target.value)} 
              />
              <TextField
                label="TEXTO DO BADGE DE EXPERIÊNCIA"
                fullWidth
                size="small"
                value={formData.hero.experienceText}
                onChange={(e) => updateNestedField('hero', 'experienceText', e.target.value)}
                sx={{ bgcolor: 'white' }}
              />
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField label="Texto do Botão Primário" fullWidth size="small" value={formData.hero.cta_text} sx={{ bgcolor: 'white' }} onChange={(e) => updateNestedField('hero', 'cta_text', e.target.value)} />
                <TextField label="Link do Botão Primário" fullWidth size="small" value={formData.hero.cta_link} sx={{ bgcolor: 'white' }} onChange={(e) => updateNestedField('hero', 'cta_link', e.target.value)} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField label="Texto do Botão Secundário" fullWidth size="small" value={formData.hero.secondary_cta_text} sx={{ bgcolor: 'white' }} onChange={(e) => updateNestedField('hero', 'secondary_cta_text', e.target.value)} />
                <TextField label="Link do Botão Secundário" fullWidth size="small" value={formData.hero.secondary_cta_link} sx={{ bgcolor: 'white' }} onChange={(e) => updateNestedField('hero', 'secondary_cta_link', e.target.value)} />
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
                label="FRASE DE DESTAQUE (QUOTE)" fullWidth variant="filled"
                value={formData.about.quote}
                InputProps={{ disableUnderline: true, style: { fontStyle: 'italic', color: BRAND.gold } }}
                sx={{ bgcolor: BRAND.lightGold }}
                onChange={(e) => updateNestedField('about', 'quote', e.target.value)}
              />
              <TextField 
                label="TEXTO DA BIO" fullWidth multiline rows={8} variant="outlined" 
                placeholder="Escreva sobre sua trajetória..."
                value={formData.about.description}
                onChange={(e) => updateNestedField('about', 'description', e.target.value)} 
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Texto do Botão da Seção"
                  fullWidth
                  size="small"
                  value={formData.about.button_text}
                  onChange={(e) => updateNestedField('about', 'button_text', e.target.value)}
                />
                <TextField
                  label="Texto em Destaque (Card Branco)"
                  fullWidth
                  size="small"
                  value={formData.about.featured_text}
                  onChange={(e) => updateNestedField('about', 'featured_text', e.target.value)}
                />
              </Stack>
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
              Esses campos controlam exatamente os títulos, textos e cards da seção pública.
            </Typography>
            <Stack spacing={3}>
              <TextField label="Título da Seção" fullWidth size="small" value={formData.services.title} onChange={(e) => updateNestedField('services', 'title', e.target.value)} />
              <TextField label="Subtítulo da Seção" fullWidth size="small" value={formData.services.subtitle} onChange={(e) => updateNestedField('services', 'subtitle', e.target.value)} />
              <TextField label="Texto 'Ver todos os serviços'" fullWidth size="small" value={formData.services.view_all_text} onChange={(e) => updateNestedField('services', 'view_all_text', e.target.value)} />

              <Divider />

              {formData.services.cards.map((card, index) => (
                <Paper key={index} sx={{ p: 2, bgcolor: '#FAFAFA', border: '1px dashed #ccc' }} elevation={0}>
                  <Typography variant="caption" fontWeight="bold" color={BRAND.teal}>
                    CARD DE SERVIÇO #{index + 1}
                  </Typography>
                  <Stack spacing={2} sx={{ mt: 1.5 }}>
                    <TextField
                      label="Título do Card"
                      fullWidth
                      size="small"
                      value={card.title || ''}
                      onChange={(e) => updateServiceCardField(index, 'title', e.target.value)}
                    />
                    <TextField
                      label="Descrição do Card"
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                      value={card.description || ''}
                      onChange={(e) => updateServiceCardField(index, 'description', e.target.value)}
                    />
                  </Stack>
                </Paper>
              ))}
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
              {formData.testimonials.map((item, index) => (
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
                      value={item.client_name}
                      onChange={(e) => handleTestimonialChange(item.id, 'client_name', e.target.value)}
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
                <TextField label="Título Final" fullWidth size="small" value={formData.contact.title} onChange={(e) => updateNestedField('contact', 'title', e.target.value)} />
                <TextField label="Subtítulo" fullWidth size="small" value={formData.contact.subtitle} onChange={(e) => updateNestedField('contact', 'subtitle', e.target.value)} />
                <TextField label="Texto do Botão Enviar" fullWidth size="small" value={formData.contact.submit_button_text} onChange={(e) => updateNestedField('contact', 'submit_button_text', e.target.value)} />
             </Stack>
          </AccordionDetails>
        </Accordion>

      </Box>
    </Box>
  );
}