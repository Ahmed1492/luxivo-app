import { Navbar } from './Component/navbar/Navbar.jsx';

import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { SingleProduct } from './pages/singleProduct/SingleProduct.jsx';
import { SingleCategory } from './pages/singleCategory/SingleCategory.jsx';
import { HomePage } from './pages/HomePage/HomePage.jsx';
import { Cart } from './pages/cart/Cart.jsx';
import { Profile } from './pages/profile/Profile.jsx';
import { Checkout } from './pages/checkout/Checkout.jsx';
import { Support } from './pages/support/Support.jsx';
import { SellerCenter } from './pages/sellerCenter/SellerCenter.jsx';
import { SearchResults } from './pages/searchResults/SearchResults.jsx';
import { NotFound } from './pages/notFound/NotFound.jsx';
import { Toast } from './Component/toast/Toast.jsx';

const getSingleCategory = 'https://dummyjson.com/products/category/';
const getSingleProduct = 'https://dummyjson.com/products/';
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Toast />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product/:id' element={<SingleProduct url={getSingleProduct} />} />
          <Route path='/category/:name' element={<SingleCategory url={getSingleCategory} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/support' element={<Support />} />
          <Route path='/seller-center' element={<SellerCenter />} />
          <Route path='/search' element={<SearchResults />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
