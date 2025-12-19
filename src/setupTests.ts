import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { mockUserFetchResponse } from "../tests/helper/mockResponse";

export const restHandlers = [
  http.get("*/users", () => {
    return HttpResponse.json(mockUserFetchResponse, { status: 200 });
  }),

  http.post("*/users", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(body, { status: 201 });
  }),

  http.delete("*/users/:id", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.put("*/users", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(body, { status: 200 });
  }),

  http.options("*", () => {
    return new HttpResponse(null, { status: 200 });
  }),
];

export const server = setupServer(...restHandlers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
  })
);

afterEach(() => server.resetHandlers());
afterAll(() => server.close());
