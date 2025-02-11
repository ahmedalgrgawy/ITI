import { Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {
  return (

    <div className="flex flex-col gap-10 items-center justify-center min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/to-do" element={<TodoList />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  )
}

export default App;