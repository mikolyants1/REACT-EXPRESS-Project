import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import './index.css'
import {createBrowserRouter,RouterProvider,Outlet,Navigate} from 'react-router-dom'
import { catchedStore, store } from './model/store/store/store.js'
import Home from './ui/views/home/Home.js'
import Entry from './ui/views/login/entry/Entry.js'
import Regist from './ui/views/login/regist/Regist.js'
import { HomeRout } from './ui/routes/HomeRout.js'
import { SettingRoute } from './ui/routes/SettingRoute.js'
import Main from './ui/views/home/main/Main.js'

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
        path:'regist',
        element:<Regist />,
      },
      {
        path:'home',
        element:<Home />,
        children:[
          {
            path:'main',
            element:<HomeRout />,
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
            path:'setting',
            element:<HomeRout />,
            children:[
              {
                index:true,
                element:<SettingRoute />
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
      <PersistGate persistor={catchedStore}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    );
  }

export default App