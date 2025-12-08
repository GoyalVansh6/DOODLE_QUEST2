// ProtectedRoute.jsx
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // Wait until Clerk checks session

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
