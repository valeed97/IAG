import React from 'react'

function MessageLoader() {
  return (
    <div className="flex justify-start">
        <div className="bg-gray-700 rounded-lg p-3">
        <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        </div>
    </div>
  )
}

export default MessageLoader