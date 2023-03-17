async function deleteUser(id) {
    fetch("/api/admin/" + id).then(response => response.json()).then(user => {
        $('#idOfDeletingUser').val(user.id);
        $('#usernameOfDeletingUser').val(user.username);
        $('#firstNameOfDeletingUser').val(user.firstName);
        $('#lastNameOfDeletingUser').val(user.lastName);
        $('#ageOfDeletingUser').val(user.age);
        let optionRoles = $('#rolesOfDeletingUser').empty();
        user.roles.forEach(role => optionRoles.append(new Option(role.name.substring(5))))
    });

    $('#confirmDeleteUser').on('click', function confirmDelete(event) {
        event.preventDefault();
        if (id == document.getElementById("idOfDeletingUser").value) {
            fetch("/api/admin/" + id, {method: 'DELETE'}).then(() => {
                $('#closeModalOfDeletingUser').click();
                getUsers();
            })
        }
    });
}
