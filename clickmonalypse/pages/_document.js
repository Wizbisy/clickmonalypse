// clickmonalypse/pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const frameEmbed = {
    version: 'next',
    imageUrl: 'https://clickmonalypse.vercel.app/api/og',
    button: {
      title: '🎮 Play Now',
      action: {
        type: 'launch_frame',
        name: 'Clickmonalypse',
        url: 'https://clickmonalypse.vercel.app',
        splashImageUrl: 'https://clickmonalypse.vercel.app/assets/splash.png',
        splashBackgroundColor: '#4B0082',
      },
    },
  };

  return (
    <Html lang="en">
      <Head>
        <meta name="fc:frame" content={JSON.stringify(frameEmbed)} />
        <meta property="og:title" content="Clickmonalypse" />
        <meta property="og:description" content="A reaction-based game on Monad Testnet where players click to reset a timer and win the pot!" />
        <meta property="og:image" content="https://clickmonalypse.vercel.app/api/og" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}