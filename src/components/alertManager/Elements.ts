import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const AlertContainer = styled(Stack)(({ theme }) => ({
   width: "100%",
   padding: theme.spacing(2),
   backgroundColor: theme.palette.common.white,
   boxShadow: theme.shadows[10],
   borderRadius: 5,
}));
