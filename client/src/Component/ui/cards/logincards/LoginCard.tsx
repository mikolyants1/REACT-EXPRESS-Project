import { memo } from "react"
import { EntryInput, EntrySub, InputBlock } from "../../../../style/style"
import { useFormContext,Controller, } from "react-hook-form"
import { Control } from "../../../../types/type";

function LoginCard():JSX.Element{
const {control} = useFormContext();
    return (
        <>
          <EntrySub>
            Enter your username
          </EntrySub>
          <InputBlock>
            <Controller
             name="name"
             control={control}
             render={({field}):JSX.Element=>{
             const {onChange,value,name}:Control<"name"> = field;
             return (
              <EntryInput
               onChange={onChange}
               name={name}
               value={value}
              />
             )}}
            />
          </InputBlock>
          <EntrySub>
            Enter your password
          </EntrySub>
          <InputBlock>
            <Controller
             name="pass"
             control={control}
             render={({field}):JSX.Element=>{
             const {onChange,value,name}:Control<"pass"> = field;
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
}

export default memo(LoginCard)