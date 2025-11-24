import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  console.log("=== WRITE TESTS ===");
  http.get("http://localhost:3000/benchmark/write?count=100&db=rel");
  http.get("http://localhost:3000/benchmark/write?count=100&db=mongo");

  sleep(1);

  console.log("=== READ TESTS ===");
  const tests = ["find1", "find2", "find3", "find4"];
  for (const t of tests) {
    http.get(`http://localhost:3000/benchmark/${t}?db=rel`);
    http.get(`http://localhost:3000/benchmark/${t}?db=mongo`);
    sleep(0.5);
  }

  console.log("=== UPDATE ===");
  http.get("http://localhost:3000/benchmark/update?id=1&db=rel");
  http.get("http://localhost:3000/benchmark/update?id=ID_HIER&db=mongo");

  sleep(1);

  console.log("=== DELETE ===");
  http.get("http://localhost:3000/benchmark/delete?id=1&db=rel");
  http.get("http://localhost:3000/benchmark/delete?id=ID_HIER&db=mongo");
}
