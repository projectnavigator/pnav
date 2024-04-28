import { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";

const userLoaderData = (url) => {
  const [userdata, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await customFetch.get(url);
        setUserData(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { userdata, loading, error };
};

export default userLoaderData;