/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { IoMdContacts } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateAcuerdoL } from "../../actions/acuerdo";
import { desasociarUsuarioAcuerdo } from "../../Api/sendAcuerdo";
import { styleModalPersonal } from "../../helpers/stylesModal";
import { RootState } from "../../store/store";

export const PersonalAcuerdo = () => {
  const { activeAcuerdo } = useSelector((state: RootState) => state.acuerdos);
  const { uid } = useSelector((state: RootState) => state.auth);
  const [openModalPersonal, setOpenModalPersonal] = useState(false);
  const dispatch = useDispatch();

  const handleOnClosePersonal = () => {
    setOpenModalPersonal(false);
  };

  const desasociar = (id: string) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Este personal sera desasociado del acuerdo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, desasociar",
      cancelButtonText: "No, cancelar",
    }).then((result: any) => {
      if (result.value && activeAcuerdo?._id) {
        desasociarUsuarioAcuerdo(activeAcuerdo?._id, id).then((res: any) => {
          const resp = res.acuerdoP
            ? {
                acuerdoP: res.acuerdoP,
                acuerdo: res.acuerdo,
              }
            : {
                acuerdoP: res.acuerdo,
                acuerdo: res.acuerdo,
              };
          dispatch(updateAcuerdoL(resp, activeAcuerdo?._id));
        });
      }
    });
  };

  return (
    <>
      {activeAcuerdo?.uIntervensores &&
        activeAcuerdo.uIntervensores.length > 0 && (
          <div className="col-auto row">
            <div className="col-auto fuente-subtitulo">
              <a id="aContacto" onClick={() => setOpenModalPersonal(true)}>
                <IoMdContacts className="mlogo" />
                <p className="d-inline mt-4">
                  <u>Personal Asociado</u>
                </p>
              </a>
            </div>
          </div>
        )}

      <Modal
        open={openModalPersonal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleOnClosePersonal}
      >
        <Box sx={styleModalPersonal}>
          <Typography
            variant="h4"
            id="modal-modal-title"
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <div className="titulo">Personal del Acuerdo</div>
            <hr />
          </Typography>
          <Typography variant="subtitle1" id="modal-modal-description">
            <div className="container">
              {activeAcuerdo?.uIntervensores &&
                activeAcuerdo?.uIntervensores.map((uIntervensor) => (
                  <div key={uIntervensor._id}>
                    <div className="row">
                      <div className="col-auto pe-5">
                        <div className="row">
                          <p>
                            Nombre de usuario:ㅤ
                            <strong>{uIntervensor.userName}</strong>
                          </p>
                        </div>
                        <div className="row">
                          <div className="col-auto">
                            <p>
                              Nombre del participante:ㅤ
                              <strong>{uIntervensor.name}</strong>
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <p>
                            Area:ㅤ
                            <strong>{uIntervensor.area.nombre}</strong>
                          </p>
                        </div>
                      </div>
                      {uid === activeAcuerdo.responsable._id && (
                        <div className="col-auto align-middle">
                          <button
                            className="btn btn-danger "
                            onClick={() => desasociar(uIntervensor._id)}
                          >
                            Desasociar personal
                          </button>
                        </div>
                      )}
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
            {activeAcuerdo?.uIntervensores &&
              activeAcuerdo?.uIntervensores.length === 0 && (
                <div className="container">
                  <div className="row">
                    <div className="col-auto">
                      <p>No hay personal asociado al acuerdo</p>
                    </div>
                  </div>
                </div>
                
              )}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
