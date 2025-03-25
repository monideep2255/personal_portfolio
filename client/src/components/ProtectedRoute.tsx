import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { data, isLoading } = useQuery({
    queryKey: ["/api/auth/status"],
    staleTime: 0, // Always fetch fresh data
    cacheTime: 0, // Don't cache the result
  });

  useEffect(() => {
    if (!isLoading && !data?.isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [data, isLoading, setLocation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return data?.isAuthenticated ? <>{children}</> : null;
}