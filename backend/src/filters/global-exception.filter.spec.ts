import { GlobalExceptionFilter } from "./global-exception.filter";

describe('GlobalExceptionFilter', () => {
  test('should be defined',() => {
    const filter = new GlobalExceptionFilter();

    expect(filter).toBeDefined();
  });
});