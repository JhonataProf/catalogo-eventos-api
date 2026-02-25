import merge from "deepmerge";
import path from "path";
import YAML from "yamljs";

const swaggerPath = (...segments: string[]) =>
  path.resolve(__dirname, "..", "docs", "swagger", ...segments);

export function loadSwaggerDocument() {
  // carrega os fragmentos
  const base = YAML.load(swaggerPath("base.yaml"));
  const auth = YAML.load(swaggerPath("auth.yaml"));
  const users = YAML.load(swaggerPath("users.yaml"));
  const pontoTuristico = YAML.load(swaggerPath("ponto-turistico.yaml"));
  const cidades = YAML.load(swaggerPath("cidades.yaml"));
  // futuramente:
  // const pratos = YAML.load(swaggerPath("pratos.yaml"));
  // const pedidos = YAML.load(swaggerPath("pedidos.yaml"));

  // merge profundo, respeitando paths e components
  const doc = merge.all([
    base,
    auth,
    users,
    pontoTuristico,
    cidades,
    // pratos,
    // pedidos,
  ]);

  return doc;
}
