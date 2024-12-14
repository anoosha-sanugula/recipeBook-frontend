import React, { createContext, useState, ReactNode } from "react";
import { User } from "../../types/User";

type TUsers = {
  userdata: User;
  setUserdata: React.Dispatch<React.SetStateAction<User>>;
};

const userContext = createContext<TUsers>({
  userdata: {
    username: "",
    password: "",
    email: "",
    country: "",
  },
  setUserdata: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userdata, setUserdata] = useState<User>({
    username: "",
    password: "",
    email: "",
    country: "",
  });

  return (
    <userContext.Provider value={{ userdata, setUserdata }}>
      {children}
    </userContext.Provider>
  );
};

export { UserProvider, userContext };
