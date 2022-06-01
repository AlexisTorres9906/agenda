import { extend, createElement } from "@syncfusion/ej2-base";
import { Inject } from "@syncfusion/ej2-react-calendars";
import {
  Agenda,
  Day,
  Month,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import { useEffect, useRef, useState } from "react";
import "../../styles/calendario.scss";
import {
  DropDownList,
  DropDownListComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { useDispatch, useSelector } from "react-redux";
import { addAcuerdo, startGetAcuerdosAgenda } from "../../actions/acuerdo";
import { RootState } from "../../store/store";
import { startGetAmbitos, startGetCategorias } from "../../actions/info";
import { sendAcuerdo } from "../../Api/sendAcuerdo";

export const Calendario = () => {
  /////////////////////////////
  //informacion inicial
  const [info, setInfo] = useState({});
  const { acuerdoAgenda } = useSelector((state: RootState) => state.acuerdos);
  const { Ambitos,Categorias } = useSelector((state: RootState) => state.info);
  const dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      await Promise.all([
        dispatch(startGetAcuerdosAgenda()),
        dispatch(startGetCategorias()),
        dispatch(startGetAmbitos()),
      ]);
    };
    load();
  }, [dispatch]);

  useEffect(() => {
    setInfo(
      extend(
        [],
        acuerdoAgenda.map((acuerdo) => {
          let descripcion = acuerdo.Description;
          if (!acuerdo.StartTime) {
            descripcion +=
              "---El acuerdo finaliza a esta hora, No se ha definido una hora de inicio.";
          }
          if (!acuerdo.EndTime) {
            descripcion +=
              "---El acuerdo finaliza a esta hora, No se ha definido una hora de fin.";
          }
          return {
            ...acuerdo,
            StartTime: acuerdo.StartTime ? acuerdo.StartTime : acuerdo.EndTime,
            EndTime: acuerdo.EndTime ? acuerdo.EndTime : acuerdo.StartTime,
            Description: descripcion,
          };
        }),
        null as any,
        true
      )
    );
  }, [acuerdoAgenda]);

  //////////////////////////////////////////////////////
  //agenda
  let scheduleObj = useRef<ScheduleComponent | null>(null);
  //const dataR = dataSource.scheduleData;
  //const data = extend([], dataR, null as any, true);

  const onCellClick = (args: any) => {
    scheduleObj.current!.openEditor(args, "Add");
    scheduleObj.current!.closeQuickInfoPopup();
  };

  const onEventClick = (args: any) => {
    if (args.name === "eventClick") {
      return null;
    }
    if (!args.event.RecurrenceRule) {
      scheduleObj.current!.openEditor(args.event, "Save");
    } else {
      scheduleObj.current!.quickPopup.openRecurrenceAlert();
    }
  };
//////////////////////////////////////////////////////
  const onActionBegin = (args: any) => {
    //console.log(args);
  };

  const onActionComplete = (args: any) => {
    if(args.requestType === "eventCreated"){
    const info = args.data[0]
      const data = {
        descripcion: info.Description,
        nombre:  info.Subject,
        fechaInstruccion:  info.StartTime,
        fechaPCierre:  info.EndTime,
        lugar:  info.Location,
        ambito:  info.ambito,
        categoria:  info.categoria,
        prioridad:  info.prioridad,
      }     
      sendAcuerdo(data).then((res)=>{
        if (Object.entries(res).length !== 0) {
            dispatch(addAcuerdo(res));
          }
      }).catch(()=>{
          args.cancel = true;
      })
    }
    }

  //////////////////////////////////////////////////////
///inputs

let inputPrio:HTMLElement;
let inputAmbito:HTMLElement;
let inputCategoria:HTMLElement;


