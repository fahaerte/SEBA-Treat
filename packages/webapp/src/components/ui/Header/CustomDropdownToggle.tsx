import React from "react";
import { DropdownToggle, DropdownItem, DropdownMenu, Button } from "reactstrap";
import { Icon, Link } from "../index";
import { StyledDropdown } from "./styles";

export const DropdownExample = ({
  credits,
  firstName,
  logOutFunction,
}: {
  credits: number;
  firstName: string;
  logOutFunction: () => void;
}) => (
  <StyledDropdown group>
    <Button className={"btn-secondary"}>
      <Link to={"/account"} display={"text"} underline={false}>
        {credits} Credits
      </Link>
    </Button>
    <DropdownToggle caret>{firstName}</DropdownToggle>
    <DropdownMenu end={true}>
      <Link route to={"/register/company"} className={"dropdown-item"}>
        Meal Reservations
      </Link>
      <Link route to={"/register/company"} className={"dropdown-item"}>
        My Offers
      </Link>
      <Link route to={"/register/company"} className={"dropdown-item"}>
        My Profile
      </Link>
      <DropdownItem divider />
      <DropdownItem onClick={logOutFunction}>
        <Icon type={"box-arrow-right"} /> Logout
      </DropdownItem>
    </DropdownMenu>
  </StyledDropdown>
);
