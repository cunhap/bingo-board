"use client"

import React, { useState, useEffect } from 'react';
import { CreateBoardDialog } from '@/components/CreateBoardDialog';
import { BoardSelector } from '@/components/BoardSelector';
import { BingoCard } from '@/components/BingoCard';
import { ExportImportButtons } from '@/components/ExportImportButtons';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BoardState } from '@/types';
import ThemeToggles from '@/components/ThemeToggles';
import Snow from '@/components/Snow';


export default function Home() {
  const [boards, setBoards] = useState<BoardState[]>([]);
  const [currentBoardId, setCurrentBoardId] = useState<string | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isChristmas, setIsChristmas] = useState(false);

  useEffect(() => {
    // Initialize Christmas theme state
    const savedChristmas = localStorage.getItem('theme-christmas') === 'true';
    setIsChristmas(savedChristmas);
  }, []);

  useEffect(() => {
    const savedBoards = localStorage.getItem('bingo-boards');
    if (savedBoards) {
      const loadedBoards = JSON.parse(savedBoards);
      setBoards(loadedBoards);
      if (loadedBoards.length > 0) {
        setCurrentBoardId(loadedBoards[0].id);
      }
    }
  }, []);

  const currentBoard = boards.find(b => b.id === currentBoardId);

  const checkWin = (selections: number[]) => {
    for (let i = 0; i < 4; i++) {
      let rowComplete = true;
      for (let j = 0; j < 4; j++) {
        if (!selections.includes(i * 4 + j)) {
          rowComplete = false;
          break;
        }
      }
      if (rowComplete) return true;
    }

    for (let i = 0; i < 4; i++) {
      let colComplete = true;
      for (let j = 0; j < 4; j++) {
        if (!selections.includes(i + j * 4)) {
          colComplete = false;
          break;
        }
      }
      if (colComplete) return true;
    }

    return false;
  };

  const handleCreateBoard = (newBoard: BoardState) => {
    const newBoards = [...boards, newBoard];
    setBoards(newBoards);
    setCurrentBoardId(newBoard.id);
    localStorage.setItem('bingo-boards', JSON.stringify(newBoards));
  };

  const handleToggleCell = (index: number) => {
    if (!currentBoard) return;

    setBoards(prevBoards => {
      const newBoards = prevBoards.map(board => {
        if (board.id !== currentBoardId) return board;

        const newSelectedCells = [...board.selectedCells];
        const cellIndex = newSelectedCells.indexOf(index);

        if (cellIndex === -1) {
          newSelectedCells.push(index);
          if (checkWin(newSelectedCells)) {
            setShowFireworks(true);
            setTimeout(() => setShowFireworks(false), 2000);
          }
        } else {
          newSelectedCells.splice(cellIndex, 1);
        }

        return {
          ...board,
          selectedCells: newSelectedCells
        };
      });

      localStorage.setItem('bingo-boards', JSON.stringify(newBoards));
      return newBoards;
    });
  };

  const handleUpdateLabel = (newLabel: string) => {
    setBoards(prevBoards => {
      const newBoards = prevBoards.map(board =>
        board.id === currentBoardId ? { ...board, label: newLabel } : board
      );
      localStorage.setItem('bingo-boards', JSON.stringify(newBoards));
      return newBoards;
    });
  };

  const handleDeleteBoard = () => {
    setBoards(prevBoards => {
      const newBoards = prevBoards.filter(board => board.id !== currentBoardId);
      localStorage.setItem('bingo-boards', JSON.stringify(newBoards));
      if (newBoards.length > 0) {
        setCurrentBoardId(newBoards[0].id);
      } else {
        setCurrentBoardId(null);
      }
      return newBoards;
    });
  };

  const handleImport = (importedBoards: BoardState[]) => {
    setBoards(importedBoards);
    if (importedBoards.length > 0) {
      setCurrentBoardId(importedBoards[0].id);
    } else {
      setCurrentBoardId(null);
    }
    localStorage.setItem('bingo-boards', JSON.stringify(importedBoards));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="snowfall">
        <Snow />
      </div>
      <div className="space-y-8 w-full max-w-2xl mx-auto p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <CreateBoardDialog onCreateBoard={handleCreateBoard} />
              <BoardSelector
                boards={boards}
                currentBoardId={currentBoardId}
                onBoardSelect={setCurrentBoardId}
              />
            </div>
            <ThemeToggles/>
          </div>
          <ExportImportButtons
            boards={boards}
            onImport={handleImport}
          />
        </div>

        {currentBoard && (
          <BingoCard
            board={currentBoard}
            showFireworks={showFireworks}
            onToggleCell={handleToggleCell}
            onUpdateLabel={handleUpdateLabel}
            onDelete={handleDeleteBoard}
            isChristmas={isChristmas}
          />
        )}

        <style jsx global>{`
          @keyframes firework-1 {
            0% { box-shadow: 0 0 0 -2px #ff0000; }
            50% { box-shadow: 0 0 50px 50px transparent; }
            100% { box-shadow: 0 0 100px 100px transparent; }
          }
          @keyframes firework-2 {
            0% { box-shadow: 0 0 0 -2px #00ff00; }
            50% { box-shadow: 0 0 50px 50px transparent; }
            100% { box-shadow: 0 0 100px 100px transparent; }
          }
          @keyframes firework-3 {
            0% { box-shadow: 0 0 0 -2px #0000ff; }
            50% { box-shadow: 0 0 50px 50px transparent; }
            100% { box-shadow: 0 0 100px 100px transparent; }
          }
          @keyframes firework-4 {
            0% { box-shadow: 0 0 0 -2px #ffff00; }
            50% { box-shadow: 0 0 50px 50px transparent; }
            100% { box-shadow: 0 0 100px 100px transparent; }
          }
          .animate-firework-1 { animation: firework-1 1s ease-out forwards; }
          .animate-firework-2 { animation: firework-2 1s ease-out 0.2s forwards; }
          .animate-firework-3 { animation: firework-3 1s ease-out 0.4s forwards; }
          .animate-firework-4 { animation: firework-4 1s ease-out 0.6s forwards; }
        `}</style>
      </div>
    </div>
  );
}