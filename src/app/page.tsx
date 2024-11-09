'use client';
import WorkspaceTemplate from "@/components/templates/workspace-template";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Home() {
  return(
    <QueryClientProvider client={queryClient}>
      <WorkspaceTemplate/>
    </QueryClientProvider>
  ) 
}