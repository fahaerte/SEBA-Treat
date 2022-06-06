import React from "react";
import { Story, Meta } from "@storybook/react";
import { IBadge } from "./IBadge";
import { ABootstrapPalette } from "../../assets/themes/interfaces/TBootstrapPalette";
import BadgeComponent from "../Badge/Badge";
import Typography from "../Typography/Typography";

export default {
  title: "Lib/Badge",
  component: BadgeComponent,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    color: {
      control: {
        type: "select",
        options: ABootstrapPalette,
      },
    },
  },
} as Meta;

const Template: Story<IBadge> = (args) => (
  <Typography display="inline" variant="div">
    Badge scale to match size of immediate parent elemnt
    <BadgeComponent {...args}>This is a badge</BadgeComponent>
  </Typography>
);

export const Badge = Template.bind({});

Badge.args = {};
