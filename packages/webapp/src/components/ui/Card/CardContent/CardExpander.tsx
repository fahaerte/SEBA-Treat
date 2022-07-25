import React, { useState } from "react";
import Collapse from "../../Collapse/Collapse";
import Icon from "../../Icon/Icon";
import { IComponentBase } from "../../../../assets/theme/types/IComponentBase";
import { Button } from "../../index";

const CardExpander = ({ className = "", children }: IComponentBase) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`card-expander ${className}`}>
      <div className="d-flex justify-content-end">
        <Button onClick={() => setOpen(!open)}>
          <Icon type={open ? "chevronUp" : "chevronDown"} />
        </Button>
      </div>
      <Collapse show={open}>{children}</Collapse>
    </div>
  );
};

export default CardExpander;
