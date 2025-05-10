// clickmonalypse/pages/_app.js
import { WagmiConfig, createConfig } from 'wagmi';
import { walletConnect } from '@wagmi/connectors';
import { http } from 'viem';
import '../styles/globals.css';

const projectId = 'c00a663f0e31a759343a823846d54f7d';

const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://shy-polished-sound.monad-testnet.quiknode.pro/80816883909f333b81f1c58ff02c73e8bd5b70a1/'],
    },
    public: {
      http: ['https://shy-polished-sound.monad-testnet.quiknode.pro/80816883909f333b81f1c58ff02c73e8bd5b70a1/'],
    },
  },
  blockExplorers: {
    default: { name: 'MonadScan', url: 'https://explorer.monad-testnet.xyz' },
  },
  testnet: true,
};

const config = createConfig({
  chains: [monadTestnet],
  connectors: [
    walletConnect({
      projectId,
      metadata: {
        name: 'Clickmonalypse',
        description: 'A reaction-based game on Monad Testnet',
        url: 'https://clickmonalypse.vercel.app',
        icons: ['https://clickmonalypse.vercel.app/assets/icon.png'],
      },
    }),
  ],
  transports: {
    [monadTestnet.id]: http('https://shy-polished-sound.monad-testnet.quiknode.pro/80816883909f333b81f1c58ff02c73e8bd5b70a1/'),
  },
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}