import type { Order, OrderItem } from '../../types';

/**
 * Escapes text for standard PDF string literals
 */
function escapePdfText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, ' '); // keep printable ASCII
}

/**
 * Generates a valid standard PDF 1.4 binary string for a Morkins Order Invoice
 */
export function generateInvoicePdfContent(order: Order): Uint8Array {
  const subtotal = order.subtotal || order.items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const tax = order.tax || 0;
  const shippingFee = order.shippingFee || 0;
  const discount = order.discount || 0;
  const total = order.total || subtotal + tax + shippingFee - discount;
  const invoiceNo = `INV-${order.id}-${new Date().getFullYear()}`;
  const invoiceDate = order.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const recipientName = order.customerName || 'Valued Botanical Client';
  const recipientEmail = order.customerEmail || 'client@morkins.com';
  const recipientPhone = order.customerPhone || '+1 (555) 019-2834';
  const shippingAddr = order.shippingAddress || '500 Forest Avenue, Suite 12, Portland, ME 04101';
  const paymentMethod = order.paymentMethod || 'Credit Card / Digital Pay';
  const trackingNo = order.trackingNumber || 'MK-TRACK-EXPRESS';

  // Page dimensions: A4 (595.28 x 841.89 points)
  // PDF coordinate system starts at bottom-left (0, 0)
  const streamLines: string[] = [];

  // Helper functions for stream
  const setColor = (r: number, g: number, b: number) => {
    streamLines.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg`);
    streamLines.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} RG`);
  };

  const drawRect = (x: number, y: number, w: number, h: number, fill = true, stroke = false) => {
    streamLines.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re`);
    if (fill && stroke) streamLines.push('B');
    else if (fill) streamLines.push('f');
    else if (stroke) streamLines.push('S');
  };

  const drawLine = (x1: number, y1: number, x2: number, y2: number, lineWidth = 1) => {
    streamLines.push(`${lineWidth.toFixed(2)} w`);
    streamLines.push(`${x1.toFixed(2)} ${y1.toFixed(2)} m`);
    streamLines.push(`${x2.toFixed(2)} ${y2.toFixed(2)} l`);
    streamLines.push('S');
  };

  const drawText = (
    text: string,
    x: number,
    y: number,
    font = 'F1',
    size = 10,
    align: 'left' | 'right' | 'center' = 'left',
    approxCharWidth = size * 0.50
  ) => {
    const cleanText = text.replace(/\s+/g, ' ').trim();
    const escaped = escapePdfText(cleanText);
    let posX = x;
    if (align === 'right') {
      posX = x - (cleanText.length * approxCharWidth);
    } else if (align === 'center') {
      posX = x - (cleanText.length * approxCharWidth * 0.5);
    }
    streamLines.push(`BT /${font} ${size} Tf ${posX.toFixed(2)} ${y.toFixed(2)} Td (${escaped}) Tj ET`);
  };

  // Top header green banner (full page width)
  setColor(0.071, 0.376, 0.184); // #12602F Forest Green
  drawRect(0, 832, 595.28, 10, true, false);

  // Top Gold Accent Stripe
  setColor(0.549, 0.384, 0.129); // #8C6221 Bronze Gold
  drawRect(0, 829, 595.28, 3, true, false);

  // ── BRAND HEADER (Left) ──
  setColor(0.071, 0.376, 0.184); // #12602F Forest Green
  drawText('MORKINS', 40, 786, 'F2', 22);

  setColor(0.549, 0.384, 0.129); // #8C6221 Gold/Bronze
  drawText('BOTANICAL APOTHECARY', 170, 792, 'F2', 8.5);
  setColor(0.40, 0.45, 0.40);
  drawText('Clinical Formulations  Bio-Active Botanicals', 170, 780, 'F1', 7.5);

  setColor(0.45, 0.48, 0.45);
  drawText('Zero Plastic - Carbon Neutral - 100% Bio-Active Guaranteed', 40, 764, 'F1', 7.5);
  drawText('Morkins Formulation Labs LLC • Reg: MK-US-8921-2026 • support@morkins.com', 40, 752, 'F1', 7.0);

  // ── INVOICE TITLE BOX (Right Top) ──
  const taxBoxX = 365;
  const taxBoxY = 744;
  const taxBoxW = 190;
  const taxBoxH = 68;

  setColor(0.96, 0.98, 0.96); // Soft green bg
  drawRect(taxBoxX, taxBoxY, taxBoxW, taxBoxH, true, false);
  setColor(0.071, 0.376, 0.184);
  drawLine(taxBoxX, taxBoxY, taxBoxX, taxBoxY + taxBoxH, 2.5); // Left green border line

  setColor(0.071, 0.376, 0.184);
  drawText('TAX INVOICE', taxBoxX + 12, taxBoxY + 50, 'F2', 12);

  setColor(0.25, 0.25, 0.25);
  drawText(`Invoice #: ${invoiceNo}`, taxBoxX + 12, taxBoxY + 36, 'F2', 7.5);
  drawText(`Date: ${invoiceDate}`, taxBoxX + 12, taxBoxY + 24, 'F1', 7.5);
  drawText(`Order ID: #${order.id}`, taxBoxX + 12, taxBoxY + 12, 'F1', 7.5);

  // Top section divider
  setColor(0.85, 0.88, 0.85);
  drawLine(40, 736, 555, 736, 1);

  // ── BILL TO & ORDER DETAILS BOXES ──
  const metaBoxY = 642;
  const metaBoxH = 84;
  const colW = 250;

  // Box 1: Billed To
  setColor(0.98, 0.98, 0.97); // #FAF8F2
  drawRect(40, metaBoxY, colW, metaBoxH, true, true);

  // Box 2: Order & Payment
  drawRect(305, metaBoxY, colW, metaBoxH, true, true);

  // Bill To Details
  setColor(0.549, 0.384, 0.129); // Bronze
  drawText('BILLED & SHIPPED TO', 50, metaBoxY + 68, 'F2', 8.5);

  setColor(0.086, 0.157, 0.125);
  drawText(recipientName, 50, metaBoxY + 54, 'F2', 9.5);

  setColor(0.35, 0.38, 0.35);
  drawText(`Email: ${recipientEmail}`, 50, metaBoxY + 41, 'F1', 7.5);
  drawText(`Phone: ${recipientPhone}`, 50, metaBoxY + 30, 'F1', 7.5);

  const cleanAddr = shippingAddr.replace(/\s+/g, ' ');
  const addrLine1 = cleanAddr.length > 42 ? cleanAddr.substring(0, 40) + '...' : cleanAddr;
  drawText(`Address: ${addrLine1}`, 50, metaBoxY + 18, 'F1', 7.5);

  // Order Details / Payment
  setColor(0.549, 0.384, 0.129);
  drawText('ORDER & PAYMENT DETAILS', 315, metaBoxY + 68, 'F2', 8.5);

  setColor(0.35, 0.38, 0.35);
  const cleanPayment = paymentMethod.replace(/\s+/g, ' ');
  drawText(`Payment Method: ${cleanPayment}`, 315, metaBoxY + 54, 'F1', 7.5);
  drawText(`Payment Status: ${order.paymentStatus || 'Paid in Full (Verified)'}`, 315, metaBoxY + 41, 'F2', 7.5);
  drawText(`Fulfillment Status: ${order.status.toUpperCase()}`, 315, metaBoxY + 30, 'F2', 7.5);
  drawText(`Tracking Courier AWB: ${trackingNo}`, 315, metaBoxY + 18, 'F1', 7.5);

  // ── ITEMIZED TABLE HEADER ──
  const tableHeaderY = 612;
  setColor(0.071, 0.376, 0.184); // #12602F Forest Green
  drawRect(40, tableHeaderY, 515, 20, true, false);

  setColor(1.0, 1.0, 1.0); // White
  drawText('#', 48, tableHeaderY + 6, 'F2', 8);
  drawText('FORMULATION / ITEM DESCRIPTION', 75, tableHeaderY + 6, 'F2', 8);
  drawText('QTY', 360, tableHeaderY + 6, 'F2', 8, 'center', 4.5);
  drawText('UNIT PRICE', 440, tableHeaderY + 6, 'F2', 8, 'right', 4.5);
  drawText('AMOUNT ($)', 545, tableHeaderY + 6, 'F2', 8, 'right', 4.5);

  // ── ITEMIZED TABLE ROWS ──
  let currentY = tableHeaderY - 22;
  order.items.forEach((item: OrderItem, index: number) => {
    // Row alternating background
    if (index % 2 === 1) {
      setColor(0.97, 0.98, 0.97);
      drawRect(40, currentY - 4, 515, 20, true, false);
    }

    // Row bottom separator line
    setColor(0.90, 0.92, 0.90);
    drawLine(40, currentY - 4, 555, currentY - 4, 0.5);

    setColor(0.4, 0.4, 0.4);
    drawText(String(index + 1), 48, currentY + 4, 'F1', 8);

    setColor(0.1, 0.1, 0.1);
    const itemName = item.name.length > 38 ? item.name.substring(0, 36) + '...' : item.name;
    drawText(itemName, 75, currentY + 4, 'F2', 8.5);

    setColor(0.35, 0.35, 0.35);
    drawText(String(item.qty), 360, currentY + 4, 'F1', 8.5, 'center', 4.5);
    drawText(`$${item.price.toFixed(2)}`, 440, currentY + 4, 'F1', 8.5, 'right', 4.5);

    setColor(0.071, 0.376, 0.184);
    drawText(`$${(item.price * item.qty).toFixed(2)}`, 545, currentY + 4, 'F2', 8.5, 'right', 4.5);

    currentY -= 22;
  });

  // ── TOTALS & QUALITY ASSURANCE SECTION ──
  const totalsStartY = Math.min(currentY - 12, 460);
  const totalsBoxX = 320;
  const totalsBoxW = 235;
  const totalsBoxH = 110;

  // Totals Box (Right)
  setColor(0.98, 0.98, 0.97);
  drawRect(totalsBoxX, totalsStartY - totalsBoxH, totalsBoxW, totalsBoxH, true, true);

  setColor(0.3, 0.3, 0.3);
  drawText('Formulations Subtotal:', totalsBoxX + 12, totalsStartY - 14, 'F1', 8);
  drawText(`$${subtotal.toFixed(2)}`, totalsBoxX + totalsBoxW - 12, totalsStartY - 14, 'F1', 8, 'right', 4.5);

  drawText('Eco Botanical Packaging:', totalsBoxX + 12, totalsStartY - 28, 'F1', 8);
  setColor(0.071, 0.376, 0.184);
  drawText('FREE ($0.00)', totalsBoxX + totalsBoxW - 12, totalsStartY - 28, 'F2', 8, 'right', 4.5);

  setColor(0.3, 0.3, 0.3);
  drawText('Express Carbon-Neutral Delivery:', totalsBoxX + 12, totalsStartY - 42, 'F1', 8);
  drawText(shippingFee === 0 ? 'FREE ($0.00)' : `$${shippingFee.toFixed(2)}`, totalsBoxX + totalsBoxW - 12, totalsStartY - 42, 'F1', 8, 'right', 4.5);

  if (discount > 0) {
    setColor(0.071, 0.376, 0.184);
    drawText('Promotional Botanical Discount:', totalsBoxX + 12, totalsStartY - 56, 'F1', 8);
    drawText(`-$${discount.toFixed(2)}`, totalsBoxX + totalsBoxW - 12, totalsStartY - 56, 'F2', 8, 'right', 4.5);
  } else if (tax > 0) {
    setColor(0.3, 0.3, 0.3);
    drawText('Applicable Sales Tax / GST:', totalsBoxX + 12, totalsStartY - 56, 'F1', 8);
    drawText(`$${tax.toFixed(2)}`, totalsBoxX + totalsBoxW - 12, totalsStartY - 56, 'F1', 8, 'right', 4.5);
  }

  // Grand Total Separator & Total Line
  setColor(0.071, 0.376, 0.184);
  drawLine(totalsBoxX + 10, totalsStartY - 70, totalsBoxX + totalsBoxW - 10, totalsStartY - 70, 1.2);

  setColor(0.086, 0.157, 0.125);
  drawText('TOTAL AMOUNT PAID:', totalsBoxX + 12, totalsStartY - 92, 'F2', 9.5);

  setColor(0.071, 0.376, 0.184);
  drawText(`$${total.toFixed(2)} USD`, totalsBoxX + totalsBoxW - 12, totalsStartY - 92, 'F2', 11.5, 'right', 5.8);

  // Quality Assurance Box (Left)
  const stampBoxY = totalsStartY - totalsBoxH;
  const stampBoxW = 265;
  setColor(0.95, 0.97, 0.95);
  drawRect(40, stampBoxY, stampBoxW, totalsBoxH, true, true);

  setColor(0.549, 0.384, 0.129); // Bronze
  drawText('CERTIFIED CLINICAL BOTANICAL ASSURANCE', 50, stampBoxY + 92, 'F2', 8);

  setColor(0.35, 0.38, 0.35);
  drawText('All Morkins products are freshly formulated with clinical-grade', 50, stampBoxY + 76, 'F1', 7.0);
  drawText('bio-actives, 100% vegan, cruelty-free, and dermatologically verified.', 50, stampBoxY + 64, 'F1', 7.0);
  drawText('Authorized Sign-off: Dr. Elena Vance (Chief Botanical Formulator)', 50, stampBoxY + 48, 'F1', 7.0);
  drawText(`Ref: MRK-VERIFY-${order.id.replace(/\D/g, '') || '98211'} • QA Batch Status: PASSED`, 50, stampBoxY + 34, 'F2', 7.0);

  // Green Verification Pill
  setColor(0.071, 0.376, 0.184);
  drawRect(50, stampBoxY + 10, 160, 16, true, false);
  setColor(1.0, 1.0, 1.0);
  drawText('VERIFIED BOTANICAL SHIPMENT', 55, stampBoxY + 14, 'F2', 7.0);

  // ── FOOTER SECTION ──
  const footerY = 50;
  setColor(0.85, 0.88, 0.85);
  drawLine(40, footerY + 28, 555, footerY + 28, 0.8);

  setColor(0.4, 0.45, 0.4);
  drawText('Questions about your formulations? Contact Morkins Care at support@morkins.com or +1 (800) 555-MORKINS', 40, footerY + 14, 'F1', 7.0);
  drawText('Morkins Botanical Apothecary • www.morkins.com • 30-Day Pure Botanical Satisfaction Guarantee', 40, footerY + 4, 'F1', 7.0);

  // Bottom Green Decorative Bar
  setColor(0.071, 0.376, 0.184);
  drawRect(0, 0, 595.28, 6, true, false);

  // Assemble PDF structure compliant with PDF 1.4 specification
  const streamContent = streamLines.join('\n');
  const streamBytes = new TextEncoder().encode(streamContent);
  const streamLength = streamBytes.length;

  const objects: string[] = [
    // Obj 1: Catalog
    '1 0 obj\r\n<< /Type /Catalog /Pages 2 0 R >>\r\nendobj\r\n',
    // Obj 2: Pages
    '2 0 obj\r\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\r\nendobj\r\n',
    // Obj 3: Page
    '3 0 obj\r\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> /Contents 4 0 R >>\r\nendobj\r\n',
    // Obj 4: Content Stream
    `4 0 obj\r\n<< /Length ${streamLength} >>\r\nstream\r\n${streamContent}\r\nendstream\r\nendobj\r\n`,
  ];

  let pdfText = '%PDF-1.4\r\n%\xE2\xE3\xCF\xD3\r\n';
  const offsets: number[] = [0];

  for (let i = 0; i < objects.length; i++) {
    offsets.push(pdfText.length);
    pdfText += objects[i];
  }

  const xrefOffset = pdfText.length;
  pdfText += `xref\r\n0 ${objects.length + 1}\r\n0000000000 65535 f \r\n`;

  for (let i = 1; i <= objects.length; i++) {
    const offStr = String(offsets[i]).padStart(10, '0');
    // Each line in xref table must be EXACTLY 20 bytes (10 digits + 1 space + 5 digits + 1 space + 1 char + 2 byte CRLF)
    pdfText += `${offStr} 00000 n \r\n`;
  }

  pdfText += `trailer\r\n<< /Size ${objects.length + 1} /Root 1 0 R >>\r\nstartxref\r\n${xrefOffset}\r\n%%EOF\r\n`;

  return new TextEncoder().encode(pdfText);
}

