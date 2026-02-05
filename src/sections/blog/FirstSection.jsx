import { Box, Container, IconButton, Typography } from "@mui/material";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';

const FirstSection = () => {
    return (
      <Container 
        sx={{background: "#e6e4e4", width: "100%", height: "40vh", margin: 0, minWidth: "100%"}}>
        <Box 
          sx={{marginInline: 15, paddingTop: 10}}>
          <Typography variant="h1" 
            sx={{fontSize: "40px", fontWeight: "bold", "color": "#a09f9f", marginBottom: "15px"}}>Blog</Typography>
          <Box 
            sx={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
            <Typography variant="h2" 
              sx={{fontSize: "35px", fontWeight: "lighter", "color": "black"}}>Todas as postagens</Typography>
            <IconButton aria-label="icone" 
              sx={{ borderRadius: "100%", padding: "10px", backgroundColor: "white", border: "1px solid #00000091", transition: "0.5s", '&:hover': {backgroundColor: "#e6e4e4"}, '.MuiTouchRipple-child': {display: "none"}}}>
              <FilterAltRoundedIcon sx={{ fontSize: 36 }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    );
};

export default FirstSection;