import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface ControlsProps {
  onMove: (position: [number, number, number]) => void;
}

const Controls: React.FC<ControlsProps> = ({ onMove }) => {
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  const handleMove = (direction: [number, number, number]) => {
    const newPosition: [number, number, number] = [
      position[0] + direction[0],
      position[1] + direction[1],
      position[2] + direction[2],
    ];
    setPosition(newPosition);
    onMove(newPosition);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
          handleMove([0, 0, -1]);
          break;
        case 'KeyS':
          handleMove([0, 0, 1]);
          break;
        case 'KeyA':
          handleMove([-1, 0, 0]);
          break;
        case 'KeyD':
          handleMove([1, 0, 0]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position]);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      <button
        className="bg-gray-800 text-white p-2 rounded-full mb-2"
        onClick={() => handleMove([0, 0, -1])}
      >
        <ArrowUp />
      </button>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleMove([-1, 0, 0])}
        >
          <ArrowLeft />
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleMove([0, 0, 1])}
        >
          <ArrowDown />
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded-full"
          onClick={() => handleMove([1, 0, 0])}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Controls;