import ApiDataFetcher from './ApiDataFetcher';
const handleLoaderDisplay = jest.fn();
const apiDataFetcher = new ApiDataFetcher(
  'http://swapi.dev/api',
  handleLoaderDisplay,
);
const unmockedFetch = global.fetch;

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

  it('should reduce by extracting correct values', () => {
    const acc = [
      { name: 'a', index: '56' },
      { name: 'b', index: '7' },
    ];
    const curr = {
      name: 'c',
      url: 'http://swapi.dev/api/people/11/',
      someData: 'test data',
    };
    expect(apiDataFetcher.apiDataReducer()).toBeInstanceOf(Function);
    expect(apiDataFetcher.apiDataReducer()(acc, curr)).toEqual([
      { name: 'a', index: '56' },
      { name: 'b', index: '7' },
      { name: 'c', index: '11' },
    ]);
  });
});

describe('ApiDataFetcher', () => {
  beforeEach(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            name: 'mockName',
            url: 'http://swapi.dev/api/people/11/',
            someData: 'test data',
            someOtherData: 'test data',
          }),
      });
    global.fetch = jest.spyOn(global, 'fetch');
  });
  afterEach(() => {
    global.fetch = unmockedFetch;
  });
  it('callPageableApi should send api request to correct page url in the "vehicles" game mode', () => {
    const page = apiDataFetcher.callPageableApi('vehicles', 2);
    expect(page).toBeInstanceOf(Promise);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://swapi.dev/api/vehicles/?page=2',
    );
  });

  it('callPageableApi should send api request to correct page url in the "starships" game mode', () => {
    const page = apiDataFetcher.callPageableApi('starships', 1);
    expect(page).toBeInstanceOf(Promise);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://swapi.dev/api/starships/?page=1',
    );
  });

  it('callPageableApi should send api request to correct page url in the "people" game mode', () => {
    const page = apiDataFetcher.callPageableApi('people', 7);
    expect(page).toBeInstanceOf(Promise);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://swapi.dev/api/people/?page=7',
    );
  });

  it('getAllDataForGameMode should fetch all data for the "vehicles" game mode', () => {
    const page = apiDataFetcher.getAllDataForGameMode('vehicles');
    expect(page).toBeInstanceOf(Array);
    expect(page[0]).toBeInstanceOf(Promise);
    expect(global.fetch).toHaveBeenCalledTimes(4);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://swapi.dev/api/vehicles/?page=1',
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'http://swapi.dev/api/vehicles/?page=4',
    );
  });

  it('getAllDataForGameMode should fetch all data for the "starships" game mode', () => {
    const page = apiDataFetcher.getAllDataForGameMode('starships');
    expect(page).toBeInstanceOf(Array);
    expect(page[0]).toBeInstanceOf(Promise);
    expect(global.fetch).toHaveBeenCalledTimes(4);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://swapi.dev/api/starships/?page=4',
    );
  });

  it('getAllDataForGameMode should fetch all data for the "people" game mode', () => {
    const page = apiDataFetcher.getAllDataForGameMode('people');
    expect(page).toBeInstanceOf(Array);
    expect(page[0]).toBeInstanceOf(Promise);
    expect(global.fetch).toHaveBeenCalledTimes(9);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://swapi.dev/api/people/?page=9',
    );
  });

  it('getRandomAsset should fetch name and url of a randem asset for the "vehicles" game mode', () => {
    const page = apiDataFetcher.getRandomAsset('vehicles');
    expect(page).toBeInstanceOf(Promise);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/swapi\.dev\/api\/vehicles\/[\d]+/),
    );
  });

  it('getRandomAsset should fetch name and url of a randem asset for the "starships" game mode', () => {
    const page = apiDataFetcher.getRandomAsset('starships');
    expect(page).toBeInstanceOf(Promise);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/swapi\.dev\/api\/starships\/[\d]+/),
    );
  });

  it('getRandomAsset should fetch name and url of a randem asset for the "people" game mode', () => {
    const page = apiDataFetcher.getRandomAsset('people');
    expect(page).toBeInstanceOf(Promise);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/http:\/\/swapi\.dev\/api\/people\/[\d]+/),
    );
    expect(page).resolves.toEqual({
      name: 'mockName',
      url: 'http://swapi.dev/api/people/11/',
    });
  });
});
