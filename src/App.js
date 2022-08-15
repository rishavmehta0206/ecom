import { Routes, Route } from "react-router-dom";
import Shared from "./pages/Shared";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Shared />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
