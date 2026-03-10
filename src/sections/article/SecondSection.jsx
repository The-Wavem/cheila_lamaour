import LeftDownArticle from "@/sections/article/LeftDownArticle";
import RightDownArticle from "@/sections/article/RightDownArticle";
import { Box } from "@mui/material";

export default function SecondSection() {
  return (
    <Box sx={{position: "relative ", display: "flex", backgroundColor: "#e6e4e4", gap: "150px"}} disableGutters>
      <LeftDownArticle></LeftDownArticle>
      <RightDownArticle></RightDownArticle>
    </Box>
  );
}