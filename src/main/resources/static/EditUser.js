async function editUser(id) {
    fetch("/api/admin/" + id).then(response => response.json()).then(user => {
        $('#idOfEditingUser').val(user.id);
        $('#usernameOfEditingUser').val(user.username);
        $('#passwordOfEditingUser').val(user.password);
        $('#firstNameOfEditingUser').val(user.firstName);
        $('#lastNameOfEditingUser').val(user.lastName);
        $('#ageOfEditingUser').val(user.age);
        fetch("/api/admin/roles").then(response => response.json()).then(allRoles => {
            let optionRoles = $('#rolesOfEditingUser').empty();
            allRoles.forEach(role => {
                let option = new Option(role.name.substring(5));
                option.setAttribute("id", role.name);
                optionRoles.append(option);
            });
            user.roles.forEach(role => document.getElementById(role.name).selected = true);
        });
    });

    $('#confirmEditUser').on('click', function confirmEdit(event) {
        event.preventDefault();
        if (id == document.getElementById("idOfEditingUser").value) {
            let form = document.forms["formOfEditingUser"];
            let editingUser = new FormData(form);
            let checkedRolesArray = [];
            for (let i = 0; i < form.checkedRoles.options.length; i++) {
                if (form.checkedRoles.options[i].selected) {
                    checkedRolesArray.push(form.checkedRoles.options[i].value);
                }
            }
            editingUser.set("checkedRoles", checkedRolesArray.toString());

            fetch("/api/admin/" + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(editingUser))
            }).then(() => {
                $('#closeModalOfEditingUser').click();
                getUsers();
            })
        }
    });
}
