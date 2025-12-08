import { useAuth } from "@clerk/clerk-react";

export async function fetchProtected(endpoint) {
  const { getToken } = useAuth();

  // Get a short-lived token managed by Clerk
  const token = await getToken();

  // Call your backend with the token in the Authorization header
  const res = await fetch(`http://localhost:3000${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include", // only if your backend also uses cookies
  });

  if (!res.ok) {
    throw new Error("Unauthorized or request failed");
  }

  return res.json();
}
