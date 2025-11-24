import http from "k6/http";

export const options = { vus: 1, iterations: 1 };

const endpoints = ["find1", "find2", "find3", "find4"];

export default function () {
  for (const ep of endpoints) {
    const rel = http.get(`http://localhost:3000/benchmark/${ep}?db=rel`);
    console.log(`REL ${ep}: ${rel.body}`);

    const mongo = http.get(`http://localhost:3000/benchmark/${ep}?db=mongo`);
    console.log(`MONGO ${ep}: ${mongo.body}`);
  }
}
