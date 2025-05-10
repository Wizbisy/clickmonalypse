// clickmonalypse/pages/index.js
import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import Sidebar from '../components/Sidebar';
import contractABI from '../lib/contractABI.json';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [timer, setTimer] = useState(0);

  const { data: gameState, refetch } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contractABI.abi,
    functionName: 'getGameState',
  });

  const { write: click } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contractABI.abi,
    functionName: 'click',
    value: ethers.utils.parseEther('0.01'),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (gameState) {
      const lastClickTime = Number(gameState.lastClickTime);
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = 30 - (now - lastClickTime);
      setTimer(timeLeft > 0 ? timeLeft : 0);
    }
  }, [gameState]);

  const handleClick = async () => {
    if (!isConnected) {
      alert('Please connect your wallet!');
      return;
    }
    try {
      await click();
    } catch (error) {
      console.error('Error clicking:', error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4">Clickmonalypse</h1>
        {isConnected ? (
          <div>
            <p className="text-xl mb-2">Timer: {timer} seconds</p>
            <p className="text-xl mb-2">Pot: {gameState ? ethers.utils.formatEther(gameState.pot) : '0'} MON</p>
            <p className="text-xl mb-4">Last Clicker: {gameState ? gameState.lastClicker : 'None'}</p>
            <button
              onClick={handleClick}
              className="bg-monadBlue text-white px-6 py-3 rounded-lg text-lg"
            >
              Click to Reset (0.01 MON)
            </button>
          </div>
        ) : (
          <p className="text-xl">Please connect your wallet to play!</p>
        )}
      </div>
    </div>
  );
}