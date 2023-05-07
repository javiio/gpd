import { useState, useEffect } from 'react';
import cn from 'classnames';
import Error from 'libs/platform/Error';
import Loading from 'libs/platform/Loading';
import ProjectSelector from 'libs/projects/ProjectSelector';
import type { Project } from 'libs/projects/types';
import useCurrentBlock from './useCurrentBlock';

function CurrentBlock() {
  const { currentBlock, isLoading, error, pushCurrentBlock } =
    useCurrentBlock();
  const [title, setTitle] = useState(currentBlock?.title || '');
  const [project, setProject] = useState(currentBlock?.project);

  useEffect(() => {
    if (currentBlock) {
      setTitle(currentBlock.title);
      setProject(currentBlock.project);
    }
  }, [currentBlock]);

  const push = () => {
    pushCurrentBlock(title, project as Project);
  };

  return (
    <div>
      <div
        className={cn(
          'w-96 h-32 bg-slate-800 border-l-4 overflow-hidden mb-4 border',
          project?.color ? `border-${project?.color}` : 'border-gray-400'
        )}
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
      <ProjectSelector selected={project} onChange={setProject} />
      <button type="button" onClick={push}>
        Add
      </button>
    </div>
  );
}

export default CurrentBlock;
