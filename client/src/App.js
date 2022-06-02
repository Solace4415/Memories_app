import React, {useState} from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar user={user} setUser ={setUser}/>
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
