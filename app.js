const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1;

addOrderBtn.addEventListener('click', () => {
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order);
    processOrder(order);
});

function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    orderList.appendChild(listItem);
}

function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `Pedido #${order.id}: ${status}`;
        listItem.style.color = status === 'Completado' ? 'green' : 'orange';
    }
}

async function processOrder(order) {
    try {
        const preparationTime = Math.floor(Math.random() * 6000) + 2000;
        
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, preparationTime);
        });
        
        order.status = 'Completado';
        updateOrderStatus(order, order.status);
        
        console.log(`Pedido #${order.id} completado después de ${preparationTime/1000} segundos`);
    } catch (error) {
        console.error(`Error procesando pedido #${order.id}:`, error);
        updateOrderStatus(order, 'Error');
    }
}