import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [authoname, setAuthorname] = useState(
    localStorage.getItem("authorname")
  );

  const [post, setPost] = useState({});

  const storeToken = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  const LogOutUser = () => {
    setToken("");
    setLogin(false);
    return localStorage.removeItem("token");
  };

  const setUser = (newUserName) => {
    return localStorage.setItem("username", newUserName);
  };

  const setAuthor = (newAuthor) => {
    return localStorage.setItem("authorname", newAuthor);
  };

  const [isLoggedIn, setLogin] = useState(!!token);

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        LogOutUser,
        isLoggedIn,
        setUser,
        username,
        setLogin,
        setAuthor,
        token,
        post,
        setPost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
