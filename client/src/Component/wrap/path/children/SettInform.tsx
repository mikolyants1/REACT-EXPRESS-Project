import { ProfileBut, ProfileChan, ProfileInput, ProfileName, ProfilePass,
ThemeBlock, ThemeInput, ThemeText } from "../../../../style/style.js"
import { Context, EvtC, EvtK, Null, Type, outlet } from "../../../../types/type.js"
import { memo,NamedExoticComponent,useState,useContext} from 'react'
import { useOutletContext } from "react-router-dom";
import { Theme } from "../../Page.js";

interface props {
    set:(e:EvtC)=>void,
    name:string,
    val?:Type<string>,
    click:(e:EvtK)=>void
  };
  
export const SetUser:NamedExoticComponent<props> = memo(
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
  
  interface themeProp{
    change:(e:EvtC)=>void,
    back:string,
    arr:string[],
    name:string
  };
  
  export const SetTheme=({arr,change,back,name}:themeProp):JSX.Element=>{
    const {translate} = useContext<Context>(Theme);
    const first:string = name.slice(0,1).toUpperCase();
    const second:string = name.slice(1);
    const Name:string = [first,second].join('');
    return (
        <ProfilePass>
          <ProfileName>
            {translate&&translate(Name)}
          </ProfileName>
          {arr.map((i:string):JSX.Element=>(
            <ThemeBlock>
              <ThemeInput
               onChange={change}
               key={i}
               value={i}
               checked={back==i}
               type="radio"
               name={name} 
                />
              <ThemeText>
                 {i}
             </ThemeText>
           </ThemeBlock>
            ))}
        </ProfilePass>
    );
  };