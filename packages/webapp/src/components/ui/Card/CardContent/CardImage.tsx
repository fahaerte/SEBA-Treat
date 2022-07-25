import React from "react";
import { SCCardImage } from "../styles";

interface IProps {
  /**
   * src url of image.
   */
  src: string;
  /**
   * Alternative text for image.
   */
  alt?: string;
  /**
   * Title for image.
   */
  title?: string;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

const CardImage = ({ src, alt, className = "" }: IProps) => (
  <SCCardImage
    src={src}
    className={`card-img-top ${className}`}
    alt={alt}
    // width={160}
    // height={160}
  />
);

export default CardImage;
