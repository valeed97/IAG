import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Target, AlertTriangle, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import useAxios from "hooks/useAxios"
import { useApp } from "context/AppContext";
import { suggestions } from 'JSONs/suggestions';

const BusinessContext = () => {

    const { handleDefaultSuggestions } = useApp();
    const navigate = useNavigate()
    const { postCall } = useAxios()
    const [mainInfo, setMainInfo] = useState({ persona: '', businessVertical: '', winningAspiration: '' });
    const [isMainInfoSubmitted, setIsMainInfoSubmitted] = useState(false);
    const [focusAreas, setFocusAreas] = useState([]);
    const [newFocusArea, setNewFocusArea] = useState({ 
      name: '',
      priorityOutcome: '', 
      measurableTarget: '', 
      risksAndDependencies: '' 
    });
  
    const handleMainInfoChange = (e) => {
      setMainInfo({ ...mainInfo, [e.target.name]: e.target.value });
    };
  
    const submitMainInfo = () => {
      if (mainInfo.persona && mainInfo.businessVertical && mainInfo.winningAspiration) {
        setIsMainInfoSubmitted(true);
      } else {
        alert('Please fill all main info fields before submitting.');
      }
    };
  
    const handleFocusAreaChange = (e) => {
      setNewFocusArea({ ...newFocusArea, [e.target.name]: e.target.value });
    };
  
    const addFocusArea = () => {
      if (newFocusArea.priorityOutcome.trim() !== '') {
        setFocusAreas([...focusAreas, newFocusArea]);
        setNewFocusArea({ priorityOutcome: '', measurableTarget: '', risksAndDependencies: '', name:'' });
      }
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const body = {businessContext:mainInfo, focusAreas};
      const result = await postCall("save-business-context", body);
      if(result.success){
          handleDefaultSuggestions(suggestions)
          toast.success("your request has been summitted successfully")
          setTimeout(()=>{
            navigate("/linked-ai-value")
          }, 1000)
      }else{
          toast.warn("There is some error while processcing your request")
      }
      
      // Here you would typically send this data to a server or perform other actions
    };
  return (
    <>
      <Breadcrumb pageName="Business Context" />

      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="border-b border-primary py-4 px-6.5 ">
              <h3 className="font-medium text-black dark:text-primary">
              Business Context Details
              </h3>
            </div>
            <div className="flex flex-col p-6.5">
              <div className="flex flex-row gap-5.5">
                <div className="w-1/2">
                  <label className="mb-3 block text-black dark:text-primary">
                    Persona
                  </label>
                  <input
                    type="text"
                    name="persona"
                    value={mainInfo.persona}
                    onChange={handleMainInfoChange}
                    disabled={isMainInfoSubmitted}
                    placeholder="Please Enter Persona"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-1/2">
                  <label className="mb-3 block text-black dark:text-primary">
                    Business Vertical
                  </label>
                  <input
                    type="text" 
                    name="businessVertical"
                    value={mainInfo.businessVertical}
                    onChange={handleMainInfoChange}
                    disabled={isMainInfoSubmitted}
                    placeholder="Please Enter Business Vertical"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-3 block text-black dark:text-white">
                Winning Aspiration
                </label>
                <input
                  type="text" 
                  name="winningAspiration"
                  value={mainInfo.winningAspiration}
                  onChange={handleMainInfoChange}
                  disabled={isMainInfoSubmitted}
                placeholder="Please Enter Winning Aspiration"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            {!isMainInfoSubmitted && ( <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <button
                  className="w-full bg-primary text-white hover:bg-white hover:text-primary hover:border-2 hover:border-primary font-bold py-2 px-4 rounded"
                  onClick={submitMainInfo}
                >
                  Submit Business Context
                </button>
              </div>
            </div>)}
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5">
        <div className="border-b border-primary py-4 px-6.5 ">
          <h3 className="font-medium text-black dark:text-white">
          Add Focus Area
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
        <div>
            <label className="mb-3 block text-black dark:text-white">
            Name
            </label>
            <input
              type="text" 
              name="name"
              placeholder="Name"
              value={newFocusArea.name}
              onChange={handleFocusAreaChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
            Priority Outcome
            </label>
            <input
              type="text" 
              name="priorityOutcome"
              placeholder="Priority Outcome"
              value={newFocusArea.priorityOutcome}
              onChange={handleFocusAreaChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
            Measurable Target
            </label>
            <input
              type="text" 
              name="measurableTarget"
              placeholder="Measurable Target"
              value={newFocusArea.measurableTarget}
              onChange={handleFocusAreaChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block font-medium text-black dark:text-white">
            Risks and Dependencies
            </label>
            <input
              type="text" 
              name="risksAndDependencies"
              placeholder="Risks and Dependencies"
              value={newFocusArea.risksAndDependencies}
              onChange={handleFocusAreaChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <button 
              className="w-full bg-dusky-teal text-white hover:text-dusky-teal hover:bg-white hover:border-2 hover:border-dusky-teal  font-bold py-2 px-4 rounded"
              onClick={addFocusArea}
            >
              Add Focus Area
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {focusAreas.map((area, index) => (
           <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
           <div className="text-white p-4 bg-primary">
             <h3 className="text-xl font-bold">{area.name}</h3>
           </div>
           <div className="p-6 bg-light-gray">
             <div className="flex items-center mb-4">
               <Layers className="mr-3 text-warm-red" />
               <div>
                 <h4 className="font-semibold text-gray-700">Priority Outcome</h4>
                 <p className='text-primary'>{area.priorityOutcome}</p>
               </div>
             </div>
             <div className="flex items-center mb-4">
               <Target className="mr-3 text-warm-red" />
               <div>
                 <h4 className="font-semibold text-gray-700">Measurable Target</h4>
                 <p className='text-primary'>{area.measurableTarget}</p>
               </div>
             </div>
             <div className="flex items-center mb-4">
               <AlertTriangle  className="mr-3 text-warm-red" />
               <div>
                 <h4 className="font-semibold text-gray-700">Risks and Dependencies</h4>
                 <p className='text-primary'>{area.risksAndDependencies}</p>
               </div>
             </div>
           </div>
         </div>
        ))}
      </div>
      <button
        className={`w-full mt-4 space-x-2 p-2 rounded-lg border transition duration-200 flex items-center justify-center mb-4
                ${
                  isMainInfoSubmitted && focusAreas.length
                    ? "bg-primary text-white hover:bg-white hover:text-primary hover:border-2 hover:border-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer"
                    : "bg-gray-500 text-gray-300 border-gray-500 cursor-not-allowed"
                }`}
                onClick={handleSubmit}
                disabled={!isMainInfoSubmitted || !focusAreas.length}
            >
                Go To the Next Step
                <ArrowRight size={20} className="ml-2" />
            </button>
    </>
  );
};

export default BusinessContext;


// const TimelineCard = ({ index, area }) => (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 p-6">
//       <h3 style={{ color: colors.primary }} className="text-xl font-bold mb-4">Focus Area {index + 1}</h3>
//       <div className="relative border-l-2 pl-6 pb-6" style={{ borderColor: colors['warm-red'] }}>
//         <div className="mb-8 relative">
//           <div className="absolute -left-8 w-4 h-4 rounded-full" style={{ backgroundColor: colors['warm-red'] }}></div>
//           <h4 className="font-semibold text-gray-700 mb-2">Priority Outcome</h4>
//           <p style={{ color: colors.primary }}>{area.priorityOutcome}</p>
//         </div>
//         <div className="mb-8 relative">
//           <div className="absolute -left-8 w-4 h-4 rounded-full" style={{ backgroundColor: colors['warm-red'] }}></div>
//           <h4 className="font-semibold text-gray-700 mb-2">Measurable Target</h4>
//           <p style={{ color: colors.primary }}>{area.measurableTarget}</p>
//         </div>
//         <div className="relative">
//           <div className="absolute -left-8 w-4 h-4 rounded-full" style={{ backgroundColor: colors['warm-red'] }}></div>
//           <h4 className="font-semibold text-gray-700 mb-2">Risks and Dependencies</h4>
//           <p style={{ color: colors.primary }}>{area.risksAndDependencies}</p>
//         </div>
//       </div>
//       <Button>Add Milestone</Button>
//     </div>
//   );
