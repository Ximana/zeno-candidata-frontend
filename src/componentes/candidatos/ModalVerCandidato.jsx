"use client";

import Modal from "@/componentes/ui/Modal";
import { formatarData, calcularIdade, iniciais } from "@/utils/helpers";
import { GraduationCap, BookOpen } from "lucide-react";

function Linha({ label, valor }) {
  if (!valor) return null;
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-700">{valor}</p>
    </div>
  );
}

export default function ModalVerCandidato({ aberto, aoFechar, candidato }) {
  if (!candidato) return null;

  const formacoes = candidato.formacoes || [];
  const exp       = candidato.anosExperienciaInt;

  return (
    <Modal aberto={aberto} aoFechar={aoFechar} titulo="Perfil do Candidato" tamanho="lg">
      <div className="p-6 flex flex-col gap-6">

        {/* Cabeçalho */}
        <div className="flex items-center gap-4 p-4 bg-[#006B4F]/5 rounded-xl">
          {candidato.foto ? (
            <img src={candidato.foto} alt={candidato.nomeCompleto}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-[#006B4F]/30" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#006B4F] text-white flex items-center justify-center text-xl font-bold">
              {iniciais(candidato.nomeCompleto)}
            </div>
          )}
          <div>
            <p className="text-lg font-bold text-gray-800">{candidato.nomeCompleto}</p>
            <p className="text-sm text-gray-500">{candidato.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {candidato.provincia} · {exp} {exp === 1 ? "ano" : "anos"} de exp.
            </p>
          </div>
        </div>

        {/* Dados pessoais */}
        <div>
          <p className="text-xs font-semibold text-[#006B4F] uppercase tracking-wide mb-3">Dados Pessoais</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Linha label="Telefone" valor={candidato.telefone} />
            <Linha label="Género" valor={candidato.genero} />
            <Linha label="Estado Civil" valor={candidato.estadoCivil} />
            <Linha label="Bilhete de Identidade" valor={candidato.bilheteIdentidade} />
            <Linha label="Província" valor={candidato.provincia} />
            <Linha label="Data de Nascimento"
              valor={candidato.dataNascimento
                ? `${formatarData(candidato.dataNascimento)} (${calcularIdade(candidato.dataNascimento)} anos)`
                : null} />
          </div>
          {candidato.observacoes && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Observações</p>
              <p className="text-sm text-gray-600">{candidato.observacoes}</p>
            </div>
          )}
        </div>

        {/* Formação */}
        <div>
          <p className="text-xs font-semibold text-[#006B4F] uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <GraduationCap size={13} /> Formação Académica
          </p>
          {formacoes.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-sm">
              <BookOpen size={28} className="mx-auto mb-2 opacity-40" />
              Nenhuma formação registada
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {formacoes.map((f) => (
                <div key={f.id} className="p-3 border border-gray-100 rounded-xl">
                  <p className="text-sm font-semibold text-gray-700">{f.curso}</p>
                  <p className="text-xs text-gray-500">{f.instituicao} · {f.grau} · {f.pais}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {f.anoInicio} — {f.aFrequentar ? "A frequentar" : f.anoConclusao}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-right">Cadastrado em {formatarData(candidato.criadoEm)}</p>
      </div>
    </Modal>
  );
}