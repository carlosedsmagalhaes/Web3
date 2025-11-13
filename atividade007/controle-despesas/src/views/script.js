async function fetchExpenses() {
  try {
    const response = await fetch("/api/expenses");
    const expenses = await response.json();

    const list = document.getElementById("expense-list");
    list.innerHTML = "";

    expenses.forEach(exp => {
      const li = document.createElement("li");
      li.classList.add("expense-item");

      li.innerHTML = `
        <span>
          <strong>${exp.description}</strong> — 
          R$ ${Number(exp.amount).toFixed(2)} — 
          ${new Date(exp.date).toLocaleDateString("pt-BR")}
        </span>

        <span>
          <button class="edit-btn" onclick="editExpense('${exp._id}')">Alterar</button>
          <button class="delete-btn" onclick="deleteExpense('${exp._id}')">Excluir</button>
        </span>
      `;

      list.appendChild(li);
    });

  } catch (error) {
    console.error("Erro ao buscar despesas:", error);
  }
}

async function fetchTotalExpenses() {
  try {
    const response = await fetch("/api/expenses/total");
    const data = await response.json();

    document.getElementById("total").innerText =
      `Total das despesas: R$ ${Number(data.totalAmount).toFixed(2)}`;

  } catch (error) {
    console.error("Erro ao buscar total de despesas", error);
  }
}

document.getElementById("expense-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = Number(document.getElementById("amount").value);
  const date = document.getElementById("date").value || new Date().toISOString();

  if (!description || !amount || amount < 0) {
    alert("Preencha os campos corretamente!");
    return;
  }
  console.log(description)
    console.log(amount)
    console.log(date)
  try {
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, amount, date })
    });

    e.target.reset();
    fetchExpenses();
    fetchTotalExpenses();

  } catch (error) {
    console.error("Erro ao cadastrar despesa", error);
  }
});

async function editExpense(id) {
  const description = prompt("Nova descrição:");
  const amount = prompt("Novo valor:");
  const date = prompt("Nova data (aaaa-mm-dd):");

  if (!description || !amount) return;

  try {
    await fetch(`/api/expenses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        amount: Number(amount),
        date: date || new Date().toISOString()
      })
    });

    fetchExpenses();
    fetchTotalExpenses();

  } catch (error) {
    console.error("Erro ao editar despesa", error);
  }
}

async function deleteExpense(id) {
  if (!confirm("Deseja realmente excluir esta despesa?")) return;

  try {
    await fetch(`/api/expenses/${id}`, {
      method: "DELETE"
    });

    fetchExpenses();
    fetchTotalExpenses();

  } catch (error) {
    console.error("Erro ao deletar despesa", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchExpenses();
  fetchTotalExpenses();
});
