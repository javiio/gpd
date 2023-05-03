import React, { useEffect } from 'react';
import useBlocks from './useBlocks';
import useProjects from '../projects/useProjects';

const Block = () => {
  const { blocks } = useBlocks();
  const { config } = useProjects();

  useEffect(() => {
    console.log("BLOCKS", blocks?.docs[0].data());
  }, [blocks]);
  
  useEffect(() => {
    console.log("CONFIG", config?.data());
  }, [config]);

  return (
    <div>
      {blocks && blocks?.docs.map((doc) => {
        const d = doc.data();
        return (<div>{d.project}</div>)
      })}
    </div>
  );
};

export default Block;
