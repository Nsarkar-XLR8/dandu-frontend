import { AlertTriangle, Clock, Package, TrendingDown } from 'lucide-react';

export interface InventoryAlert {
  sku: string;
  title: string;
  type: 'DEAD_STOCK' | 'AGED_STOCK' | 'CRITICAL_LOW' | 'OUT_OF_STOCK';
  detail: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

const TYPE_CONFIG = {
  DEAD_STOCK: {
    icon: <TrendingDown className="size-4" />,
    label: 'Dead Stock',
    bg: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
  },
  AGED_STOCK: {
    icon: <Clock className="size-4" />,
    label: 'Aging Stock',
    bg: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
  },
  CRITICAL_LOW: {
    icon: <AlertTriangle className="size-4" />,
    label: 'Critical Low',
    bg: 'bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-700',
  },
  OUT_OF_STOCK: {
    icon: <Package className="size-4" />,
    label: 'Out of Stock',
    bg: 'bg-slate-50 border-slate-300',
    badge: 'bg-slate-200 text-slate-700',
  },
};

export function InventoryAlerts({ alerts }: { alerts: InventoryAlert[] }) {
  if (!alerts.length) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
        <Package className="size-4 shrink-0" />
        <span><strong>All clear!</strong> No inventory alerts at this time.</span>
      </div>
    );
  }

  const counts = {
    HIGH: alerts.filter((a) => a.severity === 'HIGH').length,
    MEDIUM: alerts.filter((a) => a.severity === 'MEDIUM').length,
    LOW: alerts.filter((a) => a.severity === 'LOW').length,
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-red-500" />
          <h3 className="text-base font-black text-slate-900">Inventory Alerts</h3>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          {counts.HIGH > 0 && (
            <span className="rounded-full bg-red-100 px-2.5 py-1 text-red-700">{counts.HIGH} High</span>
          )}
          {counts.MEDIUM > 0 && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">{counts.MEDIUM} Med</span>
          )}
          {counts.LOW > 0 && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{counts.LOW} Low</span>
          )}
        </div>
      </div>

      <div className="divide-y divide-slate-50">
        {alerts.map((alert, i) => {
          const cfg = TYPE_CONFIG[alert.type];
          return (
            <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i === 0 ? '' : ''}`}>
              <div className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border ${cfg.bg} ${cfg.badge}`}>
                {cfg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-700">{alert.sku}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                </div>
                <div className="truncate text-sm font-medium text-slate-700">{alert.title}</div>
                <div className="text-xs text-slate-500">{alert.detail}</div>
              </div>
              <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${
                alert.severity === 'HIGH'
                  ? 'bg-red-100 text-red-700'
                  : alert.severity === 'MEDIUM'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {alert.severity}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
