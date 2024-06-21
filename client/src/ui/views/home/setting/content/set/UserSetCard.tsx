import {memo} from 'react'
import { getPass, useAppSelector } from '../../../../../../model/store/store/store'
import { ISets } from '../../../../../../libs/types';
import { createProfileField } from '../../../../../../model/functions/create/createProfileFields';
import UserInputCard from './cards/UserInputCard';

interface IProps {
  name:string
}

function UserSetCard({name}:IProps):JSX.Element {
  const pass:string = useAppSelector(getPass);
  const sets:ISets[] = createProfileField(name,pass);
  
  return (
    <>
      {sets.map(({name,val}:ISets):JSX.Element=>(
        <UserInputCard
         key={name}
         val={val}
         name={name}
         />
      ))}
    </>
  );
}

export default memo(UserSetCard);