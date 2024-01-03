import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

function ModalLogin({
  callBackSuccess,
  callBackFail,
  show,
}) {

  const [newID, setNewID] = useState('');
  return (
    <Modal show={show} onHide={callBackFail}>
        <Modal.Header closeButton>
          <Modal.Title>Login Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Say Your ID USER !!
          <input type="number" value={newID} onChange={(e) => setNewID(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callBackFail}>
            Close
          </Button>
          <Button variant="primary" onClick={() => callBackSuccess(newID)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalLogin