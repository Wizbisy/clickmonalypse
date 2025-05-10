
import { ImageResponse } from 'next/og';
import { ethers } from 'ethers';

export const runtime = 'edge';

export default async function handler() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://shy-polished-sound.monad-testnet.quiknode.pro/80816883909f333b81f1c58ff02c73e8bd5b70a1/'
    );
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      require('../../lib/contractABI.json').abi,
      provider
    );

    const gameState = await contract.getGameState();
    const lastClickTime = Number(gameState.lastClickTime);
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = 30 - (now - lastClickTime);
    const timer = timeLeft > 0 ? timeLeft : 0;
    const pot = ethers.utils.formatEther(gameState.pot);
    const lastClicker = gameState.lastClicker.slice(0, 6) + '...';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #4B0082, #1E90FF)',
            color: 'white',
            fontFamily: 'Arial',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          <h1 style={{ fontSize: '80px', fontWeight: 'bold', marginBottom: '20px' }}>
            Clickmonalypse
          </h1>
          <p style={{ fontSize: '40px', fontStyle: 'italic', marginBottom: '40px' }}>
            Click to Win on Monad!
          </p>
          <p style={{ fontSize: '36px', marginBottom: '10px' }}>Timer: {timer} seconds</p>
          <p style={{ fontSize: '36px', marginBottom: '10px' }}>Pot: {pot} MON</p>
          <p style={{ fontSize: '36px', marginBottom: '40px' }}>
            Last Clicker: {lastClicker}
          </p>
          <div
            style={{
              backgroundColor: '#1E90FF',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '10px',
              fontSize: '32px',
            }}
          >
            Click to Reset (0.01 MON)
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              fontSize: '24px',
              opacity: 0.7,
            }}
          >
            Powered by Farcaster
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, immutable, no-transform, max-age=300',
        },
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error.message);
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #4B0082, #1E90FF)',
            color: 'white',
            fontFamily: 'Arial',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          <h1 style={{ fontSize: '80px', fontWeight: 'bold', marginBottom: '20px' }}>
            Clickmonalypse
          </h1>
          <p style={{ fontSize: '40px', fontStyle: 'italic' }}>
            Click to Win on Monad!
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, immutable, no-transform, max-age=0',
        },
      }
    );
  }
}