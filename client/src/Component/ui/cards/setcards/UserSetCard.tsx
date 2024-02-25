import {memo} from 'react'
import UserSetBlock from '../../inputs/User'
import { getPass, useAppSelector } from '../../../../store/store/store'
import { sets } from '../../../../types/type';
import MakeSets from '../../../helpers/functions/set/MakeSets';

interface props {
  name:string
}

function UserSetCard({name}:props):JSX.Element {
  const pass:string = useAppSelector(getPass);
  const sets:sets[] = MakeSets(name,pass);
  return (
    <>
      {sets.map(({name,val}:sets):JSX.Element=>(
        <UserSetBlock
         key={name}
         val={val}
         name={name}
         />
      ))}
    </>
  )
}

export default memo(UserSetCard)