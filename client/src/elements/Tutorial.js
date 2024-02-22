import React, { useState, useEffect } from 'react';

import HowToPlay from './HowToPlay';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { CapacitorCookies } from '@capacitor/core';

function getCapacitorCookies() {
  const ret = new Map();
  document.cookie.split('; ').forEach((cookie) => {
    const [key, ...v] = cookie.split('=');
    ret.set(key, v.join('='));
  });
  return ret;
}

const setCapacitorCookie = async (k, v) => {
  await CapacitorCookies.setCookie({
    key: k,
    value: v,
  });
};

function MyVerticallyCenteredModal({winningPiece, cookies, state, ...props}) {
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
        <HowToPlay winningPiece={winningPiece}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-main-color" onClick={() => {
          setCapacitorCookie("tutorialShown", "shown");
          props.onHide();
        }}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Tutorial({winningPiece, state}) {
  const [modalShow, setModalShow] = useState(true);
  const [cookies, setCookies] = useState(getCapacitorCookies());

  useEffect(() => {
    setCookies(getCapacitorCookies());
  }, []);

  return (
    <>
      {((cookies.get("tutorialShown") !== "shown" && state === 3) 
      ? <MyVerticallyCenteredModal winningPiece={winningPiece} show={modalShow} state={state} onHide={() => setModalShow(false)}/>
      : null)}
    </>
  )
}

export default Tutorial
