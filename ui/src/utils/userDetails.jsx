export const userDetails = () => {
   let user = sessionStorage.getItem("userDetails")
      ? JSON.parse(sessionStorage.getItem("userDetails"))
      : null;

   return user;
};
