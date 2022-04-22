import { useState } from "react";

function App() {
  const timeTill5 = useState(new Date().toLocaleTimeString());

  return (
    <div className="w-screen h-screen text-white bg-black flex items-center justify-center">
      <div>{timeTill5}</div>
    </div>
  );
}

export default App;
