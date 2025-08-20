const API_URL = "/api/carros/";
const carForm = document.getElementById("carForm");
const carList = document.getElementById("carList");

async function loadCar () {
  const res = await fetch(API_URL);
  const cars = await res.json();
  
  carList.innerHTML = "";
  cars.forEach(car => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${car.modelo}</strong> - ${car.marca} (${car.ano})
      </div>
      <div class="actions">
        <button onclick="editCar(${car.id})">✏️ Editar</button>
        <button onclick="deleteCAr(${car.id})">🗑 Excluir</button>
      </div>
    `;
    carList.appendChild(li);
  });
}


carForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const modelo = document.getElementById("modelo").value;
  const marca = document.getElementById("marca").value;
  const ano = document.getElementById("ano").value;
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modelo, marca, ano })
  });

  carForm.reset();
  loadCar();
});

/* // 📌 Excluir tarefa
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadCar();
}

// 📌 Editar tarefa
async function editTask(id) {
  const newTitle = prompt("Novo título:");
  const newDescription = prompt("Nova descrição:");

  if (newTitle && newDescription) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDescription })
    });
    loadCar();
  }
} */

// Inicializa
loadCar();
