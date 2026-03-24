import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { NewCustomer } from '~/src/shared/types/ipc';
import { Input } from '../components/Input';

const createCustomerSchema = z.object({
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

type CreateCustomerFormData = z.infer<typeof createCustomerSchema>;

function normalizePhoneNumber(value: string | undefined) {
  if (!value) return '';

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
    .slice(0, 15);
}

export function Create() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),
  });

  const { isPending, mutateAsync: createCustomer } = useMutation({
    mutationFn: async (data: CreateCustomerFormData) => {
      const customer: NewCustomer = { ...data, status: true };
      return await window.api.addCustomer(customer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      navigate('/');
    },
  });

  async function handleAddCustomer(data: CreateCustomerFormData) {
    await createCustomer(data);
    reset();
  }

  return (
    <div className="flex-1 flex flex-col py-12 2xl:py-20 px-10 gap-8 overflow-y-auto">
      <section className="flex flex-1 flex-col items-center">
        <h1 className="text-white text-2xl lg:text-3xl 2xl:text-5xl font-semibold mb-4 2xl:mb-8">
          Cadastrar novo cliente
        </h1>

        <form
          className="w-full max-w-md 2xl:max-w-2xl mt-4 flex flex-col gap-4 2xl:gap-6"
          onSubmit={handleSubmit(handleAddCustomer)}
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
            className="bg-blue-500 rounded flex items-center justify-center w-full h-10 2xl:h-16 2xl:text-2xl mt-4 2xl:mt-8 hover:bg-blue-600 transition-colors disabled:bg-gray-500"
            disabled={isPending}
          >
            {isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </section>
    </div>
  );
}
