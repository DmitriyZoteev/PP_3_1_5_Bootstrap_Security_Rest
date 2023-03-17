$(async function () {
    await addNewUser();
});

async function addNewUser() {
    fetch("/api/admin/roles").then(response => response.json()).then(allRoles => {
        let optionRoles = $('#rolesOfNewUser').empty();
        allRoles.forEach(role => {
            let option = new Option(role.name.substring(5));
            option.setAttribute("id", role.name);
            optionRoles.append(option);
        });
        document.getElementById("ROLE_USER").selected = true;
    });


    $('#confirmSaveUser').on('click', function confirmSave(event) {
        event.preventDefault();
        let form = document.forms["formOfNewUser"];
        let newUser = new FormData(form);
        let checkedRolesArray = [];
        for (let i = 0; i < form.checkedRoles.options.length; i++) {
            if (form.checkedRoles.options[i].selected) {
                checkedRolesArray.push(form.checkedRoles.options[i].value);
            }
        }
        newUser.set("checkedRoles", checkedRolesArray.toString());

        fetch("/api/admin/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(newUser))
        }).then(() => {
            form.reset();
            document.getElementById("ROLE_USER").selected = true;
            $('#allUsers-tab').click();
            getUsers();
        })
    });
}
