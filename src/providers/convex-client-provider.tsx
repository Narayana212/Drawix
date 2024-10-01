"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import Loading from "@/components/auth/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

/**
 * Provides a Convex client with Clerk authentication wrapper for the application
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider
 * @returns {JSX.Element} A component tree wrapped with authentication and Convex client providers
 */
export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>
        {children}
        </Authenticated>
        <AuthLoading>
            <Loading/>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
