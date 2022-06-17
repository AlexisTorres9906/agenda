import { Contacto } from "../../interface/Contacto";
import usuario from "../../assets/usuario.png";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { styleModalContacto } from "../../helpers/stylesModal";
import { useState } from "react";
interface ContactsProps {
  contacto: Contacto;
}

export const Contacts = ({ contacto }: ContactsProps) => {
  const style = styleModalContacto;
  const [openModal, setOpenModal] = useState(false);
  const onClick = () => {
    setOpenModal(true);
  };
  const handleOnClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="card" onClick={onClick}>
        <div className="card-body">
          <div className="contact">
            <div className="row contacto">
              <div className="col-3">
                <div className="contact-img">
                  <img src={usuario} alt="" />
                </div>
              </div>
              <div className="col-8">
                <div className="contact-info">
                  <h4>{contacto.nombre}</h4>
                  <small>{contacto.descripcion}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleOnClose}
      >
        <Box sx={style}>
          <Typography
            variant="h4"
            id="modal-modal-title"
            style={{
              textAlign: "center",
              //bold
              fontWeight: "bold",
            }}
          >
            <div className="titulo">Contacto</div>
          </Typography>
          <Typography variant="subtitle1" id="modal-modal-description">
            <div className="container">
              <div className="col-auto container row justify-content-start">
                <div className="col-auto ">
                  <strong>Nombre:  </strong>
                </div>
                <div className="col">{contacto.nombre}</div>
              </div>
              <div className="col-auto container row justify-content-start">
                <div className="col-auto ">
                  <strong>Cargo:     </strong>
                </div>
                <div className="col">{contacto.descripcion}</div>
              </div>
              <div className="col-auto container row justify-content-start">
                <div className="col-auto ">
                  <strong>Telefono:</strong>
                </div>
                <div className="col"><a href={`tel:${contacto.telefono}`}>{contacto.telefono}</a></div>
              </div>
              <div className="col-auto container row justify-content-start">
                <div className="col-auto ">
                  <strong>Correo:   </strong>
                </div>
                <div className="col"><a href={`mailto:${contacto.correo}`}>{contacto.correo}</a></div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
