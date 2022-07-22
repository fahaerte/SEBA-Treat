import React from "react";
import { DropdownToggle, DropdownItem, DropdownMenu, Button } from "reactstrap";
import { Icon, Link } from "../index";
import { StyledDropdown } from "./styles";

export const CustomDropdown = ({
  credits,
  firstName,
  handleReservationNavigation,
  handleLogout,
}: {
  credits: number;
  firstName: string;
  handleLogout: () => void;
  handleReservationNavigation: () => void;
}) => (
  <StyledDropdown group>
    <Button className={"btn-secondary"}>
      <Link to={"/account"} display={"text"} underline={false}>
        {credits} Credits
      </Link>
    </Button>
    <DropdownToggle caret>{firstName}</DropdownToggle>
    <DropdownMenu end={true}>
      <DropdownItem onClick={handleReservationNavigation}>
        Meal Reservations
      </DropdownItem>
      <Link route to={"/"} className={"dropdown-item"}>
        My Offers
      </Link>
      <Link route to={"/"} className={"dropdown-item"}>
        My Profile
      </Link>
      <DropdownItem divider />
      <DropdownItem onClick={handleLogout}>
        <Icon type={"box-arrow-right"} /> Logout
      </DropdownItem>
    </DropdownMenu>
  </StyledDropdown>
);
