const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const { genToken } = require("../Config/token");
const { geminiResponse } = require("../Gemini");
const moment = require("moment/moment");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be atleast 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({ email, password: hashedPassword, name });

    const token = await genToken(result?._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 *24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });
    return res.status(201).json({
      success: true,
      message: "User Signed Up",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const token = await genToken(user?._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 *24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });
    return res.status(200).json({
      success: true,
      message: "User Logged in",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.userController = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found, please login or signup",
      });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, please login or signup",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.updateAssistant = async (req, res) => {
  try {
    console.log("Update Assistant called 😢😢😢😢");
    const { assistant, assistantImage } = req.body;
    if (!assistant || !assistantImage) {
      return res.status(400).json({
        success: false,
        message: "Please provide Assistant Info",
      });
    }

    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found, please login or signup",
      });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { assistant, assistantImage },
      { new: true }
    ).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, please login or signup",
      });
    }
    console.log("User updated successfully", user);
    return res.status(200).json({
      success: true,
      message: "Assistant Updated Successfully",
      data: user,
    });
  } catch (err) {
    console.error("Error in updateAssistant:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (err) {
    console.error("Error in logout:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.geminiResponse = async (req, res) => {
  try {
    const { command } = req.body;
    const id = req.userId;

    if (!id) {
      return res.status(400).json({ success: false, message: "User not found, please login or signup" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found, please login or signup" });
    }

    const name = user.name || "User";
    const assistant = user.assistant || "Assistant";
    const response = await geminiResponse(command, assistant, name);

    if (!response) {
      return res.status(500).json({ success: false, message: "Failed to get response from Gemini" });
    }

    const cleanResponse = response.replace(/```json|```/g, '').trim();

    // ✅ Check if cleanResponse looks like JSON
    if (!cleanResponse.startsWith("{") || !cleanResponse.endsWith("}")) {
      return res.status(500).json({
        success: false,
        message: "Invalid response format from Gemini",
        rawResponse: cleanResponse,
      });
    }

    let data;
    try {
      data = JSON.parse(cleanResponse);
    } catch (parseErr) {
      return res.status(500).json({
        success: false,
        message: "Failed to parse Gemini response",
        rawResponse: cleanResponse,
        error: parseErr.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gemini response fetched successfully",
      data,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get response from Gemini",
      error: err.message,
    });
  }
};

