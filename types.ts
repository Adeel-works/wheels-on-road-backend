export type ORDER_STATUS = 'draft'|'waiting'|'confirmed'|'assigned'|'done'|'cancel';
export type ORDER_DELIVERY_STATUS = 'Pending' | 'Assigned' | 'On The Way' | 'Delivered' | 'Cancelled'
export type ODOO_DELIVERY_STATUS = "Done" | "Cancelled";

export type orderStatus = {
    orderId:string,
    deliveryStatus: ORDER_DELIVERY_STATUS,
    riderName:string,
    riderMobile:string
}

export type odooOrderStatus = {
    orderId:string,
    deliveryStatus: ODOO_DELIVERY_STATUS,
}

export type OrderSearch = {
deliveryOrderName:string,
deliveryAddressStreet:string,
deliveryAddressStreetCity:string,
customerName:string
deliveryOrderStatus:string
}