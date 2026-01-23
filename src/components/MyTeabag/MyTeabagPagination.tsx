import React from 'react';
import LeftArrow from "../../assets/left_arrow.svg";   
import RightArrow from "../../assets/right_arrow.svg";

interface PaginationProps {
  page: number;       
  totalPages: number;   
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MyTeabagPagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div className="flex justify-between items-center w-full mt-[4px] mb-[112px]">
      
      <button 
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        
        disabled={page === 1}
        className={`flex inline-flex items-center gap-[4px] transition-opacity
          ${page === 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:opacity-70'}
        `}
      >
        <div className="w-[20px] h-[20px] aspect-square">
          <img src={LeftArrow} alt="before" className="w-full h-full" />
        </div>
        <div className="text-[#000] text-base font-body font-normal leading-[140%] tracking-[-0.4px] 
        underline decoration-solid decoration-auto underline-offset-auto [text-underline-position:from-font]">
          before
        </div>
      </button>


      <button 
        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        
        className={`flex inline-flex items-center gap-[4px] transition-opacity
          ${page === totalPages ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:opacity-70'}
        `}
      >
        <div className="text-[#000] text-base font-body font-normal leading-[140%] tracking-[-0.4px] 
        underline decoration-solid decoration-auto underline-offset-auto [text-underline-position:from-font]">
          next
        </div>
        <div className="w-[20px] h-[20px] aspect-square">
          <img src={RightArrow} alt="next" className="w-full h-full" />
        </div>
      </button>
    </div>
  );
};

export default MyTeabagPagination;