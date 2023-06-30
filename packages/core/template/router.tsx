// @ts-nocheck
import React from 'react';
import { createHashRouter } from 'react-router-dom';

export const LazyImportComponent = (props: {
  lazyChildren: React.LazyExoticComponent<() => JSX.Element>;
}) => {
  return (
    <React.Suspense>
      <props.lazyChildren />
    </React.Suspense>
  );
};

const appRouter = [];

const router = createHashRouter(appRouter);

export default router;