import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "1rem",
            padding: "1rem 1.2rem",
            borderRadius: "12px",
            background: "rgba(50, 50, 50, 0.95)",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </div>
  );
}

export default Layout;
