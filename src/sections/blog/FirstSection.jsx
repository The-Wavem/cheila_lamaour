import { Box, Container, IconButton, Typography, MenuItem} from "@mui/material";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import { useState } from "react";

const FirstSection = () => {
  const [filterMenu, setMenu] = useState(0);

  return (
    <Container 
      sx={{background: "#e6e4e4", width: "100%", paddingBottom: "50px", minWidth: "100%"}}>
      <Box 
        sx={{marginInline: "80px", paddingTop: "80px"}}>
        <Typography variant="h1" 
          sx={{fontSize: "40px", fontWeight: "bold", "color": "#a09f9f", marginBottom: "15px"}}>Blog</Typography>
        <Box 
          sx={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
          <Typography variant="h2" 
            sx={{fontSize: "35px", fontWeight: "lighter", "color": "black"}}>Todas as postagens</Typography>
          <IconButton aria-label="icone"
            sx={{ borderRadius: "100%", padding: "10px", backgroundColor: "white", border: "1px solid #00000091", transition: "0.5s", '&:hover': {backgroundColor: "#e6e4e4"}, '.MuiTouchRipple-child': {display: "none"}}} onClick={filterMenu == 0 ? () => setMenu(1) : () => setMenu(0)}>
            <FilterAltRoundedIcon sx={{ fontSize: 36 }}/>
          </IconButton>
          <Box
            sx={{display: "flex", minWidth: "500px", backgroundColor: "white", color: "black", position: "absolute", top: "215px", right: "200px", opacity: filterMenu == 0 ? "0" : "1", justifyContent: "space-between", padding: "5px", borderRadius: "15px", boxShadow: "0px 0px 5px 1px #00000040", transition: "opacity 0.2s ease-in-out"}}
          >
            <Box sx={{display: "flex"}}>
              <MenuItem sx={{fontSize: "15px"}}>Classificação</MenuItem>
              <MenuItem sx={{fontSize: "15px"}}>Tipo</MenuItem>
              <MenuItem sx={{fontSize: "15px"}}>Data</MenuItem>
            </Box>
            <Box sx={{fontSize: "15px", marginBlock: "10px"}}>
              <MenuItem sx={{fontSize: "15px", marginBottom: "10px"}}>Limpar filtro(s)</MenuItem>
              <Typography sx={{fontSize: "10px", textAlign: "center", marginTop: "10px"}}>Filtros selecionados</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FirstSection;