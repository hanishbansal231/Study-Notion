import { settingsEndpoints } from '../apis';
import { apiConnector } from "../apiconnector";
import { setUser } from '../../slices/profileSlice';
import toast from 'react-hot-toast';
const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    // CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
            )
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data));
        } catch (error) {
            console.error("UPDATE_DISPLAY_PICTURE_API API ERROR............", error.message)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token, formData, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            console.log("FormData -> ", formData);
            const response = await apiConnector("PUT",UPDATE_PROFILE_API,formData,
            {
                Authorization: `Bearer ${token}`,
            });
            console.log("Start...");
            console.log("UPDATE_PROFILE_API API RESPONSE............", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
              dispatch(
                setUser({ ...response.data.updatedUserDetails})
              )
              navigate("/dashbaoard/myprofile");
              toast.success("Profile Updated Successfully")
        }catch(error){
            console.log("UPDATE_PROFILE_API API ERROR............", error.message)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId);
    }
}

  
  
  
  
  