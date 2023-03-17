$(async function () {
    await getUsers();
});

async function getUsers() {
    let table = $('#allUsersTable');
    fetch("/api/admin").then(response => response.json()).then(users => {
        table.empty();
        users.forEach(user => {
            let roles = '';
            if (user.roles != null) {
                roles = user.roles.map(role => '&nbsp;' + role.name.substring(5));
            }
            let allUsersTableTr = `$(
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.username}</td>
                        <td>${roles}</td>
                        <td>
                            <a class="btn btn-info btn-sm editButton" data-bs-toggle="modal"
                                onclick="editUser(${user.id})" 
                                data-bs-target="#editUserModal">Изменить</a>
                        </td>
                        <td>
                            <a class="btn btn-danger btn-sm deleteButton" data-bs-toggle="modal"
                            onclick="deleteUser(${user.id})"
                            data-bs-target="#deleteUserModal">Удалить</a>
                        </td>
                    </tr>
                )`;
            table.append(allUsersTableTr);
        })
    })
}

