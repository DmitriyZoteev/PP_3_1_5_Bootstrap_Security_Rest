package ru.kata.spring.boot_security.demo.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;
import java.util.logging.Logger;


@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserService userService;

    private final RoleService roleService;

    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = "/admin")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }


    @PostMapping("/admin")
    public ResponseEntity<User> saveNewUser(@RequestBody User user) {
        try {
            userService.saveNewUser(user);
        } catch (DataIntegrityViolationException e) {
            Logger.getLogger(AdminRestController.class.getName())
                    .warning(String.format("Email '%s' уже существует", user.getUsername()));
        }
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<User> editUser(@RequestBody User user, @PathVariable Long id) {
        user.setId(id);
        try {
            userService.editUser(user);
        } catch (DataIntegrityViolationException e) {
            Logger.getLogger(AdminRestController.class.getName())
                    .warning(String.format("Email '%s' уже существует", user.getUsername()));
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<User> getUserByID(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping("/admin/roles")
    public ResponseEntity<List<Role>> getRoles() {
        return new ResponseEntity<>(roleService.getRoles(), HttpStatus.OK);
    }
}
