/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  Inject,
  Page,
  Sort,
  Toolbar,
  TreeGridComponent,
  PdfExport,
  ExcelExport,
  SortSettingsModel,
} from "@syncfusion/ej2-react-treegrid";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
} from "formik";
import { BiRename } from "react-icons/bi";
import { MdSettingsCell } from "react-icons/md";
import { styleModal } from "../../helpers/stylesModal";
import "../../styles/contactos.scss";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import estrella from "../../assets/estrella.png";
import estrellaI from "../../assets/estrella1.png";
import usuario from "../../assets/usuario.png";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMail } from "react-icons/ai";
import {
  clearActiveContacto,
  editContacto,
  startDeleteContacto,
  startEditContacto,
} from "../../actions/contactos";
import {
  startAddContacto,
  setResponseOk,
  setActiveContacto,
} from "../../actions/contactos";
import {
  RowSelectingEventArgs,
} from "@syncfusion/ej2-react-grids";
import updateFavorito from "../../Api/updateFavorito";
export const Contactos = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //inicio
  const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];
  let gridInstance: any;
  const style = styleModal;
  const [openModal, setOpenModal] = useState(false);
  const { contactos, ResponseOk, activeContacto } = useSelector(
    (state: RootState) => state.contactos
  );
  const dispatch = useDispatch();
  const collapsedStatePersist: boolean = true;
  const editSettings: any = { mode: "Dialog" };
  const filterOptions: any = { type: "Excel" };

  const exportQueryCellInfo = (args: any) => {
    /*
    if (args.column.headerText === "") {
      if (args.name === "excelQueryCellInfo") {
        args.image = {
          height: 75,
          //base64: args.data["EmployeeImage"],
          base64: usuario,
          width: 75,
        };
      } else {
        //args.image = { base64: args.data["EmployeeImage"] };
        args.image = { base64: usuario };
      }
    }*/
    if (args.column.headerText === "Correo" && args.data["correo"]) {
      args.hyperLink = {
        target: "mailto:" + args.data["correo"],
        displayText: args.data["correo"],
      };
    }
    if (args.column.headerText === "Telefono" && args.data["telefono"]) {
      args.hyperLink = {
        target: "tel:" + args.data["telefono"],
        displayText: args.data["telefono"],
      };
    }
  };
  const gridImageTemplate = (props: any) => {
    var src = usuario;
    return (
      <div className="image">
        <img src={src} alt={props._id} height="25px" width="25px" />
      </div>
    );
  };
  const gridUrlTemplate = (props: any) => {
    var src = "mailto:" + props.correo;
    return (
      <div className="url">
        <a href={src}>{props.correo}</a>
      </div>
    );
  };

  const gridCellPhoneTemplate = (props: any) => {
    var src = "tel:" + props.telefono;
    return (
      <div className="phone">
        <a href={src}>{props.telefono}</a>
      </div>
    );
  };

  const gridFavoritoTemplate = (props: any) => {
    var src = props.favorito ? estrellaI : estrella;
    return (
      <div className="favorito">
        <img
          src={src}
          alt={props._id}
          height="25px"
          width="25px"
          onClick={()=>onFavorito(props.taskData)}
        />
      </div>
    );
  };
  const onFavorito = (data:any) => {
   const info ={
     ...data,
      favorito:!data.favorito
   }
   dispatch(editContacto(info));
   updateFavorito(info,data._id).catch(err=>{
     dispatch(editContacto({
        ...data,
        favorito:data.favorito
     }));
   });
  };

  const toolbarClick = (args: ClickEventArgs): void => {
    switch (args.item.id) {
      case gridInstance?.grid.element.id + "_pdfexport":
        let pdfExportProperties = {
          isCollapsedStatePersist: collapsedStatePersist,
        };
        gridInstance?.pdfExport(pdfExportProperties);
        break;
      case gridInstance?.grid.element.id + "_excelexport":
        let excelExportProperties = {
          isCollapsedStatePersist: collapsedStatePersist,
        };
        gridInstance?.excelExport(excelExportProperties);
        break;
      case gridInstance?.grid.element.id + "_csvexport":
        gridInstance?.csvExport();
        break;
      case gridInstance?.grid.element.id + "_print":
        gridInstance?.print();
        break;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //formik
  const initialValues = activeContacto
    ? {
        nombre: activeContacto.nombre ? activeContacto.nombre : "",
        descripcion: activeContacto.descripcion
          ? activeContacto.descripcion
          : "",
        correo: activeContacto.correo ? activeContacto.correo : "",
        telefono: activeContacto.telefono ? activeContacto.telefono : "",
      }
    : {
        nombre: "",
        descripcion: "",
        correo: "",
        telefono: "",
      };

  const validationSchema = Yup.object({
    //name with no whiteSpace in the beginning
    nombre: Yup.string().required("El nombre del contacto es requerido"),
    correo: Yup.string().email("El correo no es valido").nullable(),
    telefono: Yup.number()
      .typeError("Escriba solo números por favor")
      .nullable(),
  });

  const FormikProps: FormikConfig<FormikValues> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (activeContacto)
        dispatch(
          startEditContacto(
            {
              correo: values.correo === "" ? null : values.correo,
              nombre: values.nombre === "" ? null : values.nombre,
              telefono: values.telefono === "" ? null : values.telefono,
              descripcion:
                values.descripcion === "" ? null : values.descripcion,
            },
            activeContacto._id
          )
        );
      else
        dispatch(
          startAddContacto({
            correo: values.correo === "" ? null : values.correo,
            nombre: values.nombre === "" ? null : values.nombre,
            telefono: values.telefono === "" ? null : values.telefono,
            descripcion: values.descripcion === "" ? null : values.descripcion,
          })
        );
    },
  };
  useEffect(() => {
    if (ResponseOk) {
      setOpenModal(false);
    }
    dispatch(setResponseOk(false));
  }, [ResponseOk, dispatch]);

  const handleDelete = () => {
    activeContacto && dispatch(startDeleteContacto(activeContacto._id));
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //acciones modal
  const onAdd = () => {
    setOpenModal(true);
  };

  const handleOnClose = () => {
    setOpenModal(false);
    dispatch(clearActiveContacto());
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //grid
  const onCellClick = (args: any) => {
    console.log(args.data);
    dispatch(setActiveContacto(args.data.taskData));
    setOpenModal(true);
  };

  const rowSelectingHandler = (args: RowSelectingEventArgs) => {
    if (args.target && args.target.localName === "img") args.cancel = true;
  };

  const sortOptions: SortSettingsModel = {
    columns: [{ field: "favorito", direction: "Descending" }],
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="control-section">
      <TreeGridComponent
        dataSource={contactos}
        ref={(grid) => (gridInstance = grid)}
        toolbar={toolbarOptions}
        allowPaging={true}
        pageSettings={{ pageSizes: true, pageSize: 10, pageCount: 4 }}
        allowExcelExport={true}
        allowPdfExport={true}
        excelQueryCellInfo={exportQueryCellInfo.bind(this)}
        pdfQueryCellInfo={exportQueryCellInfo.bind(this)}
        toolbarClick={toolbarClick.bind(this)}
        height="69vh"
        width="100%"
        rowSelected={onCellClick}
        allowFiltering={true}
        allowSorting={true}
        filterSettings={filterOptions}
        editSettings={editSettings}
        rowSelecting={rowSelectingHandler}
        sortSettings={sortOptions}
      >
        <ColumnsDirective>
          <ColumnDirective
            headerText=""
            width="50"
            field="_id"
            visible={false}
            textAlign="Center"
            allowSorting={false}
            allowFiltering={false}
          ></ColumnDirective>
          <ColumnDirective
            headerText=""
            width="50"
            template={gridImageTemplate}
            textAlign="Center"
            allowFiltering={false}
          ></ColumnDirective>
          <ColumnDirective
            field="nombre"
            headerText="Nombre"
            width="180"
          ></ColumnDirective>
          <ColumnDirective
            field="descripcion"
            headerText="Cargo"
            width="220"
          ></ColumnDirective>
          <ColumnDirective
            headerText="Correo"
            width="180"
            field="correo"
            template={gridUrlTemplate}
          ></ColumnDirective>
          <ColumnDirective
            field="telefono"
            headerText="Telefono"
            template={gridCellPhoneTemplate}
            width="180"
          ></ColumnDirective>
          <ColumnDirective
            field="favorito"
            template={gridFavoritoTemplate}
            headerText=""
            width="90"
            textAlign="Center"
            allowFiltering={false}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject
          services={[Toolbar, ExcelExport, PdfExport, Filter, Sort, Page]}
        />
      </TreeGridComponent>
      <button className="btn-flotante" onClick={onAdd}>
        <span>
          <i className="fas fa-plus"></i>
        </span>
      </button>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleOnClose}
      >
        <Box sx={style}>
          <Formik {...FormikProps}>
            {(form) => (
              <Form>
                <Typography variant="h5" id="modal-modal-title">
                  {activeContacto ? "Editar Contacto" : "Agregar Contacto"}
                </Typography>
                <div className="mb-3 mt-3">
                  <label className="form-label">
                    <BiRename />
                     Nombre
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    style={
                      form.touched.nombre &&
                      form.errors.nombre && { border: "1px solid red" }
                    }
                    name="nombre"
                    placeholder="Escribe el nombre del contacto"
                    autoComplete="off"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="nombre" component="div" />
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <label className="form-label">
                    <BiRename />
                     Cargo
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    style={
                      form.touched.descripcion &&
                      form.errors.descripcion && { border: "1px solid red" }
                    }
                    name="descripcion"
                    placeholder="Escribe el cargo del contacto"
                    autoComplete="off"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="descripcion" component="div" />
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <label className="form-label">
                    <MdSettingsCell />
                     Teléfono
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    style={
                      form.touched.telefono &&
                      form.errors.telefono && { border: "1px solid red" }
                    }
                    name="telefono"
                    placeholder="Escribe el teléfono del contacto"
                    autoComplete="off"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="telefono" component="div" />
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <label className="form-label">
                    <AiOutlineMail />
                     Correo Electrónico
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    style={
                      form.touched.correo &&
                      form.errors.correo && { border: "1px solid red" }
                    }
                    name="correo"
                    placeholder="Escribe el correo electrónico del contacto"
                    autoComplete="off"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="correo" component="div" />
                  </div>
                </div>

                <div className="d-flex justify-content-around mb-3">
                  <button className="btn btn-primary" type="submit">
                    {activeContacto ? "Actualizar" : "Agregar"}
                  </button>
                  <a className="btn btn-danger" onClick={handleDelete}>
                    Eliminar
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};
