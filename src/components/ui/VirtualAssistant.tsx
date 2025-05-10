'use client'
import { useState } from 'react'
import { SimpleCard } from './SimpleCard'

export function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <SimpleCard 
            poster="https://i.pinimg.com/originals/c3/28/9c/c3289c889c206bb17148fe984d7ccbdb.gif"
            title="Virtual Assistant"
            artist="Mercedes-Benz"
            mainColor="#0a75c9"
          />
        </div>
      )}
      
      <button
        onClick={toggleAssistant}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-black/70 dark:bg-black/80 backdrop-blur-md text-white shadow-lg hover:bg-black/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a75c9]/50 border border-white/10"
        aria-label="Toggle virtual assistant"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1200px-Mercedes-Logo.svg.png" 
          alt="Mercedes-Benz Logo" 
          className="w-8 h-8"
        />
      </button>
    </div>
  )
} 