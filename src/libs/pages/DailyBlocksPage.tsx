import CurrentBlock from 'libs/blocks/CurrentBlock';
import DailyBlocks from 'libs/blocks/DailyBlocks';

function DailyBlocksPage() {
  return (
    <div>
      <div className="flex-row m-4">
        <CurrentBlock />
      </div>
      <div>
        <DailyBlocks />
      </div>
    </div>
  );
}

export default DailyBlocksPage;
