export function HomeReducer<S,A>(state:S,action:A):S{
    return {
      ...state,...action
    }
  }
  