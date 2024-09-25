import React, { useState, useRef, useEffect } from 'react';
import { Send, PlusCircle, ArrowRight } from "lucide-react";
import MessageLoader from "../common/MessageLoader";
import Suggestions from "../components/Suggestions/Suggestions";
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Message from 'components/Message/Message';

const ChatbotUI = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSuggestions, setSelectedSuggestions] = useState([]);
    const [recommendedSuggestions, setRecommendedSuggestions] = useState([{
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
    }]);
    const [allRecommendedResponded, setAllRecommendedResponded] = useState(false);
    const [showInput, setShowInput] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const messagesEndRef = useRef(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(scrollToBottom, [messages, isLoading]);
  
    const handleSendMessage = () => {
      if (inputText.trim() === "") return;

      const newMessage = { text: inputText, isBot: false };
      setMessages([...messages, newMessage]);
      setInputText("")
      // Check if this message is a response to the last bot message
      checkUserResponse(newMessage);
    };
    
    const checkUserResponse = (userMessage) => {
      const lastBotMessage = [...messages].reverse().find(msg => msg.isBot);
      if (lastBotMessage) {
        const respondedSuggestion = recommendedSuggestions.find(
          suggestion => suggestion.question === lastBotMessage.text && !suggestion.responded
        );
        
        if (respondedSuggestion) {
          const updatedRecommended = recommendedSuggestions.map(suggestion =>
            suggestion.id === respondedSuggestion.id ? { ...suggestion, responded: true } : suggestion
          );
          
          setRecommendedSuggestions(updatedRecommended);
          
          const allResponded = updatedRecommended.every(suggestion => suggestion.responded);
          setAllRecommendedResponded(allResponded);
        }
      }
    };

    useEffect(() => {
      if (selectedSuggestions.length) {

      setIsLoading(true);
      
      // Simulate bot response with a realistic delay
      const responseDelay = Math.random() * (3000 - 1500) + 1500;
      setTimeout(() => {
        setIsLoading(false);
        setMessages(prev => [...prev, { 
          id: (Date.now() + 1).toString(),
          text: selectedSuggestions[selectedSuggestions.length - 1].question, 
          isBot: true,
          examples: selectedSuggestions[selectedSuggestions.length - 1].examples,
        }]);
      }, responseDelay);
      }
    }, [selectedSuggestions.length]);

    useEffect(() => {
      const allRecommendedSelected = recommendedSuggestions.length <=
        selectedSuggestions.filter(s => s.recommended).length;
      if (allRecommendedSelected && allRecommendedResponded) {
        setShowInput(false);
        // You can trigger any action here when all recommended suggestions are addressed
      }
    }, [selectedSuggestions, recommendedSuggestions, allRecommendedResponded]);

    return (
      <>
      <Breadcrumb pageName="Business Context" />
      
      <div className="flex flex-col h-screen bg-white p-4">
        <div className="bg-gray-800 pb-4 border-b border-gray-700">
          <h2 className="text-primary text-xl font-bold">Optimize Your Results</h2>
          <p className="text-gray-400 mt-2">For the best outcomes, please select all linked values one by
                one. This approach ensures comprehensive and tailored results.
                If time is limited, focus on items marked as "Recommended" for a
                balanced experience. Remember, the more selections you make, the
                more accurate your results will be. Your choices matter – take
                the time to select wisely!</p>
          <Suggestions setSelectedMsg={setSelectedSuggestions} />
        </div>
  
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <Message messages={messages} />
          {isLoading && (
            <MessageLoader/>
          )}
          <div ref={messagesEndRef} />
        </div>
  
        <div className="bg-gray-800 p-4 border-t border-gray-700 sticky bottom-0">
          {showInput ? (<div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-gray-700 text-black border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary text-white rounded-full p-2 hover:bg-light-gray hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Send size={20} />
            </button>
          </div>)
          : (
            <div className="flex justify-between">
              <button
                onClick={() => setShowInput(true)}
                className="bg-primary text-white rounded-full px-4 py-2 flex items-center hover:bg-light-gray hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <PlusCircle size={20} className="mr-2" />
                Add More Input
              </button>
              <button
                onClick={() => setShowResult(true)}
                className="bg-warm-red text-white rounded-full px-4 py-2 flex items-center hover:bg-light-gray hover:text-warm-red focus:outline-none focus:ring-2 focus:ring-warm-red"
              >
                Go to Result
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
      </>
    );
  };
  
  export default ChatbotUI;