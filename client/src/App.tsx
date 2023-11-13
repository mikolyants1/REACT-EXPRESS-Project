import Main from './Component/Main.js'
import Entry from './Component/Entry.js'
import Regist from './Component/Regist.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import './index.css'
import {createBrowserRouter,RouterProvider,Outlet,
 Navigate, useOutletContext} from 'react-router-dom'
import Page from './Component/Page.js'
import Setting from './Component/Setting.js'
import { bind, catched, getCurrent, getTheme, store,
 useAction,useAppSelector} from './store/store.js'
import { Dispatch, SetStateAction } from 'react'
import ToogleMenu from './Component/Toggle.js'


const Rout=():JSX.Element=>{
  const set:Dispatch<SetStateAction<boolean>> = useOutletContext()
  const theme = useAppSelector(getTheme)
  const current = useAppSelector(getCurrent)
  const {setTheme}:bind = useAction()
  return (
    <Outlet
     context={{
      val:theme,
      set:setTheme,
      user:current,
      show:set
    }}
     />
  )
}
const MainPage=():JSX.Element=>{
  return (
    <Main>
      <ToogleMenu />
    </Main>
  )
}
const SettPage=():JSX.Element=>{
  return (
    <Setting>
      <ToogleMenu />
    </Setting>
  )
}
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
            element:<Navigate to=':id' />
          },
          {
            path:':id',
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
])

  export default function App():JSX.Element{
    return (
    <Provider store={store}>
      <PersistGate persistor={catched}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    )
  }

