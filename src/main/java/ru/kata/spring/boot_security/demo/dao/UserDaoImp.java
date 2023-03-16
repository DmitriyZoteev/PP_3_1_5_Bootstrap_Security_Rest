package ru.kata.spring.boot_security.demo.dao;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDaoImp implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    private final RoleService roleService;

    public UserDaoImp(RoleService roleService) {
        this.roleService = roleService;
    }

    @Override
    public void saveNewUser(User user) {
        user = rolesCheck(user);
        entityManager.persist(user);
    }

    @Override
    public void editUser(User user) {
        user = rolesCheck(user);
        entityManager.merge(user);
    }

    public User rolesCheck(User user) {
        String checkedRoles = user.getCheckedRoles();
        if (!checkedRoles.isBlank()) {
            for (Role role : roleService.getRoles()) {
                if (checkedRoles.contains(role.getName().substring(5))) {
                    user.getRoles().add(role);
                }
            }
        }
        if (user.getRoles().size() == 0) {
            user.getRoles().add(roleService.getRoleByName("ROLE_USER"));
        }
        return user;
    }

    @Override
    public void deleteUser(Long id) {
        entityManager.remove(getUserById(id));
    }

    @Override
    public List<User> getUsers() {
        return entityManager.createQuery("from User").getResultList();
    }

    @Override
    public User getUserById(Long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User getUserByUserName(String username) {
        return (User) entityManager.createQuery("from User where username =: username")
                .setParameter("username", username).getSingleResult();
    }
}
