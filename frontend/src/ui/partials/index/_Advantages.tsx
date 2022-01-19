import {
  GradientBackground,
  SectionTitle,
  ListStyled,
  AvatarStyled,
  ListItemTextStyled,
  ListDivider,
} from "./_Advantages.style";
import { ListItem, ListItemAvatar, Container } from "@material-ui/core";
import React from "react";

const advantagesList = [
  {
    icon: "twf-woman",
    title: "Diversidade",
    description: "São mais de 5.000 profissionais esperando por você",
  },
  {
    icon: "twf-certificate",
    title: "Diversidade",
    description: "São mais de 5.000 profissionais esperando por você",
  },
  {
    icon: "twf-search-2",
    title: "Rastreabilidade",
    description: "Você pode acessar todo o histórico do(a) profissional",
  },
  {
    icon: "twf-frame-broken",
    title: "Segurança",
    description: "Seguro sobre  qualquer possível dano",
  },
  {
    icon: "twf-payment",
    title: "Controle",
    description: "São mais de 5.000 profissionais esperando por você",
  },
  {
    icon: "twf-broom-bucket",
    title: "Experiência",
    description: "Mais de 50.000 diárias realizadas",
  },
];

const Advantages = () => {
  return (
    <GradientBackground>
      <Container>
        <SectionTitle>Por que usar o e-diaristas?</SectionTitle>
        <ListStyled>
          {advantagesList.map((item, index) => (
            <React.Fragment key={item.icon}>
              {index !== 0 && <ListDivider />}

              <ListItem disableGutters>
                <ListItemAvatar>
                  <AvatarStyled>
                    <i className={item.icon} />
                  </AvatarStyled>
                </ListItemAvatar>
                <ListItemTextStyled
                  primary={item.title}
                  secondary={item.description}
                />
              </ListItem>
            </React.Fragment> // tag vazia(react-fragment) permite passar mais de um item
          ))}
        </ListStyled>
      </Container>
    </GradientBackground>
  );
};

export default Advantages;
