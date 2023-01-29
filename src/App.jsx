import React, { createContext, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import ConsultPage from "./components/ConsultPage";

const MyContext = createContext();

function App() {
  const [value, setValue] = useState(" ");
  return (
    <BrowserRouter>
      <MyContext.Provider value={{ value, setValue }}>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/Consult" element={<ConsultPage />} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
