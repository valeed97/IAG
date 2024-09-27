import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useApp } from "context/AppContext";
import ResultCard from "components/Result/ResultCard"

function Result({step}) {
  
    const navigate = useNavigate();
    const { resultValues } = useApp();

    const handleSubmit = () => {
        if(step === 1){
            navigate("/ai-responsible-use")
        } else {
            navigate("/ai-tech-enablement")
        }
    }

    return (
        <div className="h-full overflow-y-auto w-full p-6 bg-gray-800 bg-opacity-30 rounded-lg backdrop-blur-sm overflow-hidden">
          {/* <div className="h-full w-full overflow-y-auto p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl"> */}
            {resultValues.map((currentArea, index) => (
              <ResultCard key={index} currentArea={currentArea} step={step} />
            ))}
          {/* </div> */}
            <button 
                className={`w-full space-x-2 p-2 rounded-lg border transition duration-200 
                    bg-gray-800 text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer`}
                  onClick={handleSubmit}
                >
                Go To the Next Step
            </button>
        </div>
    );
}

export default Result