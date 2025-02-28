import { Component } from '@angular/core';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  users: User[] = [];
  newUser: User = { name: '', email: '' };

  constructor(private userService: UserService) {}

  async ngOnInit() {
    try {
      this.users = await this.userService.getUsers();
    } catch (error) {
      console.error('Fehler beim Abrufen der Benutzer:', error);
    }
  }

  async addUser() {
    if (!this.newUser.name || !this.newUser.email) return;
    try {
      const addedUser = await this.userService.addUser(this.newUser);
      this.users.push(addedUser);
      this.newUser = { name: '', email: '' };
    } catch (error) {
      console.error('Fehler beim Hinzufügen:', error);
    }
  }

  async updateUser(user: User) {
    try {
      await this.userService.updateUser(user);
      console.log('Benutzer aktualisiert');
    } catch (error) {
      console.error('Fehler beim Aktualisieren:', error);
    }
  }

  async deleteUser(user: User) {
    try {
      await this.userService.deleteUser(user.id!);
      this.users = this.users.filter(u => u.id !== user.id);
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
    }
  }
  
}
