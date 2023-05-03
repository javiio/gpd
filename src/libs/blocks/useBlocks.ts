import { useEffect, useState } from 'react';
import { useUserCollection } from 'libs/platform/data';
import type { Block } from './types';

const useBlocks = () => {
  const [blocks, setBlocks] = useState<Block[]>();

  const [blocksData, isBlocksLoading, blocksError] =
    useUserCollection<Block>('blocks');

  useEffect(() => {
    setBlocks([]);
  }, [blocksData]);

  return {
    blocks,
    isBlocksLoading,
    blocksError,
  };
};

export default useBlocks;
