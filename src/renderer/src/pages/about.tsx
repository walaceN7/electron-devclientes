import { useQuery } from '@tanstack/react-query';

export function About() {
  const { data, isLoading } = useQuery({
    queryKey: ['version-app'],
    queryFn: async () => {
      return await window.api.getVersionApp();
    },
  });

  return (
    <div className="flex-1 flex flex-col py-12 px-10 text-white">
      <h1 className="text-white text-xl lg:text-3xl font-semibold mb-4">
        Sobre
      </h1>

      <p>
        Projeto criado por <b>Walace</b>
      </p>
      <p>Versão atual do projeto: {!isLoading && data && data}</p>
    </div>
  );
}
