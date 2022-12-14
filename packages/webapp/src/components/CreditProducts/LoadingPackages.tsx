import React from "react";
import { Col, SkeletonSquare } from "../index";

const LoadingPackages = () => (
  <>
    <Col>
      <SkeletonSquare height={"150px"} rounded />
    </Col>
    <Col>
      <SkeletonSquare height={"150px"} rounded />
    </Col>
    <Col>
      <SkeletonSquare height={"150px"} rounded />
    </Col>
  </>
);
export default LoadingPackages;
