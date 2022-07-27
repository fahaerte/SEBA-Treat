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
      <Link to={"/purchase-credits"} display={"text"} underline={false}>
        <Icon type={"coin"} /> {credits}
      </Link>
    </Button>
    <DropdownToggle caret>
      <Icon type={"person"} /> {firstName}
    </DropdownToggle>
    <DropdownMenu end={true}>
      <DropdownItem onClick={handleReservationNavigation}>
        Meal Reservations
      </DropdownItem>
      <Link route to={"/account"} className={"dropdown-item"}>
        My Profile
      </Link>
      <DropdownItem divider />
      <DropdownItem onClick={handleLogout}>
        <Icon type={"box-arrow-right"} /> Logout
      </DropdownItem>
    </DropdownMenu>
  </StyledDropdown>
);
