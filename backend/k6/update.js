import http from "k6/http";

export const options = { vus: 1, iterations: 1 };

export default function () {
  const resRel = http.get("http://localhost:3000/benchmark/update?id=1&db=rel");
  console.log(`REL UPDATE: ${resRel.body}`);

  const resMongo = http.get("http://localhost:3000/benchmark/update?id=ID_HIER&db=mongo");
  console.log(`MONGO UPDATE: ${resMongo.body}`);
}
