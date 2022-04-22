import logo from './logo.svg';
import './App.css';
import { main} from './calls';
import { useState } from "react";

main()

function App() {
  const timeTill5 = useState(new Date().toLocaleTimeString());

  return (
    <div className="w-screen h-screen text-white bg-black flex items-center justify-center">
      <div>{timeTill5}</div>
    </div>
  );
}

export default App;
