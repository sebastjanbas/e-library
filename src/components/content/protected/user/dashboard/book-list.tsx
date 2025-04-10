import React from 'react'

const SampleBooks = [
  {id: 1, title: "Great Gatsby", thumbnail: "https://placehold.co/128x192?text=Image\nThumbnail"},
  {id: 2, title: "Faster Than Lightning", thumbnail: "https://placehold.co/128x192?text=Image\nThumbnail"},
  {id: 3, title: "Grokking Algorithms", thumbnail: "https://placehold.co/128x192?text=Image\nThumbnail"},
  {id: 4, title: "Topolino", thumbnail: "https://placehold.co/128x192?text=Image\nThumbnail"},
]

export const BookList = () => {
  return (
    <div className='flex flex-row gap-5 items-center justify-evenly w-full'>
      {SampleBooks.map((book) => (
      <div key={book.id} className='rounded-md overflow-hidden'>
          <img src={book.thumbnail} />
      </div>
      ))}
    </div>
  )
}

