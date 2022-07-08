import React from "react";
import { CardBody, Card, Typography, Col } from "../ui";

interface ICountdown {
  hours: number;
  minutes: number;
  seconds: number;
}

// TODO: Countdown?
const CreditDiscount = ({
  discountTitle,
  discountValue,
  discountDeadline,
  productLabel,
  productPrice,
  onClick,
}: {
  discountTitle: string;
  discountDeadline: number;
  discountValue: number;
  productLabel: string;
  productPrice: number;
  onClick: () => void;
}) => {
  const calculateLeftOverTime = (): ICountdown => {
    const milliseconds =
      new Date(discountDeadline * 1000).getTime() - new Date().getTime();

    const hours = milliseconds / (1000 * 60 * 60);
    const absoluteHours = Math.floor(hours);
    // const h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

    //Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    // var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60;
    const absoluteSeconds = Math.floor(seconds);
    // var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    // return h + ':' + m + ':' + s;

    // const leftSeconds = Math.floor(leftTime / 1000);
    // const leftMinutes = Math.floor(leftSeconds / 60);
    // const leftHours = Math.floor(leftMinutes / 60);
    return {
      hours: absoluteHours,
      minutes: absoluteMinutes,
      seconds: absoluteSeconds,
    };
  };

  const leftOverTime = calculateLeftOverTime();
  const [time, setTime] = React.useState<ICountdown>(leftOverTime);

  const tick = () => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) reset();
    else if (time.hours === 0 && time.seconds === 0) {
      setTime({ hours: time.hours - 1, minutes: 59, seconds: 59 });
    } else if (time.seconds === 0) {
      setTime({ hours: time.hours, minutes: time.minutes - 1, seconds: 59 });
    } else {
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
    }
  };

  const reset = () =>
    setTime({
      hours: time.hours,
      minutes: time.minutes,
      seconds: time.seconds,
    });

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <Col>
      <Card color={"primary"} hoverable onClick={onClick}>
        <CardBody>
          <Typography variant={"h1"} className={"text-dark mb-5"}>
            {discountTitle} 🎉
          </Typography>
          <Typography variant={"h2"} className={"fw-normal text-dark mb-3"}>
            Get <strong>{productLabel}</strong> for only{" "}
            <strong>{(productPrice - discountValue) / 100} €</strong>.
          </Typography>
          <Typography variant={"h4"} className={"text-dark fw-normal"}>
            Hurry up, only{" "}
            <strong>{`${time.hours
              .toString()
              .padStart(2, "0")} hours ${time.minutes
              .toString()
              .padStart(2, "0")} minutes and ${time.seconds
              .toString()
              .padStart(2, "0")} seconds`}</strong>{" "}
            left!
          </Typography>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CreditDiscount;
