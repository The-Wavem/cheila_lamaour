import { useState } from 'react';
import {
    Box, Typography, Button, IconButton, Chip, Stack, Tooltip, Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'; // Para o Empty State

// Dados Mockados (Simulando o Banco de Dados)
const mockLeads = [
    { id: 1, email: 'contato@empresa.com.br', date: '04/02/2026', origin: 'Newsletter' },
    { id: 2, email: 'arthur.alves@gmail.com', date: '03/02/2026', origin: 'Contato' }, //easter egg
    { id: 3, email: 'diretor@corp.com', date: '01/02/2026', origin: 'Mentoria' },
    // Comente as linhas acima para testar o "Estado Vazio"
];

export default function LeadsList() {
    const [rows, setRows] = useState(mockLeads);

    // Ação 1: Excluir Lead
    const handleDelete = (id) => {
        if (window.confirm('Tem certeza? Isso removerá o lead da base.')) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    // Ação 2: Copiar Email
    const handleCopy = (email) => {
        navigator.clipboard.writeText(email);
        // Aqui poderia entrar um "Toast/Snackbar" avisando que copiou
        alert(`Email ${email} copiado!`);
    };

    // Ação 3: Exportar CSV (Simulação)
    const handleExport = () => {
        alert("Iniciando download do arquivo .csv...");
        // Futuramente: lógica real de gerar CSV
    };

    // Colunas da Tabela
    const columns = [
        {
            field: 'email',
            headerName: 'E-mail do Interessado',
            flex: 1,
            minWidth: 250
        },
        {
            field: 'origin',
            headerName: 'Origem',
            width: 150,
            renderCell: (params) => (
                <Chip label={params.value} size="small" variant="outlined" />
            )
        },
        { field: 'date', headerName: 'Data de Cadastro', width: 180 },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 120,
            sortable: false,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => (
                <Stack direction="row" spacing={1} justifyContent="flex-end" width="100%">
                    <Tooltip title="Copiar E-mail">
                        <IconButton size="small" onClick={() => handleCopy(params.row.email)}>
                            <ContentCopyIcon fontSize="small" color="action" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Excluir Lead">
                        <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%', bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 1 }}>

            {/* --- CABEÇALHO DA SEÇÃO --- */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 4 }}
            >
                <Box>
                    <Typography variant="h5" fontWeight="bold" color="primary.main">
                        Lista de Interessados (Leads)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total capturado: <strong>{rows.length}</strong> potenciais clientes
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                    onClick={handleExport}
                    disabled={rows.length === 0} // Desabilita se não tiver dados
                >
                    Exportar CSV
                </Button>
            </Stack>

            {/* --- TABELA DE DADOS OU EMPTY STATE --- */}
            {rows.length > 0 ? (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                    pageSizeOptions={[10, 25]}
                    disableRowSelectionOnClick
                    sx={{ border: 'none', '& .MuiDataGrid-cell': { borderBottom: '1px solid #f0f0f0' } }} // Estilo clean
                />
            ) : (
                // Estado Vazio Customizado
                <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                    <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Nenhum lead capturado ainda.
                    </Typography>
                    <Typography variant="body2" color="text.disabled">
                        Divulgue seu novo artigo ou compartilhe o site para começar a ver dados aqui!
                    </Typography>
                </Box>
            )}
        </Box>
    );
}