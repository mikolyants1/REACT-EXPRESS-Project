import { Location, Navigate, useLocation, useOutletContext,} from "react-router-dom";
import {  HeaderBlock,SetContain, SetMain,SetTitle} from "../../../style/style.js";
import { useCallback,useState} from "react";
import {  EvtC, EvtK, IData, IOutlet, IQuery} from "../../../types/type.js";
import { useChanUserMutation,useGetUserQuery} from "../../../store/api/endpoints/UserEndpoints.js";
import ProfileLogoCard from "../../ui/cards/setcards/ProfileLogoCard.js";
import AccButton from "../../ui/buttons/Account.js";
import Loader from "../../ui/blocks/load/Loader.js";
import Error from "../../ui/blocks/load/Error.js";
import ThemeCard from "../../ui/cards/setcards/ThemeCard.js";
import { UserTheme } from "../../helpers/Context.js";
import UserSetCard from "../../ui/cards/setcards/UserSetCard.js";

interface state{
  name:string,
  pass:string,
}

interface Props{
  children:JSX.Element
}

export default function Setting({children}:Props):JSX.Element{
 const {val,user,translate} = useOutletContext<IOutlet>();
 const {data,isError,isLoading} = useGetUserQuery<IQuery<IData>>(user);
 const [state,setState] = useState<state>({} as state);
 const {state:id}:Location<string> = useLocation();
 const [auth,setAuth] = useState<boolean>(false);
 const [chanData] = useChanUserMutation<IData[]>();

 const change = useCallback(({target}:EvtC):void=>{
  setState((prv:state)=>({
   ...prv,[target.name]:target.value
    }));
 },[data]);

 const click = useCallback((e:EvtK):void=>{
   if (e.key==='Enter'){
    const {name,pass}:state = state;
    if (typeof data!=='undefined'){
    if (e.currentTarget.name == 'name' && name !== ""){
      console.log("work")
        chanData({
          id:data.id,
          name:name,
          pass:data.pass
        });
     }
    if (e.currentTarget.name=='pass' && pass !== ""){
        chanData({
          id:data.id,
          name:data.name,
          pass:pass
        });
      }
    }
    setAuth(true);
  }
  },[state]);
  
 if (auth) return <Navigate to='/' />;
 if (isLoading) return <Loader back={val} />;
 if (isError) return <Error back={val} />;

  return (
    <UserTheme.Provider
     value={{change,click}}>
      <SetContain val={val}>
        <HeaderBlock back={val}>
          <SetTitle>
            {translate&&translate(`${id}`)}
          </SetTitle>
          {children}
        </HeaderBlock>
        <SetMain> 
         {id=='Profile'? (
          <>
            <ProfileLogoCard
             name={data.name}
             logoText={translate("name")}
             />
            <UserSetCard
             name={data.name}
             />
            <AccButton
             set={setAuth}
             id={data.id}
             />
          </>
          ):(
          <ThemeCard /> 
          )}
        </SetMain>
      </SetContain>
   </UserTheme.Provider>
  );
};
