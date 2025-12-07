import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from "./pages/Details";
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient();

  return (
    <div className='font-custom'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div >
  )
}

export default App