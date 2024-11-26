"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient(
    {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: true, // Refaz a requisição ao focar na janela (default: true)
          refetchOnReconnect: true,  // Refaz ao reconectar à internet (default: true)
          staleTime: 0,              // Tempo para os dados serem considerados "frescos" (default: 0)
        },
      },
    }
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen flex flex-col">
        {children}
      </main>
    </QueryClientProvider>
  );
}
