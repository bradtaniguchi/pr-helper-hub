import { Card } from 'flowbite-react';

/* eslint-disable-next-line */
export interface ReposProps {}

/**
 * The Repos component is the main component of the page and takes
 * up the most space in the middle. It provides a drag-drop list of
 * repos that should be tracked for PRs.
 *
 * Will rely on react-dnd for sorting the repos in the list, this should
 * have no end-user effect, but will allow for a more intuitive UI.
 *
 * @param props the component props
 */
export function Repos(props: ReposProps) {
  return (
    <Card className="text-white">
      <h1>repos component</h1>
    </Card>
  );
}

export default Repos;
