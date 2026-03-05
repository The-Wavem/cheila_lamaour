import { Box } from "@mui/material";

export default function FilterMenu({ children, show }) {
  return (
    <Box
      // Menu de filtro
      sx={{
        minWidth: "500px",
        backgroundColor: "white",
        color: "black",
        position: "absolute",
        opacity: show,
        top: "190px",
        right: "200px",
        justifyContent: "space-between",
        padding: "5px",
        borderRadius: "15px",
        boxShadow: "0px 0px 5px 1px #00000040",
        animation: show ? "left 0.5s" : "right 0.5s",
        animationFillMode: "forwards",
        zIndex: "15",
        '@keyframes left': {
          '0%': { right: "0px", opacity: "0" },
          '50%': { opacity: "0" },
          '100%': { opacity: "1", display: "flex" }
        },
        '@keyframes right': {
          '0%': { opacity: "1", display: "flex" },
          '40%': { opacity: "0" },
          '100%': { right: "0px", opacity: "0", display: "none" }
        }
      }}
    >
      { children }
    </Box>
  );
}