let dropdownPrioridad: DropDownList;
let dropdownAmbito: DropDownList;
let dropdownCategoria: DropDownList;

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//nos referimos al popup de agregar acuerdo y tambien aqui se elimina un popup
  const onPopUpOpen = (args: any) => {
    //no abre el popup de agregar rapido
    if (args.type === "QuickInfo" && !args.data.Id) {
      args.cancel = true;
    }
    if (args.type === "Editor") {
        if(!inputAmbito){
            let b = args.element.querySelector("#custom-field-row")
            b && b.remove();
        }
      if (!args.element.querySelector(".custom-field-row")) {
        let row = createElement("div", { className: "custom-field-row", id: "custom-field-row" });
        let formElement = args.element.querySelector(".e-schedule-form");
        formElement.firstChild.insertBefore(
          row,
          formElement.lastChild.lastChild
        );
        let container = createElement("div", {
          className: "custom-field-container",
        });
        inputPrio = createElement("input", {
          className: "e-field",
          attrs: { name: "prioridadDivInp", id: "prioridadDivInp" },
        });
        container.appendChild(inputPrio);
        row.appendChild(container);
        dropdownPrioridad = new DropDownList({
          dataSource: [
            { text: "Baja", value: "Baja" },
            { text: "Media", value: "Media" },
            { text: "Alta", value: "Alta" },
          ],
          fields: { text: "text", value: "value" },
          value: 'Baja',
          floatLabelType: "Always",
          placeholder: "Prioridad",
        });
        inputPrio.setAttribute("aria-label", "Baja");
        dropdownPrioridad.appendTo(inputPrio);
        inputPrio.setAttribute("name", "prioridad");
        //////////////////////////////////////////////////////////////////////
        formElement.firstChild.insertBefore(
          row,
          formElement.lastChild.lastChild
        );
        container = createElement("div", {
          className: "custom-field-container",
        });
        inputAmbito = createElement("input", {
          className: "e-field",
          attrs: { name: "ambitoDivInp", id: "ambitoDivInp" },
        });
        container.appendChild(inputAmbito);
        row.appendChild(container);
        dropdownAmbito = new DropDownList({
          dataSource:Ambitos.map((ambito)=>({text:ambito.nombre,value:ambito._id})),
          fields: { text: "text", value: "value" },
          value: Ambitos[0]._id ? Ambitos[0]._id : "",
          floatLabelType: "Always",
          placeholder: "Ambito",
        });
        dropdownAmbito.appendTo(inputAmbito);
        inputAmbito.setAttribute("name", "ambito");
        ///////////////////////////////////////////////////////////////////////
        formElement.firstChild.insertBefore(
            row,
            formElement.lastChild.lastChild
          );
          container = createElement("div", {
            className: "custom-field-container",
          });
          inputCategoria = createElement("input", {
            className: "e-field",
            attrs: { name: "categoriaDivInp", id: "categoriaDivInp" },
          });
          container.appendChild(inputCategoria);
          row.appendChild(container);
          dropdownCategoria = new DropDownList({
            dataSource:Categorias.map((categoria)=>({text:categoria.nombre,value:categoria._id})),
            fields: { text: "text", value: "value" },
            value: Categorias[0]._id ? Categorias[0]._id : "",
            floatLabelType: "Always",
            placeholder: "Ambito",
          });
          dropdownCategoria.appendTo(inputCategoria);
          inputCategoria.setAttribute("name", "categoria");
      }
    }
  };

  const onEventRendered = (args: any) => {
    if (scheduleObj.current?.currentView !== "Agenda") {
      if (args.data.Prioridad === "Alta")
        args.element.style.backgroundColor = "#ff0000";
      else if (args.data.Prioridad === "Media")
        args.element.style.backgroundColor = "#ffa500";
      else if (args.data.Prioridad === "Baja")
        args.element.style.backgroundColor = "#008000";
    } else {
      if (args.data.Prioridad === "Alta")
        (args.element.firstChild as HTMLElement).style.borderLeftColor =
          "#ff0000";
      else if (args.data.Prioridad === "Media")
        (args.element.firstChild as HTMLElement).style.borderLeftColor =
          "#ffa500";
      else if (args.data.Prioridad === "Baja")
        (args.element.firstChild as HTMLElement).style.borderLeftColor =
          "#008000";
    }
  };
  //////////////////////////////////////////////////////
  return (
    <div className="schedule-control-section">
      <ScheduleComponent
        height="85vh"
        ref={(schedule) => (scheduleObj.current = schedule)}
        selectedDate={new Date()}
        eventSettings={{
          allowDeleting: false,
          allowEditing: false,
          dataSource: info as any,
          fields: {
            id: 'Id',
            subject: { name: 'Subject', validation: { required: true } },
            location: { name: 'Location', validation: { required: true } },
            description: {
                name: 'Description', validation: {
                    required: true
                }
            },
            startTime: { name: 'StartTime', validation: { required: true } },
            endTime: { name: 'EndTime', validation: { required: true } }
        }
        }}
        readOnly={true}
        eventClick={onEventClick.bind(this)}
        cellClick={onCellClick.bind(this)}
        actionBegin={onActionBegin.bind(this)}
        actionComplete={onActionComplete.bind(this)}
        popupOpen={onPopUpOpen}
        eventRendered={onEventRendered.bind(this)}
      >
        <ViewsDirective>
          {/* * */}
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Agenda" readonly={true} />
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};
