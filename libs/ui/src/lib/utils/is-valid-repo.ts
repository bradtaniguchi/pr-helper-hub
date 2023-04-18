/**
 * Returns if the repo is a valid string.
 *
 * @param repo the repo to validate and check
 */
export function isValidRepo(repo: string) {
  return repo.match(/^[a-zA-Z0-9-_.]+\/[a-zA-Z0-9-_.]+$/)?.length === 1;
}
