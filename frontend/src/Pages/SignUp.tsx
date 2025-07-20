
import { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import Loader from "../Utils/Loader";
const SignUp = () => {

  const [form,setForm]=useState({
    name:"",
    email:"",
    password:"",
  });
  const [showPassword,setShowPassword]=useState(false);
  const navigate = useNavigate();
  const { signUp,loading } = useUserContext();
  const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    signUp(form);
    
  }
  return (
    <div className="w-full h-full flex justify-center items-center">

      
     {
      loading ? 
      <Loader />
      :
      (
         <form onSubmit={(e)=>handleFormSubmit(e)} className="w-[80%] h-[80%] max-h-[500px] max-w-[600px] bg-[#00000010] backdrop-blur shadow-lg shadow-[#023846] flex flex-col items-center justify-start py-12 gap-8 rounded-[8px] animated-form px-4 overflow-y-scroll">
        <h1 className="text-white text-lg font-semibold mb-8">Register to <span className="text-blue-400 text-xl font-semibold brand">ECHOE</span></h1>
        <input onChange={(e)=>setForm((prev)=>({...prev,name:e.target.value}))} 
        value={form.name}
        required
        type="text" placeholder="Enter Your Full Name" className="w-full h-[40px] border border-[#9accdd] bg-transparent text-white placeholder-gray-300 rounded-4xl px-4 text-sm focus:outline-none outline-none focus:ring focus:ring-[#58adc8] focus:border-[#58adc8]" />
        <input
        onChange={(e)=>setForm((prev)=>({...prev,email:e.target.value}))} 
        value={form.email} required
        type="email" placeholder="Enter Your Email" className="w-full h-[40px] border border-[#9accdd] bg-transparent text-white placeholder-gray-300 rounded-4xl px-4 text-sm focus:outline-none outline-none focus:ring focus:ring-[#58adc8] focus:border-[#58adc8]" />
       <div className="w-full relative">
         <input 
         onChange={(e)=>setForm((prev)=>({...prev,password:e.target.value}))} 
        value={form.password} required
         type={showPassword ? "text" : "password"} placeholder="Enter Your Password" className="w-full h-[40px] border border-[#9accdd] bg-transparent text-white placeholder-gray-300 rounded-4xl px-4 text-sm focus:outline-none outline-none focus:ring focus:ring-[#58adc8] focus:border-[rgb(88,173,200)]" />
         {!showPassword ?<IoEyeOffOutline color="white"  className="absolute top-[28%] right-[3%] cursor-pointer" onClick={()=>setShowPassword(true)}/>
         :
         <IoEyeOutline color="white"  className="absolute top-[28%] right-[3%] cursor-pointer" onClick={()=>setShowPassword(false)}/>}
       </div>
       <button className="w-[50%] gradient-rotate md:w-[40%] sm:w-[30%] py-2 from-[#58adc8] to-[#055c72] bg-gradient-to-r flex items-center justify-center rounded-full text-md text-[#afd6e4] font-semibold hover:from-[#055c72] hover:to-[#58adc8] transition-all duration-1000 cursor-pointer" >
  Submit
</button>

    <p className="text-white text-sm font-semibold">Already have an account ? <span className="text-blue-400 text-md font-semibold cursor-pointer" onClick={()=>navigate("/login")}>Login</span></p>

      </form>
      )
     }

    </div>
  )
}

export default SignUp