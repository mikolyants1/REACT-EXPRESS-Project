import { EntryBlock, EntryBut,EntryTitle, LoginError, RegistLink } from "../../../style/style.js";
import { useState } from "react";
import { useNavigate,NavigateFunction } from "react-router-dom";
import { bind, getCurrent, useAction, useAppSelector } from "../../../store/store.js";
import { Error, Loader } from "../../ui/Loader.js";
import {data, has, query, stateUser} from "../../../types/type.js";
import { useGetUsersQuery } from "../../../store/api/endpoints/UserEndpoints.js";
import { Link } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import LoginCard from "../../ui/cards/logincards/LoginCard.js";
import axios, { AxiosResponse } from "axios";

export default function Entry():JSX.Element{
  const {data,isError,isLoading} = useGetUsersQuery<query<data[]>>('');
  const current:number = useAppSelector(getCurrent);
  const navigate:NavigateFunction = useNavigate();
  const methods = useForm<stateUser>({
    defaultValues:{
    name:"",
    pass:""
    }
  });
  const [error,setError] = useState<boolean>(false);
  const { setId,setPass }:bind = useAction();
  const {handleSubmit,reset} = methods;
  const check:SubmitHandler<stateUser>= async (date):Promise<void>=>{
   if (typeof data !== "undefined"){
    const {name,pass}:stateUser = date;
    const user = await axios
    .get(`http://localhost:5000/pass/?name=${name}&pass=${pass}`)
    .then(({data}:AxiosResponse<has>)=>data);
    if (user.has){
      setId(user.id);
      setPass(pass);
      navigate(`/page/main/${current}`,{state:{color:"red"}});
     }else{
      setError(true);
      reset();
      };
    };
  };
  
    return (
      <FormProvider {...methods}>
        <EntryBlock>
            {isLoading ? (
              <Loader back="white" />
            ) : isError ? (
             <Error back="white" />
            ) : (
         <>
          <EntryTitle>
             Entrance
          </EntryTitle>
          <LoginCard />
          {error&&
          <LoginError>
            user not found
          </LoginError>}
          <EntryBut onClick={handleSubmit(check)}>
            login
          </EntryBut>
          <RegistLink>
            <Link to={`/reg`}>
              registration
            </Link>
          </RegistLink>
        </>
        )}
      </EntryBlock>
    </FormProvider>
       );
};