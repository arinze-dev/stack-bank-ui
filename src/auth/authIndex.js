export const getUserInfo  = function () {
   let user = null
   if (sessionStorage.getItem("userInfo")) {
     return user = JSON.parse(sessionStorage.getItem("userInfo"))
   }       
   return user
}