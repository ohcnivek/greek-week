import { useEffect, useState } from "react";
import timezones from "./timezones.json";

const DARK_BACKGROUND = "rgba(0,0,0,0.5)";
const CONTAINER_STYLE = "p-5 rounded-xl max-w-xl";

const DESCRIPTION =
  "Regardless of the various cultural and religious backgrounds that Tech students come from, once they get off of work (school) they can come together, by the ideology that it is five o’clock somewhere, and enjoy each other’s company";

function App() {
  const target5Oclock = new Date(new Date().setHours(17, 0, 0, 0));

  const [timeUntil5Oclock, setTimeUntil5Oclock] = useState("");
  const [closestTimezone, setClosestTimezone] = useState("");

  useEffect(() => {
    setInterval(() => {
      const { timezone } = findClosestTimezoneTo5();

      const currentTime = new Date();
      const minuteDifference = (60 - currentTime.getMinutes() - 1).toString().padStart(2, "0");
      const secondDifference = (59 - currentTime.getSeconds()).toString().padStart(2, "0");

      setTimeUntil5Oclock(minuteDifference + ":" + secondDifference);
      setClosestTimezone(timezone.timezone);
    }, 1000);
  }, []);

  function findClosestTimezoneTo5() {
    const now = new Date();
    const currentTime = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    );

    const closestTimezone = {};

    for (const timezone of timezones) {
      const offsetMultiplier = timezone.utc_offset[0] === "-" ? -1 : 1;
      const offsetHours = parseInt(timezone.utc_offset.slice(1, 3));
      const offsetTime = offsetMultiplier * offsetHours * 60 * 60 * 1000;

      const timezoneTime = new Date(currentTime.getTime() + offsetTime);
      // const timezoneHours = timezoneTime.getHours();
      // const timezoneMinutes = timezoneTime.getMinutes();
      // const timezoneSeconds = timezoneTime.getSeconds();
      // const fiveHours = target5Oclock.getHours();
      // const fiveMinutes = target5Oclock.getMinutes();
      // const fiveSeconds = target5Oclock.getSeconds();
      // const diffHours = fiveHours - timezoneHours;
      // const diffMinutes = fiveMinutes - timezoneMinutes;
      // const diffSeconds = fiveSeconds - timezoneSeconds;
      // const diffTotal = diffHours * 60 * 60 * 1000 + diffMinutes * 60 * 1000 + diffSeconds * 1000;
      const diffTotal = target5Oclock.getTime() - timezoneTime.getTime();

      if (diffTotal > 0 && (!closestTimezone.differenceTo5 || diffTotal < closestTimezone.differenceTo5)) {
        closestTimezone.timezone = timezone;
        closestTimezone.differenceTo5 = diffTotal;
        // closestTimezone.diffHours = diffHours;
        // closestTimezone.diffMinutes = diffMinutes;
        // closestTimezone.diffSeconds = diffSeconds;
      }
    }

    return closestTimezone;
  }

  const Container = ({ className, children }) => {
    return (
      <div className={CONTAINER_STYLE + " " + className} style={{ backgroundColor: DARK_BACKGROUND }}>
        {children}
      </div>
    );
  };

  return (
    <div className="w-screen h-screen text-white bg-[url('./assets/island.jpeg')] bg-cover flex flex-col gap-2 items-center justify-center">
      <Container className="items-center flex flex-col gap-2 text-center">
        <div className="text-4xl font-bold">{timeUntil5Oclock}</div>
        <div className="flex gap-2 items-center">
          <div className="text-sm">{"until 5 o-clock in"}</div>
          <div className="text-lg font-bold">{closestTimezone}</div>
        </div>
        <div>{DESCRIPTION}</div>
      </Container>
    </div>
  );
}

export default App;
