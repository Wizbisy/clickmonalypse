
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-monadPurple p-4">
      <h2 className="text-2xl font-bold mb-6">Clickmonalypse</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/">
              <span className="text-lg hover:text-monadBlue cursor-pointer">🏠 Home</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/leaderboard">
              <span className="text-lg hover:text-monadBlue cursor-pointer">🏆 Leaderboard</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/profile">
              <span className="text-lg hover:text-monadBlue cursor-pointer">👤 Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}