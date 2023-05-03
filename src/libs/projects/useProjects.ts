import { useEffect, useState, useCallback } from 'react';
import { useUserCollection } from 'libs/platform/data';
import type { Project } from './types';

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>();

  const [data, isLoading, error] = useUserCollection('projects');

  useEffect(() => {
    if (data) {
      setProjects(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Project))
      );
    }
  }, [data]);

  const getProject = useCallback(
    (id?: string) => projects?.find((p) => p.id === id),
    [projects]
  );

  return {
    projects,
    isLoading,
    error,
    getProject,
  };
};

export default useProjects;
