import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import UserProfile from "./components/UserProfile";
import "./index.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProfile />
  </QueryClientProvider>
);

export default App;
