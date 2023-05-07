import { Timestamp } from 'firebase/firestore';
import { DateTime } from 'luxon';
import { Project } from 'libs/projects/types';
import { Block, BlockData } from './types';

export const dataToBlock = (
  data: BlockData,
  projects: Project[] | undefined
): Block | undefined => {
  const block = { ...data } as Block;
  const project = projects?.find((p) => p.id === block.projectId) as Project;
  block.project = project;
  block.borderColor = project.color && `border-${project.color}`;
  block.bgColor = project.color && `bg-${project.color}`;

  return block;
};

export const blockToData = (block: Block): BlockData => {
  const data: BlockData = {
    title: block.title,
    projectId: block.projectId,
    createdAt: block.createdAt || Timestamp.now(),
  };

  return data;
};

export const getId = (date = DateTime.now()) => '20230506'; // date.toFormat('yyyyMMdd');

export const getDate = () => Timestamp.now();
