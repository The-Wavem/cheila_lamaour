import { Box, Container, Divider, TextField, Typography } from "@mui/material";

export default function RightDownArticle() {
  return (
    <Container sx={{position: "sticky", top: "100px", backgroundColor: "#e6e4e4", zIndex: "1", marginRight: "100px", maxHeight: "100vh"}} disableGutters>
      <Typography variant="h4" sx={{textAlign: "center", fontWeight: "bold"}}>
        Posts mais acessados: 
      </Typography>
      <Box sx={{display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px"}}>
        <Typography variant="h5" sx={{textAlign: "center", fontWeight: "100"}}>
          1. Título
        </Typography>
        <Typography variant="h5" sx={{textAlign: "center", fontWeight: "100"}}>
          1. Título
        </Typography>
        <Typography variant="h5" sx={{textAlign: "center", fontWeight: "100"}}>
          1. Título
        </Typography>
        <Typography variant="h5" sx={{textAlign: "center", fontWeight: "100"}}>
          1. Título
        </Typography>
        <Typography variant="h5" sx={{textAlign: "center", fontWeight: "100"}}>
          1. Título
        </Typography>
      </Box>
      <Divider sx={{backgroundColor: "black", height: "2.5px", marginBlock: "35px"}}></Divider>
      <Box sx={{
        backgroundColor: "#b8b8b8", borderRadius: "15px", 
        padding: "40px", display: "flex", 
        flexDirection: "column", gap: "20px"}}>
        <Typography  
          sx={{fontWeight: "bold", fontSize: "20px"}}>
            Quer receber artigos como esse no seu e-mail?
        </Typography>
        <Typography   
          sx={{fontWeight: "light", fontSize: "20px"}}>
            Coloque seu email no campo abaixo para receber artigos a cada nova postagem feita.
        </Typography>
        <TextField 
          label="E-mail" variant="filled" color="#fff"
          sx={{backgroundColor: "white", borderRadius: "15px"}}/>
      </Box>
    </Container>
  );
}