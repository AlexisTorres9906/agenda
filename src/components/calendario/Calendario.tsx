import { extend } from "@syncfusion/ej2-base";
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
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useDispatch, useSelector } from "react-redux";
import { startGetAcuerdosAgenda } from "../../actions/acuerdo";
import { RootState } from "../../store/store";

export const Calendario = () => {
  /////////////////////////////
  //informacion inicial
  const [info, setInfo] = useState({});
  const { acuerdoAgenda } = useSelector((state: RootState) => state.acuerdos);
  const dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      await Promise.all([dispatch(startGetAcuerdosAgenda())]);
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
              "---El acuerdo finaliza a esta hora, No se ha definido una hora de inicio";
          }
          if (!acuerdo.EndTime) {
            descripcion +=
              "---El acuerdo finaliza a esta hora, No se ha definido una hora de fin";
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

  const onActionBegin = (args: any) => {
    //console.log(args);
  };

  const onPopUpOpen = (args: any) => {
    //no abre el popup de agregar rapido
    if (args.type === "QuickInfo" && !args.data.Id) {
      args.cancel = true;
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
    }
    else{
        if (args.data.Prioridad === "Alta")
        (args.element.firstChild as HTMLElement).style.borderLeftColor  = "#ff0000";
        else if (args.data.Prioridad === "Media")
        (args.element.firstChild as HTMLElement).style.borderLeftColor  = "#ffa500";
        else if (args.data.Prioridad === "Baja")
        (args.element.firstChild as HTMLElement).style.borderLeftColor  = "#008000";
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
        }}
        readOnly={true}
        eventClick={onEventClick.bind(this)}
        cellClick={onCellClick.bind(this)}
        actionBegin={onActionBegin.bind(this)}
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
