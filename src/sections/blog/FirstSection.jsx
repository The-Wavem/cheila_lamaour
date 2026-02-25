import { Box, Container, IconButton, Typography, MenuItem, Divider} from "@mui/material";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import { useState } from "react";
import { ArrowCircleDown, ArrowDropDown } from "@mui/icons-material";

const FirstSection = () => {
  const [openFilter, setFilter] = useState(0);
  const [filterMenu, setMenu] = useState(0);
 
  console.log(filterMenu)

  return (
    <Container 
      sx={{background: "#e6e4e4", width: "100%", paddingBottom: "100px", minWidth: "100%"}}>
      <Box 
        sx={{marginInline: "80px", paddingTop: "80px"}}>
        <Typography variant="h1" 
          sx={{fontSize: "40px", fontWeight: "bold", "color": "#a09f9f", marginBottom: "15px"}}>Blog</Typography>
        <Box 
          sx={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
          <Typography variant="h2" 
            sx={{fontSize: "35px", fontWeight: "lighter", "color": "black"}}>Todas as postagens</Typography>
          <IconButton aria-label="icone"
            sx={{ borderRadius: "100%", padding: "10px", backgroundColor: "white", border: "1px solid #00000091", transition: "0.5s", '&:hover': {backgroundColor: "#e6e4e4"}, '.MuiTouchRipple-child': {display: "none"}}} onClick={openFilter == 0 ? () => setFilter(1) : () => setFilter(0)}>
            <FilterAltRoundedIcon sx={{ fontSize: 36 }}/>
          </IconButton>
          <Box
            sx={{display: "flex", minWidth: "500px", backgroundColor: "white", color: "black", position: "absolute", top: "200px", right: "200px", opacity: openFilter == 0 ? "0" : "1", justifyContent: "space-between", padding: "5px", borderRadius: "15px", boxShadow: "0px 0px 5px 1px #00000040", transition: "opacity 0.2s ease-in-out"}}
          >
            <Box sx={{display: "flex", alignItems: "center"}}>
              <Box>
                <MenuItem onClick={filterMenu == 0 ? () => setMenu(1) : () => setMenu(0)} sx={{fontSize: "15px", borderRadius: "5px"}}>Classificação <ArrowDropDown/> </MenuItem>
                <Box sx={{position: "absolute", width: "auto", height: "auto", backgroundColor: "white", padding: "10px", marginLeft: "14px", boxShadow: "0px 0px 5px 1px #00000040", opacity: filterMenu == 1 ? "1" : "0", borderRadius: "10px"}}>
                  <MenuItem 
                    sx={{fontSize: "10px", padding: "10px"}} disableGutters>
                      Classificação 1
                  </MenuItem>
                  <Divider/>
                  <MenuItem 
                    sx={{fontSize: "10px", padding: "10px"}} disableGutters>
                      Classificação 2
                  </MenuItem>
                  <Divider/>
                  <MenuItem 
                    sx={{fontSize: "10px", padding: "10px"}} disableGutters>
                      Classificação 3
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
            <Box sx={{fontSize: "15px", marginBlock: "10px", marginRight: "15px"}}>
              <Typography sx={{fontSize: "15px", textAlign: "center", marginTop: "10px", marginBottom: "10px", fontWeight: "700"}}>Filtros selecionados</Typography>
              <MenuItem sx={{fontSize: "15px", marginBottom: "10px", fontWeight: "100", backgroundColor: "#e6e4e4", borderRadius: "10px", transition: "background-color ease 0.5s", '&:hover': {backgroundColor: "#c9c9c9"}}}>Limpar Filtro(s)</MenuItem>
            </Box>  
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default FirstSection;