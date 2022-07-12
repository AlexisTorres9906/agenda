import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
export const Head = () => {
  const { acuerdos } = useSelector((state: RootState) => state.acuerdos);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md">
          <div className="card-counter primary">
            <i className="fa fa-level-down"></i>
            <span className="count-numbers">
              {
                acuerdos.filter(
                  (acuerdo) =>
                    acuerdo.prioridad === "Baja" &&
                    acuerdo.estatus !== "Cancelado" &&
                    acuerdo.estatus !== "Finalizado"
                ).length
              }
            </span>
            <span className="count-name">Prioridad Baja</span>
          </div>
        </div>

        <div className="col-md">
          <div className="card-counter success">
            <i className="fa fa-level-up"></i>
            <span className="count-numbers">
              {
                acuerdos.filter(
                  (acuerdo) =>
                    acuerdo.prioridad === "Media" &&
                    acuerdo.estatus !== "Cancelado" &&
                    acuerdo.estatus !== "Finalizado"
                ).length
              }
            </span>
            <span className="count-name">Prioridad Media</span>
          </div>
        </div>

        <div className="col-md">
          <div className="card-counter danger">
            <i className="fa fa-exclamation"></i>
            <span className="count-numbers">
              {
                acuerdos.filter(
                  (acuerdo) =>
                    acuerdo.prioridad === "Alta" &&
                    acuerdo.estatus !== "Cancelado" &&
                    acuerdo.estatus !== "Finalizado"
                ).length
              }
            </span>
            <span className="count-name">Prioridad Alta</span>
          </div>
        </div>

        <div className="col-md">
          <div className="card-counter info">
            <i className="fa fa-info"></i>
            <span className="count-numbers">
              {
                acuerdos.filter(
                  (acuerdo) =>
                    acuerdo.estatus !== "Cancelado" &&
                    acuerdo.estatus !== "Finalizado"
                ).length
              }
            </span>
            <span className="count-name">Todos</span>
          </div>
        </div>
      </div>
    </div>
  );
};
