import React , {useState} from 'react';
import { Star} from "lucide-react";

const Suggestions = ({ setSelectedMsg }) => {
    const defaultSuggestions = [
        {
          id: 1,
          text: "Operational Efficiency",
          recommended: true,
          question: "Could you please provide a few examples of implementing operational efficiency?",
          examples: [
            "Faster claim processing by a claims manager.",
            "Faster claim classification/segmentation by a claims manager.",
            "Quicker replies to positive emails by a sales manager.",
            "Faster conversions of meetings by a sales manager."
          ],
          selected: false,
        },
        {
          id: 2,
          text: "Customer Value",
          recommended: true,
          question: "Could you please provide a few examples of enhancing customer value?",
          examples: [
            "Implementing customer feedback loops.",
            "Offering personalized experiences based on customer data."
          ],
          selected: false,
        },
        {
          id: 3,
          text: "Competitive Advantage",
          recommended: true,
          question: "Could you please provide a few examples of achieving competitive advantage?",
          examples: [
            "Developing unique selling propositions in marketing.",
            "Leveraging exclusive partnerships."
          ],
          selected: false,
        },
        {
          id: 4,
          text: "Innovation",
          recommended: false,
          question: "Could you please provide a few examples of fostering innovation?",
          examples: [
            "Encouraging employee-led brainstorming sessions.",
            "Investing in R&D for new technologies."
          ],
          selected: false,
        },
        {
          id: 5,
          text: "Market Share",
          recommended: false,
          question: "Could you please provide a few examples of increasing market share?",
          examples: [
            "Launching targeted marketing campaigns.",
            "Offering competitive pricing strategies."
          ],
          selected: false,
        },
        {
          id: 6,
          text: "Employee Satisfaction",
          recommended: false,
          question: "Could you please provide a few examples of enhancing employee satisfaction?",
          examples: [
            "Implementing flexible work arrangements.",
            "Conducting regular employee feedback surveys."
          ],
          selected: false,
        },
        {
          id: 7,
          text: "Sustainability",
          recommended: false,
          question: "Could you please provide a few examples of promoting sustainability?",
          examples: [
            "Reducing carbon footprint in operations.",
            "Adopting sustainable sourcing practices."
          ],
          selected: false,
        },
      ];
  
    const [suggestions, SetSuggestions] = useState(defaultSuggestions);
  
    const handleSuggestionClick = (suggestion) => {
        SetSuggestions(prevData => {
          const newData = [...prevData];
          const objectToUpdate = newData.find(item => item.id === suggestion.id);
          
          if (objectToUpdate && !objectToUpdate['selected']) {
            objectToUpdate['selected'] = true;
            setSelectedMsg(prevSelected =>[...prevSelected, {
              question:suggestion.question,
              examples: suggestion.examples,
              recommended: suggestion.recommended,
            }])
          }
          return newData;
        });
        
      };
  
    return (
      <div className="mt-4">
        <h3 className="text-primary text-lg mb-3">Suggestions:</h3>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
              <button
                onClick={() => handleSuggestionClick(suggestion)}
                className={`flex items-center px-4 py-2 rounded-full text-sm transition-all duration-200
                    ${
                        suggestion.selected
                          ? "text-white bg-gradient-to-r from-warm-red to-primary"
                          : "bg-white text-dusky-teal border-2 border-dusky-teal"
                      }
                    `}
              >
                {suggestion.recommended && (
                  <Star size={14} className="mr-2 text-yellow-400" fill="yellow" />
                )}
                {suggestion.text}
              </button>
          ))}
        </div>
      </div>
    );
  };
export default Suggestions