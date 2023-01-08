export const LoginStart = (userCredentials) => ({
    type:"LOGIN_START"
})

export const LoginSuccess = (user) => ({
    type:"LOGIN_SUCCESS",
    payloads:user
})

export const LoginFailure = () => ({
    type:"LOGIN_FAILURE"
})

export const Logout = () => ({
    type:"LOGOUT"
})

export const UpStart = (userCredentials) => ({
    type:"UP_START"
})

export const UpSuccess = (user) => ({
    type:"UP_SUCCESS",
    payloads:user
})

export const UpFailure = () => ({
    type:"UP_FAILURE"
})

