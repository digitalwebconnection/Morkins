
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Package, Truck, CheckCircle2, RotateCcw, Download,
  ArrowLeft, Copy, Check, CreditCard, MapPin,
  ShieldCheck, Printer, AlertCircle, ShoppingBag,
  Share2, FileCode, CheckCircle, ChevronDown
} from 'lucide-react';
import { getOrderById } from '../../lib/api/orders';
import { downloadInvoicePdf, downloadOrderFile } from '../../lib/utils/invoicePdf';
import ReturnRequestModal from '../../components/shared/ReturnRequestModal';
import morkinsLogo from '../../assets/images/logo/logo.png';
import type { Order, OrderItem } from '../../types';

interface OrderDetailsPageProps {
  onAddToCart?: (product: any, openCartAfter?: boolean) => void;
}

export default function OrderDetailsPage({ onAddToCart }: OrderDetailsPageProps) {
  const { orderId } = useParams<{ orderId: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopiedId, setIsCopiedId] = useState(false);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [reordered, setReordered] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      setIsLoading(true);
      getOrderById(orderId).then((data) => {
        setOrder(data);
        setIsLoading(false);
      });
    }
  }, [orderId]);

  const handleCopyOrderId = () => {
    if (order) {
      navigator.clipboard.writeText(order.id);
      setIsCopiedId(true);
      setTimeout(() => setIsCopiedId(false), 2000);
    }
  };

  const handleCopyInvoiceLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopiedLink(true);
    setTimeout(() => setIsCopiedLink(false), 2000);
  };

  const handleDownloadPdf = () => {
    if (!order) return;
    setIsDownloadingPdf(true);
    try {
      downloadInvoicePdf(order);
      setDownloadSuccessMessage(`Official Invoice PDF (Morkins-Invoice-${order.id}.pdf) downloaded successfully.`);
      setTimeout(() => setDownloadSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Error generating PDF invoice', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadFile = (format: 'pdf' | 'html' | 'txt' | 'json') => {
    if (!order) return;
    setShowDownloadMenu(false);
    try {
      if (format === 'pdf') {
        handleDownloadPdf();
        return;
      }
      downloadOrderFile(order, format);
      setDownloadSuccessMessage(
        format === 'html'
          ? `Standalone Web Invoice (Morkins-Invoice-${order.id}.html) downloaded.`
          : format === 'json'
          ? `Order Manifest Data (Morkins-Order-${order.id}.json) downloaded.`
          : `Itemized Order Receipt (Morkins-Order-${order.id}.txt) downloaded.`
      );
      setTimeout(() => setDownloadSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Error exporting order file', err);
    }
  };

  const handleReorder = () => {
    if (order && onAddToCart) {
      order.items.forEach((item) => {
        onAddToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          img: item.img,
        });
      });
      setReordered(true);
      setTimeout(() => setReordered(false), 3500);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-[#12602F] border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#12602F]">
              Generating Botanical Invoice
            </p>
            <p className="text-xs text-stone-500 font-mono">Order ID: #{orderId}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#12602F]/15 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1C2E1A] mb-2">Order Not Found</h2>
          <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
            We couldn't locate order record "<strong>{orderId}</strong>". Please verify your order number in your profile archive or contact customer support.
          </p>
          <div className="flex flex-col gap-2.5">
            <Link
              to="/profile"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#12602F] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1B6A45] transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Profile Orders</span>
            </Link>
            <Link
              to="/orders/MK-98211"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#F0F6F2] text-[#12602F] text-xs font-bold uppercase tracking-wider hover:bg-[#D8EFE3] transition-colors"
            >
              <span>View Sample Order #MK-98211</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = order.subtotal || order.items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const tax = order.tax || 0;
  const shippingFee = order.shippingFee || 0;
  const discount = order.discount || 0;
  const total = order.total || subtotal + tax + shippingFee - discount;

  const isDelivered = order.status.toLowerCase() === 'delivered';
  const isShipped = order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'out for delivery';
  const invoiceNumber = `INV-${order.id}-${new Date().getFullYear()}`;

  return (
    <div className="min-h-screen bg-[#FAF8F2] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ── Screen & Print Styles ── */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            background: white !important;
            border: none !important;
            box-shadow: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-5">
        {/* ── PART 1: NAVIGATION & INVOICE EXPORT TOOLBAR (no-print) ── */}
        {/* Breadcrumb back button, instant PDF generator, browser printer trigger, format dropdown (PDF/HTML/TXT/JSON), and web link sharing */}
        <div className="relative z-30 flex flex-wrap items-center justify-between gap-4 no-print bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-[#12602F]/10 shadow-xs">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#12602F] hover:text-[#1F7A3E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile & Orders</span>
          </Link>

          <div className="flex items-center flex-wrap gap-2">
            {/* Direct PDF Download Button */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="px-4 py-2.5 rounded-xl bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-md active:scale-98"
              title="Download official PDF invoice file"
            >
              <Download className={`w-4 h-4 ${isDownloadingPdf ? 'animate-bounce' : ''}`} />
              <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            {/* Print / Save as PDF Native Dialog */}
            <button
              type="button"
              onClick={handlePrintInvoice}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C1] hover:border-[#12602F] text-[#1C2E1A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-2xs hover:bg-[#FAF8F2]"
              title="Print or Save as PDF using browser printer"
            >
              <Printer className="w-4 h-4 text-[#8C6221]" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            {/* Download Order File (JSON / TXT) Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C1] hover:border-[#12602F] text-[#1C2E1A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:bg-[#FAF8F2]"
                title="Download Raw Order Data File"
              >
                <FileCode className="w-4 h-4 text-[#12602F]" />
                <span className="hidden sm:inline">Download Order File</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {showDownloadMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDownloadMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#12602F]/15 py-2 z-50 animate-fade-in">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100 mb-1">
                      Select File Format
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadFile('pdf')}
                      className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-[#F0F6F2] hover:text-[#12602F] flex items-center justify-between cursor-pointer font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Download className="w-3.5 h-3.5 text-[#12602F]" />
                        <span>Official Invoice (.pdf)</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadFile('html')}
                      className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-[#F0F6F2] hover:text-[#12602F] flex items-center justify-between cursor-pointer font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Printer className="w-3.5 h-3.5 text-[#8C6221]" />
                        <span>Web Invoice (.html)</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">HTML</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadFile('txt')}
                      className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-[#F0F6F2] hover:text-[#12602F] flex items-center justify-between cursor-pointer font-medium transition-colors"
                    >
                      <span>Itemized Receipt (.txt)</span>
                      <span className="text-[10px] font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">TXT</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadFile('json')}
                      className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-[#F0F6F2] hover:text-[#12602F] flex items-center justify-between cursor-pointer font-medium transition-colors"
                    >
                      <span>Raw Data Manifest (.json)</span>
                      <span className="text-[10px] font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">JSON</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Share / Copy Link */}
            <button
              type="button"
              onClick={handleCopyInvoiceLink}
              className="p-2.5 rounded-xl bg-white border border-[#DDD3C1] hover:border-[#12602F] text-stone-700 hover:text-[#12602F] text-xs transition-colors cursor-pointer shadow-2xs"
              title="Copy Invoice Web Link"
            >
              {isCopiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Success Toast / Notification */}
        {downloadSuccessMessage && (
          <div className="p-3.5 bg-[#D8EFE3] border border-[#12602F]/20 rounded-2xl text-[#0D3322] text-xs font-bold flex items-center justify-between animate-fade-in no-print shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#12602F] shrink-0" />
              <span>{downloadSuccessMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setDownloadSuccessMessage(null)}
              className="text-[#12602F] hover:text-[#0D3322] cursor-pointer text-xs font-bold uppercase"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Reorder Notification (no-print) */}
        {reordered && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-bold flex items-center justify-between animate-fade-in no-print">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All formulas from Order #{order.id} have been added to your shopping bag!</span>
            </div>
            <span className="text-emerald-700">✓ Added to Cart</span>
          </div>
        )}

        {/* ── PART 2: MAIN PRINTABLE TAX INVOICE CARD ── */}
        {/* Official tax invoice matching GST/EIN requirements, customer addresses, breakdown table, and QA sign-off */}
        <div
          id="printable-invoice"
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5DEC9] shadow-xl relative overflow-hidden text-[#1C2E1A]"
        >
          {/* Top Decorative Gold/Green Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#12602F] via-[#8C6221] to-[#AFD971]" />

          {/* ── Header Section ── */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[#E5DEC9]">
            <div>
              <div className="flex items-center gap-3.5 mb-2">
                <img
                  src={morkinsLogo}
                  alt="Morkins"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <span className="text-[10px] font-mono tracking-widest text-[#8C6221] uppercase border-l border-[#DDD3C1] pl-3.5 font-bold">
                  Botanical Apothecary
                </span>
              </div>
              <p className="text-xs font-serif italic text-stone-500 mb-2">
                Pure Clinical Formulations • Bio-Active Botanicals
              </p>
              <div className="text-[11px] text-stone-500 space-y-0.5 leading-relaxed">
                <p>Morkins Formulation Labs LLC • Tax GSTIN/EIN: MK-US-8921-2026</p>
                <p>Support: support@morkins.com • +1 (800) 555-MORKINS</p>
              </div>
            </div>

            {/* Invoice Meta Pill & Status */}
            <div className="flex flex-col items-start sm:items-end gap-2 bg-[#FAF8F2] sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-[#E5DEC9]">
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6221] font-bold block">
                  Official Tax Invoice
                </span>
                <span className="font-mono text-sm sm:text-base font-extrabold text-[#12602F]">
                  {invoiceNumber}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isDelivered
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : isShipped
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-stone-100 text-stone-800 border border-stone-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isDelivered ? 'bg-emerald-600' : isShipped ? 'bg-amber-600 animate-pulse' : 'bg-stone-500'}`} />
                  <span>{order.status}</span>
                </span>
                <span className="text-[10px] font-mono text-stone-500 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200/60 font-bold">
                  ✓ PAID
                </span>
              </div>
            </div>
          </div>

          {/* ── Key Metrics 4-Column Bar ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-b border-[#E5DEC9] bg-[#FAF8F2]/60 -mx-6 sm:-mx-10 px-6 sm:px-10 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block mb-0.5">
                Order ID
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-[#1C2E1A]">#{order.id}</span>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="p-0.5 text-stone-400 hover:text-[#12602F] transition-colors cursor-pointer no-print"
                  title="Copy Order ID"
                >
                  {isCopiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block mb-0.5">
                Invoice Date
              </span>
              <span className="font-medium text-stone-700">{order.date}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block mb-0.5">
                Payment Mode
              </span>
              <span className="font-medium text-stone-700 truncate block" title={order.paymentMethod}>
                {order.paymentMethod}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block mb-0.5">
                Estimated Delivery
              </span>
              <span className="font-medium text-stone-700 truncate block">
                {order.estimatedDelivery || 'Delivered Safely'}
              </span>
            </div>
          </div>

          {/* ── Interactive Actions Bar (Reorder & Return - no-print) ── */}
          <div className="py-3.5 border-b border-[#E5DEC9] flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex items-center flex-wrap gap-2">
              <button
                type="button"
                onClick={handleReorder}
                className="px-3.5 py-1.5 rounded-xl bg-[#12602F] hover:bg-[#1B6A45] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Reorder All Formulas</span>
              </button>

              {isDelivered && (
                <button
                  type="button"
                  onClick={() => setIsReturnModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F0F6F2] hover:bg-[#D8EFE3] text-[#12602F] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Request Return / Refund</span>
                </button>
              )}

              <Link
                to={`/profile`}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#DDD3C1] hover:border-[#12602F] text-stone-700 hover:text-[#12602F] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Truck className="w-3.5 h-3.5 text-[#8C6221]" />
                <span>Track in Profile</span>
              </Link>
            </div>

            {order.trackingNumber && (
              <span className="text-[11px] text-stone-500 font-mono">
                Courier AWB: <strong className="text-[#12602F] font-bold">{order.trackingNumber}</strong>
              </span>
            )}
          </div>

          {/* ── 2-Column Addresses: Billed To / Shipped To ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-[#E5DEC9] text-xs">
            {/* Bill To */}
            <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DEC9]/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6221] flex items-center gap-1.5 mb-1.5">
                <CreditCard className="w-3 h-3" />
                <span>Billed To</span>
              </span>
              <p className="font-bold text-[#1C2E1A] text-sm">{order.customerName || 'Ananya Sharma'}</p>
              <p className="text-stone-600 font-mono text-[11px]">{order.customerEmail || 'ananya.sharma@morkins.com'}</p>
              <p className="text-stone-600 font-mono text-[11px]">{order.customerPhone || '+91 98765 01928'}</p>
              <p className="text-stone-500 text-[11px] pt-1 leading-relaxed">
                Payment: {order.paymentMethod} (Verified & Cleared)
              </p>
            </div>

            {/* Ship To */}
            <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DEC9]/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6221] flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3 h-3" />
                <span>Shipped Destination</span>
              </span>
              <p className="font-bold text-[#1C2E1A] text-sm">{order.customerName || 'Ananya Sharma'}</p>
              <p className="text-stone-700 leading-relaxed font-medium">
                {order.shippingAddress || 'Flat 402, Green Glen Sanctuary, Outer Ring Road, Bengaluru, KA 560103'}
              </p>
              <p className="text-stone-500 text-[11px] pt-1">
                Packaging: Eco-Certified Temperature Controlled Seal
              </p>
            </div>
          </div>

          {/* ── Itemized Formulations Table ── */}
          <div className="py-6 border-b border-[#E5DEC9]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#12602F] flex items-center gap-2">
                <Package className="w-4 h-4 text-[#8C6221]" />
                <span>Itemized Formulations & Botanical Breakdown</span>
              </h4>
              <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">
                {order.items.length} Item{order.items.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5DEC9] bg-[#FAF8F2] text-[#8C6221] font-bold text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 px-3 rounded-l-lg">Item</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Price</th>
                    <th className="py-2.5 px-3 text-right rounded-r-lg">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DEC9]/60">
                  {order.items.map((item: OrderItem, idx: number) => (
                    <tr key={item.id || idx} className="hover:bg-[#FAF8F2]/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-xl bg-[#FAF8F2] border border-[#DDD3C1] shrink-0"
                          />
                          <div>
                            <p className="font-bold text-[#1C2E1A] sm:text-sm">{item.name}</p>
                            <p className="text-[10px] font-mono text-stone-400 mt-0.5">
                              Batch: MRK-BOT-{item.id} • 100% Bio-Active
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-stone-700">
                        {item.qty}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-stone-600">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-extrabold text-[#12602F]">
                        ${(item.price * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Cost Summary & Botanical QA Assurance Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-[#E5DEC9]">
            {/* Left: Quality Assurance & Formulator Sign-Off */}
            <div className="p-4 rounded-2xl bg-[#F0F6F2] border border-[#12602F]/15 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#12602F] flex items-center gap-1.5 mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#12602F]" />
                  <span>Clinical Purity & QA Certification</span>
                </span>
                <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                  Formulated without parabens, sulfates, silicones, or synthetic fragrances. Each batch undergoes rigorous dermal tolerance and bio-stability validation.
                </p>
              </div>

              <div className="pt-2 border-t border-[#12602F]/10 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                <div>
                  <p className="font-bold text-[#12602F]">Dr. Elena Vance</p>
                  <p>Chief Botanical Formulator</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-[#12602F] text-[#AFD971] font-bold text-[9px] uppercase tracking-wider">
                    QA Passed
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Price Calculations */}
            <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#E5DEC9] space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Formulations Subtotal</span>
                <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Eco Botanical Packaging</span>
                <span className="text-emerald-700 font-bold uppercase text-[10px]">Free ($0.00)</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Carbon-Neutral Express Shipping</span>
                <span className="font-mono text-stone-700">
                  {shippingFee === 0 ? 'FREE ($0.00)' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Promotional Botanical Discount</span>
                  <span className="font-mono">-${discount.toFixed(2)}</span>
                </div>
              )}
              {tax > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>Applicable Sales Tax / GST</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#E5DEC9] flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C2E1A]">
                  Total Amount Paid
                </span>
                <span className="font-serif text-xl font-extrabold text-[#12602F]">
                  ${total.toFixed(2)} <span className="text-xs font-sans font-normal text-stone-500">USD</span>
                </span>
              </div>
            </div>
          </div>

          {/* ── Transit Journey Timeline (if present) ── */}
          {order.timeline && order.timeline.length > 0 && (
            <div className="py-6 border-b border-[#E5DEC9]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6221] mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#12602F]" />
                <span>Verified Shipment Tracking Milestones</span>
              </h4>
              <div className="space-y-3">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      step.completed ? 'bg-[#12602F] text-white' : 'bg-stone-200 text-stone-400'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${step.completed ? 'text-[#1C2E1A]' : 'text-stone-400'}`}>
                          {step.status}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">{step.date}</span>
                      </div>
                      <p className="text-stone-500 text-[11px]">{step.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Printable Footer Notes ── */}
          <div className="mt-8 pt-6 border-t border-stone-200 text-center text-[10px] text-stone-400 space-y-1.5 flex flex-col items-center">
            <img
              src={morkinsLogo}
              alt="Morkins"
              className="h-6 w-auto object-contain opacity-70 grayscale-20 mb-0.5"
            />
            <p className="font-medium text-stone-500">
              Morkins Botanical Apothecary • Pure Clean Clinical Formulations • www.morkins.com
            </p>
            <p>
              This is a computer-generated tax invoice for Order #{order.id}. No physical signature is required.
            </p>
            <p className="italic">
              Thank you for trusting Morkins with your botanical skincare journey.
            </p>
          </div>
        </div>

        {/* ── Bottom Action Quick Links (no-print) ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-[#E5DEC9] shadow-xs no-print text-xs">
          <div className="flex items-center gap-2 text-stone-500 font-mono">
            <span>Invoice Reference:</span>
            <strong className="text-[#12602F]">{invoiceNumber}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="px-4 py-2 rounded-xl bg-[#12602F] hover:bg-[#1B6A45] text-white font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              type="button"
              onClick={handlePrintInvoice}
              className="px-4 py-2 rounded-xl bg-[#FAF8F2] hover:bg-[#F0F6F2] text-[#12602F] border border-[#DDD3C1] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Return Request Modal */}
      <ReturnRequestModal
        order={order}
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        onSuccess={() => {
          setIsReturnModalOpen(false);
          getOrderById(order.id).then((o) => setOrder(o));
        }}
      />
    </div>
  );
}
