import React from 'react'
import Card from "react-bootstrap/Card";

function MenuOption({title, contents, disabled=false, ...props}) {
  return (
    <Card className={"mode-select" + ((disabled === true) ? " coming-soon" : " cool-fill")} border="secondary" {...props}>
        <Card.Header className="text-center">{title}</Card.Header>
        <Card.Body>
            <Card.Text>{contents}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default MenuOption
