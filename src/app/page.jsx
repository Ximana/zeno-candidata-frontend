"use client";

import { useEffect, useState } from "react";
import Header from "@/componentes/layout/Header";
import { Users, Briefcase, FileText, TrendingUp } from "lucide-react";
import { listarCandidatos } from "@/servicos/candidatoServico";
import { listarVagas } from "@/servicos/vagaServico";
import { listarCandidaturas } from "@/servicos/candidaturaServico";
import { iniciais, formatarData } from "@/utils/helpers";

const coresEstado = {
  "Em análise": "bg-yellow-100 text-yellow-700",
  Aprovado: "bg-emerald-100 text-emerald-700",
  Reprovado: "bg-red-100 text-red-700",
};

export default function PaginaDashboard() {
  const [candidatos, setCandidatos] = useState([]);
  const [vagas, setVagas] = useState([]);
  const [candidaturas, setCandidaturas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const [c, v, ca] = await Promise.all([
          listarCandidatos(),
          listarVagas(),
          listarCandidaturas(),
        ]);
        setCandidatos(c);
        setVagas(v);
        setCandidaturas(ca);
      } catch {
        // silencia o erro no dashboard
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  const aprovados = candidaturas.filter((c) => c.estado === "Aprovado").length;

  return (
    <div className="flex flex-col flex-1">
      <Header titulo="Dashboard" />
      <div className="p-4 lg:p-6 flex flex-col gap-6">
        
        {/* Candidaturas recentes */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4">
            Candidaturas Recentes
          </h3>

          {carregando ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : candidaturas.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              Nenhuma candidatura registada.
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              {candidaturas.slice(0, 5).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    {c.candidato?.foto ? (
                      <img
                        src={c.candidato.foto}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#006B4F] text-white flex items-center justify-center text-xs font-bold">
                        {iniciais(c.candidato?.nomeCompleto || "?")}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {c.candidato?.nomeCompleto}
                      </p>
                      <p className="text-xs text-gray-400">{c.vaga?.titulo}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${coresEstado[c.estado]}`}
                  >
                    {c.estado}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
