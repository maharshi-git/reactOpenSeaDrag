import React, { useState } from 'react';
import MindMap from 'react-mindmap';

function MindMapComponent() {

  const [nodes, setNodes] = useState([
    { text: 'Parent', fx: 0, fy: 0 },
    { text: 'Child 1', fx: 100, fy: 100 },
    { text: 'Child 2', fx: -100, fy: 100 }

  ]);
  const[connections, setConnections] = useState([{ source: 'Parent', target: 'Child 1' },
  { source: 'Parent', target: 'Child 2' }]);
  // const nodes = [
  //   { text: 'Parent', fx: 0, fy: 0 },
  //   { text: 'Child 1', fx: 100, fy: 100 },
  //   { text: 'Child 2', fx: -100, fy: 100 },
  // ];

  // const connections = [
  //   { source: 'Parent', target: 'Child 1' },
  //   { source: 'Parent', target: 'Child 2' },
  // ];

  return (
    <MindMap
      nodes={nodes}
      connections={connections}
      editable={false}
    />
    // <div></div>
  );
}

export default MindMapComponent;