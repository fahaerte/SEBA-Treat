import React from "react";

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
  <img src={src} className={`card-img-top ${className}`} alt={alt} />
);

export default CardImage;
