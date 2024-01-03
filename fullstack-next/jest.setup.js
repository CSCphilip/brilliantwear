import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "./mocks/server";

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Rest any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => {
  // NOTE An error occurs when this is called and all fetch requests are not completed:
  // https://github.com/mswjs/msw/issues/1684
  // The following error is thrown: "TypeError: Cannot read properties of null (reading '_location')"
  server.close();
});
