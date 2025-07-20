import React  from 'react';

interface CardProps {
  img: string;
  name:string;
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedName: React.Dispatch<React.SetStateAction<string>>;
}

const Card: React.FC<CardProps> = ({ img,name,selectedImage,setSelectedImage,setSelectedName }) => {
  return (
    <div className="max-w-[200px] max-h-[300px] bg-transparent rounded-2xl overflow-hidden  cursor-pointer  flex flex-col justify-center items-center gap-4 group">
      <div className={`w-full rounded-xl overflow-hidden group-hover:border-[3px] group-hover:border-[#afd6e4] transition-border duration-200 ${selectedImage === img ? "border-[3px] border-[#afd6e4]" : ""} `} onClick={()=>{setSelectedImage(img); setSelectedName(name)}}>
        <img
          src={img}
          alt="Card Image"
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110 "
          loading="lazy"
        />
      </div>
      <p className="text-white text-md font-semibold text-glow">{name}</p>
    </div>
  );
};

export default Card;
