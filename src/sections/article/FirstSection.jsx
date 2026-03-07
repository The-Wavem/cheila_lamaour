import { ArrowBackIos } from "@mui/icons-material";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function FirstSection() {
  const [scrollY, setScrollY] = useState(0);

  console.log(scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(parseInt(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <Container 
      sx={{
        display: "flex", flexDirection: "column", minWidth: "100%", padding: 0
      }}  
      disableGutters>
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Typography variant="h1" sx={{zIndex: 1}}>TÍTULO</Typography>
        <img
          src="https://i.redd.it/firewatch-1920x1080-v0-mgwm4m4tdo6e1.png?width=1920&format=png&auto=webp&s=3b725fb98e44a4be1729da1ff9702576aa882248"
          alt="foto ilustrativa do artigo"
          style={{width: "100%", height: "100%", position: "fixed"}}
        />
      </Box>
      <Box sx={{
        marginTop: "500px", paddingInline: "80px", 
        zIndex: 1, opacity: scrollY < 300 ? 0 : 1, backgroundColor: scrollY < 300 ? "#ffffff00" : "#c0bfbf", 
        height: "100vh", transition: "background-color 0.5s ease-in-out, opacity 0.5s ease-in-out"}} disableGutters>
        <Typography sx={{display: "flex", alignItems: "center", marginTop: "50px", marginBottom: "30px", color: "#7C7C7C"}}>
          <ArrowBackIos/> Voltar para lista
        </Typography>
        <Divider sx={{backgroundColor: "black", height: "2.5px", marginBottom: "50px"}}></Divider>
        <Box sx={{display: "flex", justifyContent: "space-between", marginBottom: "40px"}}>
          <Typography sx={{fontWeight: "bold"}}>
            23/11/2025
          </Typography>
          <Typography sx={{fontWeight: "bold"}}>
            Compartilhar
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
        <Divider sx={{backgroundColor: "black", height: "2.5px", marginTop: "50px"}}></Divider>
      </Box>
    </Container>
  );
}