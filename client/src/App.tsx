import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import OlapCube from "./pages/OlapCube"
import CustomerOrder from "./pages/CustomerOrder"
import Dashboard from "./pages/Dashboard"
import DeliveryOrder from "./pages/DeliveryOrder"
import Header from "./components/Header"

const App = () => {
  return (
    <>
      <Header />
      <div className="w-screen flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer-order" element={<CustomerOrder />} />
          <Route path="/delivery-order" element={<DeliveryOrder />} />
          <Route path="/olap" element={<OlapCube />} />
        </Routes>
      </div>
    </>
  )
}

export default App
