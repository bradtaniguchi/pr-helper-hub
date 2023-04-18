import { MainPage } from '@pr-helper-hub/ui';
/* eslint-disable-next-line */
export interface IndexProps {}

/**
 * The primary landing page, or the actual app.
 * See:
 * core-ui for actual app implementation.
 *
 * @param props the index props
 */
export function Index(props: IndexProps) {
  return (
    <div>
      <MainPage />
    </div>
  );
}

export default Index;
