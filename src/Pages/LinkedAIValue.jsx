import React, { useState, useRef, useEffect } from "react";
import { toast } from 'react-toastify';
import MessageLoader from "common/MessageLoader";
import Suggestions from "components/Suggestions/Suggestions";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Message from "components/Chat/Message/Message";
import ChatInput from "components/Chat/Input/Input";
import Handlers from "components/Chat/Handlers/Handlers";
import Result from "components/Result/Result";
import useAxios from "hooks/useAxios";
import { useApp } from "context/AppContext";
import { valueAreas } from "JSONs/valueAreas"

const LinkedAIValue = () => {
  const {
    handleResultValues,
    defaultRecommendedSuggestions,
  } = useApp();

  const {postCall} = useAxios()
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [recommendedSuggestions, setRecommendedSuggestions] = useState(
    defaultRecommendedSuggestions
  );
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
    setInputText("");
    // Check if this message is a response to the last bot message
    checkUserResponse(newMessage);
  };

  const checkUserResponse = () => {
    const lastBotMessage = [...messages].reverse().find((msg) => msg.isBot);
    if (lastBotMessage) {
      const respondedSuggestion = recommendedSuggestions.find(
        (suggestion) =>
          suggestion.question === lastBotMessage.text && !suggestion.responded
      );

      if (respondedSuggestion) {
        const updatedRecommended = recommendedSuggestions.map((suggestion) =>
          suggestion.id === respondedSuggestion.id
            ? { ...suggestion, responded: true }
            : suggestion
        );

        setRecommendedSuggestions(updatedRecommended);

        const allResponded = updatedRecommended.every(
          (suggestion) => suggestion.responded
        );
        setAllRecommendedResponded(allResponded);
      }
    }
  };

  const fetchResults = async() => {
    if(allRecommendedResponded){
      const result = await postCall("process-messages", {messages:messages});
      if(result.success){
        handleResultValues(valueAreas)
        setShowResult(true)
      } else {

      }
    } else {
      toast.warn("Please respond to the recommneded suggestion first")
    }
  }

  useEffect(() => {
    if (selectedSuggestions.length) {
      setIsLoading(true);

      // Simulate bot response with a realistic delay
      const responseDelay = Math.random() * (3000 - 1500) + 1500;
      setTimeout(() => {
        setIsLoading(false);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: selectedSuggestions[selectedSuggestions.length - 1].question,
            isBot: true,
            examples:
              selectedSuggestions[selectedSuggestions.length - 1].examples,
          },
        ]);
      }, responseDelay);
    }
  }, [selectedSuggestions.length]);

  useEffect(() => {
    const allRecommendedSelected =
      recommendedSuggestions.length <=
      selectedSuggestions.filter((s) => s.recommended).length;
    if (allRecommendedSelected && allRecommendedResponded) {
      setShowInput(false);
      // You can trigger any action here when all recommended suggestions are addressed
    }
  }, [selectedSuggestions, recommendedSuggestions, allRecommendedResponded]);

  useEffect(() => {
    setRecommendedSuggestions(defaultRecommendedSuggestions);
  }, [defaultRecommendedSuggestions]);

  return (
    <>
      <Breadcrumb pageName="Linked AI Value" />

      {!showResult ? <div className="flex flex-col h-screen bg-white p-4">
        <div className="bg-gray-800 pb-4 border-b border-gray-700">
          <h2 className="text-primary text-xl font-bold">
            Optimize Your Results
          </h2>
          <p className="text-gray-400 mt-2">
            For the best outcomes, please select all linked values one by one.
            This approach ensures comprehensive and tailored results. If time is
            limited, focus on items marked as "Recommended" for a balanced
            experience. Remember, the more selections you make, the more
            accurate your results will be. Your choices matter – take the time
            to select wisely!
          </p>
          <Suggestions
            setSelectedMsg={setSelectedSuggestions}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <Message messages={messages} />
          {isLoading && <MessageLoader />}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-gray-800 p-4 border-t border-gray-700 sticky bottom-0">
          {showInput ? (
            <ChatInput
              inputText={inputText}
              setInputText={setInputText}
              handleSendMessage={handleSendMessage}
            />
          ) : (
            <Handlers
              setShowInput={setShowInput}
              fetchResults={fetchResults}
            />
          )}
        </div>
      </div> : <Result step={1}/>}
    </>
  );
};

export default LinkedAIValue;
