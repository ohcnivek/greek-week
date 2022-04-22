import { main} from './calls';
import { useState } from "react";

const DARK_BACKGROUND = "rgba(0,0,0,0.5)";
const CONTAINER_STYLE = "p-5 rounded-xl max-w-xl";

const DESCRIPTION =
  "Regardless of the various cultural and religious backgrounds that Tech students come from, once they get off of work (school) they can come together, by the ideology that it is five o’clock somewhere, and enjoy each other’s company";

main()

function App() {
  const timeTill5 = useState(new Date().toLocaleTimeString());

  const Container = ({ className, children }) => {
    return (
      <div className={CONTAINER_STYLE + " " + className} style={{ backgroundColor: DARK_BACKGROUND }}>
        {children}
      </div>
    );
  };

  return (
    <div className="w-screen h-screen text-white bg-[url('./assets/island.jpeg')] bg-cover flex flex-col gap-2 items-center justify-center">
      <Container className="text-4xl font-bold">{timeTill5}</Container>
      <Container>{DESCRIPTION}</Container>
    </div>
  );
}

export default App;
