import {memo} from 'react'
import { TEvtC, IOutlet, IThemes, TUnion } from '../../../../../../libs/types/type'
import { IBind, getLang, useAction, useAppSelector } from '../../../../../../model/store/store/store';
import { useOutletContext } from 'react-router-dom';
import { createThemes } from '../../../../../../model/functions/create/createThemes';
import { ThemeToggleCard } from './cards/ThemeToggleCard';

function ThemeCard():JSX.Element {
  const {theme} = useOutletContext<IOutlet>();
  const actions:IBind = useAction();
  const lang:string = useAppSelector(getLang);
  const themes:IThemes[] = createThemes(theme,lang,actions);

  const toggle = (set:TUnion) => (e:TEvtC):void => {
    set(e.target.value);
  };
  
  return (
    <>
      {themes.map((i:IThemes,idx:number):JSX.Element=>(
        <ThemeToggleCard
         key={i.name}
         idx={idx}
         change={toggle(i.set)}
         back={i.back}
         name={i.name}
        />
      ))}
    </>
  )
}

export default memo(ThemeCard);