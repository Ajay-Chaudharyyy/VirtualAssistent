import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext"


const Homepage = () => {
  const {userData,logout,answer} = useUserContext();
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-4 relative">
      <div className="w-full flex justify-end items-center gap-4 absolute sm:top-4 sm:right-4  md:top-6 md:right-6 top-8 right-8">

        <button className="w-[30%] md:w-[20%] sm:w-[15%] py-2 from-[#58adc8] to-[#055c72] bg-gradient-to-r flex items-center justify-center rounded-full text-md text-[#afd6e4] font-bold hover:from-[#055c72] hover:to-[#58adc8] transition-all duration-1000 cursor-pointer gradient-rotate"
        onClick={()=>navigate("/customize")}
            >
            Customize
</button>
        <button className="w-[30%] md:w-[20%] sm:w-[15%] py-2 from-[#58adc8] to-[#055c72] bg-gradient-to-r flex items-center justify-center rounded-full text-md text-[#afd6e4] font-bold hover:from-[#055c72] hover:to-[#58adc8] transition-all duration-1000 cursor-pointer glow-rotate gradient-rotate "
        onClick ={()=>logout()}
            >
            Logout
</button>
      </div>

    <div className="w-[90%] max-w-[500px] flex items-center justify-center rounded-4xl shadow-lg shadow-[#023846] bg-[#00000010] backdrop-blur p-4 animated-form overflow-hidden">
      <img src={userData?.assistantImage} alt="Assistant Image" className="h-full w-full object-cover overflow-hidden rounded-2xl" />

    </div>
    <h1 className="text-white font-semibold text-sm text-glow">{userData?.assistant}</h1>
    {answer && <p className="text-white font-semibold text-lg italic text-center p-2">{answer.length > 100 ? answer.substring(0,100) + "..." : answer}</p>}
    </div>
  )
}

export default Homepage