import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getTags } from "../constants/EndPoints";

export const getAllTagsContext = createContext();

export const GetAllTagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const getAllTags = async (data) => {
    try {
      let response = await axios.get(getTags, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTags(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTags();
  }, []);
  return (
    <getAllTagsContext.Provider value={{ tags }}>
      {children}
    </getAllTagsContext.Provider>
  );
};
