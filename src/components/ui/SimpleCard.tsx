'use client'
import React from 'react'

interface SimpleCardProps {
  poster: string;
  title?: string;
  artist?: string;
  mainColor?: string;
}

export function SimpleCard({ poster, title = 'Virtual Assistant', artist = 'Mercedes-Benz', mainColor = '#0a75c9' }: SimpleCardProps) {
  const cardStyle = {
    '--main-color': mainColor,
  } as React.CSSProperties

  return (
    <section
      className="w-[20rem] bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl p-4 
        shadow-xl hover:shadow-2xl transition-all duration-300 
        hover:bg-white/20 dark:hover:bg-black/30"
      style={cardStyle}
    >
      {/* Image container */}
      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden group bg-gray-100">
        <img
          src={poster}
          alt="assistant poster"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="mb-2 px-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {artist}
        </p>
      </div>
    </section>
  )
} 