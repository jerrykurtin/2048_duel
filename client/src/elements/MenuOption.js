import React, {useState} from "react";
import Card from "react-bootstrap/Card";

import "./MenuOption.css";

function MenuOption({title, contents, disabled=false, onClick, ...props}) {
  const [clicked, setClicked] = useState(false);

  function setClickedWithTimeout() {
    setClicked(true);
    setTimeout( () => {
      setClicked(false);
    }, ((disabled) ? (200) : 500));
  }

  return (
    <div onClick={() => {
      setClickedWithTimeout(true);
      onClick();
    }}className={"custom-card mode-select text-center" + ((disabled === true) ? " coming-soon" : " cool-fill") + ((clicked == true) ? " selected" : "")} border="secondary" {...props}>
      <div className="custom-card-header">
        <h3>{title}</h3>
      </div>
      <div className="fill-remaining-space">
        <div className="vertical-aligner">
          <div className="custom-card-body">{contents}</div>
        </div>
      </div>
    </div>
    // <Card className={"mode-select" + ((disabled === true) ? " coming-soon" : " cool-fill")} border="secondary" {...props}>
    //     <Card.Header className="text-center">{title}</Card.Header>
    //     <Card.Body>
    //         <Card.Text>{contents}</Card.Text>
    //     </Card.Body>
    // </Card>
  )
}

export default MenuOption
