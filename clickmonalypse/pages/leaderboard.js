
import { useContractRead } from 'wagmi';
import Sidebar from '../components/Sidebar';
import contractABI from '../lib/contractABI.json';
import { ethers } from 'ethers';

export default function Leaderboard() {
  const { data: leaderboard } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contractABI.abi,
    functionName: 'getLeaderboard',
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        {leaderboard && leaderboard.players.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-2">Player</th>
                <th className="p-2">Wins</th>
                <th className="p-2">MON Won</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.players.map((player, index) => (
                <tr key={player}>
                  <td className="p-2">{player}</td>
                  <td className="p-2">{leaderboard.wins[index].toString()}</td>
                  <td className="p-2">{ethers.utils.formatEther(leaderboard.monWon[index])} MON</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leaderboard data available.</p>
        )}
      </div>
    </div>
  );
}