import React, { ReactChildren } from 'react';

const Errors = ({ errMsg }: { errMsg: string | null }) => {
  return (
    <div className="ErrorContainer">
      {errMsg ? (
        <div className="Error">
          <h3>{errMsg}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default Errors;
