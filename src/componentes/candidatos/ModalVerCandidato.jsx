"use client";

import { useEffect, useState } from "react";
import Modal from "@/componentes/ui/Modal";
import Badge from "@/componentes/ui/Badge";
import { listarFormacoesPorCandidato } from "@/servicos/formacaoServico";
import { formatarData, calcularIdade, iniciais } from "@/utils/helpers";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  CreditCard,
  GraduationCap,
  BookOpen,
} from "lucide-react";

function ItemInfo({ icone: Icone, label, valor }) {
  if (!valor) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 p-1.5 rounded-lg bg-[#006B4F]/10">
        <Icone size={14} className="text-[#006B4F]" />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-700">{valor}</p>
      </div>
    </div>
  );
}

export default function ModalVerCandidato({ aberto, aoFechar, candidato }) {
  const [formacoes, setFormacoes] = useState([]);

  useEffect(() => {
    if (candidato) {
      setFormacoes(listarFormacoesPorCandidato(candidato.id));
    }
  }, [candidato]);

  if (!candidato) return null;

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo="Perfil do Candidato"
      tamanho="lg"
    >
      <div className="p-6 flex flex-col gap-6">
        {/* Cabeçalho do perfil */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#006B4F]/10 to-transparent rounded-xl">
          {candidato.foto ? (
            <img
              src={candidato.foto}
              alt={candidato.nomeCompleto}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-[#006B4F]/30"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#006B4F] text-white flex items-center justify-center text-xl font-bold">
              {iniciais(candidato.nomeCompleto)}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-gray-800">{candidato.nomeCompleto}</h3>
            <p className="text-sm text-gray-500">{candidato.email}</p>
            <div className="flex gap-2 mt-1">
              <Badge texto={candidato.provincia} cor="verde" />
              <Badge
                texto={`${candidato.anosExperienciaInt} ${candidato.anosExperienciaInt === 1 ? "ano" : "anos"} exp.`}
                cor="azul"
              />
            </div>
          </div>
        </div>

        {/* Dados Pessoais */}
        <div>
          <h4 className="text-sm font-semibold text-[#006B4F] uppercase tracking-wide mb-3 flex items-center gap-2">
            <User size={14} />
            Dados Pessoais
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ItemInfo
              icone={Mail}
              label="Email"
              valor={candidato.email}
            />
            <ItemInfo
              icone={Phone}
              label="Telefone"
              valor={candidato.telefone}
            />
            <ItemInfo
              icone={Calendar}
              label="Data de Nascimento"
              valor={
                candidato.dataNascimento
                  ? `${formatarData(candidato.dataNascimento)} (${calcularIdade(candidato.dataNascimento)} anos)`
                  : null
              }
            />
            <ItemInfo
              icone={CreditCard}
              label="Bilhete de Identidade"
              valor={candidato.bilheteIdentidade}
            />
            <ItemInfo icone={User} label="Género" valor={candidato.genero} />
            <ItemInfo
              icone={User}
              label="Estado Civil"
              valor={candidato.estadoCivil}
            />
            <ItemInfo
              icone={MapPin}
              label="Província"
              valor={candidato.provincia}
            />
            <ItemInfo
              icone={Briefcase}
              label="Anos de Experiência"
              valor={`${candidato.anosExperienciaInt} ${candidato.anosExperienciaInt === 1 ? "ano" : "anos"}`}
            />
          </div>

          {candidato.observacoes && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Observações</p>
              <p className="text-sm text-gray-600">{candidato.observacoes}</p>
            </div>
          )}
        </div>

        {/* Formações */}
        <div>
          <h4 className="text-sm font-semibold text-[#006B4F] uppercase tracking-wide mb-3 flex items-center gap-2">
            <GraduationCap size={14} />
            Formação Académica
          </h4>

          {formacoes.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-sm">
              <BookOpen size={32} className="mx-auto mb-2 opacity-40" />
              Nenhuma formação registada
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {formacoes.map((f) => (
                <div
                  key={f.id}
                  className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:border-[#006B4F]/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#006B4F]/10">
                    <GraduationCap size={16} className="text-[#006B4F]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700">{f.curso}</p>
                    <p className="text-xs text-gray-500">{f.instituicao}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge texto={f.grau} cor="verde" />
                      <Badge texto={f.pais} cor="cinza" />
                      <span className="text-xs text-gray-400">
                        {f.anoInicio} — {f.aFrequentar ? "A frequentar" : f.anoConclusao}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé */}
        <p className="text-xs text-gray-400 text-right">
          Cadastrado em {formatarData(candidato.criadoEm)}
        </p>
      </div>
    </Modal>
  );
}