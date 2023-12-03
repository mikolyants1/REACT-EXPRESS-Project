import Entry from './Component/wrap/login/Entry.js'
import Regist from './Component/wrap/login/Regist.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import './index.css'
import {createBrowserRouter,RouterProvider,
Outlet,Navigate} from 'react-router-dom'
import Page from './Component/wrap/Page.js'
import { catched, store} from './store/store.js'
import { MainPage, Rout, SettPage } from './Component/Routes.js'

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
            element:<Rout />,
            children:[
              {
                index:true,
                element:<Navigate to=':id' />
              },
              {
                path:':id',
                element:<MainPage />
              }
            ]
          },
          {
            path:'set',
            element:<Rout />,
            children:[
              {
                index:true,
                element:<Navigate to=':id' />
              },
              {
                path:':id',
                element:<SettPage />
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