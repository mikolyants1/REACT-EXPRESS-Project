import {memo} from 'react'
import ThemeSetBlock from '../../inputs/Theme'
import { EvtC, IOutlet, IThemes, union } from '../../../../types/type'
import { bind, getLang, useAction, useAppSelector } from '../../../../store/store/store';
import { useOutletContext } from 'react-router-dom';
import MakeThemes from '../../../helpers/functions/set/MakeThemes';

function ThemeCard():JSX.Element {
  const {val} = useOutletContext<IOutlet>();
  const actions:bind = useAction();
  const lang:string = useAppSelector(getLang);
  const themes:IThemes[] = MakeThemes(val,lang,actions);

  const toogle=(set:union)=>(e:EvtC):void=>{
    set(e.target.value);
  };
  
  return (
    <>
      {themes.map((item:IThemes,i:number):JSX.Element=>{
        const {set,back,name}:IThemes = item;
        return (
        <ThemeSetBlock
         key={name}
         idx={i}
         change={toogle(set)}
         back={back}
         name={name}
        />
      )})}
    </>
  )
}

export default memo(ThemeCard)