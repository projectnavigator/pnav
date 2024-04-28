import { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";

const taskLoaderData = (url) => {
  const [taskdata, setUserData] = useState([]);
  const [loading1, setLoading] = useState(true);
  const [error1, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await customFetch.get(url);
        setUserData(response.data);
      } catch (error) {
        setError(error1);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { taskdata, loading1, error1 };
};

export default taskLoaderData;