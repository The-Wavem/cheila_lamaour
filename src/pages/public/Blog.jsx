import { AppBar, Box, Button, Toolbar} from "@mui/material";
import FirstSection from "@/sections/blog/firstsection";
import CardSection from "@/sections/blog/CardSection";
import Header from "@/components/layout/Header";

export default function Blog() {
  return (
    <>
      <Header></Header>

      {/* Chamando as seções aqui */}
      <FirstSection></FirstSection>
      <CardSection></CardSection>
    </>
  );
}
