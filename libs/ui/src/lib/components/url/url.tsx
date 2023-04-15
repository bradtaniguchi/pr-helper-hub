import { Card } from 'flowbite-react';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface UrlProps {
  /**
   * The URL to display
   */
  url: string;
  /**
   * If there is an error with the URL, we will show this error
   */
  invalidError?: Error;
  /**
   * Array of actions to show in the bottom right of the card
   */
  actions?: Array<React.ReactNode>;
}

/**
 * The Url component is shown at the top of the page, and contains
 * the generated URL that will take the user to github.
 *
 * **note** we will need way to support prefix-urls/base-urls to support enterprise
 * github users.
 *
 * TODO: might include a field to name a URL when save is clicked.
 *
 * @param props the component props
 */
export function Url(props: UrlProps) {
  const { url, invalidError, actions } = props;
  return (
    <Card className="dark:text-white">
      <div className="flex justify-center">
        {invalidError ? (
          <div>
            <div>
              <span className="text-red-500">Invalid URL error:</span>
            </div>
            <div className="my-2 text-center">
              <pre>{invalidError.message}</pre>
            </div>
          </div>
        ) : (
          <div className="underline">
            <Link href={url}>{url}</Link>
          </div>
        )}
      </div>

      {actions && (
        <div className="flex justify-end">
          {actions.map((action, index) => (
            <div key={index} className="ml-2">
              {action}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default Url;
