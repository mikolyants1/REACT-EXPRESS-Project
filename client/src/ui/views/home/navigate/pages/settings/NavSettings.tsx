import { useCallback, useContext, useState } from "react"
import { useGetUserQuery } from "../../../../../../model/store/api/endpoints/userEndpoints.js"
import { IContext, ISettProps, IData, IQuery } from "../../../../../../libs/types/index.js"
import { AppContext } from "../../../../../../model/context/AppContext.js"
import Loader from "../../../../../../ui/cards/loading/Loader.js"
import Error from "../../../../../../ui/cards/loading/Error.js"
import UpdateCard from "./cards/UpdateCard"
import LinkCard from "./cards/LinkCard"

export default function NavSettings({set,call}:ISettProps):JSX.Element{
  const {user,theme} = useContext<IContext>(AppContext);
  const [idx,setIdx] = useState<number>(-1);
  const {data,isError,isLoading} = useGetUserQuery<IQuery<IData>>(user);

    const toggle = useCallback(():void=>{
      call(user);
      set({type:1});
    },[]);

   const nav = useCallback((id:number)=> () => setIdx(id),[]);

    if (isLoading) return <Loader back={theme} />;
    if (isError) return <Error back={theme} />;
    return (
         <>
          <UpdateCard
           navigate={nav(0)}
           fill={idx == 0}
           name={data.name}
            />
          <LinkCard
           path={`main/${user}`}
           navigate={toggle}
           text="Main"
           children={<>&#9733;</>}
            />   
          <LinkCard
           path="setting"
           fill={idx==1}
           navigate={nav(1)}
           text="Theme"
           children={<>&diams;</>}
           />
        </>
    );
}
