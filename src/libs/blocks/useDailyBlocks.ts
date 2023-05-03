import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useUserDoc } from 'libs/platform/data';
import useProjects from 'libs/projects/useProjects';
import { dataToBlock, getId } from './utils';
import type { Block, BlockData } from './types';

const useDailyBlocks = (date?: DateTime) => {
  const [blocks, setBlocks] = useState<Block[]>();
  const [data, isLoading, error] = useUserDoc('blocks', getId(date));
  const { projects } = useProjects();

  useEffect(() => {
    if (data?.data()) {
      const dataBlocks = data.data()?.blocks || [];
      setBlocks(
        dataBlocks.map((b: object) => dataToBlock(b as BlockData, projects))
      );
    }
  }, [data, date, projects]);

  return {
    blocks,
    isLoading,
    error,
  };
};

export default useDailyBlocks;
