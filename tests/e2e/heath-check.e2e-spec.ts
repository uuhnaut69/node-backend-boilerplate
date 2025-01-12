import { beforeAll, describe, it } from "@jest/globals";
import request from "supertest";

describe("Health Check", () => {
  beforeAll(async () => {
    await import("../../src/index");
  });

  it("should return 200 when readiness", () =>
    request("http://localhost:3000").get("/health/readiness").expect(200));

  it("should return 200 when liveness", () =>
    request("http://localhost:3000").get("/health/liveness").expect(200));
});
