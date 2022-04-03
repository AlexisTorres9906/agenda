import React from "react";

export const Contacts = () => {
  return (
    <div className="contacts">
      <div className="card">
        <div className="card-header">
          <div className="container">
            <div className="row">
              <div className="col ms-4">
                <h3>Contactos</h3>
              </div>
              <div className="col d-flex justify-content-end me-2">
                <button>
                  Todos <span className="fa-solid fa-arrow-right"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="contact">
            <div className="row contacto">
              <div className="col-3">
                <div className="contact-img">
                  <img src="https://via.placeholder.com/150" alt="" />
                </div>
              </div>
              <div className="col-8">
                <div className="contact-info">
                  <h4>Juan Perez</h4>
                  <small>Director ejecutivo</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
