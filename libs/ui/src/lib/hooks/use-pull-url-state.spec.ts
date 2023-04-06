import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { usePullUrlState } from './use-pull-url-state';

describe('usePullUrlState', () => {
  const baseUrl = 'https://github.com/';
  test('returns correct data-types', () => {
    const { result } = renderHook(() => usePullUrlState({ baseUrl }));
    expect(result.current).toEqual({
      url: 'https://github.com/pulls',
      reset: expect.any(Function),
      setBaseUrl: expect.any(Function),
      hasQueryParam: expect.any(Function),
      addBaseFilter: expect.any(Function),
      addRepo: expect.any(Function),
      removeRepo: expect.any(Function),
      removeBaseFilter: expect.any(Function),
    });
  });
  test('returns url with updated base-url', () => {
    const { result } = renderHook(() => usePullUrlState({ baseUrl }));
    act(() => {
      result.current.setBaseUrl('https://gitlab.com/');
    });
    expect(result.current.url).toEqual('https://gitlab.com/pulls');
  });

  test('returns url with single base-filter ', async () => {
    const { result } = renderHook(() => usePullUrlState({ baseUrl }));
    act(() => {
      result.current.addBaseFilter('is:pr');
    });
    expect(result.current.url).toEqual('https://github.com/pulls?q=is%3Apr');
  });
  test('returns url with multiple base-filters', async () => {
    const { result } = renderHook(() => usePullUrlState({ baseUrl }));
    act(() => {
      result.current.addBaseFilter('is:pr');
      result.current.addBaseFilter('is:open');
    });
    expect(result.current.url).toEqual(
      'https://github.com/pulls?q=is%3Apr+is%3Aopen'
    );
  });

  test('returns url with repo query param', async () => {
    const { result } = renderHook(() => usePullUrlState({ baseUrl }));
    act(() => {
      result.current.addRepo('nrwl/nx');
    });
    expect(result.current.url).toEqual(
      'https://github.com/pulls?q=repo%3Anrwl%2Fnx'
    );
  });
  test('returns url with base-filters and multiple repos', () => {
    const { result } = renderHook(() => usePullUrlState({ baseUrl }));
    act(() => {
      result.current.addBaseFilter('is:pr');
      result.current.addBaseFilter('is:open');
      result.current.addRepo('nrwl/nx');
      result.current.addRepo('nrwl/nx-examples');
    });
    expect(result.current.url).toEqual(
      'https://github.com/pulls?q=is%3Apr+is%3Aopen+repo%3Anrwl%2Fnx+repo%3Anrwl%2Fnx-examples'
    );
  });
});
