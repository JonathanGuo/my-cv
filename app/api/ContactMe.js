/* eslint class-methods-use-this: ["error", { "exceptMethods": ["fetch"] }] */
import Api from './Api';

export default class ContactMe extends Api {
    send = (payload) => {
        return this.axios.post('send-email', payload);
    }
}
