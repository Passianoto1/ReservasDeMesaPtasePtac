const request = require("supertest");
const app = require("../app");

const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

test("Resetar tabela de usuários", async () => {
  await client.usuario.deleteMany();
  expect(true).toBe(true);
});

let tokenCliente;
let tokenAdmin;

test("Cadastrar cliente", async () => {
  const res = await request(app)
    .post("/usuarios/cadastro")
    .send({
      nome: "Cliente Teste",
      email: "cliente@example.com",
      password: "123456",
    });

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("Exito ao cadastrar!");
  expect(res.body.erro).toBe(false);
});

test("Cadastrar admin", async () => {
  const res = await request(app)
    .post("/usuarios/cadastro")
    .send({
      nome: "Admin Teste",
      email: "admin@example.com",
      password: "admin123",
      tipo: "admin",
    });

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("Exito ao cadastrar!");
  expect(res.body.erro).toBe(false);
});

test("Login cliente com sucesso", async () => {
  const res = await request(app)
    .post("/usuarios/login")
    .send({
      email: "cliente@example.com",
      password: "123456",
    });

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("Autenticado!");
  expect(res.body.erro).toBe(false);
  expect(res.body.token).toBeDefined();  
  tokenCliente = res.body.token;
});

test("Login admin com sucesso", async () => {
  const res = await request(app)
    .post("/usuarios/login")
    .send({
      email: "admin@example.com",
      password: "admin123",
    });

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("Autenticado!");
  expect(res.body.erro).toBe(false);
  expect(res.body.token).toBeDefined();  
  tokenAdmin = res.body.token;
});

test("Login falha com senha errada", async () => {
  const res = await request(app)
    .post("/usuarios/login")
    .send({
      email: "cliente@example.com",
      password: "senhaErrada",
    });

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("Senha Incorreta");
  expect(res.body.erro).toBe(true);
});

test("Acesso admin sem token deve falhar", async () => {
  const res = await request(app).get("/usuarios/areaAdmin");
  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("token não encontrado");
  expect(res.body.erro).toBe(true);
});

test("Acesso admin com token de cliente deve negar", async () => {
  const res = await request(app)
    .get("/usuarios/areaAdmin")
    .set("Authorization", `Bearer ${tokenCliente}`);

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("Acesso negado, você não é um administrador");
  expect(res.body.erro).toBe(true);
});

test("Acesso admin com token de admin deve permitir", async () => {
  const res = await request(app)
    .get("/usuarios/areaAdmin")
    .set("Authorization", `Bearer ${tokenAdmin}`);

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("Você é um Admin");
  expect(res.body.erro).toBe(false);
});
