import type { Order, OrderRecord, ReturnRequest, ReturnItem } from '../../types';

const ORDERS_STORAGE_KEY = 'morkins_user_orders';
const RETURNS_STORAGE_KEY = 'morkins_order_returns';

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'MK-98211',
    date: 'July 10, 2026',
    status: 'Shipped',
    total: 82.0,
    subtotal: 82.0,
    tax: 0.0,
    shippingFee: 0.0,
    discount: 0.0,
    paymentMethod: 'Apple Pay (Visa •••• 4242)',
    paymentStatus: 'Paid',
    shippingAddress: 'Flat 402, Green Glen Sanctuary, Outer Ring Road, Bengaluru, KA 560103',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.sharma@morkins.com',
    customerPhone: '+91 98765 01928',
    trackingNumber: 'BD-884920194IN',
    items: [
      {
        id: 1,
        name: 'Rosewater Facial Mist',
        price: 34.0,
        qty: 1,
        img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200&auto=format&fit=crop',
      },
      {
        id: 2,
        name: 'Marula Nourishing Face Oil',
        price: 48.0,
        qty: 1,
        img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200&auto=format&fit=crop',
      },
    ],
    timeline: [
      { status: 'Order Confirmed', date: 'July 10, 11:20 AM', location: 'Morkins Central Ordering', completed: true, current: false },
      { status: 'Formulation Cold-Packed', date: 'July 10, 03:15 PM', location: 'Morkins Cold-Storage Lab', completed: true, current: false },
      { status: 'Dispatched via Air Cargo', date: 'July 11, 10:30 PM', location: 'Mumbai Air Terminal', completed: true, current: false },
      { status: 'In Transit to Hub', date: 'Today, 08:45 AM', location: 'Bengaluru Sort Facility Hub', completed: true, current: true },
      { status: 'Delivered', date: 'Expected Tomorrow', location: 'Customer Doorstep', completed: false, current: false },
    ],
  },
  {
    id: 'MK-87102',
    date: 'May 24, 2026',
    status: 'Delivered',
    total: 42.0,
    subtotal: 42.0,
    tax: 0.0,
    shippingFee: 0.0,
    discount: 0.0,
    paymentMethod: 'Credit Card (Mastercard •••• 8812)',
    paymentStatus: 'Paid',
    shippingAddress: 'Plot 12, Gulmohar Avenue, Bandra West, Mumbai, MH 400050',
    estimatedDelivery: 'Delivered on May 28, 2026',
    customerName: 'Rohit Mehta',
    customerEmail: 'rohit.mehta@morkins.com',
    customerPhone: '+91 98765 88120',
    trackingNumber: 'DLV-551029482IN',
    items: [
      {
        id: 3,
        name: 'Aloe Vera Hydrating Gel',
        price: 42.0,
        qty: 1,
        img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop',
      },
    ],
    timeline: [
      { status: 'Order Confirmed', date: 'May 24, 04:00 PM', location: 'Morkins Central Ordering', completed: true, current: false },
      { status: 'Formulation Packed', date: 'May 25, 09:00 AM', location: 'Eco-Fulfilment Hub', completed: true, current: false },
      { status: 'Dispatched via Green Fleet', date: 'May 27, 06:00 PM', location: 'Thane Central Hub', completed: true, current: false },
      { status: 'Out for Delivery', date: 'May 28, 09:30 AM', location: 'Bandra Delivery Center', completed: true, current: false },
      { status: 'Delivered Safely', date: 'May 28, 02:15 PM', location: 'Customer Doorstep', completed: true, current: true },
    ],
  },
  {
    id: 'ORD-89241',
    date: 'March 12, 2026',
    status: 'Delivered',
    total: 62.0,
    subtotal: 58.0,
    tax: 4.0,
    shippingFee: 0.0,
    discount: 0.0,
    paymentMethod: 'UPI / Google Pay (Ref #UPI89104)',
    paymentStatus: 'Paid',
    shippingAddress: 'Flat 402, Lotus Grandeur, Linking Road, Bandra West, Mumbai 400050',
    estimatedDelivery: 'Delivered on March 15, 2026',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@morkins.com',
    customerPhone: '+91 98765 43210',
    trackingNumber: 'BLUEDART-8829-1029',
    items: [
      {
        id: 1,
        name: 'Botanical Radiance Glow Serum',
        price: 28.0,
        qty: 1,
        img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80',
      },
      {
        id: 4,
        name: 'Hyaluronic Dew Plumping Elixir',
        price: 30.0,
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
    date: 'March 24, 2026',
    status: 'Out for Delivery',
    total: 35.0,
    subtotal: 35.0,
    tax: 0.0,
    shippingFee: 0.0,
    discount: 0.0,
    paymentMethod: 'Credit Card (HDFC Ending in 4109)',
    paymentStatus: 'Paid',
    shippingAddress: 'Flat 402, Lotus Grandeur, Linking Road, Bandra West, Mumbai 400050',
    estimatedDelivery: 'Expected today by 7:00 PM',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@morkins.com',
    customerPhone: '+91 98765 43210',
    trackingNumber: 'DELHIVERY-4412-9901',
    items: [
      {
        id: 6,
        name: 'Retinol Cellular Renewal Treatment',
        price: 35.0,
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

export async function getUserOrders(): Promise<Order[]> {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (stored) {
      const parsed: Order[] = JSON.parse(stored);
      // Auto-merge any default orders that might be missing from prior session cache
      let updated = false;
      const combined = [...parsed];
      DEFAULT_ORDERS.forEach((def) => {
        if (!combined.some((o) => o.id.toUpperCase() === def.id.toUpperCase())) {
          combined.push(def);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(combined));
      }
      return combined;
    }
  } catch (e) {
    console.error('Failed reading orders from storage', e);
  }

  // Initialize with default demo orders
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(DEFAULT_ORDERS));
  return DEFAULT_ORDERS;
}

/**
 * Fetches single order details and invoice information by ID.
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  const cleanId = orderId.trim().toUpperCase();
  const normalizedId = cleanId.replace(/[-_]/g, '');

  try {
    const res = await fetch(`/api/orders/${encodeURIComponent(cleanId)}`);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall back to client storage
  }

  const allOrders = await getUserOrders();
  const matched = allOrders.find(
    (o) =>
      o.id.toUpperCase() === cleanId ||
      o.id.replace(/[-_]/g, '').toUpperCase() === normalizedId
  );

  if (matched) return matched;

  // Direct check in DEFAULT_ORDERS in case storage was corrupted
  const fallback = DEFAULT_ORDERS.find(
    (o) =>
      o.id.toUpperCase() === cleanId ||
      o.id.replace(/[-_]/g, '').toUpperCase() === normalizedId
  );

  return fallback || null;
}

const DEFAULT_RETURNS: ReturnRequest[] = [
  {
    returnId: 'RET-88421',
    orderId: 'MK-87102',
    date: 'May 29, 2026',
    status: 'in_transit',
    resolutionType: 'wallet',
    reason: 'Skin sensitivity / mild irritation on application',
    notes: 'Patch test caused slight tingling. Requesting store credit bonus to try the gentle Aloe Vera Calm formulation instead.',
    refundAmount: 42.0,
    bonusAmount: 2.1,
    refundMethod: 'Morkins Sanctuary Wallet (+5% Botanical Bonus)',
    carrier: 'BlueDart Express Eco-Neutral Fleet',
    trackingNumber: 'RET-BLUEDART-8829-91',
    pickupDate: 'Tomorrow',
    pickupSlot: 'Morning (9:00 AM – 1:00 PM)',
    pickupOtp: '8492',
    pickupAddress: 'Plot 12, Gulmohar Avenue, Bandra West, Mumbai, MH 400050',
    creditNoteNumber: 'CN-MK-88421-W',
    qaNotes: 'Doorstep tamper-proof seal verified by courier rider Suresh Kumar. In transit to Morkins Mumbai Apothecary Hub for dermal batch log testing.',
    items: [
      {
        itemId: 3,
        name: 'Aloe Vera Hydrating Gel',
        price: 42.0,
        qty: 1,
        img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop',
        reason: 'Skin sensitivity / mild irritation',
        batchNumber: 'MRK-BOT-2026-AV81',
      },
    ],
    timeline: [
      {
        status: 'Return Request Registered',
        date: 'May 29, 10:15 AM',
        description: 'Customer application submitted and certified under 30-Day Botanical Guarantee.',
        completed: true,
        current: false,
      },
      {
        status: 'Approved & Courier Assigned',
        date: 'May 29, 02:30 PM',
        description: 'Eco-Rider assigned with tamper-evident zero-plastic botanical return bag.',
        completed: true,
        current: false,
      },
      {
        status: 'Doorstep Pickup Completed',
        date: 'Today, 08:30 AM',
        description: 'Package verified with Security OTP #8492 and transferred to Mumbai Sort Hub.',
        completed: true,
        current: true,
      },
      {
        status: 'Apothecary QA Check & Payout',
        date: 'Tomorrow by 4:00 PM',
        description: '$44.10 ($42.00 + $2.10 Bonus) instant credit to Sanctuary Wallet upon lab scan.',
        completed: false,
        current: false,
      },
    ],
  },
  {
    returnId: 'RET-76190',
    orderId: 'ORD-89241',
    date: 'March 18, 2026',
    status: 'refunded',
    resolutionType: 'refund',
    reason: 'Formula did not meet clinical hydration expectations',
    notes: 'Texture was too light for winter dry skin. Customer opted for full bank refund.',
    refundAmount: 30.0,
    bonusAmount: 0.0,
    refundMethod: 'UPI / Google Pay (Ref #UPI89104)',
    carrier: 'Delhivery Green Fleet',
    trackingNumber: 'RET-DLV-4412-10',
    pickupDate: 'March 20, 2026',
    pickupSlot: 'Afternoon (2:00 PM – 7:00 PM)',
    pickupOtp: '3910',
    pickupAddress: 'Flat 402, Lotus Grandeur, Linking Road, Bandra West, Mumbai 400050',
    creditNoteNumber: 'CN-MK-76190-TX',
    qaNotes: 'Lab batch inspection complete. Bottle volume and cold seal authenticated. Refund disbursed to original UPI VPA.',
    items: [
      {
        itemId: 4,
        name: 'Hyaluronic Dew Plumping Elixir',
        price: 30.0,
        qty: 1,
        img: 'https://images.unsplash.com/photo-1608248597358-150616b77c5e?w=200&auto=format&fit=crop&q=80',
        reason: 'Formula did not meet clinical hydration expectations',
        batchNumber: 'MRK-BOT-2026-HD44',
      },
    ],
    timeline: [
      {
        status: 'Return Request Registered',
        date: 'Mar 18, 11:00 AM',
        description: '30-Day Botanical Guarantee claim registered.',
        completed: true,
        current: false,
      },
      {
        status: 'Approved & Courier Assigned',
        date: 'Mar 19, 09:30 AM',
        description: 'Courier label generated with pre-paid zero carbon delivery.',
        completed: true,
        current: false,
      },
      {
        status: 'Doorstep Pickup Completed',
        date: 'Mar 20, 03:15 PM',
        description: 'Verified by rider with Doorstep Security OTP #3910.',
        completed: true,
        current: false,
      },
      {
        status: 'Refund Disbursed to Bank',
        date: 'Mar 21, 10:45 AM',
        description: 'Full $30.00 transferred back to UPI (Google Pay ref #UPI89104).',
        completed: true,
        current: true,
      },
    ],
  },
];

/**
 * Submits a new return/refund request for an order with full lifecycle features.
 */
export async function requestReturn(
  orderId: string,
  items: { itemId: number; qty: number; reason: string }[],
  reason: string,
  resolutionType: 'refund' | 'wallet' | 'exchange' = 'wallet',
  pickupSlot: string = 'morning',
  pickupAddress?: string,
  notes?: string,
  photos?: string[]
): Promise<{ success: boolean; returnId: string; message: string; returnRequest?: ReturnRequest }> {
  const cleanId = orderId.trim().toUpperCase();
  const order = await getOrderById(cleanId);

  if (!order) {
    return {
      success: false,
      returnId: '',
      message: `Order #${cleanId} could not be found.`,
    };
  }

  const returnId = 'RET-' + Math.floor(10000 + Math.random() * 90000);
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  
  // Calculate refund amount
  const returnItems: ReturnItem[] = items.map((reqItem) => {
    const originalItem = order.items.find((i) => i.id === reqItem.itemId);
    return {
      itemId: reqItem.itemId,
      name: originalItem ? originalItem.name : 'Botanical Formulation',
      qty: reqItem.qty,
      price: originalItem ? originalItem.price : 0,
      img: originalItem ? originalItem.img : '',
      reason: reqItem.reason || reason,
      batchNumber: `MRK-BOT-2026-${reqItem.itemId}`,
    };
  });

  const baseRefund = returnItems.reduce((acc, i) => acc + i.price * i.qty, 0);
  const isWallet = resolutionType === 'wallet';
  const bonusAmount = isWallet ? Number((baseRefund * 0.05).toFixed(2)) : 0;
  const refundAmount = baseRefund;

  const refundMethodLabel =
    resolutionType === 'wallet'
      ? `Morkins Sanctuary Wallet (+5% Bonus: $${(baseRefund + bonusAmount).toFixed(2)})`
      : resolutionType === 'exchange'
      ? 'Fresh Replacement Formulation Dispatch'
      : order.paymentMethod || 'Original Payment Source (Bank / Card)';

  const newReturn: ReturnRequest = {
    returnId,
    orderId: order.id,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: 'requested',
    resolutionType,
    items: returnItems,
    reason,
    notes,
    photos: photos || [],
    refundAmount,
    bonusAmount,
    refundMethod: refundMethodLabel,
    pickupDate: 'Within 24–48 Hours',
    pickupSlot: pickupSlot === 'morning' ? 'Morning (9:00 AM – 1:00 PM)' : 'Afternoon (2:00 PM – 7:00 PM)',
    pickupOtp: otp,
    carrier: 'BlueDart Express Eco-Neutral Fleet',
    trackingNumber: `RET-BD-${Math.floor(100000 + Math.random() * 900000)}IN`,
    pickupAddress: pickupAddress || order.shippingAddress || 'Default Registered Sanctuary Address',
    creditNoteNumber: `CN-MK-${returnId.replace('RET-', '')}`,
    qaNotes: 'Claim registered and queued for clinical batch review under 30-Day Botanical Guarantee.',
    timeline: [
      {
        status: 'Return Request Registered',
        date: 'Today',
        description: 'Application registered and queued for clinical QA validation.',
        completed: true,
        current: true,
      },
      {
        status: 'Approved & Courier Assigned',
        date: 'Within 24 Hours',
        description: 'Eco-courier dispatched with tamper-evident botanical pouch.',
        completed: false,
        current: false,
      },
      {
        status: 'Doorstep Pickup with Security OTP',
        date: 'Pending',
        description: `Hand package to rider using Security OTP #${otp}.`,
        completed: false,
        current: false,
      },
      {
        status: resolutionType === 'exchange' ? 'Replacement Dispatched' : 'Reimbursement Processed',
        date: 'Pending',
        description:
          resolutionType === 'wallet'
            ? `$${(refundAmount + bonusAmount).toFixed(2)} credited instantly to your Sanctuary Wallet.`
            : resolutionType === 'exchange'
            ? 'Fresh batch dispatched with expedited priority delivery.'
            : `Full refund of $${refundAmount.toFixed(2)} reversed to ${order.paymentMethod}.`,
        completed: false,
        current: false,
      },
    ],
  };

  try {
    const existingReturns: ReturnRequest[] = await getReturnRequests();
    const updated = [newReturn, ...existingReturns.filter((r) => r.returnId !== newReturn.returnId)];
    localStorage.setItem(RETURNS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving return request', e);
  }

  return {
    success: true,
    returnId,
    message: `Return request #${returnId} submitted successfully under our Botanical Guarantee.`,
    returnRequest: newReturn,
  };
}

/**
 * Reschedules a return pickup appointment.
 */
export async function rescheduleReturnPickup(
  returnId: string,
  newDate: string,
  newSlot: string
): Promise<{ success: boolean; message: string }> {
  try {
    const all = await getReturnRequests();
    const index = all.findIndex((r) => r.returnId.toUpperCase() === returnId.trim().toUpperCase());
    if (index === -1) {
      return { success: false, message: 'Return request not found.' };
    }
    all[index].pickupDate = newDate;
    all[index].pickupSlot = newSlot;
    localStorage.setItem(RETURNS_STORAGE_KEY, JSON.stringify(all));
    return { success: true, message: `Pickup successfully rescheduled for ${newDate} (${newSlot}).` };
  } catch (e) {
    console.error('Error rescheduling pickup', e);
    return { success: false, message: 'Failed to reschedule pickup.' };
  }
}

/**
 * Cancels an active return request.
 */
export async function cancelReturnRequest(
  returnId: string,
  reason?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const all = await getReturnRequests();
    const index = all.findIndex((r) => r.returnId.toUpperCase() === returnId.trim().toUpperCase());
    if (index === -1) {
      return { success: false, message: 'Return request not found.' };
    }
    all[index].status = 'cancelled';
    if (reason) {
      all[index].notes = (all[index].notes ? all[index].notes + ' | ' : '') + `Cancelled by patron: ${reason}`;
    }
    localStorage.setItem(RETURNS_STORAGE_KEY, JSON.stringify(all));
    return { success: true, message: `Return request #${returnId} has been cancelled.` };
  } catch (e) {
    console.error('Error cancelling return', e);
    return { success: false, message: 'Failed to cancel return request.' };
  }
}

/**
 * Retrieves all user return requests with auto-merging of default rich lifecycle demos.
 */
export async function getReturnRequests(): Promise<ReturnRequest[]> {
  try {
    const stored = localStorage.getItem(RETURNS_STORAGE_KEY);
    if (stored) {
      const parsed: ReturnRequest[] = JSON.parse(stored);
      // Auto-merge demo returns if missing
      let updated = false;
      const combined = [...parsed];
      DEFAULT_RETURNS.forEach((def) => {
        if (!combined.some((r) => r.returnId.toUpperCase() === def.returnId.toUpperCase())) {
          combined.push(def);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem(RETURNS_STORAGE_KEY, JSON.stringify(combined));
      }
      return combined;
    }
  } catch (e) {
    console.error('Error loading returns', e);
  }

  // Initialize with default demo lifecycle returns
  localStorage.setItem(RETURNS_STORAGE_KEY, JSON.stringify(DEFAULT_RETURNS));
  return DEFAULT_RETURNS;
}

/**
 * Retrieves a single return request by returnId.
 */
export async function getReturnById(returnId: string): Promise<ReturnRequest | null> {
  const cleanId = returnId.trim().toUpperCase();
  const all = await getReturnRequests();
  return all.find((r) => r.returnId.toUpperCase() === cleanId) || null;
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
      ],
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
      ],
    },
  };

  return mockDatabase[cleanId] || null;
}
