function submitForm() {
    document.getElementById("formSize").submit();
  }

  function submitFormModal() {
    document.getElementById("form-select-food").submit();
}

function deleteItem(idItem, nameItem, queryID, query) {
    let deleteModal = document.getElementById('deleteModal');
    let confirmDeleteButton = document.getElementById('confirmDelete');
    let cancelDeleteButton = document.getElementById('cancelDelete');

    deleteModal.style.display = 'block';
    confirmDeleteButton.addEventListener('click', () => {
        const origin = location.origin;
        $.ajax({
            url: `${origin}/admin/delete${nameItem}/${idItem}?${queryID}=${query}`,
            method: 'GET',
            success: function (response) {
                $(`#${nameItem}-${idItem}`).remove();
                location.reload();
            }
        })
    });

    cancelDeleteButton.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });
}

function changeStatus(idItem, nameItem) {
    let status = document.getElementById(`status-${nameItem}-${idItem}`).value;
    const origin = location.origin;
    $.ajax({
        url: `${origin}/admin/changeStatus/${idItem}`,
        method: 'POST',
        data: {status: status},
        success: function (response) {
            $(`#status-${nameItem}-${idItem}`).value = status;
        }
    })
}

function changeOrder(idItem) {
    let table = document.getElementById(`order-table-${idItem}`).value;
    const origin = location.origin;
    $.ajax({
        url: `${origin}/admin/changeOrder/${idItem}`,
        method: 'POST',
        data: {table: table},
        success: function (response) {
            // $(`#status-table-${idItem}`).value = response.tableName;
            location.reload();
        }
    })
}

function changeQuantity(nameCal, idSubOrder) {
    let quantityFood = +document.getElementById(`food-qty-${idSubOrder}`).value;
    if (nameCal === 'add') {
        quantityFood  += 1
    } else {
        if (quantityFood !== 0) {
            quantityFood  -= 1
        }
    }
    document.getElementById(`food-qty-${idSubOrder}`).value = quantityFood;
}

function saveSubOrder(idSubOrder) {
    let quantity = +document.getElementById(`food-qty-${idSubOrder}`).value;
    console.log(quantity);
    const origin = location.origin;
    $.ajax({
        url: `${origin}/admin/saveSubOrder/${idSubOrder}`,
        method: 'GET',
        data: {quantity},
        success: function (response) {
            location.reload()
        }
    })
}

function selectFood() {
    let selectFoodModal = document.getElementById('selectFoodModal');
    let cancelSelectButton = document.getElementById('cancelSelect');

    let selectFood = document.getElementById("food");

    const origin = location.origin;
    $.ajax({
        url: `${origin}/admin/selectFood`,
        method: 'GET',
        success: function (response) {
            let foods = response.data.foods
            foods.forEach((item, index)=> {
                let option = document.createElement("option");
                option.value = item._id;
                option.textContent = item.name;
                if (index == 0) {
                    option.selected = true
                }
                selectFood.appendChild(option);
            })
        }
    })
    selectFoodModal.style.display = 'block';

    cancelSelectButton.addEventListener('click', () => {
        selectFoodModal.style.display = 'none';
    });
}


function pay(orderID) {
    let totalMoney = +document.getElementById('total-bill').value;
    const origin = location.origin;
    $.ajax({
        url: `${origin}/admin/createBill/${orderID}`,
        method: 'GET',
        data: {totalMoney},
        success: function (response) {
            location.reload()
        }
    })
}
