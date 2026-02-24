import Header from "@/componentes/layout/Header";
import ListaCandidatos from "@/componentes/candidatos/ListaCandidatos";

export const metadata = {
  title: "Candidatos | RecrutaApp",
};

export default function PaginaCandidatos() {
  return (
    <div className="flex flex-col flex-1">
      <Header titulo="Candidatos" />
      <div className="p-6">
        <ListaCandidatos />
      </div>
    </div>
  );
}