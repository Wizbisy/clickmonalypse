
import { useAccount } from 'wagmi';
import Sidebar from '../components/Sidebar';

export default function Profile() {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4">Profile</h1>
        {isConnected ? (
          <div>
            <p className="text-xl mb-2">Wallet Address: {address}</p>
            {/* Add more profile stats here later if needed */}
          </div>
        ) : (
          <p className="text-xl">Please connect your wallet to view your profile.</p>
        )}
      </div>
    </div>
  );
}