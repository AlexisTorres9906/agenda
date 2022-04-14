/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import "../../styles/agregarAcuerdo.scss";

export const Form = () => {
  const divTabcon = React.useRef<HTMLDivElement>(null);
  const divTabinv = React.useRef<HTMLDivElement>(null);
  const anchorTabcon = React.useRef<HTMLAnchorElement>(null);
  const anchorTabinv = React.useRef<HTMLAnchorElement>(null);

  //cambios en los tabs
  const handleChangeTab = (e: any) => {
    //eliminate classname of anchor
    divTabcon.current?.classList.remove("active");
    divTabinv.current?.classList.remove("active");
    anchorTabcon.current?.classList.remove("active");
    anchorTabinv.current?.classList.remove("active");
    if (e.target.id === "contenido-tab") {
      divTabcon.current?.classList.add("active");
      anchorTabcon.current?.classList.add("active");
    } else {
      divTabinv.current?.classList.add("active");
      anchorTabinv.current?.classList.add("active");
    }
  };

  const goToNextTab = (e: any) => {
    e.preventDefault();
      divTabinv.current?.classList.add("active");
      anchorTabinv.current?.classList.add("active");
      divTabcon.current?.classList.remove("active");
      anchorTabcon.current?.classList.remove("active");
  };


  return (
    <section className="acuerdos-form">
      <form>
        <div>
          <h2 className="text-center">Acuerdos</h2>
        </div>
        <div>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                role="tab"
                id="contenido-tab"
                data-bs-toggle="tab"
                onClick={handleChangeTab}
                ref={anchorTabcon}
              >
                Contenido
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                role="tab"
                data-bs-toggle="tab"
                onClick={handleChangeTab}
                ref={anchorTabinv}
              >
                Involucrados
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              id="tab-1"
              className="tab-pane active"
              role="tabpanel"
              ref={divTabcon}
            >
              <h6>AU-000006-2022</h6>

              <div className="mb-3">
                <label className="form-label">
                  <i className="far fa-file-alt"></i> Nombre
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  placeholder="Escribe el nombre del acuerdo..."
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="fas fa-file-signature"></i> Descripción
                </label>
                <textarea className="form-control"></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="far fa-calendar-alt"></i> Fecha Instrucción
                </label>
                <input className="form-control" type="date" />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="far fa-calendar-check"></i> Fecha programada de
                  cierre
                </label>
                <input className="form-control" type="date" />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="fas fa-exclamation"></i> Prioridad
                </label>
                <select className="form-select" defaultValue={12}>
                  <optgroup label="Escoge una prioridad">
                    <option value="12">Baja</option>
                    <option value="13">Media</option>
                    <option value="14">Alta</option>
                  </optgroup>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="far fa-list-alt"></i> Categoría
                </label>
                <select className="form-select" defaultValue={12}>
                  <optgroup label="Selecciona una categoria">
                    <option value="12">Sindical</option>
                    <option value="13">Laboral</option>
                    <option value="14">Salud</option>
                    <option value="15">Legal</option>
                    <option value="16">Otros</option>
                  </optgroup>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="far fa-building"></i> Ambito
                </label>
                <select className="form-select" defaultValue={12}>
                  <optgroup label="Selecciona el ambito">
                    <option value="12">Municipal</option>
                    <option value="13">Estatal</option>
                    <option value="14">Federal</option>
                  </optgroup>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="fas fa-map-marker-alt"></i> Lugar/Domicilio
                </label>
                <input
                  className="form-control is-invalid"
                  type="text"
                  name="lugar"
                  placeholder="Ingrese un lugar o domicilio..."
                />
                <small className="form-text text-danger">
                  Por favor ingrese un domicilio
                </small>
              </div>

              <div className="mb-3 flechaDerecha">
                <i
                  className="far fa-arrow-alt-circle-right"
                  onClick={goToNextTab}
                ></i>
              </div>

              <div className="d-flex justify-content-center align-items-center mb-3">
                <button className="btn btn-primary" type="submit">
                  Crear Actividad
                </button>
              </div>
            </div>

            <div
              id="tab-2"
              className="tab-pane"
              role="tabpanel"
              ref={divTabinv}
            >
              <p>Content for tab 2.</p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
