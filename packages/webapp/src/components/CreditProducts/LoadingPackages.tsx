import React from "react";
import { Card, Col, SkeletonSquare } from "../index";

const LoadingPackages = () => (
  <>
    <Col>
      <Card>
        <SkeletonSquare height={"150px"} rounded={false} />
      </Card>
    </Col>
    <Col>
      <Card>
        <SkeletonSquare height={"150px"} rounded={false} />
      </Card>
    </Col>
    <Col>
      <Card>
        <SkeletonSquare height={"150px"} rounded={false} />
      </Card>
    </Col>
  </>
);
export default LoadingPackages;
