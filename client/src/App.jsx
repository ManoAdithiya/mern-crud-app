import { useState } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Users";
import CreateUsers from "./CreateUser";
import UpdateUsers from "./UpdateUser";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/api/create" element={<CreateUsers />}></Route>
          <Route path="/api/update/:id" element={<UpdateUsers />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
