import React from "react";

export const ActionButton = (props) => {
  return(
    <>
      <button className={props.style}
        onClick={() => props.handleClick(props.value)}
        disabled={props.disabled}
        >{props.btnValue}
      </button>
    </>
  )
}
