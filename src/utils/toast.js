import { toast } from "react-toastify";

export const mostrarSucesso = (mensagem) => {
  toast.success(mensagem, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const mostrarErro = (mensagem) => {
  toast.error(mensagem, {
    position: "top-right",
    autoClose: 4000,
  });
};

export const mostrarAviso = (mensagem) => {
  toast.warning(mensagem, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const mostrarInfo = (mensagem) => {
  toast.info(mensagem, {
    position: "top-right",
    autoClose: 3000,
  });
};