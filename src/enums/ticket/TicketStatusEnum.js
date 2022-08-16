const TicketStatusEnum = Object.freeze({
    WAITING_FOR_SUPPORT: 0,
    WAITING_FOR_CUSTOMER: 1,
    STATUS_CLOSED: 2,
    STATUS_AUTO_CLOSED: 3,
    STATUS_SPAM: 4,
    TICKET_STATUS_CLOSE: 'closed'
})

export default TicketStatusEnum