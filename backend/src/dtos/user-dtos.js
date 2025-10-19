export default class UserDto {
    email;
    id;
    is_activated

    constructor(model) {
        this.email = model.email;
        this.id = model.user_id;
        this.is_activated = model.is_activated;
    }
}