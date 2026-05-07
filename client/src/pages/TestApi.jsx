import { useEffect } from "react";
import axios from "axios";

function TestApi() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log("TASKS:", res.data);
      })
      .catch((err) => {
        console.log("ERROR:", err.response?.data || err.message);
      });
  }, []);

  return <h1>Check Console for API Response</h1>;
}

export default TestApi;