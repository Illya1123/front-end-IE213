import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyProviders from './context';
import { FullLayout} from "./layouts";
import { Home, ProductDetail, ProductList, About, PageNotFound, Register } from "./pages";
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
  return (
    <MyProviders>
         <RouterProvider router={router} />
    </MyProviders>
  );
}

export default App;
