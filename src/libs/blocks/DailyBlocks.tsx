import cn from 'classnames';
import useDailyBlocks from './useDailyBlocks';

function DailyBlocks() {
  const { blocks } = useDailyBlocks();

  return (
    <div className="m-4">
      {blocks?.map((block) => (
        <div
          className={cn(
            'h-12 m-2 py-2 px-4',
            `border border-l-8 border-${block.project?.color}`,
            `bg-${block.project?.color}/10`
          )}
        >
          {block.title}
        </div>
      ))}
    </div>
  );
}

export default DailyBlocks;
