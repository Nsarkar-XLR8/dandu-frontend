import { useState } from 'react';
import { AlertTriangle, CheckCircle, Package, ShoppingCart, Truck } from 'lucide-react';
import { SkuMetrics } from '../../lib/authApi';

interface RestockInfo {
  channel: string;
  country: string;
  dailySalesRate: number;
  availableStock: number;
  daysOfCover: number;
  reorderPoint: number;
  suggestedOrderQty: number;
  urgency: 'CRITICAL' | 'LOW' | 'HEALTHY';
}

function calcRestock(metrics: SkuMetrics, leadTimeDays: number, targetCoverDays: number): RestockInfo[] {
  const CHANNELS = [
    { channel: 'AMAZON', country: 'US', label: 'Amazon US' },
    { channel: 'AMAZON', country: 'CA', label: 'Amazon CA' },
  ];

  return CHANNELS.map(({ channel, country, label }) => {
    // Get 30-day sales for this channel
    const sales30 = metrics.salesMetrics.filter(
      (m: any) => m.channel === channel && m.country === country,
    ) as any[];

    const units30 = sales30.reduce((sum: number, m: any) => sum + (m.unitsSold || 0), 0);
    const dailySalesRate = units30 / 30;

    // FBA stock for this country
    const fbaStock = (metrics.stock.find(
      (s: any) => s.locationType === 'FBA' && s.country === country,
    ) as any)?.available ?? 0;

    const daysOfCover = dailySalesRate > 0 ? Math.round(fbaStock / dailySalesRate) : 999;
    const reorderPoint = Math.ceil(leadTimeDays * dailySalesRate);
    const suggestedOrderQty = Math.max(
      0,
      Math.ceil(targetCoverDays * dailySalesRate) - fbaStock,
    );

    let urgency: RestockInfo['urgency'] = 'HEALTHY';
    if (daysOfCover <= leadTimeDays) urgency = 'CRITICAL';
    else if (daysOfCover <= leadTimeDays * 1.5) urgency = 'LOW';

    return {
      channel: label,
      country,
      dailySalesRate: parseFloat(dailySalesRate.toFixed(1)),
      availableStock: fbaStock,
      daysOfCover,
      reorderPoint,
      suggestedOrderQty,
      urgency,
    };
  });
}

const urgencyConfig = {
  CRITICAL: {
    bg: 'bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-700',
    icon: <AlertTriangle className="size-4 text-red-600" />,
    label: 'Order Now',
  },
  LOW: {
    bg: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    icon: <Truck className="size-4 text-amber-600" />,
    label: 'Plan Reorder',
  },
  HEALTHY: {
    bg: 'bg-emerald-50 border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
    icon: <CheckCircle className="size-4 text-emerald-600" />,
    label: 'Stock OK',
  },
};

export function RestockCalculator({ data }: { data: SkuMetrics }) {
  const [leadTime, setLeadTime] = useState(21);
  const [targetCover, setTargetCover] = useState(60);

  const results = calcRestock(data, leadTime, targetCover);
  const hasCritical = results.some((r) => r.urgency === 'CRITICAL');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <Package className="size-5 text-emerald-700" />
          <h3 className="text-base font-black text-slate-900">Restock Calculator</h3>
          {hasCritical && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
              <AlertTriangle className="size-3" /> Action Required
            </span>
          )}
        </div>
        {/* Configurable inputs */}
        <div className="flex items-center gap-3 text-sm">
          <label className="flex items-center gap-1.5 text-slate-500">
            Lead Time
            <input
              type="number"
              min={1}
              max={120}
              value={leadTime}
              onChange={(e) => setLeadTime(Number(e.target.value))}
              className="w-14 rounded-lg border border-slate-200 px-2 py-1 text-center font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600"
            />
            days
          </label>
          <label className="flex items-center gap-1.5 text-slate-500">
            Target Cover
            <input
              type="number"
              min={1}
              max={365}
              value={targetCover}
              onChange={(e) => setTargetCover(Number(e.target.value))}
              className="w-14 rounded-lg border border-slate-200 px-2 py-1 text-center font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-600"
            />
            days
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-3 p-4 md:grid-cols-2">
        {results.map((r) => {
          const cfg = urgencyConfig[r.urgency];
          return (
            <div key={r.channel} className={`rounded-xl border p-4 ${cfg.bg}`}>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-bold text-slate-900">{r.channel}</span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${cfg.badge}`}>
                  {cfg.icon} {cfg.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wide text-slate-400">FBA Stock</div>
                  <div className="font-bold text-slate-900">{r.availableStock} units</div>
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wide text-slate-400">Daily Rate</div>
                  <div className="font-bold text-slate-900">{r.dailySalesRate} units/day</div>
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wide text-slate-400">Days of Cover</div>
                  <div className={`text-lg font-black ${r.urgency === 'CRITICAL' ? 'text-red-600' : r.urgency === 'LOW' ? 'text-amber-600' : 'text-emerald-700'}`}>
                    {r.daysOfCover === 999 ? '∞' : `${r.daysOfCover}d`}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wide text-slate-400">Reorder Point</div>
                  <div className="font-bold text-slate-900">{r.reorderPoint} units</div>
                </div>
              </div>
              {r.suggestedOrderQty > 0 && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2">
                  <ShoppingCart className="size-4 shrink-0 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    Suggested PO: <strong className="text-slate-900">{r.suggestedOrderQty} units</strong>
                    <span className="ml-1 text-slate-400">(for {targetCover}d cover)</span>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
