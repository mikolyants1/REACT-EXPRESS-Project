import Entry from './Component/views/login/Entry.js'
import Regist from './Component/views/login/Regist.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import './index.css'
import {createBrowserRouter,RouterProvider,
Outlet,Navigate} from 'react-router-dom'
import Page from './Component/views/Page.js'
import { catched, store} from './store/store.js'
import WrapRout from './Component/routes/WrapRout.js'
import SettRout from './Component/routes/SettRout.js'
import Main from './Component/views/path/Main.js'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Outlet />,
    children:[
      {
        index:true,
        element:<Entry />
      },
      {
        path:'reg',
        element:<Outlet />,
        children:[
          {
            index:true,
            element:<Regist />
          }
        ]
      },
      {
        path:'page',
        element:<Page />,
        children:[
          {
            path:'main',
            element:<WrapRout />,
            children:[
              {
                index:true,
                element:<Navigate to=':id' />
              },
              {
                path:':id',
                element:<Main />
              }
            ]
          },
          {
            path:'set',
            element:<WrapRout />,
            children:[
              {
                index:true,
                element:<SettRout />
              }
            ]
          }
        ]
      }
    ]
  }
]);

function App():JSX.Element{
  return (
    <Provider store={store}>
      <PersistGate persistor={catched}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    );
  };

export default App