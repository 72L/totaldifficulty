import { useEffect, useState } from "react";
import {
  HOURS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
} from "../utils/constants";
import BigNumber from "./BigNumber";

interface UnitDisplayProps {
  secondsLeft: number;
  unit: string;
  secondsInUnit: number;
  maxUnit: number;
}

const UnitDisplay = ({
  secondsLeft,
  unit,
  secondsInUnit,
  maxUnit,
}: UnitDisplayProps) => {
  return (
    <div className="flex flex-col items-center">
      <BigNumber>
        {`${Math.floor(secondsLeft / secondsInUnit) % maxUnit}`.padStart(
          2,
          "0"
        )}
      </BigNumber>
      <div className="text-gray-400">{unit}</div>
    </div>
  );
};

const Separator = () => <BigNumber>:</BigNumber>;

interface CountdownProps {
  toDate: Date;
}

const Countdown = ({ toDate }: CountdownProps) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setSecondsLeft(
        (toDate.getTime() - new Date().getTime()) / MILLISECONDS_IN_SECOND
      );
    }, 1000);

    return () => clearInterval(refreshInterval);
  }, [toDate]);

  return (
    <div className="flex flex-row gap-3 md:gap-4 lg:gap-6">
      <UnitDisplay
        secondsLeft={secondsLeft}
        unit={"days"}
        secondsInUnit={SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY}
        maxUnit={99}
      />
      <Separator />
      <UnitDisplay
        secondsLeft={secondsLeft}
        unit={"hours"}
        secondsInUnit={SECONDS_IN_MINUTE * MINUTES_IN_HOUR}
        maxUnit={24}
      />
      <Separator />
      <UnitDisplay
        secondsLeft={secondsLeft}
        unit={"minutes"}
        secondsInUnit={SECONDS_IN_MINUTE}
        maxUnit={60}
      />
      <Separator />
      <UnitDisplay
        secondsLeft={secondsLeft}
        unit={"seconds"}
        secondsInUnit={1}
        maxUnit={60}
      />
    </div>
  );
};

export default Countdown;
