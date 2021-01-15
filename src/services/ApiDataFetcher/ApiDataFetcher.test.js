import ApiDataFetcher from "./ApiDataFetcher";
const apiDataFetcher = new ApiDataFetcher();

describe('ApiDataFetcher', () => {
  it('should extract correct number from index', () => {
    expect(apiDataFetcher.extractIdFromUrl('http://swapi.dev/api/people/11/')).toBe('11');
    expect(apiDataFetcher.extractIdFromUrl('http://swapi.dev/api/starships/5/')).toBe('5');
    expect(apiDataFetcher.extractIdFromUrl('http://swapi.dev/api/vehicles/41/')).toBe('41');
  });
})
