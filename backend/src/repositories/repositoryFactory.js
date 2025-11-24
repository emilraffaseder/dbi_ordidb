import { RelRepository } from "./relRepository.js";
import { MongoRepository } from "./mongoRepository.js";

export function getRepository(db) {
  if (db === "rel") return new RelRepository();
  if (db === "mongo") return new MongoRepository();

  // default fallback
  return new RelRepository();
}
