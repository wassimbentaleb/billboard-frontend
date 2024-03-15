import api from "../api/api";

const signupAPI = async (paylaod) =>{
    const {data} = await api.post("/signup", paylaod);
    return data;
  }

  const signinAPI = async (paylaod) =>{
    const {data} = await api.post("/login", paylaod);
    return data;
  }

  const clientCreateAPI = async (user) =>{
    const {data} = await api.post("/clientCreate", user);
    return data;
  }

  const clientDeleteAPI = async (id) =>{
    const {data} = await api.delete("/clientDelete/"+id);
    return data;
  }

  const clientUpdateAPI = async (user) =>{
    const {data} = await api.put("/clientUpdate/"+user.ID, user);
    return data;
  }

  const clientsGetAPI = async (user) =>{
    const {data} = await api.get("/clientsGet", user);
    return data;
  }

  const HandleAddPlan = async (values) =>{
    const res = await api.post("/HandleAddPlan", values);
    return res.data;
  }


  export { HandleAddPlan,signupAPI,signinAPI,clientsGetAPI,clientDeleteAPI,clientCreateAPI,clientUpdateAPI };