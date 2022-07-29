import React from "react";
import { SCCardImage } from "../styles";
import { ConfigService } from "../../../../utils/ConfigService";

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
  <SCCardImage>
    <div
      style={{
        backgroundImage: `url(${src})`,
      }}
    ></div>
  </SCCardImage>
);

export default CardImage;
