import React from 'react'

const LoadingPage = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col rounded-xl items-center justify-center min-h-screen bg-gradient-to-r ">
      <div className="text-center">
        
      </div>
      <div className="mt-8 flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  )
}

export default LoadingPage