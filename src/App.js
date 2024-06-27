import React, { useEffect, useState } from 'react'; 
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyProviders from './context';
import { FullLayout} from "./layouts";
import { Home, ProductDetail, ProductList, About, PageNotFound, Register, ProductFound} from "./pages";
import PaymentPage from "./pages/product/PaymentPage"
import OrderDetail from './pages/product/OrderDetail';
import Modal from 'react-modal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FullLayout />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'products',
        element: <ProductList />
      },
      {
        path: 'products/search',
        element: <ProductFound />
      },
      {
        path: 'products/:id',
        element: <ProductDetail />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path:'payment/:id',
        element: <PaymentPage />
      },
      {
        path:'orders/user/:userId',
        element: <OrderDetail />
      },
      {
        path: '',
        element: <Home />
      }
    ]
  },
  {
    path:'*',
    element: <PageNotFound />
  }
])

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    Modal.setAppElement(document.getElementById('root'));

    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
}, []);
  return (
    <MyProviders>
         <RouterProvider router={router} />
    </MyProviders>
  );
}

export default App;

