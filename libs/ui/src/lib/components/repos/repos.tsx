import { Button, Card, TextInput } from 'flowbite-react';
import { useCallback, useState } from 'react';
import { usePullUrlState } from '../../hooks/use-pull-url-state';
/* eslint-disable-next-line */

export type ReposProps = Pick<
  ReturnType<typeof usePullUrlState>,
  'repos' | 'addRepo' | 'hasRepo'
>;
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
  const { repos, addRepo, hasRepo } = props;
  const [repoValue, setRepoValue] = useState('');
  const [invalidRepoInput, setInvalidRepoInput] = useState(false);

  /**
   * Reset any data input if the inputKey is invalid.
   * When the key is "Enter" we still want to show the validation
   * error if there is one. This applies to situations where
   * the user wants to hit "Enter" to create a new line.
   */
  const handleRepoInputKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') return;
      if (invalidRepoInput) setInvalidRepoInput(false);
    },
    [invalidRepoInput]
  );

  /**
   * Handles the actual addition of an input. This will
   * validate the input and add it to the list of repos.
   */
  const handleAddRepo = useCallback(() => {
    try {
      if (typeof addRepo === 'function') addRepo(repoValue);
      setRepoValue('');
    } catch (err) {
      console.warn(err);
      setInvalidRepoInput(true);
    }
  }, [addRepo, repoValue]);

  /**
   * If the repo is duplicated in the selected list
   */
  const isDuplicated = typeof hasRepo === 'function' && hasRepo(repoValue);

  return (
    <Card className="dark:text-white">
      <h1>Github Repos to track</h1>
      <ul className="list-inside list-disc">
        {(repos ?? []).map((repo) => (
          // TODO: make links!
          <li key={repo}>{repo}</li>
        ))}
      </ul>
      <form
        className="gap flex flex-row"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="w-full">
          <TextInput
            type="text"
            id="repo-input"
            value={repoValue}
            onKeyUp={handleRepoInputKeyUp}
            onChange={(e) => setRepoValue(e.target.value)}
            color={invalidRepoInput ? 'failure' : undefined}
            helperText={(() => {
              if (invalidRepoInput) return <>Invalid repo input</>;
              if (isDuplicated) return <>Repo already added</>;
              return null;
            })()}
          />
        </div>
        <Button
          type="submit"
          className="ml-2"
          onClick={handleAddRepo}
          disabled={isDuplicated}
        >
          +
        </Button>
      </form>
    </Card>
  );
}

export default Repos;
