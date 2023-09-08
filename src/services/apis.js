const BASE_URL = process.env.REACT_APP_BASE_URL;
export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/getAllCategory`
}
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/resetpasswordtoken",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updatedisplaypicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateprofile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteaccount",
  }