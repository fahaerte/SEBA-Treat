import React from "react";
import { ICardImage } from "./ICardImage";

const CardImage = ({ src, alt, className = "" }: ICardImage) => (
  <img src={src} className={`card-img-top ${className}`} alt={alt} />
);

export default CardImage;
