// components/CreateBoardDialog.tsx
"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { BoardState } from '@/types';

interface CreateBoardDialogProps {
  onCreateBoard: (board: BoardState) => void;
}

export function CreateBoardDialog({ onCreateBoard }: CreateBoardDialogProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newBoardLabel, setNewBoardLabel] = React.useState('');
  const [newBoardItems, setNewBoardItems] = React.useState('');

  const handleCreateBoard = () => {
    const items = newBoardItems
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (items.length < 16) {
      alert('Please provide at least 16 items');
      return;
    }

    const newBoard: BoardState = {
      id: Date.now().toString(),
      label: newBoardLabel || `Board ${Date.now()}`,
      items: items.slice(0, 16).sort(() => Math.random() - 0.5),
      selectedCells: []
    };

    onCreateBoard(newBoard);
    setNewBoardLabel('');
    setNewBoardItems('');
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white dark:bg-slate-800">
          <Plus className="mr-2 h-4 w-4" />
          Create New Board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">Create New Bingo Board</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block text-slate-900 dark:text-white">Board Label</label>
            <Input
              placeholder="Enter board label"
              value={newBoardLabel}
              onChange={(e) => setNewBoardLabel(e.target.value)}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-slate-900 dark:text-white">
              Items (one per line, minimum 16)
            </label>
            <Textarea
              placeholder="Enter items (one per line)"
              value={newBoardItems}
              onChange={(e) => setNewBoardItems(e.target.value)}
              className="min-h-[200px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
          <Button onClick={handleCreateBoard} className="w-full">
            Create Board
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}