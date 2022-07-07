import { useEffect } from "react";
import {
  MultiSelectComponent,
  FilteringEventArgs,
} from "@syncfusion/ej2-react-dropdowns";

import "../../styles/Multiselect.scss";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { startGetUsuarios } from "../../actions/info";
import { UsuariosP } from "../../interface/User";
import { Query } from "@syncfusion/ej2-data";
import { debounce } from "@syncfusion/ej2-base";

///multiselect de los contactos
export const MultiSelectU = (props: any) => {
  const dispatch = useDispatch();
  const { Usuarios } = useSelector((state: RootState) => state.info);
  const { uid } = useSelector((state: RootState) => state.auth);
  const { activeAcuerdo } = useSelector((state: RootState) => state.acuerdos);
  const handleChange = (args: any) => {
    props.onChange("peticiones", args.value);
  };

  const handleBlur = () => {
    props.onBlur("peticiones", true);
  };



  useEffect(() => {
    dispatch(startGetUsuarios());
  }, [dispatch]);


  


  const onFiltering = debounce((e: FilteringEventArgs) => {
    let query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== ""
        ? query.where("userName", "contains", e.text, true)
        : query;
     e.text === "" ? e.updateData({} as any ):e.updateData(Usuarios as any, query);

  }, 400);

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
  
  const itemTemplate = (data: UsuariosP) => {
    return (
      data.userName + " - " + data.area.nombre
    );
  };
  /*
  //set the value to value template
  const valueTemplate = (data: UsuariosP) => {
    return (
      <div className="contenedorDeElemento">
        <img className="imagenValue" src={usuario} alt="employee" />
        <div className="nameTemp inner"> {data.userName} </div>
      </div>
    );
  };
  */

  const fields = { text: "userName", value: "_id" };

  return (
    <div className="multicontainer">
      <div className="control-section">
        <div id="multitemplate" className="control-styles">
          <MultiSelectComponent
            id="select"
            dataSource={Usuarios.filter((item: UsuariosP) => {
              let intervensorId: string[] = [];
              if(activeAcuerdo && activeAcuerdo.uIntervensores){
                activeAcuerdo.uIntervensores.forEach((uIntervensor: any) => {
                  intervensorId.push(uIntervensor._id)
              });
            }
              return item._id !== uid && !intervensorId.includes(item._id) && item._id !== activeAcuerdo?.responsable._id;
            }) as any}
            mode="Box"
            allowFiltering={true}
            fields={fields}
            value={props.value}
            change={handleChange}
            blur={handleBlur}
            placeholder="Compartir acuerdo con otros usuarios"
            popupHeight="220px"
            filtering={onFiltering.bind(this)}
            //headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            //valueTemplate={valueTemplate}
          />
        </div>
      </div>
    </div>
  );
};
