"use client"

import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Trash2} from 'lucide-react';
import {BoardState} from '@/types';

interface BingoCardProps {
  board: BoardState;
  showFireworks: boolean;
  onToggleCell: (index: number) => void;
  onUpdateLabel: (newLabel: string) => void;
  onDelete: () => void;
  isChristmas: boolean;
}

export function BingoCard({
                            board,
                            showFireworks,
                            isChristmas,
                            onToggleCell,
                            onUpdateLabel,
                            onDelete
                          }: BingoCardProps) {
  return (
    <div className="bingo-container">
      <h2 className="board-header text-2xl mb-4">
        {isChristmas ? '🎄 Festive Bingo 🎄' : 'Bingo Board'}
      </h2>
      <Card className="relative bg-card bingo-card">
        <CardContent className="p-6 pt-12">
          <div className="flex items-center gap-2 mb-4">
            <Input
              value={board.label}
              onChange={(e) => onUpdateLabel(e.target.value)}
              className="text-lg font-bold bg-white dark:bg-slate-900"
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4"/>
            </Button>
          </div>

          {showFireworks && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 animate-firework-1"/>
              <div className="absolute top-1/4 right-1/4 animate-firework-2"/>
              <div className="absolute bottom-1/4 left-1/3 animate-firework-3"/>
              <div className="absolute bottom-1/4 right-1/3 animate-firework-4"/>
            </div>
          )}

          <div className="grid grid-cols-4 gap-2">
            {board.items.map((item, index) => (
              <button
                key={index}
                onClick={() => onToggleCell(index)}
                className={`
                cell-button
                p-2 text-xs sm:p-4 sm:text-sm text-center border rounded-lg
                min-h-16 sm:min-h-24
                transition-colors duration-200
                break-words hyphens-auto
                flex items-center justify-center
                ${board.selectedCells.includes(index) ? 'selected' : ''}
                ${board.selectedCells.includes(index)
                  ? 'bg-blue-500 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-700 text-black dark:text-white hover:bg-blue-50 dark:hover:bg-slate-600 border-gray-200 dark:border-slate-600'}
              `}
              >
                {item}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

  );
}