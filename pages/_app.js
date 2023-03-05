import { AuthProvider } from "@/context/auth";
import "@/styles/style.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-sky-100">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
