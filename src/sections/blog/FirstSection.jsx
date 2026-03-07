import { Box, Container, IconButton, Typography, MenuItem, Divider, GlobalStyles} from "@mui/material";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import { useState } from "react";
import { ArrowCircleDown, ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import FilterMenu from "@/components/ui/FilterMenu";

const FirstSection = () => {
  const [openFilter, setFilter] = useState(0);
  const [filterMenu, setMenu] = useState(0);
  
  return (
    <Container 
      sx={{background: "#e6e4e4", width: "100%", paddingBottom: "100px", minWidth: "100%"}}>
      <Box 
        sx={{marginInline: "80px", paddingTop: "80px"}}>
        <Typography variant="h1"
          sx={{fontSize: "40px", fontWeight: "bold", "color": "#a09f9f", marginBottom: "15px"}}>
            {/* Título */}
            Blog
          </Typography>
        <Box 
          sx={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
          <Typography variant="h2" 
            sx={{fontSize: "35px", fontWeight: "lighter", "color": "black"}}>
              {/* Subtítulo - Postagens que estão aparecendo */}
              Todas as postagens
          </Typography>
          <IconButton aria-label="icone"
            sx={{ 
              borderRadius: "100%", padding: "10px", 
              backgroundColor: "white", boxShadow: "0px 0px 5px 1px #00000040", 
              transition: "0.5s", '&:hover': {backgroundColor: "#e6e4e4"}
            }} 
            onClick={openFilter == 0 ? () => setFilter(1) : () => setFilter(0)}>
            {/* Botão do Filtro */}
            <FilterAltRoundedIcon sx={{ fontSize: 36 }}/>
          </IconButton>
          <FilterMenu show={openFilter}>
            <Box sx={{display: "flex", alignItems: "center"}}>
              {/* Lado esquerdo do menu de filtro */}
              <Box>
                <MenuItem 
                  onClick={filterMenu == 0 || filterMenu == 2 ? () => setMenu(1) : () => setMenu(0)} 
                  sx={{fontSize: "15px", borderRadius: "15px", paddingInline: "25px", paddingBlock: "10px"}} disableRipple>
                    {/* Filtro Classificação */}
                    Classificação <ArrowDropUp sx={{transform: filterMenu == 1 ? "rotate(180deg)" : "none", transition: "transform 0.3s ease"}}/>
                </MenuItem>
                <Box sx={{position: "absolute", width: "auto", height: "auto", backgroundColor: "white", padding: "10px", marginLeft: "14px",  opacity: filterMenu == 1 ? "1" : "0", borderRadius: "10px", transition: "opacity ease 0.5s", left: "-14px", marginTop: "31px", boxShadow: "0px 5px 5px 1px #00000040"}}>
                  <MenuItem 
                    sx={{fontSize: "13px", padding: "10px", display: "flex", alignItems: "center"}} disableGutters>
                      Crescente
                  </MenuItem>
                  <Divider sx={{backgroundColor: "black"}}/>
                  <MenuItem 
                    sx={{fontSize: "13px", padding: "10px"}} disableGutters>
                      Decrescente
                  </MenuItem>
                  <Divider sx={{backgroundColor: "black"}}/>
                  <MenuItem 
                    sx={{fontSize: "13px", padding: "10px"}} disableGutters>
                      Postagens mais novas
                  </MenuItem>
                  <Divider sx={{backgroundColor: "black"}}/>
                  <MenuItem 
                    sx={{fontSize: "13px", padding: "10px"}} disableGutters>
                      Postagens mais antigas
                  </MenuItem>
                </Box>
              </Box>
              <Box>
                <MenuItem onClick={() => setMenu(2)} sx={{fontSize: "15px", borderRadius: "5px"}}>Tipo <ArrowDropDown/></MenuItem>
              </Box>
              <Box>
                <MenuItem onClick={() => setMenu(3)} sx={{fontSize: "15px", borderRadius: "5px"}}>Data <ArrowDropDown/></MenuItem>
              </Box>
            </Box>
            <Divider orientation="vertical" sx={{backgroundColor: "black", margin: "25px 35px"}} flexItem/>
            {/* Lado direito do menu de filtro */}
            <Box sx={{fontSize: "15px", marginBlock: "10px", marginRight: "15px", padding: "10px"}}>
              <Typography 
                sx={{
                  fontSize: "15px", textAlign: "center", 
                  marginTop: "10px", marginBottom: "10px", 
                  fontWeight: "700"}}>
                    Filtros selecionados
              </Typography>
              <MenuItem 
                sx={{
                  fontSize: "15px", marginBottom: "10px", 
                  fontWeight: "100", backgroundColor: "#e6e4e4", 
                  borderRadius: "10px", transition: "background-color ease 0.5s", 
                  '&:hover': {backgroundColor: "#c9c9c9"}}}>
                    Limpar Filtro(s)
              </MenuItem>
            </Box>
          </FilterMenu>
        </Box>
      </Box>
    </Container>
  );
};

export default FirstSection;