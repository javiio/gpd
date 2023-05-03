import CountdownTimer from 'libs/timer/CountdownTimer';
import CurrentBlock from 'libs/blocks/CurrentBlock';
import DailyBlocks from 'libs/blocks/DailyBlocks';

function DailyBlocksPage() {
  return (
    <div>
      <div className="flex-row">
        <CurrentBlock />
        <CountdownTimer />
      </div>
      <div>
        <DailyBlocks />
      </div>
    </div>
  );
}

export default DailyBlocksPage;
