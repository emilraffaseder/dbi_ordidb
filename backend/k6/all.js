import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
};


export default function () {

  console.log("=== WRITE TESTS ===");

  http.get(
    "http://localhost:3000/benchmark/write?count=100&db=rel",
    { tags: { db: "rel", action: "write" } }
  );

  http.get(
    "http://localhost:3000/benchmark/write?count=100&db=mongo",
    { tags: { db: "mongo", action: "write" } }
  );

  sleep(1);

  console.log("=== READ TESTS ===");

  const tests = ["find1", "find2", "find3", "find4"];
  for (const t of tests) {
    http.get(
      `http://localhost:3000/benchmark/${t}?db=rel`,
      { tags: { db: "rel", action: t } }
    );

    http.get(
      `http://localhost:3000/benchmark/${t}?db=mongo`,
      { tags: { db: "mongo", action: t } }
    );

    sleep(0.5);
  }

  console.log("=== UPDATE ===");

  http.get(
    "http://localhost:3000/benchmark/update?id=1&db=rel",
    { tags: { db: "rel", action: "update" } }
  );

  http.get(
    "http://localhost:3000/benchmark/update?id=ID_HIER&db=mongo",
    { tags: { db: "mongo", action: "update" } }
  );

  sleep(1);

  console.log("=== DELETE ===");

  http.get(
    "http://localhost:3000/benchmark/delete?id=1&db=rel",
    { tags: { db: "rel", action: "delete" } }
  );

  http.get(
    "http://localhost:3000/benchmark/delete?id=ID_HIER&db=mongo",
    { tags: { db: "mongo", action: "delete" } }
  );
}
