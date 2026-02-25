"use client";

import { useState, useEffect } from "react";
import Modal from "@/componentes/ui/Modal";
import Select from "@/componentes/ui/Select";
import Botao from "@/componentes/ui/Button";
import { ESTADOS_CANDIDATURA } from "@/utils/constantes";

const VAZIO = { candidatoId: "", vagaId: "", estado: "Em análise" };

function CampoSelect({ label, name, value, onChange, opcoes, erro }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label} <span className="text-red-500">*</span></label>
      <select name={name} value={value} onChange={onChange}
        className={`px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B4F] focus:border-transparent transition-all ${erro ? "border-red-400" : "border-gray-300"}`}>
        <option value="">Seleccione...</option>
        {opcoes.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
      </select>
      {erro && <p className="text-xs text-red-500">{erro}</p>}
    </div>
  );
}

export default function ModalFormularioCandidatura({ aberto, aoFechar, candidatura, candidatos, vagas, aoSalvar }) {
  const [form, setForm]   = useState(VAZIO);
  const [erros, setErros] = useState({});
  const modoEdicao        = !!candidatura;

  useEffect(() => {
    setForm(candidatura ? { ...VAZIO, ...candidatura } : VAZIO);
    setErros({});
  }, [candidatura, aberto]);

  function aoMudar(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (erros[name]) setErros((prev) => ({ ...prev, [name]: "" }));
  }

  function aoSubmeter(e) {
    e.preventDefault();
    const ev = {};
    if (!form.candidatoId) ev.candidatoId = "Obrigatório";
    if (!form.vagaId)      ev.vagaId      = "Obrigatório";
    if (!form.estado)      ev.estado      = "Obrigatório";
    if (Object.keys(ev).length > 0) { setErros(ev); return; }
    aoSalvar(form);
    aoFechar();
  }

  return (
    <Modal aberto={aberto} aoFechar={aoFechar} titulo={modoEdicao ? "Editar Candidatura" : "Nova Candidatura"} tamanho="sm">
      <form onSubmit={aoSubmeter} className="p-6 flex flex-col gap-4">
        <CampoSelect label="Candidato" name="candidatoId" value={form.candidatoId} onChange={aoMudar}
          opcoes={candidatos.map((c) => ({ id: c.id, label: c.nomeCompleto }))} erro={erros.candidatoId} />
        <CampoSelect label="Vaga" name="vagaId" value={form.vagaId} onChange={aoMudar}
          opcoes={vagas.map((v) => ({ id: v.id, label: v.titulo }))} erro={erros.vagaId} />
        <Select label="Estado" nome="estado" valor={form.estado} aoMudar={aoMudar}
          opcoes={ESTADOS_CANDIDATURA} obrigatorio erro={erros.estado} />
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Botao variante="fantasma" onClick={aoFechar} tipo="button">Cancelar</Botao>
          <Botao tipo="submit" variante="primario">{modoEdicao ? "Guardar" : "Registar"}</Botao>
        </div>
      </form>
    </Modal>
  );
}