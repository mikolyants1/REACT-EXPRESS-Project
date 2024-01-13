import {memo} from 'react'
import UserSetBlock from '../../inputs/User'
import { getPass, useAppSelector } from '../../../../store/store'

interface props {
  name:string
}
interface sets {
    val:string,
    name:string
}
function UserSetCard({name}:props):JSX.Element {
  const pass:string = useAppSelector(getPass);
  const sets:sets[] = [
    {name:"name",val:name},
    {name:"pass",val:pass}
  ]
  return (
    <>
      {sets.map(({name,val}:sets):JSX.Element=>(
        <UserSetBlock
         val={val}
         name={name}
         />
      ))}
    </>
  )
}

export default memo(UserSetCard)