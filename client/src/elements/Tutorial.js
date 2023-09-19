import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Cookies from 'universal-cookie';

function MyVerticallyCenteredModal({winningPiece, cookies, ...props}) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          How to Play
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Controls</h5>
        <ul>
          <li>Swipe or use arrow keys to move all squares in a direction.</li>
          <li>Collide two squares of the same number to combine them and double the number</li>
        </ul>
        <h5>Duel</h5>
        <ul>
          <li>Your pieces are color-coded</li>
          <li>On your turn, collide one of your squares with your oponnent's to steal it</li>
          <li>The first to create the {winningPiece} squares wins!</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-main-color" onClick={() => {
          cookies.set('tutorialShown', 'shown', {path: '/'});
          props.onHide();
        }}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Tutorial({winningPiece}) {
  const [modalShow, setModalShow] = React.useState(true);
  const cookies = new Cookies();

  return (
    <>
      {((cookies.get('tutorialShown') !== 'shown') 
      ? <MyVerticallyCenteredModal winningPiece={winningPiece} cookies={cookies} show={modalShow} onHide={() => setModalShow(false)}/>
      : null)}
    </>
  )
}

export default Tutorial
