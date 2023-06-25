export const roles = Object.freeze({
  ADMIN: {
    id: 'ADMIN',
    name: 'ADMIN',
  },
  RIDER: {
    id: 'RIDER',
    name: 'RIDER',
  },
  MANAGER: {
    id: 'MANAGER',
    name: 'MANAGER',
  },
});

export const FILTER = [
  {
    id:'assigned',
    value:"To be delivered",
    title:"To be delivered",
  },
  {
    id:"done",
    value:"Delivered",
    title:"Delivered"
  },
  {
    id:"cancel",
    value:"Cancelled",
    title:"Cancelled",
  },
  {
    id:"confirmed",
    value:"Stock Confirmed",
    title:"Stock Confirmed",
  },
  {
    id:"waiting",
    value:"Waiting for stock",
    title:"Waiting for stock",
  },
  {
    id:"draft",
    value:"Draft",
    title:"Draft",
  }
]
