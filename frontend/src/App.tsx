/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

import { useState } from "react";
import { JupyterReactTheme } from '@datalayer/jupyter-react';

import { SysMLEditor } from "./components/SysMLEditor/SysMLEditor";

import "./App.css";

function App() {
  return (
    <div className="App">
      <>
        <JupyterReactTheme>
          <SysMLEditor />
        </JupyterReactTheme>
      </>
    </div>
  );
}

export default App;
