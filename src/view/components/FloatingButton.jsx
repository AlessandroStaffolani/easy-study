import { React, Component } from 'react';

const FloatingButton = (props) => {

  const { label, icon, className, onClick } = props;
  return (
    <button
      className={"mdc-fab " + className}
      aria-label={label}
      onClick={onClick}
      title={label}
    >
      {icon}
    </button>
  )
};

export default FloatingButton;