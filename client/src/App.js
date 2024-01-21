import {Route,Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';

import PageNotFound from './Pages/PageNotFound';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/user/Dashboard';
import PrivateRoute from './Components/Routes/Private';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Order from './Pages/user/Order';
import Profile from './Pages/user/Profile';
import Product from './Pages/Admin/Product';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Search from './Pages/Search';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Components/Categories';
import CategoriesProduct from './Pages/CategoriesProduct';
import Cartpage from './Pages/Cartpage';
import AdminOrder from './Pages/Admin/AdminOrder';
import TrainSchedule from './Pages/TrainSchedule';
import Yojana from './Pages/Yojana';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/product/:slug" element={<ProductDetails/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/cart" element={<Cartpage/>}/>
      <Route path="/trainlist" element={<TrainSchedule/>}/>
      <Route path="/kisanyojana" element={<Yojana/>}/>
      <Route path="/category/:slug" element={<CategoriesProduct/>}/>

      <Route path="/search" element={<Search/>}/>
      <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
          </Route>

      { <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path="admin/createcategory" element={<CreateCategory/>}/>
        <Route path="admin/createproduct" element={<CreateProduct/>}/>
        <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
        <Route path="admin/products" element={<Product/>}/>
      
        
        <Route path="admin/orders" element={<AdminOrder/>}/>
        </Route> }

      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
        
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
