import { isValidRepo } from './is-valid-repo';

describe('isValidRepo', () => {
  it('should return true for valid repo', () => {
    expect(isValidRepo('angular/angular')).toBeTruthy();
  });

  it('should return false for invalid repo', () => {
    expect(isValidRepo('angular')).toBeFalsy();
  });
});
