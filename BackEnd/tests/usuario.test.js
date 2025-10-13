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
  expect(res.body.token).toBeDefined();  // agora o cadastro retorna o token
  tokenCliente = res.body.token;         // já guardamos o token
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
  expect(res.body.token).toBeDefined();  // idem aqui
  tokenAdmin = res.body.token;
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
  tokenCliente = res.body.token;  // atualiza o token se quiser
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

test("Acesso ao perfil sem token deve falhar", async () => {
  const res = await request(app).get("/usuarios/perfil");

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("token não encontrado");
  expect(res.body.erro).toBe(true);
});

test("Acesso ao perfil com token de cliente deve retornar dados corretos", async () => {
  const res = await request(app)
    .get("/usuarios/perfil")
    .set("Authorization", `Bearer ${tokenCliente}`);

  expect(res.status).toBe(200);
  expect(res.body.erro).toBe(false);
  expect(res.body.mensagem).toBe("Usuario encontrado com Exito");
  expect(res.body.usuario).toBeDefined();
  expect(res.body.usuario.nome).toBe("Cliente Teste");
  expect(res.body.usuario.email).toBe("cliente@example.com");
  expect(res.body.usuario.tipo).toBe("cliente");
});

test("Acesso ao perfil com token de admin deve retornar dados corretos", async () => {
  const res = await request(app)
    .get("/usuarios/perfil")
    .set("Authorization", `Bearer ${tokenAdmin}`);

  expect(res.status).toBe(200);
  expect(res.body.erro).toBe(false);
  expect(res.body.mensagem).toBe("Usuario encontrado com Exito");
  expect(res.body.usuario).toBeDefined();
  expect(res.body.usuario.nome).toBe("Admin Teste");
  expect(res.body.usuario.email).toBe("admin@example.com");
  expect(res.body.usuario.tipo).toBe("admin");
});

test("Atualizar perfil do cliente com sucesso", async () => {
  const res = await request(app)
    .patch("/usuarios/perfil")
    .set("Authorization", `Bearer ${tokenCliente}`)
    .send({
      nome: "Cliente Atualizado",
      email: "clienteatualizado@example.com",
    });

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("Perfil atualizado com sucesso!");
  expect(res.body.erro).toBe(false);
  expect(res.body.usuario).toBeDefined();
  expect(res.body.usuario.nome).toBe("Cliente Atualizado");
  expect(res.body.usuario.email).toBe("clienteatualizado@example.com");
  expect(res.body.usuario.tipo).toBe("cliente");
});

test("Atualizar perfil sem token deve falhar", async () => {
  const res = await request(app)
    .patch("/usuarios/perfil")
    .send({
      nome: "Tentativa sem token",
      email: "naoimporta@example.com",
    });

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("token não encontrado");
  expect(res.body.erro).toBe(true);
});

test("Atualizar perfil de admin com sucesso", async () => {
  const res = await request(app)
    .patch("/usuarios/perfil")
    .set("Authorization", `Bearer ${tokenAdmin}`)
    .send({
      nome: "Admin Atualizado",
      email: "adminatualizado@example.com",
    });

  expect(res.status).toBe(200);
  expect(res.body.mensagem).toBe("Perfil atualizado com sucesso!");
  expect(res.body.erro).toBe(false);
  expect(res.body.usuario.nome).toBe("Admin Atualizado");
  expect(res.body.usuario.email).toBe("adminatualizado@example.com");
  expect(res.body.usuario.tipo).toBe("admin");
});
