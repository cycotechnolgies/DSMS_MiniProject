import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm } from "@/components/ui/Login";
import { Toaster } from "@/components/ui/toaster";
import { AuthContextProvider } from "@/context/AuthContext";
import { Dashboard } from "./components/ui/Dashboard";


function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Define additional routes as needed */}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthContextProvider>
  );
}

export default App;
