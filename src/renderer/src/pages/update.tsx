import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { Customer } from '~/src/shared/types/ipc';
import { Input } from '../components/Input';

const updateCustomerSchema = z.object({
  name: z.string().min(3, 'O nome precisa ter pelo menos 3 letras'),
  email: z.string().email('Digite um e-mail válido'),
  role: z.string().min(2, 'O cargo é obrigatório'),
  address: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return val.length === 14 || val.length === 15;
    }, 'Digite o telefone completo (com DDD)'),
});

type UpdateCustomerFormData = z.infer<typeof updateCustomerSchema>;

function normalizePhoneNumber(value: string | undefined) {
  if (!value) return '';
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
    .slice(0, 15);
}

export function Update() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      return await window.api.fetchCustomerById(id!);
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCustomerFormData>({
    resolver: zodResolver(updateCustomerSchema),
    values: data
      ? {
          name: data.name,
          email: data.email,
          role: data.role,
          address: data.address || '',
          phone: data.phone || '',
        }
      : undefined,
  });

  const { isPending, mutateAsync: updateCustomer } = useMutation({
    mutationFn: async (formData: UpdateCustomerFormData) => {
      const customerToUpdate: Customer = {
        ...data!,
        ...formData,
      };
      return await window.api.updateCustomer(customerToUpdate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customer', id] });

      navigate(`/customer/${id}`);
    },
  });

  async function handleUpdateCustomer(formData: UpdateCustomerFormData) {
    await updateCustomer(formData);
  }

  return (
    <div className="flex-1 flex flex-col py-12 2xl:py-20 px-10 gap-8 overflow-y-auto">
      <div className="w-full max-w-md 2xl:max-w-2xl mx-auto flex flex-col">
        <Link
          to={`/customer/${id}`}
          className="flex items-center gap-2 mb-4 w-fit hover:opacity-80 transition-opacity 2xl:text-2xl text-white"
        >
          <ArrowLeft className="w-6 h-6 2xl:w-8 2xl:h-8 text-white" />
          <span>Cancelar</span>
        </Link>
      </div>

      <section className="flex flex-1 flex-col items-center">
        <h1 className="text-white text-2xl lg:text-3xl 2xl:text-5xl font-semibold mb-4 2xl:mb-8 text-center">
          Editar cliente
        </h1>

        {isLoading ? (
          <p className="text-gray-400 2xl:text-xl">Carregando dados...</p>
        ) : (
          <form
            className="w-full max-w-md 2xl:max-w-2xl mt-4 flex flex-col gap-4 2xl:gap-6"
            onSubmit={handleSubmit(handleUpdateCustomer)}
          >
            <Input
              label="Nome:"
              placeholder="Digite o nome..."
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="Endereço:"
              placeholder="Digite o endereço..."
              error={errors.address?.message}
              {...register('address')}
            />
            <Input
              label="Email:"
              type="email"
              placeholder="Digite o email..."
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Cargo:"
              placeholder="Digite o cargo..."
              error={errors.role?.message}
              {...register('role')}
            />

            <Input
              label="Telefone:"
              placeholder="(99) 99999-9999"
              maxLength={15}
              error={errors.phone?.message}
              {...register('phone', {
                onChange: (e) => {
                  e.target.value = normalizePhoneNumber(e.target.value);
                },
              })}
            />

            <button
              type="submit"
              className="bg-green-500 rounded flex items-center justify-center w-full h-10 2xl:h-16 2xl:text-2xl mt-4 2xl:mt-8 hover:bg-green-600 transition-colors disabled:bg-gray-500 text-white font-semibold shadow-md"
              disabled={isPending}
            >
              {isPending ? 'Salvando...' : 'Salvar alterações'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
