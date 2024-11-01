import "./App.css";
// import { Button } from "./components/ui/button";
import { LoginForm } from "./components/ui/Login";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <LoginForm></LoginForm>
      <Toaster></Toaster>
    </>
  );
}

export default App;
