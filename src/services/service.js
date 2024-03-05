import api from "../api/api";

const signupAPI = async (paylaod) =>{
    const {data} = await api.post("/signup", paylaod);
    return data;
  }

  const signinAPI = async (paylaod) =>{
    const {data} = await api.post("/login", paylaod);
    return data;
  }

  const createNewUserAPI = async (user) =>{
    const {data} = await api.post("/newuser", user);
    return data;
  }

  const deleteUserAPI = async (id) =>{
    const {data} = await api.delete("/newuser/"+id);
    return data;
  }

  const updateUserAPI = async (user) =>{
    const {data} = await api.put("/newuser/"+user.ID, user);
    return data;
  }

  const getUserAPI = async (user) =>{
    const {data} = await api.get("/newuser", user);
    return data;
  }

  export { signupAPI,signinAPI,createNewUserAPI,deleteUserAPI,updateUserAPI,getUserAPI };