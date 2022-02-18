import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../themes';
import createEmotionCache from '../themes/createEmotionCache';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
// authentication with auth0
import { Auth0Provider } from "@auth0/auth0-react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


const createApolloClient = () => {
  const link = new HttpLink({
    uri: "/api/graphql",
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};


function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // theme customizations
  // const customization = useSelector((state) => state.customization);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
      redirectUri={"http://localhost:3000"}
      audience={process.env.NEXT_PUBLIC_JWT_AUDIENCE}
    >
      <ApolloProvider client={createApolloClient()}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme()}>
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </ApolloProvider>
    </Auth0Provider>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};