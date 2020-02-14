import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network';

interface Props {
  payload: any;
}

// entities
const nodes = new DataSet([
  { id: 1, label: 'Node 1' },
  { id: 2, group: 'myGroup', label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' },
  {id:6, group:'myGroup', label:"Custom 1"}
]);

// create an array with edges
// links between entities
const edges = new DataSet([
  { from: 1, to: 3, label: 'link' },
  { from: 1, to: 2, label: 'link2' },
  { from: 2, to: 4, label: 'link3' },
  { from: 2, to: 5, label: 'link4' },
  { from: 6, to: 3, label: 'link5' }
]);

const data = {
  nodes: nodes,
  edges: edges
};

// Configuration Options
const options = {
  autoResize: true,
  height: '500px',
  width: '10  0%',
  clickToUse: false,
  configure: {
    enabled: true,
    filter: 'nodes,edges',
    container: undefined,
    showButton: true
  },
  edges:{
    color: {
      color:'#848484',
      highlight:'#848484',
      hover: '#848484',
      inherit: 'from',
      opacity:1.0
    },
    dashes: false,
    hidden: false,
    hoverWidth: 1.5,
    labelHighlightBold: true,
    length: undefined,
    physics: true,
    shadow:{
      enabled: false,
      color: 'rgba(0,0,0,0.5)',
      size:10,
      x:5,
      y:5
    },
    title:'title'
  },
  groups: {
    myGroup: {color:{background:'red'}, borderWidth:3},
  }
};

const NetworkGraph: React.FC<Props>  = (props) => {
  const graphRef = useRef<HTMLDivElement>(null);
  var network: Network;

  useEffect(() => {
    if (graphRef.current) {
      network = new Network(graphRef.current, data, options);
    }
  },[]);

  useEffect(() => {
    if (graphRef.current) {
      //new Network(graphRef.current, data, options);
      // update data?
      //network.setData();
    }
  },[props.payload]);

  return (
    <div ref={graphRef}></div>
  );
}

export default NetworkGraph;