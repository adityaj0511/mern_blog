import { useState } from "react";
import Allroutes from "./Allroutes"
import "./App.css";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Navbar />
  <Allroutes />
  <Footer />
    </>
  );
}

export default App;
