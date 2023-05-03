import { useEffect, useState } from 'react';
import {
  useUserDoc,
  addArrayItemUserDoc,
  setUserDoc,
} from 'libs/platform/data';
import useProjects from 'libs/projects/useProjects';
import type { BlockData, Block } from './types';
import { dataToBlock, blockToData, getId } from './utils';

const useCurrentBlock = () => {
  const [currentBlock, setCurrentBlock] = useState<Block>();
  const [data, isLoading, error] = useUserDoc('data/currentBlock');
  const { projects } = useProjects();

  useEffect(() => {
    const blockData = data?.data() as BlockData;
    if (blockData) {
      setCurrentBlock(dataToBlock(blockData, projects));
    }
  }, [data, projects]);

  const pushCurrentBlock = async () => {
    if (currentBlock) {
      const blockData = blockToData(currentBlock);
      try {
        await addArrayItemUserDoc(blockData, 'blocks', 'blocks', getId());
      } catch {
        await setUserDoc({ blocks: [blockData] }, 'blocks', getId());
      }
    }
  };

  return {
    currentBlock,
    isLoading,
    error,
    pushCurrentBlock,
  };
};

export default useCurrentBlock;
