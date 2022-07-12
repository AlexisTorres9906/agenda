import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { startGetConteo } from "../../actions/info";
export const Head = () => {
  const { acuerdos } = useSelector((state: RootState) => state.acuerdos);
  const { conteo } = useSelector((state: RootState) => state.info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetConteo());
  }, [dispatch])
  
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row">

        <div className="col-md" onClick={()=>navigate("vAcuerdos/bajos", { replace: true })}>
          <div className="card-counter primary">
            <i className="fa fa-level-down"></i>
            <span className="count-numbers">
              {conteo.bajos}
            </span>
            <span className="count-name">Prioridad Baja</span>
          </div>
        </div>

        <div className="col-md" onClick={()=>navigate("vAcuerdos/media", { replace: true })}>
          <div className="card-counter success">
            <i className="fa fa-level-up"></i>
            <span className="count-numbers">
              {conteo.medios}
            </span>
            <span className="count-name">Prioridad Media</span>
          </div>
        </div>

        <div className="col-md" onClick={()=>navigate("vAcuerdos/altos", { replace: true })}>
          <div className="card-counter danger">
            <i className="fa fa-exclamation"></i>
            <span className="count-numbers">
              {conteo.altos}
            </span>
            <span className="count-name">Prioridad Alta</span>
          </div>
        </div>

        <div className="col-md" onClick={()=>navigate("vAcuerdos", { replace: true })}>
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
