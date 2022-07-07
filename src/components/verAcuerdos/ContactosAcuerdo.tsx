import { Contacto } from "../../interface/Contacto";
interface ContactsProps {
  contacto: Contacto;
}

export const ContactosAcuerdo = ({ contacto }: ContactsProps) => {
  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h4>{contacto.nombre}</h4>
            </div>
            <div className="col-sm">Correo electrónico: <a href={`mailto:${contacto.correo}`}> {contacto.correo}</a></div>
          </div>
          <div className="row">
            <div className="col-sm">
              <small>
                <i>{contacto.descripcion}</i>
              </small>
            </div>
            <div className="col-sm">Numero telefonico: <a href={`tel:${contacto.telefono}`}> {contacto.telefono}</a></div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
