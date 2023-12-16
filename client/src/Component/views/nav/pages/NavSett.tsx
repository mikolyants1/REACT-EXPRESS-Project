import { useCallback, useContext, useState } from "react"
import { useGetUserQuery } from "../../../../store/api/endpoints/UserEndpoints.js"
import { Loader, Error } from "../../../ui/Loader.js"
import { Context, SettProps, data, query } from "../../../../types/type.js"
import UpdateCard from "../../../ui/cards/navcards/UpdateCard.js"
import LinkCard from "../../../ui/cards/navcards/LinkCard.js"
import Theme from "../../../helpers/Context.js"

export default function NavSett({set,call}:SettProps):JSX.Element{
  const {user,val} = useContext<Context>(Theme);
  const [idx,setIdx] = useState<number>(-1);
  const {data,isError,isLoading} = useGetUserQuery<query<data>>(user);

    const toggle=useCallback(():void=>{
      call(user);
      set({type:1});
    },[]);

   const navigate=useCallback((id:number)=>():void=>{
    setIdx(id);
    },[]);

    if (isLoading) return <Loader back={val} />
    if (isError) return <Error back={val} />
    return (
         <>
          <UpdateCard
           navigate={navigate(0)}
           fill={idx==0}
           name={data.name}
            />
          <LinkCard
           path={`main/${user}`}
           navigate={toggle}
           text="Main"
           children={<>&#9733;</>}
            />   
          <LinkCard
           path="set/Theme"
           fill={idx==1}
           navigate={navigate(1)}
           text="Theme"
           children={<>&diams;</>}
           />
        </>
    );
};
