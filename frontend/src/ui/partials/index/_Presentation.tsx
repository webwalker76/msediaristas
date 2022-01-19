import { useState, useEffect } from "react";
import {
  SectionContainer,
  ContainerStyled,
  SectionTitle,
  SectionDescription,
  SectionButton,
  SectionPictureContainer,
  BottomButton,
} from "./_Presentation.style";

const Presentation = () => {
  const [cleanerPicture, setCleanerPicture] = useState("");
  useEffect(() => {
    const newCleanerPicture =
      Math.random() < 0.5 ? "img/home/housekeeper.png" : "img/home/janitor.png";
    setCleanerPicture(newCleanerPicture);
  }, []);
  return (
    <SectionContainer>
      <ContainerStyled>
        <SectionTitle>
          Encontre agora mesmo um(a) <em>diarista</em>.
          <i className={"twf-search"} />
        </SectionTitle>
        <SectionDescription>
          {" "}
          São mais de 5.000 profissionais esperado por você.
        </SectionDescription>
        <SectionButton
          mui={{ variant: "contained" }}
          href={"/encontrar-diarista"}
        >
          {" "}
          Encontrar um profissional
        </SectionButton>
        <SectionPictureContainer>
          <img src={cleanerPicture} alt="Diarista" />
        </SectionPictureContainer>
      </ContainerStyled>
      <BottomButton>
        <i className="twf-caret-down" />
      </BottomButton>
    </SectionContainer>
  );
};

export default Presentation;
