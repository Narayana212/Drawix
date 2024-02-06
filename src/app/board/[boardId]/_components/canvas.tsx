"use client"

import React from 'react'
import {Info} from './info';
import Participants from './participants';
import Toolbar from './toolbar';
import { useSelf } from '../../../../../liveblocks.config';

interface CanvasProps {
    boardId: string;
  };
  

export default function Canvas({
    boardId,
  }: CanvasProps) {
   
   
  return (
   <main className='h-full w-full relative bg-neutral-100 touch-none '>
   
    <Info boardId={boardId}/>
    <Participants/>
    <Toolbar/>
   


   </main>
  )
}