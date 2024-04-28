import {
  ChartsContainer,
  CompletionStatusContainer,
  PieChart,
  StatusStatsContainer,
} from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const [projectStats, currentUser] = await Promise.all([
    customFetch.get("/project/stats"),
    customFetch.get("/user/current-user"),
  ]);

  return { projectStats: projectStats.data, currentUser: currentUser.data };
};



const ProgressReport = () => {
  const handleAdminExportCSV = async () => {
    try {
      const response = await customFetch.get("/project/admin/export", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your authentication token here
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Projects.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  const { projectStats, currentUser } = useLoaderData();
  const { statusStats, defaultCompletionStats, defaultTaskStats } =
    projectStats;
  return (
    <>
      {currentUser.user.role==='admin'?<button type="button " className="btn mb-3" onClick={handleAdminExportCSV}>
        Export CSV
      </button>:''}
      <CompletionStatusContainer
        defaultCompletionStats={defaultCompletionStats}
      />
      <StatusStatsContainer statusStats={statusStats} />
    </>
  );
};

export default ProgressReport;