import { Button, Modal } from "react-bootstrap";

interface DialogBoxProps {
  showDialog: boolean;
  cancelNavigation: any;
  confirmNavigation: any;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  showDialog,
  cancelNavigation,
  confirmNavigation,
}) => {
  return (
    <Modal show={showDialog}>
      <Modal.Header>
        <Modal.Title>Hay cambios sin guardar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          <b>¿Desea salir sin guardar?</b>{" "}
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={confirmNavigation}>
          Si, deseo salir
        </Button>
        <Button variant="primary" onClick={cancelNavigation}>
          No, deseo continuar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DialogBox;
