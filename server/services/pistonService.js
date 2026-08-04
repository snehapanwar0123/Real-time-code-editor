const axios = require("axios");

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

const languageVersions = {
  cpp: "10.2.0",
  c: "10.2.0",
  java: "15.0.2",
  python: "3.10.0",
  javascript: "18.15.0",
};

const executeCode = async ({ language, code, input }) => {
  try {
    const response = await axios.post(PISTON_URL, {
      language,
      version: languageVersions[language],
      files: [
        {
          content: code,
        },
      ],
      stdin: input,
    });

    return response.data;
  } catch (error) {
    console.error("========================");
    console.error("PISTON ERROR");
    console.error(error.response?.status);
    console.error(error.response?.data);
    console.error(error.message);
    console.error("========================");

    throw error;
    }
};

module.exports = {
  executeCode,
};