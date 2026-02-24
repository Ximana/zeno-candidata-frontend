import Header from "@/componentes/layout/Header";
import { Users, Briefcase, FileText, TrendingUp } from "lucide-react";
import candidatos from "@/dados/candidatos.json";
import vagas from "@/dados/vagas.json";
import candidaturas from "@/dados/candidaturas.json";

function CardEstatistica({ label, valor, icone: Icone, cor }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl ${cor}`}>
        <Icone size={22} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{valor}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function PaginaDashboard() {
  const aprovados = candidaturas.filter((c) => c.estado === "Aprovado").length;

  return (
    <div className="flex flex-col flex-1">
      <Header titulo="Dashboard" />
      <div className="p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bom dia! 👋</h1>
          <p className="text-sm text-gray-400 mt-1">
            Aqui está um resumo do sistema de recrutamento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardEstatistica
            label="Total de Candidatos"
            valor={candidatos.length}
            icone={Users}
            cor="bg-[#006B4F]"
          />
          <CardEstatistica
            label="Vagas Abertas"
            valor={vagas.length}
            icone={Briefcase}
            cor="bg-blue-500"
          />
          <CardEstatistica
            label="Candidaturas"
            valor={candidaturas.length}
            icone={FileText}
            cor="bg-purple-500"
          />
          <CardEstatistica
            label="Aprovados"
            valor={aprovados}
            icone={TrendingUp}
            cor="bg-emerald-500"
          />
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4">
            Candidaturas Recentes
          </h3>
          <div className="flex flex-col gap-2">
            {candidaturas.slice(0, 5).map((c) => {
              const candidato = candidatos.find(
                (cd) => cd.id === c.candidatoId,
              );
              const vaga = vagas.find((v) => v.id === c.vagaId);
              const cores = {
                "Em análise": "bg-yellow-100 text-yellow-700",
                Aprovado: "bg-emerald-100 text-emerald-700",
                Reprovado: "bg-red-100 text-red-700",
              };
              return (
                <div
                  key={c.id}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {candidato?.nomeCompleto}
                    </p>
                    <p className="text-xs text-gray-400">{vaga?.titulo}</p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${cores[c.estado]}`}
                  >
                    {c.estado}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
