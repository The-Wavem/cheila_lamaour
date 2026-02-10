import { Box, Typography, CircularProgress, Fade } from "@mui/material";
import { BRAND } from "@/theme/branding";

export default function LoadingScreen() {
  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "60vh", // Garante que ocupe um bom espaço vertical
          width: "100%",
          bgcolor: "rgba(255, 255, 255, 0.8)", // Fundo levemente translúcido
          backdropFilter: "blur(4px)", // Efeito de desfoque elegante (Vidro)
          zIndex: 9999,
          borderRadius: 2,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          {/* Círculo de Fundo (Sutil) */}
          <CircularProgress
            variant="determinate"
            value={100}
            size={60}
            thickness={4}
            sx={{ color: "#eee", position: "absolute" }}
          />
          {/* Círculo de Progresso (Dourado) */}
          <CircularProgress
            variant="indeterminate"
            disableShrink
            size={60}
            thickness={4}
            sx={{
              color: BRAND.secondary,
              animationDuration: "1.5s",
              [`& .MuiCircularProgress-circle`]: { strokeLinecap: "round" },
            }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            mt: 3,
            fontFamily: BRAND.fontFamilyHeader,
            fontWeight: "bold",
            color: BRAND.primary,
            letterSpacing: 1,
          }}
        >
          Carregando...
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: BRAND.textSecondary, mt: 1 }}
        >
          Preparando o ambiente
        </Typography>
      </Box>
    </Fade>
  );
}
