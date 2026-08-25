export interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
}

export interface TrackingMilestone {
  label: string;
  date: string;
  detail: string;
  passed: boolean;
}

export interface TrackingStep {
  status: string;
  date: string;
  location: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  total: number;
  items: OrderItem[];
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  timeline?: TrackingStep[];
  shippingAddress?: string;
}

export interface OrderRecord {
  orderId: string;
  customerName: string;
  status: string;
  statusColor: string;
  statusBg: string;
  carrier: string;
  awbNumber: string;
  estimatedDelivery: string;
  itemSummary: string;
  destination: string;
  milestones: TrackingMilestone[];
}
