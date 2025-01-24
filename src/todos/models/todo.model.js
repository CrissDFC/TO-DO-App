import {v4 as uuid} from 'uuid';




export class Todo {
    /**
     * this function creates the TO-DO's
     * @param {String}description TO-DO description
     */

    constructor(description) {

        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}