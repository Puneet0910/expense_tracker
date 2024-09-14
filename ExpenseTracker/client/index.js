async function addExpense(event) {
    event.preventDefault();
    const expenseDetails = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value
    };

    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You are not logged in. Please log in to add expenses.');
        window.location.href = 'login.html'; // Redirect to login page
        return;
    }

    try {
        // Add the token to the headers
        const response = await axios.post(`http://localhost:4000/expense/addExpense`, expenseDetails, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        alert(response.data.message);
        event.target.reset();
        displayExpense(response.data.expense);
    } catch (error) {
        console.log(error);
        alert('Failed to add expense. Please try again later.');
    }
}



function displayExpense(expense) {
    // Get the expense list container
    const expenseList = document.getElementById('expenseList');
    expenseList.style.listStyleType = 'none';

    // Create a list item for the expense
    const expenseItem = document.createElement('li');
    expenseItem.className = 'list-group-item d-flex justify-content-between align-items-center mb-2'; // Bootstrap classes for styling and spacing

    // Create text element for the expense details
    const expenseText = document.createElement('span');
    expenseText.innerText = `${expense.amount} - ${expense.description} - ${expense.category}`;
    expenseItem.appendChild(expenseText);

    // Create the delete button with Bootstrap classes
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm'; // Bootstrap classes for styling the button
    deleteBtn.innerText = 'Delete';

    deleteBtn.addEventListener('click', async () => {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You are not logged in. Please log in to delete expenses.');
            window.location.href = 'login.html'; // Redirect to login page
            return;
        }

        try {
            // Send a delete request with the JWT token in the headers
            const response = await axios.delete(`http://localhost:4000/expense/deleteExpense/${expense.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert(response.data.message);
            expenseList.removeChild(expenseItem);
        } catch (error) {
            console.log(error);
            alert('Failed to delete expense. Please try again later.');
        }
    });

    expenseItem.appendChild(deleteBtn);
    expenseList.appendChild(expenseItem);
}

const buyPremium = document.getElementById('premium');
buyPremium.addEventListener('click', async(event)=>{
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:4000/purchase/premiummembership', {
        headers: { "Authorization": `Bearer ${token}` }
    });
    
    console.log(response);
    console.log("I am here")
    var options = 
    {
        "key": response.data.key_id, //Enter the key id generated from the Dashboard
        "order_id": response.data.order.id, //For one time payment
        //This handler function will handle the success payment 
        "handler": async function (response) {
            await axios.post('http://localhost:4000/purchase/updateTransactionStatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: {"Authorization" : `Bearer ${token}`}})

            alert('You are a Premium User now')
        },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    event.preventDefault();

    rzp1.on('payment.failed', function (response){
        console.log(response);
        alert('Something went wrong')
    })
    
})

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You are not logged in. Please log in to continue.');
        window.location.href = 'login.html'; // Redirect to login page
        return;
    }

    try {
        // Example of making an authenticated request with the token
        const response = await axios.get('http://localhost:4000/expense/getExpense', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (Array.isArray(response.data)) {
            response.data.forEach(element => {
                displayExpense(element);
            });
        } else {
            console.error('Unexpected response format:', response.data);
        }
    } catch (error) {
        console.error('Error fetching expenses:', error);
        alert('Failed to fetch expenses. Please try again later.');
    }
});
