import React from "react";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import usuario from "../../assets/usuario.png";

import "../../styles/Multiselect.scss";
import { RootState } from '../../store/store';
import { useSelector } from "react-redux";



///multiselect de los contactos
export const MultiSelect = (props: any) => {
  const handleChange = (args: any) => {
    props.onChange("intervensores", args.value);
  };

  const handleBlur = () => {
    props.onBlur("intervensores", true);
  };

  const {contactos} = useSelector( (state:RootState) => state.contactos );
/*
  const headerTemplate = (data: any) => {
    return (
      <div className="d-flex justify-content-around">
        <span>Photo</span>
        <br />
        <span className="columnHeader">Employee Info</span>
      </div>
    );
  };
  */
  //set the value to item template
  const itemTemplate = (data: any) => {
    return (
      <div className="container row contenedorItem">
        <div className="col-2 imagen">
        <img src={usuario} alt="employee" className="imagenItem" />
        </div>
        <div className="col-6 container data">
          <div className="row">{data.nombre} - {data.descripcion} </div>
        </div>
      </div>
    );
  };
  //set the value to value template
  const valueTemplate = (data: any) => {
    return (
      <div className="contenedorDeElemento">
        <img className="imagenValue" src={usuario} alt="employee" />
        <div className="nameTemp inner"> {data.nombre} </div>
      </div>
    );
  };

  const fields = { text: "nombre", value: "_id" };

  return (
    <div className="multicontainer">
        <div className="control-section">
          <div id="multitemplate" className="control-styles">
            <MultiSelectComponent
              id="select"
              dataSource={contactos as any}
              mode="Box"
              fields={fields}
              value={props.value}
              change={handleChange}
              blur={handleBlur}
              placeholder="Contactos del acuerdo"
              popupHeight="220px"
              //headerTemplate={headerTemplate}
              itemTemplate={itemTemplate}
              valueTemplate={valueTemplate}
            />
          </div>
        </div>
      </div>
  );
};
