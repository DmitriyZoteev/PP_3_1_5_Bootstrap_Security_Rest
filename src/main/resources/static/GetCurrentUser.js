$(async function () {
    await getCurrentUser();
});

async function getCurrentUser() {
    let table = $('#currentUserTable');
    fetch("/api/user/currentUser").then(response => response.json()).then(user => {
        $('#currentUser').append(user.username);
        $('#withRoles').append("&nbsp;with roles:&nbsp;");
        let roles = '';
        if (user.roles != null) {
            roles = user.roles.map(role => role.name.substring(5) + "&nbsp;");
        }
        $('#currentUserRoles').append(roles);
        let userTr = `$(
                <tr> 
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${roles}</td>
                </tr>    
                )`;
        table.append(userTr);
    })
}