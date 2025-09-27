import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Sign from "./components/Sign";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/sign" element={<Sign />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
