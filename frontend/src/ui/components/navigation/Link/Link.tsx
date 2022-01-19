import React from "react";
import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  ButtonProps,
} from "@material-ui/core";
import Router from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export interface LinkProps {
  //utilizar o sufixo props é o padrão do material ui por convenção
  href: string;
  mui?: MuiLinkProps | ButtonProps; //aceita as propriedades tanto de link como de botão
  next?: NextLinkProps;
  Component?: React.ElementType;
  onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({
  children,
  href,
  next,
  mui,
  Component = MuiLink,
  ...props
}) => {
  // => extrai as props diretamente para children
  // o FC indica a criação de um Function Component
  const isNextEnv = Boolean(Router.router); //isNextEnv - ambiente do next, se retornar falso indica que está no next.
  return isNextEnv ? (//importante o href no inicio neste caso pois ele não será sobrescrito
    <NextLink href={href} passHref {...next}>
      <Component {...mui} {...props}>
        {" "}
        {children}{" "}
      </Component>
    </NextLink>
  ) : (
    <Component href={href} {...mui} {...props}>
      {" "}
      {children}{" "}
    </Component>
  );
};

export default Link;
