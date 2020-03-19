/**
 * User model as defined in strapi
 */

import {login, logout} from '../controllers/UserController';

class UserModel {
  constructor(identifier, password) {
    this.identifier = identifier;
    this.password = password;
  }

  async login() {
    const result = await login(this);

    if (!result) {
      throw new Error('Unable to login user.');
    }

    return true;
  }

  async logout() {
    const result = await logout(this);

    if (!result) {
      throw new Error('Unable to logout user.');
    }

    return true;
  }
}

export default UserModel;
