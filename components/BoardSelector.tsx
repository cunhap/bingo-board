"use client"

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BoardState } from '@/types';

interface BoardSelectorProps {
  boards: BoardState[];
  currentBoardId: string | null;
  onBoardSelect: (boardId: string) => void;
}

export function BoardSelector({ boards, currentBoardId, onBoardSelect }: BoardSelectorProps) {
  return (
    <Select value={currentBoardId || undefined} onValueChange={onBoardSelect}>
      <SelectTrigger className="w-[280px] bg-white dark:bg-slate-800">
        <SelectValue placeholder="Select a board" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-slate-800">
        {boards.map(board => (
          <SelectItem key={board.id} value={board.id}>
            {board.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}