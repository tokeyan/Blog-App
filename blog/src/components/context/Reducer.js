const Reducer = (state,action) => {
    switch(action.type){
        case "LOGOUT":
            return{
                user:null,
                isFetching:false,
                error:false
            };
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                error:false
            };
        case "LOGIN_SUCCESS":
                return{
                    user:action.payloads,
                    isFetching:false,
                    error:false
                };
        case "LOGIN_FAILURE":
                return{
                        user:null,
                        isFetching:false,
                        error:true
                };        
        case "UP_START":
                return{
                        ...state,
                        isFetching:true
                };
        case "UP_SUCCESS":
                return{
                        user:action.payloads,
                        isFetching:false,
                        error:false
                };
        case "UP_FAILURE":
                    return{
                        user:state.user,
                        isFetching:false,
                        error:true
                    };                  
        default:
               return state;
    }
}

export default Reducer; 