import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { io, Socket } from 'socket.io-client';
import Player from './components/Player';
import Environment from './components/Environment';
import Preloader from './components/Preloader';
import CharacterCreator from './components/CharacterCreator';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [players, setPlayers] = useState<{ [key: string]: { position: [number, number, number], color: string, gender: string } }>({});
  const [showCreator, setShowCreator] = useState(true);
  const [playerColor, setPlayerColor] = useState('#FF69B4');
  const [playerGender, setPlayerGender] = useState('female');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('players', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    // Simulate loading time
    setTimeout(() => setIsLoading(false), 2000);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handlePlayerMove = (position: [number, number, number]) => {
    if (socket) {
      socket.emit('move', { position, color: playerColor, gender: playerGender });
    }
  };

  const handleCharacterCreation = (color: string, gender: string) => {
    setPlayerColor(color);
    setPlayerGender(gender);
    setShowCreator(false);
    if (socket) {
      socket.emit('newPlayer', { color, gender });
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="w-full h-screen">
      {showCreator ? (
        <CharacterCreator onSubmit={handleCharacterCreation} />
      ) : (
        <>
          <Canvas camera={{ position: [0, 5, 10] }}>
            <Sky />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <Physics>
                <Environment />
                {Object.entries(players).map(([id, player]) => (
                  <Player
                    key={id}
                    position={player.position}
                    color={player.color}
                    gender={player.gender}
                    isCurrentPlayer={id === socket?.id}
                    onMove={handlePlayerMove}
                  />
                ))}
                <Player
                  position={[0, 1, 0]}
                  color={playerColor}
                  gender={playerGender}
                  isCurrentPlayer={true}
                  onMove={handlePlayerMove}
                />
              </Physics>
            </Suspense>
            <OrbitControls />
          </Canvas>
          <Controls onMove={handlePlayerMove} />
        </>
      )}
    </div>
  );
};

export default App;