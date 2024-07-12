export abstract class AbstractEntity {

    _id?: string;

    constructor(_id?: string) {
        this._id = _id;
    }
}