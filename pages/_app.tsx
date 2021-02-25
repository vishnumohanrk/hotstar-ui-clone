import 'tailwindcss/tailwind.css';
import 'keen-slider/keen-slider.min.css';
import '../styles/globals.css';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useEffect } from 'react';

import AppFooter from '../components/footer';
import AppHeader from '../components/header';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      nProgress.start();
    };
    const handleStop = () => {
      nProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen w-full max-w-screen-2xl px-4 xl:px-12 mx-auto">
      <AppHeader />
      <main className="flex-1 pt-1">
        <Component {...pageProps} />
      </main>
      <AppFooter />
    </div>
  );
};

export default MyApp;