/**
 * Generates a clean standalone HTML invoice for high-fidelity viewing & printing
 */
export function generateHtmlInvoice(order: Order): string {
  const subtotal = order.subtotal || order.items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const tax = order.tax || 0;
  const shippingFee = order.shippingFee || 0;
  const discount = order.discount || 0;
  const total = order.total || subtotal + tax + shippingFee - discount;
  const invoiceNo = `INV-${order.id}-${new Date().getFullYear()}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Morkins Invoice - ${invoiceNo}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #FAF8F2; color: #1C2E1A; padding: 30px 15px; }
    .container { max-width: 800px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #E5DEC9; overflow: hidden; }
    .top-ribbon { height: 8px; background: linear-gradient(90deg, #12602F, #8C6221, #AFD971); }
    .header { padding: 32px 40px; border-bottom: 1px solid #E5DEC9; display: flex; justify-content: space-between; align-items: flex-start; }
    .brand { font-size: 26px; font-weight: 800; letter-spacing: 2px; color: #12602F; }
    .tagline { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8C6221; font-weight: 700; margin-top: 4px; }
    .meta-box { text-align: right; }
    .meta-box h3 { font-size: 11px; text-transform: uppercase; color: #8C6221; letter-spacing: 1px; }
    .meta-box .invoice-id { font-size: 16px; font-weight: 800; color: #12602F; font-family: monospace; }
    .status-badge { display: inline-block; margin-top: 6px; padding: 4px 10px; background: #D8EFE3; color: #0D3322; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 24px 40px; border-bottom: 1px solid #E5DEC9; background: #FAF8F2; }
    .info-card { background: #FFFFFF; padding: 18px; border-radius: 12px; border: 1px solid #E5DEC9; font-size: 13px; }
    .info-card h4 { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #8C6221; margin-bottom: 8px; font-weight: 700; }
    .table-container { padding: 24px 40px; border-bottom: 1px solid #E5DEC9; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { text-align: left; padding: 10px 12px; background: #FAF8F2; color: #8C6221; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #E5DEC9; }
    td { padding: 12px; border-bottom: 1px solid #F0ECE1; }
    .text-right { text-align: right; }
    .totals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 24px 40px; border-bottom: 1px solid #E5DEC9; }
    .summary-card { background: #FAF8F2; padding: 20px; border-radius: 14px; border: 1px solid #E5DEC9; font-size: 13px; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .summary-total { border-top: 1px solid #E5DEC9; padding-top: 10px; margin-top: 10px; font-weight: 800; font-size: 16px; color: #12602F; }
    .footer { padding: 24px 40px; text-align: center; font-size: 11px; color: #888; background: #FAF8F2; }
    .print-btn-bar { text-align: center; margin-top: 20px; }
    .print-btn { background: #12602F; color: #FFFFFF; border: none; padding: 10px 24px; font-size: 12px; font-weight: 700; text-transform: uppercase; border-radius: 8px; cursor: pointer; }
    @media print { .print-btn-bar { display: none; } body { padding: 0; background: #FFF; } .container { border: none; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="top-ribbon"></div>
    <div class="header">
      <div>
        <div class="brand">MORKINS</div>
        <div class="tagline">Botanical Apothecary &bull; Clinical Purity</div>
        <p style="font-size: 11px; color: #666; margin-top: 6px;">Morkins Formulation Labs LLC &bull; Tax GSTIN: MK-US-8921-2026</p>
      </div>
      <div class="meta-box">
        <h3>Official Tax Invoice</h3>
        <div class="invoice-id">${invoiceNo}</div>
        <div><span class="status-badge">${order.status}</span></div>
      </div>
    </div>
    <div class="grid">
      <div class="info-card">
        <h4>Billed & Shipped To</h4>
        <strong>${order.customerName || 'Valued Botanical Client'}</strong><br>
        <span>${order.customerEmail || 'client@morkins.com'}</span><br>
        <span>${order.customerPhone || '+1 (555) 019-2834'}</span><br>
        <p style="margin-top: 6px; color: #555;">${order.shippingAddress || 'Default Address'}</p>
      </div>
      <div class="info-card">
        <h4>Order & Payment Summary</h4>
        <span><strong>Order ID:</strong> #${order.id}</span><br>
        <span><strong>Order Date:</strong> ${order.date}</span><br>
        <span><strong>Payment Method:</strong> ${order.paymentMethod}</span><br>
        <span><strong>Courier AWB:</strong> ${order.trackingNumber || 'MK-TRACK-EXPRESS'}</span>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Item Formulation</th>
            <th style="text-align: center;">Qty</th>
            <th class="text-right">Unit Price</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map((i) => `
            <tr>
              <td><strong>${i.name}</strong><br><small style="color: #888;">Batch Ref: MK-FORM-${i.id}</small></td>
              <td style="text-align: center; font-weight: bold;">${i.qty}</td>
              <td class="text-right">$${i.price.toFixed(2)}</td>
              <td class="text-right" style="font-weight: bold; color: #12602F;">$${(i.price * i.qty).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="totals-grid">
      <div class="summary-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <h4 style="color: #12602F; font-weight: 700; text-transform: uppercase; font-size: 11px; margin-bottom: 6px;">Botanical Purity Assurance</h4>
          <p style="font-size: 12px; color: #555; line-height: 1.5;">Freshly crafted formulations with certified bio-active ingredients. Tested and verified for dermal safety.</p>
        </div>
        <p style="font-size: 11px; font-weight: 700; color: #12602F; margin-top: 10px;">QA Status: PASSED &bull; Authorized by Dr. Elena Vance</p>
      </div>
      <div class="summary-card">
        <div class="summary-row"><span>Formulas Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
        <div class="summary-row"><span>Eco Botanical Packaging</span><span style="color: #12602F; font-weight: 700;">FREE</span></div>
        <div class="summary-row"><span>Express Carbon-Neutral Delivery</span><span>${shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span></div>
        ${discount > 0 ? `<div class="summary-row" style="color: #12602F;"><span>Promotional Discount</span><span>-$${discount.toFixed(2)}</span></div>` : ''}
        ${tax > 0 ? `<div class="summary-row"><span>Applicable Tax / GST</span><span>$${tax.toFixed(2)}</span></div>` : ''}
        <div class="summary-row summary-total">
          <span>Total Amount Paid</span>
          <span>$${total.toFixed(2)} USD</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Morkins Botanical Apothecary &bull; Pure Clean Clinical Formulations &bull; support@morkins.com</p>
      <p style="margin-top: 4px;">Thank you for trusting Morkins with your botanical skincare journey.</p>
    </div>
  </div>
  <div class="print-btn-bar">
    <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
  </div>
</body>
</html>`;
}

/**
 * Triggers an instant download of the PDF invoice file
 */
export function downloadInvoicePdf(order: Order): void {
  const pdfBytes = generateInvoicePdfContent(order);
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Morkins-Invoice-${order.id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke after a safe delay so browser can complete writing file to disk
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

/**
 * Generates and downloads the standalone HTML invoice
 */
export function downloadHtmlInvoice(order: Order): void {
  const htmlContent = generateHtmlInvoice(order);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Morkins-Invoice-${order.id}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

/**
 * Generates and downloads the raw order data file (PDF, HTML, TXT, or JSON manifest)
 */
export function downloadOrderFile(order: Order, format: 'pdf' | 'html' | 'txt' | 'json' = 'pdf'): void {
  if (format === 'pdf') {
    downloadInvoicePdf(order);
    return;
  }
  if (format === 'html') {
    downloadHtmlInvoice(order);
    return;
  }

  let content = '';
  let mimeType = 'text/plain';
  let extension = 'txt';

  const subtotal = order.subtotal || order.items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const tax = order.tax || 0;
  const shippingFee = order.shippingFee || 0;
  const discount = order.discount || 0;
  const total = order.total || subtotal + tax + shippingFee - discount;

  if (format === 'json') {
    const fullOrderManifest = {
      brand: 'Morkins Botanical Apothecary',
      invoiceNumber: `INV-${order.id}-${new Date().getFullYear()}`,
      orderId: order.id,
      orderDate: order.date,
      status: order.status,
      customer: {
        name: order.customerName || 'Valued Botanical Client',
        email: order.customerEmail || 'client@morkins.com',
        phone: order.customerPhone || '+1 (555) 019-2834',
        shippingAddress: order.shippingAddress || 'Default Address',
      },
      payment: {
        method: order.paymentMethod,
        status: order.paymentStatus || 'Paid',
        transactionId: `TXN-${order.id.replace(/\D/g, '') || '98211'}-MK2026`,
      },
      shipping: {
        carrier: 'BlueDart Express Air / Eco Courier',
        trackingNumber: order.trackingNumber || 'BD-884920194IN',
        estimatedDelivery: order.estimatedDelivery,
      },
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        qty: item.qty,
        unitPrice: item.price,
        totalPrice: item.price * item.qty,
      })),
      pricing: {
        subtotal,
        ecoPackaging: 0.0,
        shippingFee,
        tax,
        discount,
        total,
        currency: 'USD',
      },
      qualityAssurance: {
        purityGuarantee: '100% Bio-Active Botanical Certified',
        testedBy: 'Morkins Clinical Labs',
        verificationRef: `MRK-QA-${order.id}`,
      },
      generatedAt: new Date().toISOString(),
    };

    content = JSON.stringify(fullOrderManifest, null, 2);
    mimeType = 'application/json;charset=utf-8';
    extension = 'json';
  } else {
    // TXT formatted receipt
    content = `===============================================================
               MORKINS BOTANICAL APOTHECARY
         Official Botanical Formulations Tax Invoice
===============================================================

INVOICE DETAILS:
  Invoice Number   : INV-${order.id}-${new Date().getFullYear()}
  Order ID         : #${order.id}
  Order Date       : ${order.date}
  Order Status     : ${order.status.toUpperCase()}
  Payment Status   : ${order.paymentStatus || 'Paid in Full'}
  Payment Method   : ${order.paymentMethod}
  Tracking Number  : ${order.trackingNumber || 'N/A'}
  Estimated Delivery: ${order.estimatedDelivery || 'N/A'}

RECIPIENT & DELIVERY ADDRESS:
  Customer Name    : ${order.customerName || 'Valued Client'}
  Email Address    : ${order.customerEmail || 'client@morkins.com'}
  Phone Number     : ${order.customerPhone || 'N/A'}
  Shipping Address : ${order.shippingAddress || 'N/A'}

---------------------------------------------------------------
ITEMIZED FORMULATIONS:
---------------------------------------------------------------
${order.items
  .map(
    (item, idx) =>
      `${String(idx + 1).padStart(2, ' ')}. ${item.name.padEnd(35, ' ')} | Qty: ${String(item.qty).padStart(2, ' ')} | Price: $${item.price.toFixed(2)} | Sub: $${(item.price * item.qty).toFixed(2)}`
  )
  .join('\n')}

---------------------------------------------------------------
CALCULATION BREAKDOWN:
---------------------------------------------------------------
  Formulas Subtotal          : $${subtotal.toFixed(2)}
  Eco Botanical Packaging    : FREE ($0.00)
  Express Courier Delivery   : ${shippingFee === 0 ? 'FREE ($0.00)' : `$${shippingFee.toFixed(2)}`}
  Applicable Tax / GST       : $${tax.toFixed(2)}
  -------------------------------------------------------------
  TOTAL AMOUNT PAID          : $${total.toFixed(2)} USD
---------------------------------------------------------------

CERTIFICATION & CLINICAL WARRANTY:
  All products are guaranteed 100% authentic, bio-active, vegan,
  and cruelty-free. Sealed in temperature-controlled eco packing.

SUPPORT & INQUIRIES:
  Email: support@morkins.com | Web: www.morkins.com
===============================================================`;
    mimeType = 'text/plain;charset=utf-8';
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Morkins-Order-${order.id}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

/**
 * Generates and downloads an official Morkins Return Authorization Slip & Credit Note
 */
export function downloadReturnSlip(
  returnReq: {
    returnId: string;
    orderId: string;
    date: string;
    status: string;
    refundAmount: number;
    bonusAmount?: number;
    refundMethod: string;
    pickupDate?: string;
    pickupSlot?: string;
    pickupOtp?: string;
    carrier?: string;
    trackingNumber?: string;
    pickupAddress?: string;
    reason: string;
    creditNoteNumber?: string;
    items: { itemId: number; name: string; qty: number; price: number; reason: string; batchNumber?: string }[];
  }
): void {
  const creditNote = returnReq.creditNoteNumber || `CN-MK-${returnReq.returnId.replace('RET-', '')}`;
  const totalCredit = (returnReq.refundAmount || 0) + (returnReq.bonusAmount || 0);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Morkins Return Authorization - ${returnReq.returnId}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F2; color: #1C2E1A; padding: 30px 15px; }
    .container { max-width: 750px; margin: 0 auto; background: #FFF; border-radius: 20px; border: 1px solid #E5DEC9; box-shadow: 0 10px 30px rgba(0,0,0,0.06); overflow: hidden; }
    .ribbon { height: 8px; background: linear-gradient(90deg, #12602F, #C49746, #AFD971); }
    .header { padding: 30px 36px; border-bottom: 1px solid #E5DEC9; display: flex; justify-content: space-between; align-items: flex-start; }
    .brand { font-size: 24px; font-weight: 800; color: #12602F; letter-spacing: 2px; }
    .subtitle { font-size: 10px; font-weight: 700; color: #8C6221; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 3px; }
    .pass-tag { background: #D8EFE3; color: #0D3322; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; display: inline-block; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 24px 36px; background: #FAF8F2; border-bottom: 1px solid #E5DEC9; font-size: 12px; }
    .meta-card { background: #FFF; border: 1px solid #E5DEC9; border-radius: 12px; padding: 16px; }
    .meta-card h4 { font-size: 10px; color: #8C6221; text-transform: uppercase; font-weight: 700; margin-bottom: 6px; }
    .otp-box { background: #12602F; color: #FFF; padding: 10px 14px; border-radius: 8px; display: inline-block; font-size: 16px; font-weight: 800; font-family: monospace; letter-spacing: 3px; margin-top: 6px; }
    .table-box { padding: 24px 36px; border-bottom: 1px solid #E5DEC9; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { text-align: left; padding: 10px; background: #FAF8F2; color: #8C6221; font-size: 10px; text-transform: uppercase; border-bottom: 1px solid #E5DEC9; }
    td { padding: 12px 10px; border-bottom: 1px solid #F0ECE1; }
    .financials { padding: 24px 36px; background: #FAF8F2; border-bottom: 1px solid #E5DEC9; display: flex; justify-content: space-between; align-items: center; }
    .footer { padding: 20px 36px; text-align: center; font-size: 11px; color: #777; }
    .print-btn { display: block; width: 200px; margin: 20px auto 0; padding: 10px 20px; background: #12602F; color: #FFF; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; text-transform: uppercase; font-size: 12px; }
    @media print { .print-btn { display: none; } body { padding: 0; background: #FFF; } .container { border: none; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="ribbon"></div>
    <div class="header">
      <div>
        <div class="brand">MORKINS</div>
        <div class="subtitle">Botanical Satisfaction Guarantee Pass</div>
        <p style="font-size: 11px; color: #666; margin-top: 6px;">Credit Note / Return Authorization: <strong>${creditNote}</strong></p>
      </div>
      <div style="text-align: right;">
        <div class="pass-tag">✓ Authorized Return</div>
        <p style="font-size: 12px; font-family: monospace; font-weight: 700; color: #12602F; margin-top: 6px;">#${returnReq.returnId}</p>
        <p style="font-size: 11px; color: #666;">Date: ${returnReq.date}</p>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-card">
        <h4>Doorstep Courier Logistics</h4>
        <p><strong>Carrier:</strong> ${returnReq.carrier || 'BlueDart Express Eco'}</p>
        <p><strong>Pickup Tracking AWB:</strong> ${returnReq.trackingNumber || 'PENDING-AWB'}</p>
        <p><strong>Pickup Window:</strong> ${returnReq.pickupDate || 'Tomorrow'} (${returnReq.pickupSlot || 'Morning 9AM-1PM'})</p>
        <p style="margin-top: 6px; font-size: 11px; color: #555;"><strong>Address:</strong> ${returnReq.pickupAddress || 'Default Sanctuary Address'}</p>
      </div>

      <div class="meta-card">
        <h4>Doorstep Security OTP</h4>
        <p style="font-size: 11px; color: #555;">Share this OTP with courier rider during pickup:</p>
        <div class="otp-box">${returnReq.pickupOtp || '8492'}</div>
        <p style="font-size: 10px; color: #888; margin-top: 6px;">Zero Label Required: Rider brings pre-printed biodegradable bag.</p>
      </div>
    </div>

    <div class="table-box">
      <h4 style="font-size: 11px; text-transform: uppercase; color: #12602F; font-weight: 700; margin-bottom: 12px;">Formulations Authorized for Return</h4>
      <table>
        <thead>
          <tr>
            <th>Product Description</th>
            <th style="text-align: center;">Qty</th>
            <th>Return Reason</th>
            <th style="text-align: right;">Authorized Refund</th>
          </tr>
        </thead>
        <tbody>
          ${returnReq.items
            .map(
              (i) => `
            <tr>
              <td><strong>${i.name}</strong><br><small style="color: #888;">Batch: ${i.batchNumber || 'MRK-BOT-2026'}</small></td>
              <td style="text-align: center; font-weight: bold;">${i.qty}</td>
              <td style="font-size: 11px; color: #555;">${i.reason}</td>
              <td style="text-align: right; font-weight: bold; color: #12602F;">$${(i.price * i.qty).toFixed(2)}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>

    <div class="financials">
      <div>
        <p style="font-size: 11px; color: #666; text-transform: uppercase; font-weight: 700;">Reimbursement Mode</p>
        <p style="font-size: 13px; font-weight: 700; color: #12602F; margin-top: 2px;">${returnReq.refundMethod}</p>
        <p style="font-size: 11px; color: #888;">Doorstep Reverse Pickup Fee: <strong>$0.00 (FREE)</strong></p>
      </div>
      <div style="text-align: right;">
        <p style="font-size: 11px; color: #666; text-transform: uppercase; font-weight: 700;">Total Payout Credit</p>
        <p style="font-size: 22px; font-weight: 800; color: #12602F;">$${totalCredit.toFixed(2)} <span style="font-size: 12px; font-weight: 400; color: #666;">USD</span></p>
      </div>
    </div>

    <div class="footer">
      <p>Morkins Formulation Labs &bull; 30-Day Botanical Satisfaction Guarantee &bull; support@morkins.com</p>
    </div>
  </div>

  <button class="print-btn" onclick="window.print()">Print / Save Pass</button>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Morkins-Return-Pass-${returnReq.returnId}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
