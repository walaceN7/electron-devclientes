import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Pencil, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { InfoField } from '../components/InfoField';

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      return await window.api.fetchCustomerById(id!);
    },
    enabled: !!id,
  });

  const { isPending, mutateAsync: deleteCustomer } = useMutation({
    mutationFn: async () => {
      return await window.api.deleteCustomer(id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      navigate('/');
    },
  });

  function handleConfirmDelete() {
    if (isPending) return;
    deleteCustomer();
  }

  return (
    <div className="flex-1 flex flex-col py-12 2xl:py-20 px-10 text-white relative">
      <div className="w-full max-w-5xl 2xl:max-w-7xl mx-auto flex flex-col">
        <Link
          to="/"
          className="flex items-center gap-2 mb-4 w-fit hover:opacity-80 transition-opacity 2xl:text-2xl"
        >
          <ArrowLeft className="w-6 h-6 2xl:w-8 2xl:h-8 text-white" />
          <span>Voltar</span>
        </Link>

        <h1 className="text-white text-2xl lg:text-3xl 2xl:text-5xl font-semibold mb-6 2xl:mb-10">
          Detalhes do cliente
        </h1>

        <section className="flex flex-col gap-6 2xl:gap-10 w-full">
          {isLoading && (
            <p className="text-gray-400 2xl:text-xl">Carregando detalhes...</p>
          )}
          {!isLoading && !data && (
            <p className="text-red-400 2xl:text-xl">Cliente não encontrado.</p>
          )}

          {!isLoading && data && (
            <article className="w-full relative flex flex-col gap-4 2xl:gap-8">
              <section className="bg-gray-800 rounded-lg p-5 2xl:p-8 flex flex-col gap-2 2xl:gap-4 shadow-lg border border-gray-700/50 relative">
                <div className="flex flex-col gap-2 2xl:gap-4 pr-12 2xl:pr-16">
                  <p className="mb-2 font-bold text-xl 2xl:text-4xl text-blue-400">
                    {data.name}
                  </p>
                  <InfoField label="Email">{data.email}</InfoField>
                  <InfoField label="Endereço">{data.address}</InfoField>
                  <InfoField label="Telefone">{data.phone}</InfoField>
                </div>

                <div className="absolute -top-3 right-5 2xl:-top-6 2xl:right-8 flex items-center gap-3 2xl:gap-5">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 p-3 2xl:p-4 rounded-full z-20 transition-all hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed shadow-md"
                    onClick={() => navigate(`/update/${id}`)}
                    title="Editar cliente"
                  >
                    <Pencil className="text-white h-6 w-6 2xl:h-8 2xl:w-8" />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 p-3 2xl:p-4 rounded-full z-20 transition-all hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed shadow-md"
                    onClick={() => setIsDialogOpen(true)}
                    disabled={isPending}
                    title="Excluir cliente"
                  >
                    <Trash className="text-white h-6 w-6 2xl:h-8 2xl:w-8" />
                  </button>
                </div>
              </section>

              <section className="bg-gray-800 rounded-lg p-5 2xl:p-8 flex flex-col gap-2 2xl:gap-4 shadow-lg border border-gray-700/50">
                <InfoField label="Cargo">{data.role}</InfoField>

                <p className="font-semibold 2xl:text-2xl mt-2">
                  <span className="text-gray-400 font-normal">
                    Status atual:{' '}
                  </span>
                  <span
                    className={data.status ? 'text-green-400' : 'text-red-400'}
                  >
                    {data.status ? 'ATIVO' : 'INATIVO'}
                  </span>
                </p>
              </section>
            </article>
          )}
        </section>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Excluir cliente?"
        description={
          <>
            Tem certeza que deseja excluir o cliente{' '}
            <strong className="text-white">{data?.name}</strong>?
          </>
        }
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isPending}
      />
    </div>
  );
}
