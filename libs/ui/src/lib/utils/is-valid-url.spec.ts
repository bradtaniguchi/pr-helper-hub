import { isValidUrl } from './is-valid-url';

describe('isValidUrl', () => {
  test('returns true for valid url', () => {
    expect(isValidUrl('https://www.google.com')).toBeTruthy();
  });
  test('returns false for invalid url', () => {
    expect(isValidUrl('google.com')).toBeFalsy();
  });
});
