const { executeCode } = require("../services/pistonService");

const runCode = async (req, res) => {
  try {
    const { language, code, input } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        message: "Language and code are required.",
      });
    }

    const result = await executeCode({
      language,
      code,
      input: input || "",
    });

    return res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  runCode,
};