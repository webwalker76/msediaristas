import { styled } from "@material-ui/core/styles";
import { AppBar, Drawer, Paper, AppBarProps } from "@material-ui/core";

export const HeaderAppBar = styled((props: AppBarProps) => (
  <AppBar position={"sticky"} {...props} />
))`
  //.MuiAppBar-root sem o & indica para buscar uma classe que seja de um elemente filho do appbar
  &.MuiAppBar-root {
    //& indica que a classe acessada é do próprio que está sendo estilizado
    background-color: ${({ theme }) => theme.palette.background.paper};
    box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.05); //pos 1 afastamento horizontal 2 afastamento vertical 3 desfoque da sombra
    color: ${({ theme }) => theme.palette.text.secondary};
  }
  .MuiToolBar-root {
    //  grid-template-columns: auto auto 1fr auto;
    grid-template-columns: 52px auto 52px;
    display: grid;
    justify-content: space-between;
  }
  ${({ theme }) => theme.breakpoints.up("md")} {
    .MuiToolBar-root {
      grid-template-columns: auto auto 1fr auto;
      gap: ${({ theme }) => theme.spacing(9)};
      height: 100px;
    }
  }
`;

export const HeaderLogo = styled("img")`
  height: 25px;
  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 47px;
  }
`;

export const ButtonsContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const HeaderDrawer = styled(Drawer)`
  .MuiPaper-root {
    padding: ${({ theme }) => theme.spacing()};
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
  .MuiDivider-root {
    margin: ${({ theme }) => theme.spacing(2)};
    border-color: ${({ theme }) => theme.palette.primary.light};
  }
`;
