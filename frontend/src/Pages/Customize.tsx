import { useState } from "react"
import Card from "../Components/Card"
import img1 from "../assets/goku-ultra-instinct-5120x2880-22575.png"
import img2 from "../assets/gon-freecss-neon-5120x2880-21477.png"
import img3 from "../assets/itachi-uchiha-5120x2880-19971.jpg"
import img4 from "../assets/luffy.jpg"
import img5 from "../assets/mitsuri-kanroji-3840x2160-22627.png"
import { useUserContext } from "../Context/UserContext"
import  Loader from "../Utils/Loader"

const Customize = () => {

    const {updateUserData,loading}=useUserContext();
    const images =[{image:img1,name:"Goku"}, {image:img2,name:"Gon"}, {image:img3,name:"Itachi"}, {image:img4,name:"Luffy"}, {image:img5,name:"Mitsuri"}]
    const [selectedImage, setSelectedImage] =useState<string>("");
    const [selectedName,setSelectedName]=useState<string>("");

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        // setUserData((prevData)=>{if(!prevData) return undefined; return {...prevData, assistantImage: selectedImage, assistant: selectedName }});
        updateUserData(selectedImage,selectedName);

    }
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-8 py-8">
       <h1 className="text-white text-lg font-semibold ">Select Your <span className="text-blue-400 text-xl font-semibold brand">Assistant</span></h1>
        <div className="w-[90%] max-w-[60%] flex items-center justify-center flex-wrap gap-4 bg-[#00000010] backdrop-blur shadow-lg shadow-[#023846] px-4 py-8 animated-form overflow-scroll">
            {images.map((img, index) => (
                <Card key={index} img={img.image} name={img.name} selectedImage={selectedImage} setSelectedImage={setSelectedImage} setSelectedName={setSelectedName}/>
            ))}
        </div>
        <button className="w-[50%] md:w-30%] sm:w-[20%] py-2 from-[#58adc8] to-[#055c72] bg-gradient-to-r flex items-center justify-center rounded-full text-md text-[#afd6e4] font-bold hover:from-[#055c72] hover:to-[#58adc8] transition-all duration-1000 cursor-pointer " onClick={(e)=>handleSubmit(e)}
            disabled={!selectedImage || !selectedName || loading}
            >
            {loading ? <Loader/> :"Next"}
</button>
    </div>
  )
}

export default Customize