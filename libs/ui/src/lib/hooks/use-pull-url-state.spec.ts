import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { usePullUrlState } from './use-pull-url-state';

describe('usePullUrlState', () => {
  const baseUrl = 'https://github.com/';

  describe('baseUrl', () => {
    test('is nothing if given invalid', () => {
      const { result } = renderHook(() => usePullUrlState({ baseUrl: 'foo' }));
      expect(result.current.url).toEqual('');
    });
    test('is updated when setBaseUrl called', () => {
      const { result } = renderHook(() => usePullUrlState({ baseUrl }));
      act(() => {
        result.current.setBaseUrl('https://gitlab.com/');
      });
      expect(result.current.url).toEqual('https://gitlab.com/pulls');
    });
  });

  describe('baseFilter', () => {
    test('updates url when addBaseFilter is called', async () => {
      const { result } = renderHook(() => usePullUrlState({ baseUrl }));
      act(() => {
        result.current.addBaseFilter('is:pr');
      });
      expect(result.current.url).toEqual('https://github.com/pulls?q=is%3Apr');
    });
    test('returns url with updated base-filter after moveBaseFilter', () => {
      const { result } = renderHook(() => usePullUrlState({ baseUrl }));
      act(() => {
        result.current.addBaseFilter('is:pr');
        result.current.addBaseFilter('is:open');
      });
      act(() => {
        result.current.moveBaseFilter('is:pr', 1);
      });
      expect(result.current.url).toEqual(
        'https://github.com/pulls?q=is%3Apr+is%3Apr+is%3Aopen'
      );
    });
    test('throws error trying to move base-filter to invalid index', () => {
      const { result } = renderHook(() => usePullUrlState({ baseUrl }));
      act(() => {
        result.current.addBaseFilter('is:pr');
        result.current.addBaseFilter('is:open');
      });
      expect(() =>
        act(() => {
          result.current.moveBaseFilter('is:pr', 3);
        })
      ).toThrowError('Invalid index: 3');

      expect(() =>
        act(() => {
          result.current.moveBaseFilter('is:pr', -1);
        })
      ).toThrowError('Invalid index: -1');
    });
    test('throws error trying to move base-filter that does not exist', () => {
      const { result } = renderHook(() => usePullUrlState({ baseUrl }));
      act(() => {
        result.current.addBaseFilter('is:pr');
        result.current.addBaseFilter('is:open');
      });
      expect(() =>
        act(() => {
          result.current.moveBaseFilter('is:closed', 1);
        })
      ).toThrowError('Filter not found: is:closed');
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
  });

  describe('repo', () => {
    test('returns url with repo', async () => {
      const { result } = renderHook(() => usePullUrlState({ baseUrl }));
      act(() => {
        result.current.addRepo('nrwl/nx');
      });
      expect(result.current.url).toEqual(
        'https://github.com/pulls?q=repo%3Anrwl%2Fnx'
      );
    });
    test('returns url with updated repo after moveRepo', () => {
      const { result } = renderHook(() => usePullUrlState({ baseUrl }));
      act(() => {
        result.current.addRepo('nrwl/nx');
        result.current.addRepo('nrwl/nx-examples');
      });
      act(() => {
        result.current.moveRepo('nrwl/nx', 1);
      });
      expect(result.current.url).toEqual(
        'https://github.com/pulls?q=repo%3Anrwl%2Fnx+repo%3Anrwl%2Fnx+repo%3Anrwl%2Fnx-examples'
      );
    });
    test('throws error trying to move repo to invalid index', () => {
      const { result } = renderHook(() => usePullUrlState({ baseUrl }));
      act(() => {
        result.current.addRepo('nrwl/nx');
        result.current.addRepo('nrwl/nx-examples');
      });
      expect(() =>
        act(() => {
          result.current.moveRepo('nrwl/nx', 3);
        })
      ).toThrowError('Invalid index: 3');

      expect(() =>
        act(() => {
          result.current.moveRepo('nrwl/nx', -1);
        })
      ).toThrowError('Invalid index: -1');
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

  describe('customFilter', () => {
    test.todo('is applied as-is');
    test.todo('');
    test.todo('is invalid makes the URL not loadable');
  });
});
