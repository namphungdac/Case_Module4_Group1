function submitForm() {
    document.getElementById("formSize").submit();
  }

function deleteItem(idItem, nameItem) {
    let deleteModal = document.getElementById('deleteModal');
    let confirmDeleteButton = document.getElementById('confirmDelete');
    let cancelDeleteButton = document.getElementById('cancelDelete');

    deleteModal.style.display = 'block';
    confirmDeleteButton.addEventListener('click', () => {
        const origin = location.origin;
        $.ajax({
            url: `${origin}/admin/delete${nameItem}/${idItem}`,
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