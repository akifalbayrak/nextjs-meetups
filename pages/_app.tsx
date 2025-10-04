import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import ThemeProvider from "./context/ThemeContext";
import "../lib/i18n";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}

export default MyApp;
