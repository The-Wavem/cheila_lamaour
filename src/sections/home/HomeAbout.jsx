import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Imagem from "@/assets/Cheila-portrait-02.png";
import BackgroundGlow from "@/components/ui/public/home/BackgroundGlow";
import PublicButton from "@/components/ui/public/base/PublicButton";
import SectionHeader from "@/components/ui/public/base/SectionHeader";
import { BRAND, PUBLIC_BRAND } from "@/theme/branding";
import { getAboutData } from "@/services/homeAPI";

const ABOUT_DEFAULTS = {
  quote: "É um prazer poder apresentar meu trabalho a você!",
  description:
    "Sou Cheila Lamour, Mentora, Palestrante, Especialista em Liderança Feminina.\n\nMãe, esposa, Engenheira Civil com 25 anos de experiência organizacional e mais de 150 liderados. MBA em Liderança Humanizada. Analista Comportamental, certificação em Life, Leader, Executive & Business Coach.\n\nAliando o conhecimento técnico às habilidades para lidar com gente, descobri meu propósito: ajudar outras pessoas a destravarem seu potencial.",
  button_text: "Minha história",
  featured_text: "Você é o seu maior investimento",
};

const HomeAbout = () => {
  const [aboutData, setAboutData] = useState(ABOUT_DEFAULTS);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const data = await getAboutData();
        if (data) {
          setAboutData((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Erro ao carregar dados da seção Sobre:", error);
      }
    };

    loadAboutData();
  }, []);

  const bioParagraphs = aboutData.description
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <Box
      component="section"
      id="sobre"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #f3ebcf 0%, #f7f2dc 55%, #efe6c8 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                maxWidth: 540,
              }}
            >
              <SectionHeader
                overline="A HISTORIA"
                title={aboutData.quote || "Quem e Cheila Lamour?"}
                subtitle="Uma trajetória construída com propósito, liderança e desenvolvimento humano."
                color={PUBLIC_BRAND.colors.primaryDark}
                overlineSx={{
                  letterSpacing: "0.28em",
                  mb: 0.5,
                }}
                titleSx={{
                  fontSize: { xs: "2.35rem", sm: "3rem", md: "3.7rem" },
                  lineHeight: { xs: 1.1, md: 1.04 },
                  maxWidth: "13ch",
                  fontWeight: 500,
                  fontFamily: BRAND.fontFamilyBody,
                }}
                subtitleSx={{
                  color: BRAND.textSecondary,
                  opacity: 1,
                  fontSize: { xs: "1rem", md: "1.08rem" },
                  maxWidth: "38ch",
                }}
                decorativeLine={{
                  width: "108px",
                  height: "4px",
                  background: PUBLIC_BRAND.gradients.accentLine,
                  borderRadius: "999px",
                  mt: 2.5,
                  mb: 0,
                }}
              />

              <Box sx={{ mt: 4.5 }}>
                {bioParagraphs.map((paragraph, index) => (
                  <Typography
                    key={`${paragraph.slice(0, 20)}-${index}`}
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 2.2,
                      lineHeight: 1.82,
                      fontSize: { xs: "1rem", md: "1.05rem" },
                      maxWidth: "42ch",
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Box>

              <PublicButton
                variant="publicOutline"
                sx={{
                  mt: 2.5,
                  alignSelf: "flex-start",
                  px: 4,
                  py: 1.4,
                  minWidth: 170,
                }}
              >
                {aboutData.button_text}
              </PublicButton>
            </Box>
          </Grid>

          {/* Image Grid */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                position: "relative",
                maxWidth: { xs: 420, md: 520 },
                ml: { xs: "auto", md: "auto" },
              }}
            >

              <Box
                sx={{
                  position: "relative",
                  borderRadius: { xs: 2, md: 3 },
                  bgcolor: "#c9dabc",
                  minHeight: { xs: 400, sm: 500, md: 620 },
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  overflow: "hidden",
                  px: { xs: 2, sm: 3, md: 4 },
                  pt: { xs: 3, md: 4 },
                  boxShadow: "0 24px 60px rgba(61, 87, 59, 0.12)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 36, md: 40 },
                    left: { xs: 22, md: 28 },
                    width: { xs: 120, md: 170 },
                    height: { xs: 120, md: 170 },
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(251, 174, 54, 0.6) 0%, rgba(251, 174, 54, 0.18) 100%)",
                    filter: "blur(2px)",
                    zIndex: 0,
                  }}
                />

                <Box
                  component="img"
                  src={Imagem}
                  alt="Cheila Lamour"
                  sx={{
                    width: { xs: "104%", md: "108%" },
                    maxWidth: "none",
                    height: "auto",
                    borderRadius: 4,
                    boxShadow: BRAND.shadowHover,
                    position: "relative",
                    zIndex: 2,
                    display: "block",
                    objectFit: "contain",
                    transform: {
                      xs: "translateY(10px)",
                      md: "translateY(14px)",
                    },
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 18, md: 24 },
                    bottom: { xs: 22, md: 28 },
                    px: { xs: 2.5, md: 3 },
                    py: 1.6,
                    borderRadius: "22px",
                    bgcolor: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 18px 35px rgba(0,0,0,0.12)",
                    border: `1px solid ${PUBLIC_BRAND.colors.primaryBorderSoft}`,
                    zIndex: 3,
                    maxWidth: { xs: "78%", md: "72%" },
                  }}
                >
                  <Typography
                    sx={{
                      color: PUBLIC_BRAND.colors.primaryDark,
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      lineHeight: 1.45,
                    }}
                  >
                    {aboutData.featured_text}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeAbout;
