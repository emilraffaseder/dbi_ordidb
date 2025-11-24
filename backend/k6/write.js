import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const counts = [100, 1000];

  for (const c of counts) {
    const resRel = http.get(`http://localhost:3000/benchmark/write?count=${c}&db=rel`);
    console.log(`Rel Write ${c}: ${resRel.body}`);

    const resMongo = http.get(`http://localhost:3000/benchmark/write?count=${c}&db=mongo`);
    console.log(`Mongo Write ${c}: ${resMongo.body}`);

    sleep(1);
  }
}
