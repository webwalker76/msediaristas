import { styled } from "@material-ui/core/styles";
import { Accordion } from "@material-ui/core";
export const SectionContainer = styled("section")`
  padding-bottom: ${({ theme }) => theme.spacing(7)};
`;

export const Wave = styled("img")`
  margin-top: -100px;
  height: 100%;
  width: 100%;
`;

export const SectionTitle = styled("h2")`
  margin: 0;
  text-align: center;
`;

export const SectionSubTitle = styled("p")`
  position: relative;
  margin: ${({ theme }) => theme.spacing(2) + " 0 " + theme.spacing(10)};
  text-align: center;
  &::after {
    content: "";
    position: absolute;
    width: 96px;
    height: 3px;
    left: 50%;
    bottom: ${({ theme }) => theme.spacing(-5)};
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.palette.grey[300]};
  }
`;

export const AccordionStyled = styled(Accordion)`
  &.MuiAccordion-root {
    box-shadow: none;
    border: 2px solid ${({ theme }) => theme.palette.main};
    &::before {
      background-color: transparent;
    }
    &, //concatena a etilização com a do muiexpanded
    &.MuiExpanded {
      margin: -2px 0 0;
    }
  }

  .MuiAccordionSummary-content .MuyTypography-root {
    font-weight: bold;
  }
  .MuiAccordionDetails-root {
    padding-right: ${({ theme }) => theme.spacing(7)};
  }
  .MuiAccordionSummary-expandIconWrapper {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;
