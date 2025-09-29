import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const reducer = (userInfo, action) => {
    switch (action.type) {
      case "addUser":
        return action.payload;
      case "removeUser":
        return null;
      default:
        return userInfo;
    }
  };
  const [userInfo, dispatch] = useReducer(reducer, null);
  const [loading, setLoading] = useState(true); // ✅ add loading state

  // add user when page is refreshed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "addUser",
          payload: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
        });
      } else {
        dispatch({ type: "removeUser" });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const user = useMemo(() => userInfo, [userInfo]);
  return loading ? (
    <div className="flex items-center justify-center min-h-screen space-x-2">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
      <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
    </div>
  ) : (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
