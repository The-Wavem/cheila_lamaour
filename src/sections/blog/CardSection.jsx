import { Box, Button, Card, Container, Typography } from "@mui/material";

const CardSection = () => {
  return (
    <> 
      <Container sx={{bgcolor: "#e6e4e4", margin: 0, minWidth: "100%", height: "100vh"}}>
        <Card 
          sx={{
            bgcolor: "#00a6a6", width: "500px", 
            height: "350px", padding: "20px", 
            borderRadius: "15px", display: "flex", 
            flexDirection: "column", justifyContent: "space-between",
            alignItems: "flex-start"
          }}>
          <Box>
            <Typography 
              sx={{
                bgcolor: "white", color: "#998302", 
                fontSize: "20px", fontWeight: "500", 
                padding: "5px", paddingInline: "15px", 
                borderRadius: "25px"
              }}>
              Mindset
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" 
              sx={{color: "#dbdbdb", marginTop: "5px", fontWeight: "lighter", fontSize: "25px"}}>
              23 de Novembro, 2025
            </Typography>
            <Typography variant="h1" sx={{color: "white", marginTop: "5px", fontSize:"30px", fontWeight: "600"}}>
              titulo
            </Typography>
            <Typography sx={{color: "white", marginTop: "5px"}}>descricao</Typography>
            <Button>Ler artigo →</Button>
          </Box>
        </Card>
      </Container>
    </>
  )
}

export default CardSection;