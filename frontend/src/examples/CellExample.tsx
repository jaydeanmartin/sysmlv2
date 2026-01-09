/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

import { Button, Label } from '@primer/react';
import { Box } from '@datalayer/primer-addons';
import { PlayIcon } from '@primer/octicons-react';
import {
  useCellsStore,
  useKernelsStore,
  Cell,
  KernelIndicator,
  Kernel,
} from '@datalayer/jupyter-react';

const CELL_ID = 'cell-example-1';

const DEFAULT_SOURCE = `from IPython.display import display

for i in range(10):
    display('I am a long string which is repeatedly added to the dom in separated divs: %d' % i)`;

const DEFAULT_SYSML = `package MyFirstSysMLv2Model {
    part MySystem {
        part partA;
        part partB;
        
        connect partA to partB;
    }
}`;
interface CellExampleProps {
  kernel: Kernel;
}

export const CellExample = ({ kernel }: CellExampleProps) => {
  const cellsStore = useCellsStore();
  const kernelsStore = useKernelsStore();
  return (
    <>
      <Box as="h1">Cell Example</Box>
      <Box>
        <KernelIndicator
          kernel={kernel?.connection}
          label="Kernel Indicator"
        />
      </Box>
      <Box>
        <Button
          leadingVisual={() => <PlayIcon />}
          onClick={() => cellsStore.execute(CELL_ID)}
        >
          Evaluate Cell
        </Button>
      </Box>
      {kernel && (
        <Cell id={CELL_ID} source={DEFAULT_SYSML} kernel={kernel} />
      )}
    </>
  );
};

export default CellExample;
