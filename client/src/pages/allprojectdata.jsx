import { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";

const projectLoaderData = (url) => {
  const [projectdata, setprojectdata] = useState([]);
  const [loading2, setLoading] = useState(true);
  const [error2, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await customFetch.get(url);
        setprojectdata(response.data);
      } catch (error) {
        setError(error2);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { projectdata, loading2, error2 };
};

export default projectLoaderData;