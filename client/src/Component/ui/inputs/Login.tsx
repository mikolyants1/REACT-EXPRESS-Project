import {memo} from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { EntryInput, EntrySub, InputBlock } from '../../../style/style';
import { Control, InputProps, stateUser } from '../../../types/type';


function LoginInput({title,Name}:InputProps):JSX.Element {
  const {control} = useFormContext<stateUser>();
  return (
    <>
      <EntrySub>
        Enter your {title}
      </EntrySub>
      <InputBlock>
        <Controller
          name={Name}
          control={control}
          render={({field}):JSX.Element=>{
          const {onChange,value,name
          }:Control<`${typeof Name}`> = field;
          return (
           <EntryInput
            onChange={onChange}
            name={name}
            value={value}
           />
          )}}
         />
      </InputBlock>
    </>
  )
};
export default memo(LoginInput);