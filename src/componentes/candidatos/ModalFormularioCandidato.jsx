"use client";

import { useState, useEffect, useRef } from "react";
import Modal from "@/componentes/ui/Modal";
import Input from "@/componentes/ui/Input";
import Select from "@/componentes/ui/Select";
import Botao from "@/componentes/ui/Button";
import { PROVINCIAS, GENEROS, ESTADOS_CIVIS, GRAUS_ACADEMICOS } from "@/utils/constantes";
import { iniciais } from "@/utils/helpers";
import { Camera, Plus, Trash2, GraduationCap, User } from "lucide-react";

// Formação em branco para usar quando se adiciona uma nova
const FORMACAO_VAZIA = {
  instituicao: "",
  grau: "",
  curso: "",
  anoInicio: "",
  anoConclusao: "",
  aFrequentar: false,
  pais: "Angola",
};

// Candidato em branco
const CANDIDATO_VAZIO = {
  nomeCompleto: "",
  email: "",
  telefone: "",
  dataNascimento: "",
  bilheteIdentidade: "",
  genero: "",
  estadoCivil: "",
  provincia: "",
  foto: "",
  anosExperienciaInt: 0,
  observacoes: "",
};

export default function ModalFormularioCandidato({ aberto, aoFechar, candidato, aoSalvar }) {
  const [form, setForm] = useState(CANDIDATO_VAZIO);
  const [formacoes, setFormacoes] = useState([]);
  const [erros, setErros] = useState({});
  const [previewFoto, setPreviewFoto] = useState("");
  const inputFotoRef = useRef(null);

  const modoEdicao = !!candidato;

  // Quando o modal abre, preenche os dados se for edição
  useEffect(() => {
    if (candidato) {
      setForm({ ...CANDIDATO_VAZIO, ...candidato });
      setPreviewFoto(candidato.foto || "");
    } else {
      setForm(CANDIDATO_VAZIO);
      setPreviewFoto("");
    }
    setFormacoes([]);
    setErros({});
  }, [candidato, aberto]);

  // Actualiza um campo do formulário principal
  function aoMudar(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (erros[name]) setErros((prev) => ({ ...prev, [name]: "" }));
  }

  // Quando o utilizador escolhe uma foto do computador
  function aoEscolherFoto(e) {
    const ficheiro = e.target.files[0];
    if (!ficheiro) return;

    const leitor = new FileReader();
    leitor.onload = (ev) => {
      const base64 = ev.target.result;
      setPreviewFoto(base64);
      setForm((prev) => ({ ...prev, foto: base64 }));
    };
    leitor.readAsDataURL(ficheiro);
  }

  // --- Funções de formações ---
  function adicionarFormacao() {
    setFormacoes((prev) => [...prev, { ...FORMACAO_VAZIA, id: Date.now().toString() }]);
  }

  function removerFormacao(indice) {
    setFormacoes((prev) => prev.filter((_, i) => i !== indice));
  }

  function aoMudarFormacao(indice, campo, valor) {
    setFormacoes((prev) =>
      prev.map((f, i) => (i === indice ? { ...f, [campo]: valor } : f))
    );
  }

  // Validação simples
  function validar() {
    const novosErros = {};
    if (!form.nomeCompleto.trim()) novosErros.nomeCompleto = "Campo obrigatório";
    if (!form.email.trim()) novosErros.email = "Campo obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) novosErros.email = "Email inválido";
    if (!form.telefone.trim()) novosErros.telefone = "Campo obrigatório";
    if (!form.dataNascimento) novosErros.dataNascimento = "Campo obrigatório";
    if (!form.genero) novosErros.genero = "Campo obrigatório";
    if (!form.provincia) novosErros.provincia = "Campo obrigatório";
    return novosErros;
  }

  function aoSubmeter(e) {
    e.preventDefault();
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }
    aoSalvar(
      { ...form, anosExperienciaInt: Number(form.anosExperienciaInt) },
      formacoes
    );
    aoFechar();
  }

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      titulo={modoEdicao ? "Editar Candidato" : "Novo Candidato"}
      tamanho="lg"
    >
      <form onSubmit={aoSubmeter} className="p-6 flex flex-col gap-6">

        {/* === FOTO DE PERFIL === */}
        <div className="flex flex-col items-center gap-3">
          {/* Círculo com foto ou iniciais */}
          <div className="relative">
            {previewFoto ? (
              <img
                src={previewFoto}
                alt="Foto de perfil"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#006B4F]/20"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-gray-200">
                {form.nomeCompleto ? (
                  <span className="text-2xl font-bold text-[#006B4F]">
                    {iniciais(form.nomeCompleto)}
                  </span>
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
            )}

            {/* Botão de câmara por cima da foto */}
            <button
              type="button"
              onClick={() => inputFotoRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 bg-[#006B4F] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#005a40] transition-colors"
            >
              <Camera size={14} />
            </button>
          </div>

          <p className="text-xs text-gray-400">Clique no ícone para carregar foto</p>

          {/* Input de ficheiro escondido */}
          <input
            ref={inputFotoRef}
            type="file"
            accept="image/*"
            onChange={aoEscolherFoto}
            className="hidden"
          />
        </div>

        {/* === DADOS PESSOAIS === */}
        <div>
          <h3 className="text-sm font-semibold text-[#006B4F] uppercase tracking-wide mb-3">
            Dados Pessoais
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nome Completo"
              nome="nomeCompleto"
              valor={form.nomeCompleto}
              aoMudar={aoMudar}
              placeholder="Ex: João Silva"
              obrigatorio
              erro={erros.nomeCompleto}
              className="sm:col-span-2"
            />
            <Input
              label="Email"
              nome="email"
              tipo="email"
              valor={form.email}
              aoMudar={aoMudar}
              placeholder="exemplo@email.com"
              obrigatorio
              erro={erros.email}
            />
            <Input
              label="Telefone"
              nome="telefone"
              valor={form.telefone}
              aoMudar={aoMudar}
              placeholder="+244 9XX XXX XXX"
              obrigatorio
              erro={erros.telefone}
            />
            <Input
              label="Data de Nascimento"
              nome="dataNascimento"
              tipo="date"
              valor={form.dataNascimento}
              aoMudar={aoMudar}
              obrigatorio
              erro={erros.dataNascimento}
            />
            <Input
              label="Bilhete de Identidade"
              nome="bilheteIdentidade"
              valor={form.bilheteIdentidade}
              aoMudar={aoMudar}
              placeholder="000000000LA000"
            />
            <Select
              label="Género"
              nome="genero"
              valor={form.genero}
              aoMudar={aoMudar}
              opcoes={GENEROS}
              obrigatorio
              erro={erros.genero}
            />
            <Select
              label="Estado Civil"
              nome="estadoCivil"
              valor={form.estadoCivil}
              aoMudar={aoMudar}
              opcoes={ESTADOS_CIVIS}
            />
            <Select
              label="Província"
              nome="provincia"
              valor={form.provincia}
              aoMudar={aoMudar}
              opcoes={PROVINCIAS}
              obrigatorio
              erro={erros.provincia}
            />
            <Input
              label="Anos de Experiência"
              nome="anosExperienciaInt"
              tipo="number"
              valor={form.anosExperienciaInt}
              aoMudar={aoMudar}
              placeholder="0"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Observações
            </label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={aoMudar}
              rows={3}
              placeholder="Notas adicionais sobre o candidato..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B4F] focus:border-transparent transition-all resize-none"
            />
          </div>
        </div>

        {/* === FORMAÇÃO ACADÉMICA === */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#006B4F] uppercase tracking-wide flex items-center gap-2">
              <GraduationCap size={14} />
              Formação Académica
            </h3>
            <button
              type="button"
              onClick={adicionarFormacao}
              className="flex items-center gap-1.5 text-xs font-medium text-[#006B4F] hover:bg-[#006B4F]/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus size={14} />
              Adicionar
            </button>
          </div>

          {formacoes.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-xl">
              Nenhuma formação adicionada. Clique em "Adicionar" para começar.
            </p>
          )}

          <div className="flex flex-col gap-4">
            {formacoes.map((f, indice) => (
              <div
                key={f.id}
                className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3 bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    Formação {indice + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removerFormacao(indice)}
                    className="text-red-400 hover:text-red-600 p-1 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Instituição"
                    nome={`instituicao_${indice}`}
                    valor={f.instituicao}
                    aoMudar={(e) => aoMudarFormacao(indice, "instituicao", e.target.value)}
                    placeholder="Ex: Universidade Agostinho Neto"
                    className="sm:col-span-2"
                  />
                  <Select
                    label="Grau"
                    nome={`grau_${indice}`}
                    valor={f.grau}
                    aoMudar={(e) => aoMudarFormacao(indice, "grau", e.target.value)}
                    opcoes={GRAUS_ACADEMICOS}
                  />
                  <Input
                    label="Curso"
                    nome={`curso_${indice}`}
                    valor={f.curso}
                    aoMudar={(e) => aoMudarFormacao(indice, "curso", e.target.value)}
                    placeholder="Ex: Engenharia Informática"
                  />
                  <Input
                    label="Ano de Início"
                    nome={`anoInicio_${indice}`}
                    tipo="number"
                    valor={f.anoInicio}
                    aoMudar={(e) => aoMudarFormacao(indice, "anoInicio", e.target.value)}
                    placeholder="2018"
                  />
                  <Input
                    label="Ano de Conclusão"
                    nome={`anoConclusao_${indice}`}
                    tipo="number"
                    valor={f.anoConclusao}
                    aoMudar={(e) => aoMudarFormacao(indice, "anoConclusao", e.target.value)}
                    placeholder="2022"
                    desabilitado={f.aFrequentar}
                  />
                  <Input
                    label="País"
                    nome={`pais_${indice}`}
                    valor={f.pais}
                    aoMudar={(e) => aoMudarFormacao(indice, "pais", e.target.value)}
                    placeholder="Angola"
                  />
                  {/* Checkbox: a frequentar */}
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <input
                      type="checkbox"
                      id={`aFrequentar_${indice}`}
                      checked={f.aFrequentar}
                      onChange={(e) => aoMudarFormacao(indice, "aFrequentar", e.target.checked)}
                      className="w-4 h-4 accent-[#006B4F]"
                    />
                    <label
                      htmlFor={`aFrequentar_${indice}`}
                      className="text-sm text-gray-600"
                    >
                      A frequentar actualmente
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === BOTÕES === */}
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Botao variante="fantasma" onClick={aoFechar} tipo="button">
            Cancelar
          </Botao>
          <Botao tipo="submit" variante="primario">
            {modoEdicao ? "Guardar alterações" : "Cadastrar candidato"}
          </Botao>
        </div>
      </form>
    </Modal>
  );
}