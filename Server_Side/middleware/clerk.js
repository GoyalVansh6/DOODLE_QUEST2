import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const protect = ClerkExpressRequireAuth();

export { protect };