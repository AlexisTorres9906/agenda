import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
  ExcelExport,
  PdfExport,
  Group,
} from "@syncfusion/ej2-react-grids";
export const Contactos = () => {
  const toolbarOptions = ["ExcelExport", "PdfExport"];
  let gridInstance: any;
  let checkboxObj: any;
  let flag = true;
  const dataBound = () => {
    if (flag) {
      gridInstance.toolbarModule.toolbar.hideItem(2, true);
      flag = false;
    }
  };

  const exportQueryCellInfo = (args: any) => {
    if (args.column.headerText === "Employee Image") {
      if (args.name === "excelQueryCellInfo") {
        args.image = {
          height: 75,
          base64: args.data["EmployeeImage"],
          width: 75,
        };
      } else {
        args.image = { base64: args.data["EmployeeImage"] };
      }
    }
    if (args.column.headerText === "Email ID") {
      args.hyperLink = {
        target: "mailto:" + args.data["EmailID"],
        displayText: args.data["EmailID"],
      };
    }
  };
  const gridImageTemplate = (props: any) => {
    var src = "https://i.ibb.co/Z2P8Rrq/user-1.png";
    return (
      <div className="image">
        <img src={src} alt={props.EmployeeID}  height="25px" width="25px"/>
      </div>
    );
  };
  const gridUrlTemplate = (props: any) => {
    var src = "mailto:" + props.EmailID;
    return (
      <div className="url">
        <a href={src}>{props.EmailID}</a>
      </div>
    );
  };

  const gridCellPhoneTemplate = (props: any) => {
    var src = "tel:" + props.CellPhone;
    return (
        <div className="phone">
            <a href={src}>{props.CellPhone}</a>
        </div>
    );
  };

  const toolbarClick = (args: any) => {
    switch (args.item.text) {
      case "PDF Export":
        gridInstance.pdfExport();
        break;
      case "Excel Export":
        gridInstance.excelExport();
        break;
      case "CSV Export":
        gridInstance.csvExport();
        break;
    }
  };

  return (
    <div className="control-section">
      <GridComponent
        dataSource={employeeDetails}
        ref={(grid) => (gridInstance = grid)}
        toolbar={toolbarOptions}
        allowExcelExport={true}
        allowPdfExport={true}
        allowGrouping={true}
        toolbarClick={toolbarClick.bind(this)}
        dataBound={dataBound.bind(this)}
        excelQueryCellInfo={exportQueryCellInfo.bind(this)}
        pdfQueryCellInfo={exportQueryCellInfo.bind(this)}
        height="78vh"
        width="100%"
      >
        <ColumnsDirective>
          <ColumnDirective
            headerText="Employee Image"
            width="150"
            template={gridImageTemplate}
            textAlign="Center"
          ></ColumnDirective>
          <ColumnDirective
            field="FirstName"
            headerText="Name"
            width="130"
          ></ColumnDirective>
          <ColumnDirective
            field="Title"
            headerText="Designation"
            width="180"
          ></ColumnDirective>
          <ColumnDirective
            headerText="Email ID"
            width="180"
            template={gridUrlTemplate}
          ></ColumnDirective>
          <ColumnDirective
           headerText="Celular"
            template= {gridCellPhoneTemplate}
            width="180"
            allowGrouping={false}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Toolbar, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );
};

const employeeDetails = [{
    FirstName: "Nancy",
    Title: "Sales Representative",
    EmailID: "email@gmail.com",
    CellPhone: "5559482",
},
{
    FirstName: "Nancy",
    Title: "Sales Representative",
    EmailID: "email@gmail.com",
    CellPhone: "3112891558"
}];
