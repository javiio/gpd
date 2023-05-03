import { useState, useEffect } from 'react';
import cn from 'classnames';
import Error from 'libs/platform/Error';
import Loading from 'libs/platform/Loading';
import useCurrentBlock from './useCurrentBlock';

function CurrentBlock() {
  const { currentBlock, isLoading, error, pushCurrentBlock } =
    useCurrentBlock();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(currentBlock?.title || '');

  useEffect(() => {
    setTitle(currentBlock?.title || '');
  }, [currentBlock, editMode]);

  const push = () => {
    pushCurrentBlock(title);
  };

  return (
    <div>
      <div
        className={cn(
          'w-96 h-32 bg-slate-800 m-4 border-l-4 overflow-hidden',
          currentBlock?.project?.color
            ? `border-${currentBlock?.project?.color}`
            : 'border-gray-400',
          editMode && 'border'
        )}
        onClick={() => setEditMode(true)}
        onKeyDown={() => setEditMode(true)}
        role="button"
        tabIndex={0}
      >
        {error && <Error />}
        {isLoading && <Loading />}
        {currentBlock && !isLoading && !error && (
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl bg-slate-800 w-full p-4 h-48 resize-none"
          />
        )}
      </div>
      <button type="button" onClick={push}>
        Add
      </button>
    </div>
  );
}

export default CurrentBlock;
