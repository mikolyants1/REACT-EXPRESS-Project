import { NamedExoticComponent, memo, useState } from "react";
import { EvtC, EvtK, Null, Type, outlet } from "../../../types/type";
import { useOutletContext } from "react-router-dom";
import { ProfileBut, ProfileChan, ProfileInput,
 ProfilePass } from "../../../style/style";

interface props {
    set:(e:EvtC)=>void,
    name:string,
    val?:Type<string>,
    click:(e:EvtK)=>void
  };
  
const UserSetBlock:NamedExoticComponent<props> = memo(
 ({name,set,val,click}:props):Null<JSX.Element>=>{
   const [show,setShow] = useState<boolean>(false);
   const {translate} = useOutletContext<outlet>();
      return (
         <ProfilePass>
           <ProfileChan>
             <ProfileBut onClick={()=>setShow(true)}>
                {translate('change')} {translate(name)}
             </ProfileBut>
            {show&&(
             <ProfileBut onClick={()=>setShow(false)}>
                {translate('close')}
             </ProfileBut>
             )}
           </ProfileChan>
           {show&&(
           <ProfileInput
            name={name}
            onChange={set}
            defaultValue={val}
            onKeyUp={click}
            />
           )}
         </ProfilePass>
      );
  });

export default UserSetBlock