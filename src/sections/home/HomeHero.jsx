import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
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
            left="22%"
            top="200px"
            width="250px"
            height="250px"
            zIndex={1}
          />

          <DecorativeOrb
            left="40%"
            top="540px"
            width="250px"
            height="250px"
            zIndex={1}
          />

          <AutoAwesomeIcon
            sx={{
              position: "absolute",
              top: "15%",
              left: "10%",
              fontSize: 30,
              color: 'rgba(251, 174, 54, 0.6)',
              zIndex: 1,
            }}
          />
          <AutoAwesomeIcon
            sx={{
              position: "absolute",
              bottom: "20%",
              right: "15%",
              fontSize: 25,
              color: "rgba(255, 255, 255, 0.4)",
              zIndex: 1,
            }}
          />
          <AutoAwesomeIcon
            sx={{
              position: "absolute",
              top: "45%",
              left: "8%",
              fontSize: 20,
              color: 'rgba(251, 174, 54, 0.5)',
              zIndex: 1,
            }}
          />

          <Box
            component="img"
            src={Imagem}
            alt="Cheila Lamour"
            sx={{
              position: "absolute",
              left: "15%",
              top: "150px",
              width: "700px",
              height: "700px",
              objectFit: "cover",
              zIndex: 2,
              filter: "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.3))",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: "45%",
              zIndex: 3,
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
        </Box>
      </Box>
    </>
  );
};

export default HomeHero;
