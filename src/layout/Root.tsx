import { SDKProvider } from "@tma.js/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { type FC, useMemo } from "react";

import App from "@/App";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Provider } from "react-redux";
import store from "@/redux/index";
const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  // const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  // useEffect(() => {
  //   if (debug) {
  //     import('eruda').then((lib) => lib.default.init());
  //   }
  // }, [debug]);

  return (
    <Provider store={store}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <SDKProvider acceptCustomStyles debug>
          <App />
        </SDKProvider>
      </TonConnectUIProvider>
    </Provider>
  );
};

export default function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <Inner />
    </ErrorBoundary>
  );
}
