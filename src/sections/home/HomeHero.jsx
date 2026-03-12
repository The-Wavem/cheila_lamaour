import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Imagem from "@/assets/pose1.png";
import BackgroundGlow from "@/components/ui/public/home/BackgroundGlow";
import DecorativeOrb from "@/components/ui/public/home/DecorativeOrb";
import HomeHeroContent from "@/sections/home/HomeHeroContent";
import HomeHeroActions from "@/sections/home/HomeHeroActions";
import { getHeroData } from "@/services/homeAPI";
import { PUBLIC_BRAND } from '@/theme/branding';
import { useUtm } from "@/hooks/capturaURL";
import Header from "@/components/layout/Header";

const HERO_DEFAULTS = {
  headline: "Cheila Lamour",
  subheadline: "Mentorias - Escritora - Treinamentos",
  experienceText: "+25 anos de experiência",
  cta_text: "Entre em contato",
  cta_link: "/contato",
  secondary_cta_text: "Minha história",
  secondary_cta_link: "#sobre",
};

const HomeHero = () => {
  useUtm();

  const [heroData, setHeroData] = useState(HERO_DEFAULTS);

  useEffect(() => {
    const loadSchema = async () => {
      try {
        const data = await getHeroData();
        if (data) {
          setHeroData((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Hero:", error);
      }
    };

    loadSchema();
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        <Header />

        <Box
          sx={{
            flex: 1,
            background: PUBLIC_BRAND.gradients.hero,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            pt: { xs: 2, md: 0 },
          }}
        >
          <BackgroundGlow
            top="-10%"
            right="-5%"
            width="400px"
            height="400px"
            color="rgba(255, 255, 255, 0.05)"
            zIndex={0}
          />

          <DecorativeOrb
            left="8%"
            top={{ xs: "14%", md: "22%" }}
            width={{ xs: "110px", sm: "160px", md: "230px" }}
            height={{ xs: "110px", sm: "160px", md: "230px" }}
            zIndex={1}
          />

          <DecorativeOrb
            left={{ xs: "62%", md: "24%" }}
            top={{ xs: "50%", md: "70%" }}
            width={{ xs: "90px", sm: "130px", md: "190px" }}
            height={{ xs: "90px", sm: "130px", md: "190px" }}
            zIndex={1}
          />

          <AutoAwesomeIcon
            sx={{
              position: "absolute",
              top: { xs: "11%", md: "16%" },
              left: { xs: "5%", md: "8%" },
              fontSize: { xs: 22, md: 30 },
              color: 'rgba(251, 174, 54, 0.6)',
              zIndex: 1,
            }}
          />
          <AutoAwesomeIcon
            sx={{
              position: "absolute",
              bottom: { xs: "14%", md: "18%" },
              right: { xs: "8%", md: "14%" },
              fontSize: { xs: 20, md: 25 },
              color: "rgba(255, 255, 255, 0.4)",
              zIndex: 1,
              display: { xs: 'none', md: 'block' },
            }}
          />
          <AutoAwesomeIcon
            sx={{
              position: "absolute",
              top: { xs: "46%", md: "48%" },
              left: { xs: "8%", md: "6%" },
              fontSize: { xs: 16, md: 20 },
              color: 'rgba(251, 174, 54, 0.5)',
              zIndex: 1,
              display: { xs: 'none', sm: 'block' },
            }}
          />

          <Container
            maxWidth="xl"
            sx={{
              position: "relative",
              zIndex: 3,
              py: { xs: 6, md: 4 },
            }}
          >
            <Grid
              container
              spacing={4}
              alignItems="center"
              sx={{
                minHeight: { xs: 'auto', md: 'calc(100vh - 80px)' },
              }}
            >
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  order: { xs: 1, md: 1 },
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: { xs: 360, sm: 430, md: 560, lg: 620 },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    component="img"
                    src={Imagem}
                    alt="Cheila Lamour"
                    sx={{
                      width: '100%',
                      maxWidth: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.28))',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.005)',
                      },
                    }}
                  />
                </Box>
              </Grid>

              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  order: { xs: 2, md: 2 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", md: "flex-start" },
                    textAlign: { xs: "center", md: "left" },
                    maxWidth: { xs: "100%", md: 520, lg: 560 },
                    mx: { xs: "auto", md: 0 },
                    mr: { md: 0 },
                    ml: { md: 'auto' },
                    py: { xs: 1, md: 0 },
                  }}
                >
                  <HomeHeroContent
                    headline={heroData.headline}
                    subheadline={heroData.subheadline}
                  />

                  <HomeHeroActions
                    ctaText={heroData.cta_text}
                    ctaLink={heroData.cta_link}
                    secondaryCtaText={heroData.secondary_cta_text}
                    secondaryCtaLink={heroData.secondary_cta_link}
                    experienceText={heroData.experienceText}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default HomeHero;
