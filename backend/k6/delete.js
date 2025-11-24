import http from "k6/http";

export const options = { vus: 1, iterations: 1 };

export default function () {
  const rel = http.get("http://localhost:3000/benchmark/delete?id=1&db=rel");
  console.log(`REL DELETE: ${rel.body}`);

  const mongo = http.get("http://localhost:3000/benchmark/delete?id=ID_HIER&db=mongo");
  console.log(`MONGO DELETE: ${mongo.body}`);
}
