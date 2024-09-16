const amount = document.querySelector("#amount");
const description = document.querySelector("#description");
const category = document.querySelector("#category");
const ulItems = document.querySelector("#item-list"); // Ensure this matches the id in your HTML
const form = document.querySelector("#form");
const buyButton = document.querySelector("#rzp-btn1");
const buyText = document.querySelector("#premium-p");

const leaderBoard = document.querySelector("#leader-board");

const api = "http://localhost:3000/expense";

async function onSubmit(e) {
  e.preventDefault();

  const expDets = {
    amount: amount.value,
    description: description.value,
    category: category.value,
  };
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(`${api}/addExpense`, expDets, {
      headers: { Authorization: token },
    });

    // Add the newly added expense to the list
    li(response.data.expense);

    // Clear input fields
    amount.value = '';
    description.value = '';
    category.value = '';
  } catch (error) {
    console.error("Error adding expense:", error);
  }
}

function delButton(obj) {
  const delBtn = document.createElement("button");
  delBtn.className = "btn btn-danger btn-sm"; // Bootstrap classes for styling
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", (e) => deleteBtn(e, obj));

  async function deleteBtn(e, obj) {
    const token = localStorage.getItem("token");

    let li = e.target.parentElement;
    try {
      await axios.delete(`${api}/deleteExpense/${obj.id}`, {
        headers: { Authorization: token },
      });
      if (ulItems) {
        ulItems.removeChild(li);
      } else {
        console.error("ulItems element not found");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }

  return delBtn;
}

function li(obj) {
  if (!ulItems) {
    console.error("ulItems element not found");
    return;
  }

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center"; // Bootstrap classes for list items and layout

  // Create a div for expense details
  const expenseDetails = document.createElement("div");
  expenseDetails.textContent = `${obj.amount} - ${obj.description} (${obj.category})`;
  li.appendChild(expenseDetails);

  // Create and append the delete button
  const delBtn = delButton(obj);
  li.appendChild(delBtn);

  ulItems.appendChild(li);
}

form.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${api}/getExpenses`, {
      headers: { Authorization: token },
    });

    if (response.data.expenses.length !== 0) {
      for (let i = 0; i < response.data.expenses.length; i++) {
        li(response.data.expenses[i]);
      }
    }

    if (response.data.userDetails.ispremiumuser) {
      buyButton.style.display = "none";
      buyText.style.display = "";
      buyText.innerHTML = "You are a premium user now";
    }
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
});

document.getElementById("rzp-btn1").onclick = async function (e) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      "http://localhost:3000/purchase/premiummembership",
      { headers: { Authorization: token } }
    );

    var options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (response) {
        try {
          await axios.post(
            "http://localhost:3000/purchase/updatetransactionstatus",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            { headers: { Authorization: token } }
          );
          alert("You are a Premium User Now");
          if (response.status === 203) {
            buyButton.style.display = "none";
            buyText.innerHTML = "You are a premium user now";
            location.reload();
          }
        } catch (error) {
          console.error("Error updating transaction status:", error);
        }
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on("payment.failed", function (response) {
      alert("Something went wrong");
    });
  } catch (error) {
    console.error("Error initiating premium membership:", error);
  }
};

leaderBoard.addEventListener("click", async () => {
  try {
    const responses = await axios.get(
      "http://localhost:3000/premium/showLeaderBoard"
    );
    var div = document.getElementById("leader-board-list");
    var boardList = document.getElementById("board-list");

    // Check if the 'div' exists before clearing its contents
    if (div) {
      // Clear the leaderboard before appending new data
      div.innerHTML = "";
    } else {
      console.error("Element with id 'leader-board-list' not found");
      return;  // Exit if the element is not found
    }

    // Check if board-list exists before manipulating its style
    if (boardList) {
      boardList.style.display = "block";
    } else {
      console.error("Element with id 'board-list' not found");
    }

    if (responses.data.results.length > 0) {
      for (let i = 0; i < responses.data.results.length; i++) {
        const li = document.createElement("li");
        li.className = "list-group-item"; // Bootstrap class for list items
        li.textContent = `Name- ${responses.data.results[i].name} Total Expense  ${responses.data.results[i].totalExpense}`;

        div.appendChild(li);
      }
    }
  } catch (error) {
    console.error("Error fetching leader board:", error);
  }
});
