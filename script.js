function changeQuantity(itemName, change) {
    const quantityElement = document.getElementById('quantity-' + itemName);
    let quantity = parseInt(quantityElement.textContent);

    quantity += change;

    // Prevent quantity from going below 0
    if (quantity < 0) {
        quantity = 0;
    }

    quantityElement.textContent = quantity;
}

const prices = {
    "Dumplings": 10,    // Price per item
    "Hot pot": 15,
    "Asian Lettuce wrap": 8,
    "Chicken chow mein": 12,
    "Veg-fried rice": 7,
    "Spring roll": 5
};

let orderItems = {};

function changeQuantity(itemName, change) {
    // Update the quantity of the item
    if (!orderItems[itemName]) {
        orderItems[itemName] = { quantity: 0, total: 0 };
    }

    orderItems[itemName].quantity += change;

    // Prevent negative quantities
    if (orderItems[itemName].quantity < 0) {
        orderItems[itemName].quantity = 0;
    }

    orderItems[itemName].total = orderItems[itemName].quantity * prices[itemName];

    // Update the display in the menu
    document.getElementById(`quantity-${itemName}`).innerText = orderItems[itemName].quantity;

    // Update the order summary table
    updateOrderSummary();
}

function updateOrderSummary() {
    const orderTableBody = document.getElementById('order-items');
    orderTableBody.innerHTML = '';  // Clear existing rows

    let serialNo = 1;
    for (const itemName in orderItems) {
        const item = orderItems[itemName];
        if (item.quantity > 0) {
            const row = document.createElement('tr');

            row.innerHTML = `
        <td>${serialNo}</td>
        <td>${itemName}</td>
        <td>${item.quantity}</td>
        <td>$${item.total}</td>
        <td>
            <select>
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
            </select>
        </td>
        <td>
            <button onclick="removeItem('${itemName}')">Remove</button>
        </td>
    `;
            orderTableBody.appendChild(row);
            serialNo++;
        }
    }
}

function removeItem(itemName) {
    // Reset quantity and total for the item
    orderItems[itemName].quantity = 0;
    orderItems[itemName].total = 0;

    // Update the display in the menu
    document.getElementById(`quantity-${itemName}`).innerText = 0;

    // Update the order summary table
    updateOrderSummary();
}

function placeOrder() {
    const orderDetails = [];
    const rows = document.getElementById('order-items').children;

    for (let row of rows) {
        const itemName = row.children[1].innerText;
        const quantity = parseInt(row.children[2].innerText);
        const total = parseFloat(row.children[3].innerText.replace('$', ''));
        const deliveryOption = row.children[4].children[0].value;

        orderDetails.push({
            itemName,
            quantity,
            total,
            deliveryOption
        });
    }

    console.log('Order placed:', orderDetails);
    alert('Your order has been placed successfully!');
}
document.getElementById('reservation-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const specialRequests = document.getElementById('special-requests').value;

    // Create a reservation object
    const reservationDetails = {
        name,
        contact,
        guests,
        date,
        time,
        specialRequests
    };

    // Simulate reservation (you can send this data to a server here)
    console.log('Reservation Details:', reservationDetails);

    // Show success message
    alert('Your reservation has been successfully made!');

    // Optionally, reset the form
    document.getElementById('reservation-form').reset();
});
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate form submission (you can send this data to a backend here)
    const contactDetails = {
        name,
        email,
        message
    };

    console.log('Message Sent:', contactDetails);

    // Show success message
    alert('Your message has been sent! We will get back to you shortly.');

    // Reset the form
    document.getElementById('contact-form').reset();
});

