import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// ✅ User Data Type
interface userDataType {
  name: string;
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  history: string[];
  assistant?: string;
  assistantImage?: string;
}

// ✅ Context Type
interface UserContextType {
  signUp: (formData: { name: string; email: string; password: string }) => Promise<void>;
  login: (formData: { email: string; password: string }) => Promise<void>;
  loading: boolean;
  userData: userDataType | undefined;
  handleUserData: () => Promise<void>;
  setUserData: React.Dispatch<React.SetStateAction<userDataType | undefined>>;
  updateUserData: (img: string, name: String) => Promise<void>;
  logout: () => Promise<void>;
  geminiResponse: (command: string) => Promise<any>;
  answer: string;
  speak: (text: string) => void; // ✅ Add this
}


// ✅ Create Context
export const UserDataContext = createContext<UserContextType | undefined>(undefined);

// ✅ Provider Props Type
interface UserProviderProps {
  children: ReactNode;
}

// ✅ Provider Component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.baseURL = backendUrl;

  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<userDataType | undefined>(undefined);
  const [answer, setAnswer] = useState<string>("");

  const navigate = useNavigate();

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const isHindi = /[\u0900-\u097F]/.test(text);
    utterance.lang = isHindi ? "hi-IN" : "en-US";

    const loadVoicesAndSpeak = () => {
      const voices = synth.getVoices();
      let selectedVoice = voices.find((v) =>
        isHindi ? v.lang.startsWith("hi") : v.lang.startsWith("en")
      );
      if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
      }
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = 1;
      utterance.pitch = 1;
      synth.speak(utterance);
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = loadVoicesAndSpeak;
      window.speechSynthesis.getVoices();
    } else {
      loadVoicesAndSpeak();
    }
  };

  const handleUserData = async () => {
    try {
      const response = await axios.get("/api/v1/user", { withCredentials: true });
      setUserData(response?.data?.data || undefined);
      console.log("User Data fetched:", response?.data?.data);
    } catch (err) {
      setUserData(undefined);
      console.error("Failed to fetch user:", err);
      toast.error("Session expired or user fetch failed.");
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    } else {
      setUserData(undefined);
      logout();
    }
  }, []);

  useEffect(() => {
    if (userData) localStorage.setItem("userData", JSON.stringify(userData));
    setAnswer("");
  }, [userData]);

  const signUp = async (formData: { name: string; email: string; password: string }): Promise<void> => {
    try {
      setLoading(true);
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return;
      }
      const response = await axios.post("/api/v1/signup", formData, { withCredentials: true });
      if (response?.data?.success) {
        toast.success("Sign up successful!");
        await handleUserData();
        navigate("/");
      } else {
        toast.error(response?.data?.message || "Sign up failed.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error("An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/v1/login", formData, { withCredentials: true });
      if (response?.data?.success) {
        toast.success("Login successful!");
        await handleUserData();
        navigate("/");
      } else {
        toast.error(response?.data?.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = async (img: string, name: String) => {
    try {
      if (!img || !name) {
        toast.error("Please select an image and name for your assistant.");
        return;
      }
      const response = await axios.put("/api/v1/update", { assistantImage: img, assistant: name }, { withCredentials: true });
      if (response?.data?.success) {
        await handleUserData();
        toast.success("Assistant updated successfully!");
        navigate("/");
      } else {
        toast.error(response?.data?.message || "Failed to update assistant.");
        console.error("Update User Data Error:", response?.data?.message);
      }
    } catch (err) {
      console.error("Update User Data Error:", err);
      if (err instanceof Error) toast.error(err.message);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get("/api/v1/logout", { withCredentials: true });
      if (response?.data?.success) {
        setUserData(undefined);
        toast.success("Logout Successfully!");
        navigate("/login");
        localStorage.removeItem("userData");
      } else {
        toast.error(response?.data?.message || "Logout failed.");
        console.error("Logout Error:", response?.data?.message);
      }
    } catch (err) {
      console.error("Logout Error:", err);
      if (err instanceof Error) toast.error(err.message);
    }
  };

  const geminiResponse = async (command: string) => {
    try {
      const result = await axios.post("/api/v1/gemini", { command }, { withCredentials: true });
      if (result?.data?.success) {
        return result?.data?.data;
      } else {
        console.error("Gemini Response Error:", result?.data?.message);
      }
    } catch (err) {
      console.error("Gemini Response Error:", err);
    }
  };

  useEffect(() => {
    if (!userData?.assistant) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = async (event: any) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      console.log("Speech:", transcript);

      if (transcript.toLowerCase().includes(userData.assistant!.toLowerCase())) {
        const command = transcript.replace(new RegExp(userData.assistant!, 'i'), "").trim();
        console.log("Command Detected:", command);
        const data = await geminiResponse(command);
        const responseText = data?.response || "Sorry, I do not understand the question";
        setAnswer(responseText);
        speak(responseText);
        console.log("Gemini Response:", data);
      } else {
        speak("If you want to ask me something, say my name first, learn manners man, idk who you are talking to");
        setAnswer("")
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended. Restarting...");
      recognition.start();
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "no-speech" || event.error === "network") {
        recognition.start();
      }
    };

    recognition.start();

    return () => {
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.stop();
    };
  }, [userData]);

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    console.log("Available voices:", voices);
  }, []);

  return (
    <UserDataContext.Provider value={{ signUp, login, loading, userData, handleUserData, setUserData, updateUserData, logout, geminiResponse, answer, speak }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserDataContext);
  if (!context) throw new Error("useUserContext must be used within a UserProvider");
  return context;
};