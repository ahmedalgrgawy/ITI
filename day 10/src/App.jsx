import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { RegistrationForm } from "./components/Form/RegistrationForm ";
import { ProductsPage } from "./components/Products/ProductsPage";
import CartPage from "./components/CartPage";

function App() {
  return (

    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  )
}

export default App;