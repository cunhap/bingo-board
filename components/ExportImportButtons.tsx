// components/ExportImportButtons.tsx
"use client"

import React from 'react';
import {Button} from "@/components/ui/button";
import {Download, Upload} from 'lucide-react';
import {BoardState} from '@/types';

interface ExportImportButtonsProps {
  boards: BoardState[];
  onImport: (boards: BoardState[]) => void;
}

export function ExportImportButtons({boards, onImport}: ExportImportButtonsProps) {
  const handleExport = () => {
    const dataStr = JSON.stringify(boards, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bingo-boards-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedBoards = JSON.parse(content);
        if (!Array.isArray(importedBoards)) {
          throw new Error('Invalid format');
        }
        onImport(importedBoards);
      } catch (error) {
        alert('Error importing boards: Invalid file format');
        console.log(error);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto bg-background">
        <Download className="mr-2 h-4 w-4"/>
        Export Boards
      </Button>
      <div className="relative w-full sm:w-auto">
        <Button variant="outline" className="w-full sm:w-auto bg-background">
          <Upload className="mr-2 h-4 w-4"/>
          Import Boards
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".json"
            onChange={handleImport}
          />
        </Button>
      </div>
    </div>
  );
}