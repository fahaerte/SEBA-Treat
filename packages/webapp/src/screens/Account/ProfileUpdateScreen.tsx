import React from "react";
import { ProfileUpdate } from "../../components/Profile/ProfileUpdate";
import { Icon, SectionHeading } from "../../components";
import { PasswordUpdate } from "../../components/Profile/PasswordUpdate";

export const ProfileUpdateScreen = () => (
  <>
    <SectionHeading>
      <Icon type={"person"} /> Edit Personal Information
    </SectionHeading>
    <ProfileUpdate />
    <SectionHeading>
      <Icon type={"shield-lock"} /> Update Password
    </SectionHeading>
    <PasswordUpdate />
  </>
);
