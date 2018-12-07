import {
  getRoot,
  getSeriesByID,
  getEpisodeByID,
  getRecommendedEpisodes,
} from './fetch';

describe('Checking fetch function: ', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      const p = new Promise((resolve) => {
        resolve({
          ok: true,
          status: 200,
          json: () => ({
            id: 55,
            title: 'Dummy Title',
          }),
        });
      });
      return p;
    });
  });

  test('getRoot()', async () => {
    const response = await getRoot();
    expect(response.id).toBe(55);
    expect(response.title).toBe('Dummy Title');
  });

  test('getSeriesByID()', async () => {
    const response = await getSeriesByID(5);
    expect(response.id).toBe(55);
    expect(response.title).toBe('Dummy Title');
  });

  test('getEpisodeByID()', async () => {
    const response = await getEpisodeByID(5);
    expect(response.id).toBe(55);
    expect(response.title).toBe('Dummy Title');
  });

  test('getRecommendedEpisodes()', async () => {
    const response = await getRecommendedEpisodes('4');
    expect(response.id).toBe(55);
    expect(response.title).toBe('Dummy Title');
  });
});
