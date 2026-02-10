import CardBlog from "@/components/ui/CardBlog";
import { Container} from "@mui/material";

const CardSection = () => {
  return (
    <> 
      <Container 
        sx={{bgcolor: "#e6e4e4", margin: 0, minWidth: "100%", height: "100vh", display: "flex", justifyContent: "center", gap: 9}}
      >
        <CardBlog filter="Mindset" date="23 de Novembro, 2025" title="Titulo" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue odio at turpis ornare luctus. Pellentesque vel libero efficitur, mattis nisi ut, rhoncus ante."/>
        <CardBlog filter="Relacionamentos" date="14 de Agosto, 2025" title="Titulo" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue odio at turpis ornare luctus. Pellentesque vel libero efficitur, mattis nisi ut, rhoncus ante."/>
      </Container>
    </>
  )
}

export default CardSection;