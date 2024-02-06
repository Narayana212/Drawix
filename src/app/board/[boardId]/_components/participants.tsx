import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

export default function Participants() {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
        List of users

    </div>
  )
}

export const ParticipantsSkeleton = () => {
  return (
    <Skeleton className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
};