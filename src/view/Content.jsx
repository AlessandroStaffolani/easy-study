import { React } from 'react';

const Content = (props) => {
  const { name } = props;
  return (
    <div className="content mdc-typography">
      <h1 className="mdc-typography--headline3">Welcome to {name}</h1>
      <p className="mdc-typography--subtitle2"> A wonderfull graphics</p>
    </div>
  );
};

export default Content;