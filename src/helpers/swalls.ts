import Swal from "sweetalert2";

export const toastMixin = Swal.mixin({
  toast: true,
  icon: "success",
  title: "General Title",
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
