import { Box } from '@mui/material';
import LeadsList from '@/sections/admin/leads/LeadsList';

export default function LeadsManager() {
  return (
    <Box>
      {/* A seção já contém o título e a lógica visual */}
      <LeadsList />
    </Box>
  );
}