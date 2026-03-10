import { ArrowBackIos, CalendarTodaySharp, ShareSharp } from "@mui/icons-material";
import { Box, Container, Divider, Typography } from "@mui/material";

export default function FirstSection() {
  return (
    <Container 
      sx={{
        display: "flex", flexDirection: "column", minWidth: "100%", padding: 0
      }}    
      disableGutters>
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <img
          src="https://i.redd.it/firewatch-1920x1080-v0-mgwm4m4tdo6e1.png?width=1920&format=png&auto=webp&s=3b725fb98e44a4be1729da1ff9702576aa882248"
          alt="foto ilustrativa do artigo"
          style={{width: "100%", height: "100%", position: "fixed"}}
        />
      </Box>
      <Box sx={{
        marginTop: "380px", paddingInline: "80px", 
        zIndex: 1, backgroundColor: "#e6e4e4"}} disableGutters>
        <Typography sx={{display: "flex", alignItems: "center", marginBlock: "30px", color: "#7C7C7C"}}>
          <ArrowBackIos/> Voltar para lista
        </Typography>
        <Divider sx={{backgroundColor: "black", height: "2.5px", marginBottom: "20px"}}></Divider>
        <Box sx={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
          <Typography sx={{display: {xs: "flex", alignItems: "center", gap: "10px"}, fontWeight: "bold"}}>
            <CalendarTodaySharp sx={{marginBottom: "1.5px"}}/> 23/11/2025
          </Typography>
          <Typography sx={{display: {xs: "flex", alignItems: "center", gap: "10px"}, fontWeight: "bold"}}>
            Compartilhar <ShareSharp/>
          </Typography>
        </Box>
        <Box sx={{marginBottom: "40px"}}>
          <Typography variant="h1">TÍTULO</Typography>
          <Typography variant="h2" sx={{marginLeft: "80px", color: "#7C7C7C"}}>Por Cheila Lamour</Typography>
        </Box>
        <Typography variant="h5" sx={{marginBottom: "50px"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda iusto, repellat sapiente eaque, ab nisi debitis architecto perspiciatis tempora quibusdam cumque velit, beatae quasi repellendus aspernatur nemo eveniet natus modi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio amet, aspernatur expedita neque doloribus in eveniet excepturi odio at vel dolores, tempore eaque aperiam, magni officiis modi delectus ipsum vitae?</Typography>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Typography
            sx={{
              backgroundColor: "#F3DB92", paddingBlock: "10px",
              paddingInline: "40px", borderRadius: "25px",
              fontWeight: "bold", color: "#C0940E",
              letterSpacing: "2px", textAlign: "center", width: "fit-content"
            }}>
              TREINAMENTO
          </Typography>
        </Box>
        <Divider sx={{backgroundColor: "black", height: "2.5px", marginBlock: "40px"}}></Divider>
      </Box>
    </Container>
  );
}