import { Box, Button, Card, Typography } from "@mui/material";

export default function CardBlog({ filter, image, date, title, description}) {
  return (
    <>
      <Card 
        sx={{
          bgcolor: "#00a6a6", width: "500px", 
          height: "auto", maxHeight: "430px", 
          borderRadius: "15px", display: "flex", flexDirection: "column"
        }}>
        <Box sx={{padding: "20px", display: "flex", zIndex: "1"}}>
          <Typography
            sx={{
              bgcolor: "white", color: "#998302",
              fontSize: "20px", fontWeight: "500",
              padding: "5px", paddingInline: "15px",
              borderRadius: "25px"
            }}>
            { filter }
          </Typography>
        </Box>
        <img 
          src={"https://img.freepik.com/fotos-gratis/montanha-fuji-com-via-lactea-a-noite_335224-104.jpg?semt=ais_hybrid&w=740&q=80"} 
          alt="imagem artigo" 
          style={{position: "relative", width: "100%", height: "auto", maxHeight: "250px", bottom: "80px"}}
        />
        <Box sx={{bgcolor: "#00a6a6", padding: "20px", position: "relative", bottom: "125px", zIndex: 1}}>
          <Typography variant="h3" 
            sx={{color: "#dbdbdb", fontWeight: "lighter", fontSize: "15px"}}>
            { date }
          </Typography>
          <Typography variant="h1" sx={{color: "white", mt: "10px", marginBottom: "5px", fontSize:"30px", fontWeight: "100"}}>
            { title }
          </Typography>
          <Typography sx={{color: "white", marginBlock: "10px"}}>{ description } </Typography>
          <Button 
            sx={{
              color: "white", fontSize: 15, 
              padding: 0, mt: "5px", 
              fontWeight: "bold", background: "linear-gradient(to right, #fae56c 50%, white 50%)", 
              backgroundSize: "200% 100%", backgroundPosition: "100%", color: "transparent", 
              '-webkit-background-clip': "text", backgroundClip: "text",
              transition: "background-position 0.5s ease, color 0.5s ease", '&:hover': {backgroundPosition: "0%"}
            }}>
              Ler artigo →
            </Button>
        </Box>
      </Card>
    </>
  )
}