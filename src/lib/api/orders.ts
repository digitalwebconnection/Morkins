import type { Order, OrderRecord } from '../../types'

export async function getUserOrders(): Promise<Order[]> {
  return [
    {
      id: 'ORD-89241',
      date: '2026-03-12',
      status: 'Delivered',
      total: 62.00,
      paymentMethod: 'UPI / Google Pay',
      shippingAddress: 'Flat 402, Lotus Grandeur, Linking Road, Bandra West, Mumbai 400050',
      estimatedDelivery: 'Delivered on March 15, 2026',
      items: [
        {
          id: 1,
          name: 'Botanical Radiance Glow Serum',
          price: 28.00,
          qty: 1,
          img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80',
        },
        {
          id: 4,
          name: 'Hyaluronic Dew Plumping Elixir',
          price: 30.00,
          qty: 1,
          img: 'https://images.unsplash.com/photo-1608248597358-150616b77c5e?w=200&auto=format&fit=crop&q=80',
        },
      ],
      timeline: [
        { status: 'Order Confirmed', date: 'Mar 12, 10:30 AM', location: 'Mumbai HQ', completed: true, current: false },
        { status: 'Formulation Packed', date: 'Mar 12, 04:15 PM', location: 'Eco-Fulfilment Center', completed: true, current: false },
        { status: 'Shipped via Express', date: 'Mar 13, 09:00 AM', location: 'Transit Hub', completed: true, current: false },
        { status: 'Out for Delivery', date: 'Mar 15, 08:30 AM', location: 'Bandra Delivery Center', completed: true, current: false },
        { status: 'Delivered Safely', date: 'Mar 15, 01:45 PM', location: 'Customer Doorstep', completed: true, current: true },
      ],
    },
    {
      id: 'ORD-91054',
      date: '2026-03-24',
      status: 'Out for Delivery',
      total: 35.00,
      paymentMethod: 'Credit Card (HDFC)',
      shippingAddress: 'Flat 402, Lotus Grandeur, Linking Road, Bandra West, Mumbai 400050',
      estimatedDelivery: 'Expected today by 7:00 PM',
      items: [
        {
          id: 6,
          name: 'Retinol Cellular Renewal Treatment',
          price: 35.00,
          qty: 1,
          img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&auto=format&fit=crop&q=80',
        },
      ],
      timeline: [
        { status: 'Order Confirmed', date: 'Mar 24, 02:10 PM', location: 'Mumbai HQ', completed: true, current: false },
        { status: 'Formulation Packed', date: 'Mar 24, 06:40 PM', location: 'Eco-Fulfilment Center', completed: true, current: false },
        { status: 'Shipped via Express', date: 'Mar 25, 07:15 AM', location: 'Transit Hub', completed: true, current: false },
        { status: 'Out for Delivery', date: 'Mar 25, 09:00 AM', location: 'Bandra Delivery Center', completed: true, current: true },
        { status: 'Delivered', date: 'Pending', location: 'Customer Doorstep', completed: false, current: false },
      ],
    },
  ];
}

export async function lookupOrderTracking(orderId: string): Promise<OrderRecord | null> {
  const cleanId = orderId.trim().toUpperCase();
  const mockDatabase: Record<string, OrderRecord> = {
    'MRK-98234': {
      orderId: 'MRK-98234',
      customerName: 'Priya S.',
      status: 'Out for Delivery',
      statusColor: 'text-amber-700 dark:text-amber-400',
      statusBg: 'bg-amber-100 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/50',
      carrier: 'BlueDart Express Eco',
      awbNumber: 'BLUEDART-8829-1029',
      estimatedDelivery: 'Today by 7:00 PM',
      itemSummary: 'Botanical Radiance Glow Serum + 1 other item',
      destination: 'Bandra West, Mumbai, MH - 400050',
      milestones: [
        { label: 'Order Confirmed', date: '18 Mar 2026, 10:24 AM', detail: 'Payment verified & botanical batch assigned', passed: true },
        { label: 'Crafted & Packed', date: '18 Mar 2026, 04:30 PM', detail: 'Packed with zero-plastic biodegradable bubble wrap', passed: true },
        { label: 'In Transit', date: '19 Mar 2026, 08:15 AM', detail: 'Dispatched via electric transport to Mumbai Hub', passed: true },
        { label: 'Out for Delivery', date: '20 Mar 2026, 09:10 AM', detail: 'With rider Suresh Kumar (+91 98765-XXXXX)', passed: true },
        { label: 'Delivered', date: 'Expected 20 Mar 2026', detail: 'Package delivery verification pending OTP', passed: false },
      ]
    },
    'MRK-77412': {
      orderId: 'MRK-77412',
      customerName: 'Rahul V.',
      status: 'Delivered',
      statusColor: 'text-emerald-700 dark:text-emerald-400',
      statusBg: 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/50',
      carrier: 'Delhivery Green Fleet',
      awbNumber: 'DELHIVERY-4412-9901',
      estimatedDelivery: 'Delivered on 14 Mar 2026',
      itemSummary: 'Bio-Active Barrier Repair Cream (50ml)',
      destination: 'Indiranagar, Bengaluru, KA - 560038',
      milestones: [
        { label: 'Order Confirmed', date: '12 Mar 2026, 02:10 PM', detail: 'Order placed & receipt generated', passed: true },
        { label: 'Crafted & Packed', date: '12 Mar 2026, 07:00 PM', detail: 'Eco-certified fresh formulation seal applied', passed: true },
        { label: 'In Transit', date: '13 Mar 2026, 06:45 AM', detail: 'Transferred through Bengaluru South Hub', passed: true },
        { label: 'Out for Delivery', date: '14 Mar 2026, 11:20 AM', detail: 'Rider on route', passed: true },
        { label: 'Delivered', date: '14 Mar 2026, 02:45 PM', detail: 'Signed & handed to resident', passed: true },
      ]
    },
  };

  return mockDatabase[cleanId] || null;
}
