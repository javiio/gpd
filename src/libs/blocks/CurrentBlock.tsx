import { useState, useEffect } from 'react';
import cn from 'classnames';
import Loading from 'libs/platform/Loading';
import useCurrentBlock from './useCurrentBlock';

function CurrentBlock() {
  const { currentBlock, isLoading, error, pushCurrentBlock } =
    useCurrentBlock();
  const [editMode, setEditMode] = useState(true);
  const [title, setTitle] = useState(currentBlock?.title || '');

  useEffect(() => {
    if (!editMode || true) {
      setTitle(currentBlock?.title || '');
    }
  }, [currentBlock, editMode]);

  return (
    <div>
      <div
        className={cn(
          'w-96 h-32 bg-slate-800 p-4 m-4 border-l-4',
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
        {error && null}
        {isLoading && <Loading />}
        <div className="text-3xl">
          {editMode ? (
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-800 w-full h-24"
            />
          ) : (
            <div>{currentBlock?.title}</div>
          )}
        </div>
      </div>
      <button type="button" onClick={pushCurrentBlock}>
        Add
      </button>
    </div>
  );
}

export default CurrentBlock;
