export default function ContactMe(state = {
    sending: false,
    response: {
        result: null,
        message: null,
    },
    sent: false,
    failed: false,
}, action) {
    switch (action.type) {
        case 'SENT_CONTACT_MESSAGE':
            return {
                ...state,
                sending: false,
                failed: false,
                response: action.payload,
            };
        case 'SENDING_CONTACT_MESSAGE':
            return {
                ...state,
                sending: true,
                failed: false,
            };
        case 'SEND_CONTACT_MESSAGE_FAILED':
            return {
                ...state,
                response: action.payload,
                sending: false,
                sent: false,
                failed: true,
            };
        default:
            return state;
    }
}
