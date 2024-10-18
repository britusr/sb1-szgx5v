import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface CharacterCreatorProps {
  onSubmit: (color: string, gender: string) => void;
}

const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onSubmit }) => {
  const [color, setColor] = useState('#FF69B4');
  const [gender, setGender] = useState('female');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Create Your Character</h2>
        <div className="mb-6">
          <HexColorPicker color={color} onChange={setColor} />
        </div>
        <div className="mb-6">
          <label className="block mb-2">Select Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <p className="text-yellow-400 mb-4">
          Note: 3D models are not available. Simplified shapes will be used to represent characters and objects.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => onSubmit(color, gender)}
        >
          Enter 3D World
        </button>
      </div>
    </div>
  );
};

export default CharacterCreator;