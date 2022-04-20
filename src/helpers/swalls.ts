import Swal from "sweetalert2";

export const toastMixin = Swal.mixin({
  toast: true,
  icon: "success",
  title: "Exito",
  position: "top-right",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const LoadingSwall = Swal.mixin({
  title: "Trabajando...",
  text: "Por favor espere...",
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();
  },
});

export const ErrorSwall = Swal.mixin({
  title: "Error!",
  text: "Hubo un error al procesar la solicitud",
  icon: "error",
  confirmButtonText: "Ok",
});


export const QuestionSwall = Swal.mixin({
  title: "¿Estas seguro?",
  text: "Una vez eliminado no podras recuperarlo",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si, eliminar",
  cancelButtonText: "Cancelar",
});

export const QuestionExit = Swal.mixin({
  title: "¿Estas seguro de que quieres salir?",
  text: "Si sales, se perderan los cambios que hayas hecho",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si, salir",
  cancelButtonText: "Cancelar",
});