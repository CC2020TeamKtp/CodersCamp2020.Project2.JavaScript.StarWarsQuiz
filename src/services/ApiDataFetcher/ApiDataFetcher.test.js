import ApiDataFetcher from './ApiDataFetcher';
const apiDataFetcher = new ApiDataFetcher('http://swapi.dev/api');
const unmockedFetch = global.fetch;

beforeEach(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          name: 'mockName',
          url: 'http://swapi.dev/api/people/11/',
          someData: 'fvdgrgvg',
          someOtherData: 'dsjifds',
        }),
    });
});

afterEach(() => {
  global.fetch = unmockedFetch;
});

describe('ApiDataFetcher', () => {
  it('should extract correct number from index', () => {
    expect(
      apiDataFetcher.extractIdFromUrl('http://swapi.dev/api/people/11/'),
    ).toBe('11');
    expect(
      apiDataFetcher.extractIdFromUrl('http://swapi.dev/api/starships/5/'),
    ).toBe('5');
    expect(
      apiDataFetcher.extractIdFromUrl('http://swapi.dev/api/vehicles/41/'),
    ).toBe('41');
  });

  it('callPageableApi should send api request to correct page url', () => {
    const fetchMock = jest.spyOn(global, 'fetch');
    const page1 = apiDataFetcher.callPageableApi('vehicles', 2);
    expect(page1).toBeInstanceOf(Promise);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://swapi.dev/api/vehicles/?page=2',
    );
    const page2 = apiDataFetcher.callPageableApi('starships', 1);
    expect(page2).toBeInstanceOf(Promise);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://swapi.dev/api/starships/?page=1',
    );
    const page3 = apiDataFetcher.callPageableApi('people', 7);
    expect(page3).toBeInstanceOf(Promise);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://swapi.dev/api/people/?page=7',
    );
  });

  it('should reduce by extracting correct values', () => {
    const acc = [
      { name: 'a', index: '56' },
      { name: 'b', index: '7' },
    ];
    const curr = {
      name: 'c',
      url: 'http://swapi.dev/api/people/11/',
      someData: 'fvdvsvs',
    };
    expect(apiDataFetcher.apiDataReducer()).toBeInstanceOf(Function);
    expect(apiDataFetcher.apiDataReducer()(acc, curr)).toEqual([
      { name: 'a', index: '56' },
      { name: 'b', index: '7' },
      { name: 'c', index: '11' },
    ]);
  });

  it('getAllDataForGameMode should fetch all data for a selected game mode', () => {
    const fetchMock = jest.spyOn(global, 'fetch');
    const page1 = apiDataFetcher.getAllDataForGameMode('vehicles');
    expect(page1).toBeInstanceOf(Array);
    expect(page1[0]).toBeInstanceOf(Promise);
    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://swapi.dev/api/vehicles/?page=1',
    );
    expect(fetchMock).toHaveBeenCalledWith(
      'http://swapi.dev/api/vehicles/?page=4',
    );
    const page2 = apiDataFetcher.getAllDataForGameMode('starships');
    expect(page2).toBeInstanceOf(Array);
    expect(page2[0]).toBeInstanceOf(Promise);
    expect(fetchMock).toHaveBeenCalledTimes(8); //4 za vehicles + 4 za starships
    expect(fetchMock).toHaveBeenCalledWith(
      'http://swapi.dev/api/starships/?page=4',
    );
    const page3 = apiDataFetcher.getAllDataForGameMode('people');
    expect(page3).toBeInstanceOf(Array);
    expect(page3[0]).toBeInstanceOf(Promise);
    expect(fetchMock).toHaveBeenCalledTimes(17); // j.w. + 9 za people
    expect(fetchMock).toHaveBeenCalledWith(
      'http://swapi.dev/api/people/?page=9',
    );
  });

  it('getRandomAsset should fetch name and url of a randem asset for a selected game mode', () => {
    const fetchMock = jest.spyOn(global, 'fetch');
    const page1 = apiDataFetcher.getRandomAsset('vehicles');
    expect(page1).toBeInstanceOf(Promise);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/swapi\.dev\/api\/vehicles\/[\d]+/),
    );
    const page2 = apiDataFetcher.getRandomAsset('starships');
    expect(page2).toBeInstanceOf(Promise);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/swapi\.dev\/api\/starships\/[\d]+/),
    );
    const page3 = apiDataFetcher.getRandomAsset('people');
    expect(page3).toBeInstanceOf(Promise);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/swapi\.dev\/api\/people\/[\d]+/),
    );
    expect(page3).resolves.toEqual({
      name: 'mockName',
      url: 'http://swapi.dev/api/people/11/',
    });
  });
});
