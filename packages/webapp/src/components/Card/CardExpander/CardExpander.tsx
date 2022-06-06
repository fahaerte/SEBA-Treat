import React, { useState } from "react";
import Collapse from "../../Collapse/Collapse";
import { ICardExpander } from "./ICardExpander";
import Icon from "../../Icon/Icon";

const CardExpander = ({ className = "", children }: ICardExpander) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={className}>
        <div className="p-3 d-flex justify-content-end">
          <div onClick={handleClick}>
            <Icon type={open ? "chevronUp" : "chevronDown"} />
          </div>
        </div>
        <Collapse className="p-3" show={open}>
          {children}
        </Collapse>
      </div>
    </>
  );
};

export default CardExpander;
