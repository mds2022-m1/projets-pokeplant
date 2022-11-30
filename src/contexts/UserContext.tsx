import { createContext } from "react";

const userContext = createContext({
  uid: "",
  name: "",
  logged: false,
  setLogged: () => {},
  setUid: () => {},
  setName: () => {},
});

export { userContext };
