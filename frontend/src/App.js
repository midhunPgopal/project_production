import Login from "./pages/Auth/Login";
import OtpLogin from './pages/Auth/OtpLogin'
import Register from "./pages/Auth/Register";
import Cart from "./pages/User/Cart";
import Home from "./pages/User/Home";
import Product from "./pages/User/Product";
import Success from "./pages/User/Success";
import Orders from "./pages/User/Orders";
import ProductList from "./pages/User/ProductList";
import Checkout from './pages/User/Checkout'
import Wishlist from './pages/User/Wishlist'
import UserAccount from "./pages/User/UserAccount";
import EditAddress from './pages/User/EditAddress'
import TermsOfUse from "./pages/User/TermsOfUse";

import AdminHome from "./pages/Admin/AdminHome";
import AdminProduct from "./pages/Admin/AdminProduct";
import AdminLogin from "./pages/AdminAuth/AdminLogin";
import EditProduct from "./pages/ProductManagement/EditProduct";
import EditCategory from "./pages/categoryManagement/EditCategory";
import EditOrder from './pages/OrderManagement/EditOrder'
import EditUser from './pages/UserManagement/EditUser'
import EditBanner from './pages/BannerManagement/EditBanner'
import EditAnnouncement from './pages/AnnouncementManagement/EditAnnouncement'
import EditCoupon from './pages/CouponManagement/EditCoupon'

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

function App() {

  const admin = useSelector(state => state.admin.currentAdmin)
  const user = useSelector((state) => state.user.currentUser)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={user ? <Navigate to='/' /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
        <Route path="/otplogin" element={user ? <Navigate to='/' /> : <OtpLogin />} />
        <Route exact path="/" element={ <Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/all" element={<ProductList />} />
        <Route path="/products/cat/:value" element={<ProductList />}/>
        <Route path="/products/offer/:value" element={<ProductList />}/>
        <Route path="/products/search/:value" element={<ProductList />}/>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to='/login' />} />
        <Route path="/checkout" element={user ? <Checkout /> : <Navigate to='/login' />} />
        <Route path="/orders" element={user ? <Orders /> : <Navigate to='/login' />} />
        <Route path='/success' element={user ? <Success /> : <Navigate to='/login' />} />
        <Route path='/wishlist' element={user ? <Wishlist /> : <Navigate to='/login' />} />
        <Route path='/account' element={user ? <UserAccount /> : <Navigate to='/login' />} />
        <Route path='/editaddress/:id' element={user ? <EditAddress /> : <Navigate to='/login' />} />
        <Route path='/terms' element={<TermsOfUse /> } />
        <Route path="/admin" element={admin ? <AdminHome /> : <Navigate to='/adminlogin' />} />
        <Route path="/adminlogin" element={admin ? <Navigate to='/admin' /> : <AdminLogin />} />
        <Route path="/editproduct/:id" element={admin ? <EditProduct /> : <Navigate to='/adminlogin' />} />
        <Route path="/viewproduct/:id" element={admin ? <AdminProduct /> : <Navigate to='/adminlogin' />} />
        <Route path="/editcategory/:id" element={admin ? <EditCategory /> : <Navigate to='/adminlogin' />} />
        <Route path="/editorder/:id" element={admin ? <EditOrder /> : <Navigate to='/adminlogin' />} />
        <Route path="/edituser/:id" element={admin ? <EditUser /> : <Navigate to='/adminlogin' />} />
        <Route path="/editbanner/:id" element={admin ? <EditBanner /> : <Navigate to='/adminlogin' />} />
        <Route path="/editannouncement/:id" element={admin ? <EditAnnouncement /> : <Navigate to='/adminlogin' />} />
        <Route path="/editcoupon/:id" element={admin ? <EditCoupon /> : <Navigate to='/adminlogin' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
