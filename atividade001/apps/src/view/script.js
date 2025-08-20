const API_CARROS = "/api/carros/";
const API_PESSOAS = "/api/pessoas/";
const API_PESSOA_CARRO = "/api/carros-pessoas/";

const sections = document.querySelectorAll(".form-section");
const navButtons = document.querySelectorAll("header nav button");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    sections.forEach(sec => sec.classList.add("hidden"));
    document.getElementById(target).classList.remove("hidden");
  });
});


const carForm = document.getElementById("carForm");
const carList = document.getElementById("carList");
const selectCarro = document.getElementById("selectCarro");

async function loadCarros() {
  const res = await fetch(API_CARROS);
  const cars = await res.json();
  carList.innerHTML = "";
  selectCarro.innerHTML = "";

  cars.forEach(car => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div><strong>${car.modelo}</strong> - ${car.marca} (${car.ano})</div>
      <div class="actions">
        <button onclick="editCar(${car.id})">✏️</button>
        <button onclick="deleteCar(${car.id})">🗑</button>
      </div>
    `;
    carList.appendChild(li);

    const option = document.createElement("option");
    option.value = car.id;
    option.textContent = car.modelo;
    selectCarro.appendChild(option);
  });
}

carForm.addEventListener("submit", async e => {
  e.preventDefault();
  const modelo = document.getElementById("modelo").value;
  const marca = document.getElementById("marca").value;
  const ano = document.getElementById("ano").value;

  await fetch(API_CARROS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modelo, marca, ano })
  });

  carForm.reset();
  loadCarros();
});


async function deleteCar(id) {
  await fetch(API_CARROS + id, { method: "DELETE" });
  loadCarros();
}

async function editCar(id) {
  const car = await (await fetch(API_CARROS + id)).json();
  const modelo = prompt("Modelo:", car.modelo);
  const marca = prompt("Marca:", car.marca);
  const ano = prompt("Ano:", car.ano);
  if (modelo && marca && ano) {
    await fetch(API_CARROS + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelo, marca, ano })
    });
    loadCarros();
  }
}

const pessoaForm = document.getElementById("pessoaForm");
const pessoaList = document.getElementById("pessoaList");
const selectPessoa = document.getElementById("selectPessoa");

async function loadPessoas() {
  const res = await fetch(API_PESSOAS);
  const pessoas = await res.json();

  pessoaList.innerHTML = "";
  selectPessoa.innerHTML = "";

  pessoas.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>${p.nome} (${p.email})</div>
      <div class="actions">
        <button onclick="editPessoa(${p.id})">✏️</button>
        <button onclick="deletePessoa(${p.id})">🗑</button>
      </div>
    `;
    pessoaList.appendChild(li);

    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.nome;
    selectPessoa.appendChild(option);
  });
}

pessoaForm.addEventListener("submit", async e => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  await fetch(API_PESSOAS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email })
  });

  pessoaForm.reset();
  loadPessoas();
});


async function deletePessoa(id) {
  await fetch(API_PESSOAS + id, { method: "DELETE" });
  loadPessoas();
}

async function editPessoa(id) {
  const pessoa = await (await fetch(API_PESSOAS + id)).json();
  const nome = prompt("Nome:", pessoa.nome);
  const email = prompt("Email:", pessoa.email);
  if (nome && email) {
    await fetch(API_PESSOAS + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email })
    });
    loadPessoas();
  }
}


const pessoaCarroForm = document.getElementById("pessoaCarroForm");
const pessoaCarroList = document.getElementById("pessoaCarroList");

async function loadPessoaCarros() {
  const res = await fetch(API_PESSOA_CARRO);
  const relacoes = await res.json();
  pessoaCarroList.innerHTML = "";
  relacoes.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>${r.pessoa.nome} → ${r.carro.modelo}</div>
      <div class="actions">
        <button onclick="deletePessoaCarro(${r.id})">🗑</button>
      </div>
    `;
    pessoaCarroList.appendChild(li);
  });
}

pessoaCarroForm.addEventListener("submit", async e => {
  e.preventDefault();
  const pessoaId = selectPessoa.value;
  const carroId = selectCarro.value;

  await fetch(API_PESSOA_CARRO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pessoaId, carroId })
  });

  pessoaCarroForm.reset();
  loadPessoaCarros();
});

async function deletePessoaCarro(id) {
  await fetch(API_PESSOA_CARRO + id, { method: "DELETE" });
  loadPessoaCarros();
}

loadCarros();
loadPessoas();
loadPessoaCarros();
