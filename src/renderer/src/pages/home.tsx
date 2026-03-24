import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Customer } from '~/src/shared/types/ipc';
import { InfoField } from '../components/InfoField';

export function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      return await window.api.fetchAllCustomers();
    },
  });

  return (
    <div className="flex-1 flex flex-col py-12 2xl:py-20 text-white relative">
      <div className="px-10 2xl:px-16 w-full max-w-7xl mx-auto">
        <h1 className="text-white text-2xl lg:text-3xl 2xl:text-5xl font-semibold mb-6 2xl:mb-10">
          Todos os clientes
        </h1>
      </div>

      <section className="flex flex-col gap-4 w-full max-w-7xl mx-auto h-full overflow-y-auto px-10 2xl:px-16 pb-12">
        {isLoading && (
          <p className="text-gray-400 2xl:text-xl">Carregando clientes...</p>
        )}

        {!isLoading && data?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12 gap-4 text-center">
            <p className="text-gray-300 text-lg 2xl:text-2xl">
              Nenhum cliente encontrado.
            </p>
            <Link
              to="/create"
              className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-3 2xl:px-8 2xl:py-4 2xl:text-xl rounded font-semibold text-white"
            >
              Cadastrar primeiro cliente
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 2xl:gap-6">
          {data?.map((customer: Customer) => (
            <Link
              to={`/customer/${customer._id}`}
              key={customer._id}
              className="bg-gray-800 p-5 2xl:p-8 rounded-lg hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-col gap-2 2xl:gap-4"
            >
              <p className="font-semibold text-xl 2xl:text-3xl text-white">
                {customer.name}
              </p>

              <div className="flex flex-col gap-1 2xl:gap-2">
                <InfoField label="Email">{customer.email}</InfoField>
                <InfoField label="Telefone">{customer.phone}</InfoField>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
