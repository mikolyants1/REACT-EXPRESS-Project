import { Location, Navigate, useLocation, useOutletContext,} from "react-router-dom";
import {  HeaderBlock,SetContain, SetMain,SetTitle} from "../../../../libs/style/style.js";
import { useCallback,useState} from "react";
import {  TEvtC, TEvtK, IData, IOutlet, IQuery} from "../../../../libs/types/type.js";
import { useChanUserMutation,useGetUserQuery} from "../../../../model/store/api/endpoints/userEndpoints.js";
import Loader from "../../../../ui/cards/loading/Loader";
import Error from "../../../../ui/cards/loading/Error";
import { UserContext } from "../../../../model/context/UserContext";
import { AccountButton } from "./buttons/AccountButton";
import ThemeCard from "./content/theme/ThemeCard";
import UserSetCard from "./content/set/UserSetCard";
import ProfileLogoCard from "./content/profile/ProfileLogoCard";

interface IState{
  name:string,
  pass:string,
}

interface IProps{
  children:JSX.Element
}

export default function Setting({children}:IProps):JSX.Element{
 const {theme,user,translate} = useOutletContext<IOutlet>();
 const {data,isError,isLoading} = useGetUserQuery<IQuery<IData>>(user);
 const [state,setState] = useState<IState>({} as IState);
 const {state:id}:Location<string> = useLocation();
 const [auth,setAuth] = useState<boolean>(false);
 const [chanData] = useChanUserMutation<IData[]>();

 const change = useCallback(({target}:TEvtC):void => {
  setState((prv:IState)=>({
   ...prv,[target.name]:target.value
    }));
 },[data]);

 const click = useCallback((e:TEvtK):void => {
   if (e.key === 'Enter'){
    const {name,pass}:IState = state;
    if (typeof data !== 'undefined'){
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
 if (isLoading) return <Loader back={theme} />;
 if (isError) return <Error back={theme} />;

  return (
    <UserContext.Provider
     value={{change,click}}>
      <SetContain val={theme}>
        <HeaderBlock back={theme}>
          <SetTitle>
            {translate&&translate(`${id}`)}
          </SetTitle>
          {children}
        </HeaderBlock>
        <SetMain> 
         {id == 'Profile' ? (
          <>
            <ProfileLogoCard
             name={data.name}
             logoText={translate("name")}
             />
            <UserSetCard
             name={data.name}
             />
            <AccountButton
             set={setAuth}
             id={data.id}
             />
          </>
          ):(
          <ThemeCard /> 
          )}
        </SetMain>
      </SetContain>
   </UserContext.Provider>
  );
}
