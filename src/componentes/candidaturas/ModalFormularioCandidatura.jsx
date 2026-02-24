"use client";

import { useState, useEffect } from "react";
import Modal from "@/componentes/ui/Modal";
import Select from "@/componentes/ui/Select";
import Botao from "@/componentes/ui/Button";
import { ESTADOS_CANDIDATURA } from "@/utils/constantes";

const CANDIDATURA_VAZIA = {
  candidatoId: "",
  vagaId: "",
  estado: "Em análise",
};

export default function ModalFormularioCandidatura({
  aberto,
  aoFechar,
  candidatura,
  candidatos,
  vagas,
  aoSalvar,
}) {
  const [form, setForm] = useState(CANDIDATURA_VAZIA);
  const [erros, setErros] = useState({});

  const modoEdicao = !!candidatura;

  useEffect(() => {
    if (candidatura) {
      setForm({ ...CANDIDATURA_VAZIA, ...candidatura });
    } else {
      setForm(CANDIDATURA_VAZIA);
    }
    setErros({});
  }, [candidatura, aberto]);

  function aoMudar(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (erros[name]) setErros((prev) => ({ ...prev, [name]: "" }));
  }

  function validar() {
    const novosErros = {};
    if (!form.candidatoId) novosErros.candidatoId = "Seleccione um candidato";
    if (!form.vagaId) novosErros.vagaId = "Seleccione uma vaga";
    if (!form.estado) novosErros.estado = "Seleccione um estado";
    return novosErros;
  }

  function aoSubmeter(e) {
    e.preventDefault();
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }
    aoSalvar(form);
    aoFechar();
  }

  // Preparar listas para os selects
  const opcoesCandidatos = candidatos.map((c) => c.nomeCompleto);
  const opcoesVagas = vagas.map((v) => v.titulo);

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo={modoEdicao ? "Editar Candidatura" : "Nova Candidatura"}
      tamanho="sm"
    >
      <form onSubmit={aoSubmeter} className="p-6 flex flex-col gap-4">
        {/* Select de candidato — usamos o nome mas guardamos o id */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Candidato <span className="text-red-500">*</span>
          </label>
          <select
            name="candidatoId"
            value={form.candidatoId}
            onChange={aoMudar}
            className={`px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B4F] focus:border-transparent transition-all ${
              erros.candidatoId ? "border-red-400" : "border-gray-300"
            }`}
          >
            <option value="">Seleccione um candidato...</option>
            {candidatos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nomeCompleto}
              </option>
            ))}
          </select>
          {erros.candidatoId && (
            <p className="text-xs text-red-500">{erros.candidatoId}</p>
          )}
        </div>

        {/* Select de vaga */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Vaga <span className="text-red-500">*</span>
          </label>
          <select
            name="vagaId"
            value={form.vagaId}
            onChange={aoMudar}
            className={`px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B4F] focus:border-transparent transition-all ${
              erros.vagaId ? "border-red-400" : "border-gray-300"
            }`}
          >
            <option value="">Seleccione uma vaga...</option>
            {vagas.map((v) => (
              <option key={v.id} value={v.id}>
                {v.titulo}
              </option>
            ))}
          </select>
          {erros.vagaId && (
            <p className="text-xs text-red-500">{erros.vagaId}</p>
          )}
        </div>

        <Select
          label="Estado"
          nome="estado"
          valor={form.estado}
          aoMudar={aoMudar}
          opcoes={ESTADOS_CANDIDATURA}
          obrigatorio
          erro={erros.estado}
        />

        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Botao variante="fantasma" onClick={aoFechar} tipo="button">
            Cancelar
          </Botao>
          <Botao tipo="submit" variante="primario">
            {modoEdicao ? "Guardar alterações" : "Registar candidatura"}
          </Botao>
        </div>
      </form>
    </Modal>
  );
}