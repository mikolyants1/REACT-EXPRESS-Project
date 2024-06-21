/* eslint-disable react-refresh/only-export-components */
import {FC, memo} from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { EntryInput, EntrySub, InputBlock } from '../../../../../libs/style/style';
import { InputProps, IStateUser } from '../../../../../libs/types/type';


const LoginInput:FC<InputProps> = ({title,name}):JSX.Element => {
  const {control} = useFormContext<IStateUser>();
  
  return (
    <>
      <EntrySub>
        Enter your {title}
      </EntrySub>
      <InputBlock>
        <Controller
          name={name}
          control={control}
          render={({field}):JSX.Element=>(
           <EntryInput {...field} />
          )}
         />
      </InputBlock>
    </>
  )
};
export default memo(LoginInput);