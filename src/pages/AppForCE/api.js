import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";


export const executeCode = async (language, code) => {
  try {
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: code,
        },
      ],
    });
    return response.data;
  } catch (error) {
    console.error("Error executing code:", error);
  }
};
