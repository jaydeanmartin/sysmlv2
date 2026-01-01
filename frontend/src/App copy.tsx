/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

import { useState } from "react";
import { useJupyter, JupyterReactTheme } from '@datalayer/jupyter-react';
import { CellExample } from "./examples/CellExample";
import { NotebookExample } from "./examples/NotebookExample";

import reactLogo from "./assets/react.svg";

import "./App.css";

function App() {
  const { defaultKernel, serviceManager } = useJupyter({
    jupyterServerUrl: "https://oss.datalayer.run/api/jupyter-server",
    jupyterServerToken: "60c1661cc408f978c309d04157af55c9588ff9557c9380e4fb50785750703da6",
    startDefaultKernel: true,
  });
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <>
        <JupyterReactTheme>
          { defaultKernel && <CellExample kernel={defaultKernel}/> }
          { defaultKernel && serviceManager && <NotebookExample kernel={defaultKernel} serviceManager={serviceManager}/> }
        </JupyterReactTheme>
      </>
    </div>
  );
}

export default App;
