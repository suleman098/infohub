// src/pages/_app.tsx

import { AppProps } from 'next/app';
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
};

export default MyApp;


