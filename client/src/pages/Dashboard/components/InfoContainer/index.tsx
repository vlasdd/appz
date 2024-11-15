import { CircularProgress } from '@mui/material';
import React from 'react'

type InfoContainerProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonDisabled?: boolean;
  handleClick?: () => void;
  isLoading?: boolean;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ 
  title, 
  handleClick, 
  description, 
  buttonText,
  buttonDisabled,
  isLoading,
}) => {
  return (
    <div className="w-[236px] h-[160px] bg-white rounded-[10px] flex flex-col justify-between items-center p-3">
      <p className="text-xl font-medium text-center">
        {title}
      </p>
      <p className="font-medium text-[11px] text-gray-600 mb-2 text-center">
        {description}
      </p>
      <button
        onClick={handleClick}
        className="flex gap-4 items-center justify-center h-[25px] w-[50%] rounded-lg bg-[#C8BCF6]"
        disabled={buttonDisabled}
      >
        <p className='text-[11px] font-medium'>
          {isLoading ? (
            <CircularProgress 
              size={18}
              sx={{
                color: 'white',
                mt: 0.5,
              }}
            />
          ) : buttonText}
        </p>
      </button>
    </div>
  )
}

export default InfoContainer