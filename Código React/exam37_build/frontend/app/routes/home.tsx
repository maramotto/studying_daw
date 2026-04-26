import { Outlet, useNavigation } from "react-router";
import "./home.css";
import type { Route } from "../+types/root";

export default function Home() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      <h1>Library {isLoading && <span className="spinner"></span>}</h1>
      <div style={{ opacity: isLoading ? 0.5 : 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  
  let errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
  
  return (
    <div>
      <h1>Library</h1>
      <div style={{ backgroundColor: "lightcoral" }}>
        <p>Error: {errorMessage}</p>
        <button onClick={() => window.location.href = "/"}>Back to home</button>
      </div>
    </div>
  );
}
