"use client";

import { useState, useEffect } from "react";
import Modal from "@/componentes/ui/Modal";
import Input from "@/componentes/ui/Input";
import Botao from "@/componentes/ui/Button";

const VAZIO = { titulo: "", descricao: "", departamento: "" };

export default function ModalFormularioVaga({
  aberto,
  aoFechar,
  vaga,
  aoSalvar,
}) {
  const [form, setForm] = useState(VAZIO);
  const [erros, setErros] = useState({});
  const modoEdicao = !!vaga;

  useEffect(() => {
    setForm(vaga ? { ...VAZIO, ...vaga } : VAZIO);
    setErros({});
  }, [vaga, aberto]);

  function aoMudar(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (erros[name]) setErros((prev) => ({ ...prev, [name]: "" }));
  }

  function aoSubmeter(e) {
    e.preventDefault();
    const ev = {};
    if (!form.titulo.trim()) ev.titulo = "Obrigatório";
    if (!form.departamento.trim()) ev.departamento = "Obrigatório";
    if (Object.keys(ev).length > 0) {
      setErros(ev);
      return;
    }
    aoSalvar(form);
    aoFechar();
  }

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo={modoEdicao ? "Editar Vaga" : "Nova Vaga"}
      tamanho="md"
    >
      <form onSubmit={aoSubmeter} className="p-6 flex flex-col gap-4">
        <Input
          label="Título"
          nome="titulo"
          valor={form.titulo}
          aoMudar={aoMudar}
          placeholder="Ex: Desenvolvedor Frontend"
          obrigatorio
          erro={erros.titulo}
        />
        <Input
          label="Departamento"
          nome="departamento"
          valor={form.departamento}
          aoMudar={aoMudar}
          placeholder="Ex: Tecnologia"
          obrigatorio
          erro={erros.departamento}
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={aoMudar}
            rows={3}
            placeholder="Descrição da vaga..."
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F] focus:border-transparent transition-all resize-none"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Botao variante="fantasma" onClick={aoFechar} tipo="button">
            Cancelar
          </Botao>
          <Botao tipo="submit" variante="primario">
            {modoEdicao ? "Guardar" : "Criar vaga"}
          </Botao>
        </div>
      </form>
    </Modal>
  );
}
