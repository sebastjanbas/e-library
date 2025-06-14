import Roomlist from '@/components/content/libraries/room-list'
import RoomListSkeletoon from '@/components/content/skeletons/room-list-skeleton'
import React, { Suspense } from 'react'

const RoomsPage = () => {
  return (
    <div className='mt-20 p-5'>
      <Suspense fallback={<RoomListSkeletoon />}>
        <Roomlist />
      </Suspense>
    </div>
  )
}

export default RoomsPage
