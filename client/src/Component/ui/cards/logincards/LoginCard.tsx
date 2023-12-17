import { memo } from "react"
import { EntryInput, EntrySub, InputBlock } from "../../../../style/style"
import { useFormContext,Controller } from "react-hook-form"


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
             render={({field:{onChange,value,name}})=>(
              <EntryInput
               onChange={onChange}
               name={name}
               value={value}
              />
            )}
            />
          </InputBlock>
          <EntrySub>
             Enter your password
          </EntrySub>
          <InputBlock>
            <Controller
             name="pass"
             control={control}
             render={({field:{onChange,value,name}})=>(
              <EntryInput
               onChange={onChange}
               name={name}
               value={value}
              />
            )}
            />          
          </InputBlock>
        </>
    )
}

export default memo(LoginCard)