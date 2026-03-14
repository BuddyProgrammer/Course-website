import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const TokenLogger = () => {

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log("Access Token:", token);
    };

    fetchToken();
  }, []);

  return null;
};

export default TokenLogger;