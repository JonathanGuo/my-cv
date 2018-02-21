/* eslint class-methods-use-this: ["error", { "exceptMethods": ["fetch"] }] */
import Api from './Api';

export default class Data extends Api {
    constructor() {
        super();

        this.fetch = this.fetch.bind(this);
    }y

    fetch () {
        return Promise.resolve(import('../assets/data/profile.json'));
    }
}
