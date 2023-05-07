import cn from 'classnames';
import useDailyBlocks from './useDailyBlocks';
import { Block } from './types';

const BLOCK_TIME = 25;
const START_TIME = 7;
const END_TIME = 24;
const HEIGHT_PER_MINUTE = 1.2;
const times = Array.from(Array(END_TIME - START_TIME).keys()).map(
  (i) => `${i + START_TIME}:00`
);

const calcBlockPosition = (block: Block) => {
  const time = block.createdAt?.toDate();
  if (time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return (
      ((hours - START_TIME) * 60 + minutes - BLOCK_TIME) * HEIGHT_PER_MINUTE
    );
  }
  return 0;
};

function DailyBlocks() {
  const { blocks } = useDailyBlocks();

  return (
    <div className="m-4 flex">
      <div>
        {times.map((time) => (
          <div className="" style={{ height: 60 * HEIGHT_PER_MINUTE }}>
            {time}
          </div>
        ))}
      </div>
      <div className="relative">
        {blocks?.map((block) => (
          <div
            className={cn(
              'm-2 py-1 px-4 text-sm absolute w-96',
              `border border-l-8 border-${block.project?.color}`,
              `bg-${block.project?.color}/10`
            )}
            style={{
              height: BLOCK_TIME * HEIGHT_PER_MINUTE,
              top: calcBlockPosition(block),
            }}
          >
            {block.title} here
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyBlocks;
