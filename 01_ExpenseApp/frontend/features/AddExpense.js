let editElement = null;
let editId = null;
async function addExpense(event) {
    event.preventDefault();
    const expenseInfo = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value,
    }
    try {
        const response = await axios.post("http://localhost:4000/addExpense", expenseInfo);
        console.log(response.data);
        
        alert("Expense Details Addes Successfully");
        displayExpenses(response.data);
        event.target.reset();
    } catch (error) {
        console.log(error);
    };
};

function displayExpenses(expenseInfo){
    const expenses = document.querySelector("ul");
    const expenseList = document.createElement("li");
    expenseList.appendChild(document.createTextNode(`
    ${expenseInfo.amount}-${expenseInfo.description}-${expenseInfo.category}`));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = ("Delete");

    expenses.appendChild(expenseList);
    expenseList.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", ()=>deleteExpense(expenseInfo.id, expenseList));
}

async function deleteExpense(id, expenseList){
    try {
        await axios.delete(`http://localhost:4000/delete/${id}`);
        expenseList.remove();
        alert("Expense Removed Successfully");
    } catch (error) {
        console.log(error);
        
    }
};

document.addEventListener("DOMContentLoaded", async()=>{
    try {
        const response = await axios.get('http://localhost:4000/getExpense');
        response.data.forEach(expense =>{
            displayExpenses(expense);
        })
    } catch (error) {
        console.log(error);
        
    }
})