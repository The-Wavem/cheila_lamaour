import { AppBar, Box, Button, Toolbar} from "@mui/material";
import FirstSection from "@/sections/blog/firstsection";
import CardSection from "@/sections/blog/CardSection";

export default function Blog() {
  return (
    <>
      <AppBar position="static" sx={{padding: 3}}>
        <Toolbar>
          <Button 
            sx={{color: "black", fontSize: 30, borderRadius: "100%", backgroundColor: "white"}}>
              CL
          </Button>
        </Toolbar>
      </AppBar>

      {/* Chamando as seções aqui */}
      <FirstSection></FirstSection>
      <CardSection></CardSection>
      
      <Box sx={{backgroundColor: "black", padding: 3, textAlign: "center", position: "relative", bottom: "0", width: "100%"}}>
        <Button 
          sx={{color: "black", fontSize: 30, borderRadius: "100%", backgroundColor: "white"}}>
            CL
        </Button>
      </Box>
    </>
  );
}
