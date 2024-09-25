import React from 'react'
import { Zap, Heart, Trophy, BarChart, Cpu } from 'lucide-react';
import ResultCard from "components/Result/ResultCard"
import { useNavigate } from 'react-router-dom';

const valueAreas = [
    {
      name: "Operational Efficiency",
      icon: Zap,
      applicationTypes: ["Process Automation", "Resource Optimization", "Predictive Maintenance"],
      horizon: { period: "FY25", number: 1 },
      infoExposure: "Internal",
      dataSensitivity: "Medium",
      complexityOfUsage: "Moderate",
      riskRating: 2,
      opportunities: [
        "Automate repetitive tasks to reduce manual labor and errors",
        "Optimize resource allocation through predictive analytics"
      ]
    },
    {
      name: "Customer Value",
      icon: Heart,
      applicationTypes: ["Personalization", "Chatbots", "Recommendation Systems"],
      horizon: { period: "FY26", number: 2 },
      infoExposure: "External",
      dataSensitivity: "High",
      complexityOfUsage: "Low",
      riskRating: 3,
      opportunities: [
        "Personalize customer experiences using AI-driven insights",
        "Enhance customer support with intelligent chatbots"
      ]
    },
    {
      name: "Competitive Advantage",
      icon: Trophy,
      applicationTypes: ["Predictive Analytics", "AI-Powered Products", "Market Intelligence"],
      horizon: { period: "FY27", number: 3 },
      infoExposure: "Confidential",
      dataSensitivity: "Very High",
      complexityOfUsage: "High",
      riskRating: 4,
      opportunities: [
        "Leverage AI for faster, data-driven decision making",
        "Develop AI-powered products to differentiate from competitors"
      ]
    },
    {
      name: "Reporting Intelligence",
      icon: BarChart,
      applicationTypes: ["Automated Reporting", "Data Visualization", "Real-time Analytics"],
      horizon: { period: "FY25", number: 1 },
      infoExposure: "Internal",
      dataSensitivity: "Medium",
      complexityOfUsage: "Low",
      riskRating: 2,
      opportunities: [
        "Generate automated, insightful reports from complex data sets",
        "Provide real-time analytics dashboards for better visibility"
      ]
    },
    {
      name: "Technology Development",
      icon: Cpu,
      applicationTypes: ["AI Research", "Machine Learning Integration", "AI Infrastructure"],
      horizon: { period: "FY27", number: 3 },
      infoExposure: "Confidential",
      dataSensitivity: "High",
      complexityOfUsage: "Very High",
      riskRating: 5,
      opportunities: [
        "Accelerate R&D processes with AI-assisted simulations",
        "Implement machine learning models to improve existing systems"
      ]
    }
  ];

function Result({step}) {
    const navigate = useNavigate()
    const handleSubmit = () => {
        if(step === 1){
            navigate("ai-responsible-use")
        } else {
            navigate("ai-tech-enablement")
        }
    }
    return (
        <div className="h-full overflow-y-auto w-full p-6 bg-gray-800 bg-opacity-30 rounded-lg backdrop-blur-sm overflow-hidden">
          {/* <div className="h-full w-full overflow-y-auto p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl"> */}
            {valueAreas.map((currentArea, index) => (
              <ResultCard key={index} currentArea={currentArea} step={step} />
            ))}
          {/* </div> */}
            <button 
                className={`w-full space-x-2 p-2 rounded-lg border transition duration-200 
                    bg-gray-800 text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-gray-800 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer`}
                //   onClick={handleSubmit}
                >
                Go To the Next Step
            </button>
        </div>
    );
}

export default Result