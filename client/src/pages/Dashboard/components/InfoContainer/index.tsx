import React from 'react'
import { Link } from 'react-router-dom';

type InfoContainerProps = {
  title: string;
  description: string;
  path: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ title, description, path }) => {
  return (
    <div className="w-[236px] h-[160px] bg-white rounded-[10px] flex flex-col justify-between items-center p-3">
      <p className="text-xl font-semibold">
        {title}
      </p>
      <p className="font-semibold text-[11px] text-gray-600 mb-2">
        {description}
      </p>
      <Link
        to={path}
        className="flex gap-4 items-center justify-center h-[25px] w-[50%] rounded-lg bg-[#C8BCF6]"
      >
        <p className='text-[11px] font-semibold'>
          Check This Out
        </p>
      </Link>
    </div>
  )
}

export default InfoContainer