import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast"
import {setUser} from '../../slices/profileSlice';
import { setLoading, setToken } from "../../slices/authSlice"
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, { email, checkUserPresent: true });
            console.log("SENDOTP API RESPONSE............", response)
            console.log(response.data.success)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            console.log("SIGNUP API RESPONSE............", response);

            if (response.status >= 400 && response.status < 500) {
                // Handle client errors (4xx) by displaying an error message to the user.
                toast.error(response.data.message);
            } else if (response.status >= 500) {
                // Handle server errors (5xx) with a generic error message.
                toast.error("Signup failed due to a server error. Please try again later.");
            } else {
                // Handle success by showing a success message and navigating to the login page.
                toast.success("Signup Successful");
                navigate("/login");
            }
        } catch (error) {
            console.error("SIGNUP API ERROR............", error);
            // Handle unexpected errors with a generic error message.
            toast.error("Signup failed due to an unexpected error. Please try again later.");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function login(email,password,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", LOGIN_API,{email,password,});
            console.log("LOGIN API RESPONSE............", response)
            if (!response.data.success) {
              throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }));
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
        }catch(error){
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email,setEmailSend){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{
                email,
            });
            console.log(`RESET PASSWORD TOKEN RESPONSE.... ${response}`);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent...");
            setEmailSend(true);
        }catch(error){
            console.log("RESET PASSWORD TOKEN ERROR");
            toast.error("Failed to send email for resetting password ")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export function resetPassword(password,confirmPassword,token){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSWORD_API,{
                password,
                confirmPassword,
                token,
            });
            console.log(`RESET PASSWORD RESPONSE.... ${response}`);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Password Reset Successfully...");
        }catch(error){
            console.log(`Reset Password Token Error....${error}`);
            toast.error("Unable To Reset Password....");
        }
        dispatch(setLoading(false));
    }
}