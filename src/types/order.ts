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

export type ReturnStatus =
  | 'requested'
  | 'approved'
  | 'picked_up'
  | 'in_transit'
  | 'inspected'
  | 'refunded'
  | 'rejected'
  | 'cancelled';

export interface ReturnItem {
  itemId: number;
  name: string;
  qty: number;
  price: number;
  img: string;
  reason: string;
  batchNumber?: string;
}

export interface ReturnRequest {
  returnId: string;
  orderId: string;
  date: string;
  status: ReturnStatus;
  items: ReturnItem[];
  reason: string;
  resolutionType?: 'refund' | 'wallet' | 'exchange';
  notes?: string;
  photos?: string[];
  refundAmount: number;
  bonusAmount?: number;
  refundMethod: string;
  pickupDate?: string;
  pickupSlot?: string;
  pickupOtp?: string;
  carrier?: string;
  trackingNumber?: string;
  pickupAddress?: string;
  creditNoteNumber?: string;
  qaNotes?: string;
  timeline: {
    status: string;
    date: string;
    description: string;
    completed: boolean;
    current: boolean;
  }[];
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  total: number;
  subtotal?: number;
  tax?: number;
  shippingFee?: number;
  discount?: number;
  items: OrderItem[];
  paymentMethod: string;
  paymentStatus?: 'Paid' | 'Pending' | 'Refunded';
  trackingNumber?: string;
  estimatedDelivery?: string;
  timeline?: TrackingStep[];
  shippingAddress?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  returns?: ReturnRequest[];
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
