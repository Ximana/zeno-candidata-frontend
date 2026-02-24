"use client";

import { useState, useEffect } from "react";
import Modal from "@/componentes/ui/Modal";
import Input from "@/componentes/ui/Input";
import Botao from "@/componentes/ui/Button";

const VAGA_VAZIA = {
  titulo: "",
  descricao: "",
  departamento: "",
};

export default function ModalFormularioVaga({ aberto, aoFechar, vaga, aoSalvar }) {
  const [form, setForm] = useState(VAGA_VAZIA);
  const [erros, setErros] = useState({});

  const modoEdicao = !!vaga;

  useEffect(() => {
    if (vaga) {
      setForm({ ...VAGA_VAZIA, ...vaga });
    } else {
      setForm(VAGA_VAZIA);
    }
    setErros({});
  }, [vaga, aberto]);

  function aoMudar(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (erros[name]) setErros((prev) => ({ ...prev, [name]: "" }));
  }

  function validar() {
    const novosErros = {};
    if (!form.titulo.trim()) novosErros.titulo = "Campo obrigatório";
    if (!form.departamento.trim()) novosErros.departamento = "Campo obrigatório";
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

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo={modoEdicao ? "Editar Vaga" : "Nova Vaga"}
      tamanho="md"
    >
      <form onSubmit={aoSubmeter} className="p-6 flex flex-col gap-4">
        <Input
          label="Título da Vaga"
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
          <label className="text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={aoMudar}
            rows={4}
            placeholder="Descreva as responsabilidades e requisitos da vaga..."
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F] focus:border-transparent transition-all resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Botao variante="fantasma" onClick={aoFechar} tipo="button">
            Cancelar
          </Botao>
          <Botao tipo="submit" variante="primario">
            {modoEdicao ? "Guardar alterações" : "Criar vaga"}
          </Botao>
        </div>
      </form>
    </Modal>
  );
}