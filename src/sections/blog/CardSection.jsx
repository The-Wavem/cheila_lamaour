import CardBlog from "@/components/ui/public/blog/CardBlog";
import { Key } from "@mui/icons-material";
import { Container} from "@mui/material";

const CardSection = () => {
  const posts = [
    {
      tema: "Relacionamento",
      data: "23 de novembro, 2025",
      titulo: "O segredo dos casais que não param de crescer juntos",
      descricao: "Relacionamentos saudáveis não nascem prontos, eles são construídos com ferramentas certas. Através de um aprendizado direcionado e personalizado, ajudo você a identificar bloqueios na comunicação e a resgatar a parceria no seu dia a dia."
    },
    {
      tema: "Liderança",
      data: "01 de dezembro, 2025",
      titulo: "De Especialista a Gestor: O Próximo Passo",
      descricao: "Saber a técnica não é o mesmo que saber gerir pessoas. Minha mentoria prepara você para os desafios da liderança, ensinando gestão de times, delegação e inteligência emocional para novos líderes."
    },
    {
      tema: "Finanças",
      data: "03 de dezembro, 2025",
      titulo: "Sua Liberdade Financeira Começa no Planejamento",
      descricao: "Ter dinheiro não é sorte, é método. Na mentoria financeira, organizamos seu fluxo de caixa e montamos uma estratégia de investimentos personalizada para que seu dinheiro trabalhe para você."
    },
    {
      tema: "Produtividade",
      data: "05 de dezembro, 2025",
      titulo: "O Fim da Procrastinação Estratégica",
      descricao: "Estar ocupado não é o mesmo que ser produtivo. Aprenda a dominar sua agenda, priorizar o que realmente importa e recuperar seu tempo livre com técnicas comprovadas de alta performance."
    }
  ]

  return (
    <> 
      <Container 
        sx={{bgcolor: "#e6e4e4", margin: 0, minWidth: "100%", display: "flex", justifyContent: "space-evenly", gap: 9, flexWrap: "wrap", paddingBottom: "100px"}}
      >
        {posts.map((post, index) => (
          <CardBlog key={index} filter={post.tema} date={post.data} title={post.titulo} description={post.descricao}/>
        ))}
      </Container>
    </>
  )
}

export default CardSection;