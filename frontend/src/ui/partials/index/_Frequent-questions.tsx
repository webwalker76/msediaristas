import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@material-ui/core";
import {
  SectionContainer,
  Wave,
  SectionTitle,
  SectionSubTitle,
  AccordionStyled,
} from "./_Frequent-questions.style";

import { useState } from "react";

const questionsList = [
  {
    question: "Dúvida 1",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore omnis nisi consequatur enim quibusdam sed officiis! Quaerat, et sapiente ab deleniti maiores, aliquid iste officiis fugiat nam sed, culpa obcaecati?",
  },
  {
    question: "Dúvida 2",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore omnis nisi consequatur enim quibusdam sed officiis! Quaerat, et sapiente ab deleniti maiores, aliquid iste officiis fugiat nam sed, culpa obcaecati?",
  },
  {
    question: "Dúvida 3",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore omnis nisi consequatur enim quibusdam sed officiis! Quaerat, et sapiente ab deleniti maiores, aliquid iste officiis fugiat nam sed, culpa obcaecati?",
  },
  {
    question: "Dúvida 4",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore omnis nisi consequatur enim quibusdam sed officiis! Quaerat, et sapiente ab deleniti maiores, aliquid iste officiis fugiat nam sed, culpa obcaecati?",
  },
];

const FrequentQuestions = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);

  function isOpen(accordionNumber: number): boolean {
    return activeAccordion === accordionNumber;
  }

  function changeOpenAccordion(accordionNumber: number) {
    setActiveAccordion(accordionNumber);
    if (isOpen(accordionNumber)) {
      setActiveAccordion(0);
    } else {
      setActiveAccordion(accordionNumber);
    }
  }

  function getIcon(accordionNumber: number) {
    return isOpen(accordionNumber) ? "twf-minus" : "twf-plus";
  }

  return (
    <SectionContainer>
      <Wave src={"/img/home/waves.svg"} />
      <Container>
        <SectionTitle>Ainda está com dúvidas?</SectionTitle>
        <SectionSubTitle>Veja abaixo as perguntas frequentes</SectionSubTitle>
        {questionsList.map((item, index) => (
          <AccordionStyled
            key={index}
            expanded={isOpen(index + 1)}
            onChange={() => changeOpenAccordion(index + 1)}
          >
            <AccordionSummary expandIcon={<i className={getIcon(index + 1)} />}>
              <Typography color="primary"> {item.question} </Typography>
            </AccordionSummary>
            <AccordionDetails> {item.answer} </AccordionDetails>
          </AccordionStyled>
        ))}
      </Container>
    </SectionContainer>
  );
};

export default FrequentQuestions;
