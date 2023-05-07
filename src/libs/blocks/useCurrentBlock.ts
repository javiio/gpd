import { useEffect, useState } from 'react';
import {
  useUserDoc,
  addArrayItemUserDoc,
  setUserDoc,
  updateUserDoc,
} from 'libs/platform/data';
import useProjects from 'libs/projects/useProjects';
import type { Project } from 'libs/projects/types';
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

  const updateCurrentBlock = async (title: string) => {
    await updateUserDoc({ title }, 'data/currentBlock');
  };

  const pushCurrentBlock = async (title: string, project: Project) => {
    if (currentBlock) {
      updateCurrentBlock(title);
      const blockData = blockToData({
        ...currentBlock,
        title,
        projectId: project.id,
      });
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
    updateCurrentBlock,
  };
};

export default useCurrentBlock;
