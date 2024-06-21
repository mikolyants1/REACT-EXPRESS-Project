import { ProfileName, ProfilePass,ThemeBlock,
ThemeInput, ThemeText } from "../../../../../../../libs/style/style.js"
import { IContext, TEvtC} from "../../../../../../../libs/types/index.js"
import { AppContext } from "../../../../../../../model/context/AppContext"
import { FC, useContext} from 'react'
   
interface IThemeProp{
  change:(e:TEvtC)=>void,
  back:string,
  idx:number,
  name:string
}
     
export const ThemeToggleCard:FC<IThemeProp> = ({idx,change,back,name}):JSX.Element => {
  const arrays:string[][] = [['white','black'],["en","ru"]];
  const {translate} = useContext<IContext>(AppContext);
  const first:string = name.slice(0,1).toUpperCase();
  const second:string = name.slice(1);
  const Name:string = `${first}${second}`;
       
    return (
       <ProfilePass>
         <ProfileName>
           {translate && translate(Name)}
         </ProfileName>
         {arrays[idx].map((i:string):JSX.Element=>(
         <ThemeBlock>
           <ThemeInput
             onChange={change}
             key={i}
             value={i}
             checked={back == i}
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
}