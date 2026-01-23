import React, { useState, useEffect } from 'react';
import { Output, useJupyter, useKernelsStore, useOutputsStore, useCellsStore } from '@datalayer/jupyter-react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import Button from '@mui/material/Button';

const SYSML_API = 'http://localhost:8080/sysml/';
const JUPYTER = 'http://localhost:8888';

const SYSML_EDITOR_ID = 'sysml-editor';
const SYSML_GRAPH_ID = 'sysml-graph';

const DEFAULT_SYSML = `package MyFirstSysMLv2Model {
    part MySystem {
        part partA;
        part partB;
        
        connect partA to partB;
    }
}`;

export const SysMLEditor = () => {
    const [graphCode, setGraphCode] = useState("");
    const [expandedItems, setExpandedItems] = useState([]);
    const [projects, setProjects] = useState([]);
    const {kernel, settings} = useJupyter({
        jupyterServerUrl: JUPYTER,
        jupyterServerToken: "sysmlv2",
        startDefaultKernel: true,
        defaultKernelName: "sysml",
    });
    const outputsStore = useOutputsStore();
    const kernelsStore = useKernelsStore();
    const cellsStore = useCellsStore();

    const query_input = {
        '@type': 'Query',
        'select': ['name','@id','@type','owner'],
        'where': {
            '@type': 'CompositeConstraint',
            'operator': 'and',
            'constraint': [
                {
                    '@type': 'PrimitiveConstraint',
                    'inverse': false,
                    'operator': '=',
                    'property': '@type',
                    'value': 'PartDefinition',
                },
            ]
        }
    };

    useEffect(() => {
        const getProjects = async () => {
            // const response = await fetch(SYSML_API+"projects");
            // const projects = await response.json();
            // console.log(projects);
            var id_list = [];
            let p = [];
            /*
            for (const project of projects) {
                console.log(project);
                const resp2 = await fetch(SYSML_API+"projects/"+project['@id']+"/query-results", {
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(query_input),
                });
                console.log(resp2);
                // need to check things worked out
                if (resp2.status===200) {
                    const parts = await resp2.json();
                    let part_list = [];
                    var part_id = [];
                    parts.forEach((part) => {
                        part_id = part['@id'];
                        if (id_list.includes(part_id)) {
                            var count = 0;
                            id_list.forEach((i) => {
                                if (i.startsWith(part_id)) {
                                    console.log('found a dupe ', i);
                                    count=count+1;
                                }

                            });
                            if (count>0) {
                                part_id = part_id +"."+count.toString();
                            }
                        }
                        id_list.push(part_id);
                        part_list.push({label: part.name, id: part_id});
                    });

                    p.push({label: project.name.split(" ")[0], id: project['@id'], children: part_list})
                }
                    
            }
                */
            setProjects(p);
        }
        getProjects();
    }, []);
    
    const handleExpandedItemsChange = (event, itemIds) => {
        console.log('pressed expand item: ', itemIds);
        setExpandedItems(itemIds);
    }

    const handleSelectedItemsChange = (event, id) => {
        console.log('selected items: ', id);
    }

    const handleEvaluate = async () => {
        // send the code to Jupyter to be evaluated
        const res = await outputsStore.getAdapter(SYSML_EDITOR_ID).execute(outputsStore.getInput(SYSML_EDITOR_ID));
        const results = outputsStore.getModel(SYSML_EDITOR_ID)?.get(0)?.data['text/plain'];
        setGraphCode("%viz " + results.split(" ")[1]);
    }

    const handleGraph = async () => {
        const res = await outputsStore.getAdapter(SYSML_GRAPH_ID).execute(graphCode);
    }

    return (
        <>
        { kernel &&
        <>
        <Grid container spacing={2}>
            <Grid size={3}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: 300,
                        overflow: "hidden",
                        overflowY: "auto",
                }}>
                    <RichTreeView
                        items={projects}
                        expandedItems={expandedItems}
                        onExpandedItemsChange={handleExpandedItemsChange}
                        onSelectedItemsChange={handleSelectedItemsChange}
                    />
                </Box>
            </Grid>
            <Grid size={9}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: 300,
                        overflow: "hidden",
                        overflowY: "auto",
                    }}>
                    <Output
                        autorun={false}
                        code={DEFAULT_SYSML}
                        id={SYSML_EDITOR_ID}
                        kernel={kernel}
                        showEditor={true}
                    />
                </Box>
            </Grid>
        </Grid>
        <Box
        my={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}>
            <Button
            onClick={handleEvaluate}
            variant="contained"
            disabled={false}>
                Evaluate
            </Button>
            <Button
            onClick={handleGraph}
            variant='contained'
            disabled={false}>
                Graph
            </Button>
            <Button
            variant="contained"
            disabled={true}>
                Save
            </Button>
        </Box>
        <Box>
            <Output
                autoRun={false}
                code={graphCode}
                id={SYSML_GRAPH_ID}
                kernel={kernel}
                showEditor={false}
            />
        </Box>
        </>
        }
        </>
    );

}
