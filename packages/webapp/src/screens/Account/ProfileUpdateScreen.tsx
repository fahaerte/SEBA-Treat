import React from "react";
import { ProfileUpdate } from "../../components/Profile/ProfileUpdate";
import { Icon, SectionHeading } from "../../components";
import { PasswordUpdate } from "../../components/Profile/PasswordUpdate";

export const ProfileUpdateScreen = () => {
  return (
    <>
      <SectionHeading>Edit Personal Information</SectionHeading>
      <ProfileUpdate />
      <SectionHeading>
        <Icon type={"person"} /> Update Profile Picture
      </SectionHeading>
      Here you could edit the profile picture
      <SectionHeading>Update Password</SectionHeading>
      <PasswordUpdate />
    </>
  );
};
