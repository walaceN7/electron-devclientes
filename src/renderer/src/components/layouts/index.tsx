import * as Collapsible from '@radix-ui/react-collapsible';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../header';
import { Sidebar } from '../sidebar';

export function Layout() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    function handleNavigate() {
      navigate('/create');
    }

    const unsub = window.api.onNewCustomer(handleNavigate);

    return () => {
      unsub();
    };
  }, []);

  return (
    <Collapsible.Root
      defaultOpen
      className="h-screen w-screen bg-gray-950 text-slate-100 flex"
      onOpenChange={setIsSidebarOpen}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />

        <Outlet />
      </div>
    </Collapsible.Root>
  );
}
