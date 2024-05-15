import { ComponentType, ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

const withErrorBoundary = (WrappedComponent: ComponentType) => {
  return (props: any): ReactNode => (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

export default withErrorBoundary;

