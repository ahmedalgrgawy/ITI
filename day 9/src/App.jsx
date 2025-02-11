import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { RegistrationForm } from "./components/Form/RegistrationForm ";
import { ProductsPage } from "./components/Products/ProductsPage";

function App() {
  return (

    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  )
}

export default App;