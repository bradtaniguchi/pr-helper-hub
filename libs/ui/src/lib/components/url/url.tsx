import { Card } from 'flowbite-react';

/* eslint-disable-next-line */
export interface UrlProps {}

/**
 * The Url component is shown at the top of the page, and contains
 * the generated URL that will take the user to github.
 *
 * **note** we will need way to support prefix-urls/base-urls to support enterprise
 * github users.
 *
 * @param props the component props
 */
export function Url(props: UrlProps) {
  return (
    <Card className="text-white">
      <h1>url component</h1>
    </Card>
  );
}

export default Url;
