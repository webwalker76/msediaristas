import { useTheme, useMediaQuery } from "@material-ui/core";
//todos os hook iniciam com a palavra use e extensão ts devido ao typescript
export default function useIsMobile(): boolean {
  const theme = useTheme(),
    isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return isMobile;
}
