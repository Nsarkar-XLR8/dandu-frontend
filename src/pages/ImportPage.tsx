import { FormEvent, useState } from 'react';
import { FileUp, Loader2 } from 'lucide-react';
import { DataPreview, InlineError, Panel } from '../components/ui';
import { authApi, AuthSession } from '../lib/authApi';

export function ImportPage({ session }: { session: AuthSession }) {
  const [fileName, setFileName] = useState('historical-sku-report.csv');
  const [content, setContent] = useState('');
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authApi.importSkuReport(session.accessToken, { fileName, content });
      setResult(response.data);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel title="Historical CSV Import">
      <form className="space-y-3" onSubmit={submit}>
        <input className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-600" value={fileName} onChange={(event) => setFileName(event.target.value)} />
        <textarea className="min-h-52 w-full rounded-xl border border-slate-200 p-3 font-mono text-xs outline-none focus:ring-2 focus:ring-emerald-600" value={content} onChange={(event) => setContent(event.target.value)} placeholder="Paste CSV content here..." />
        <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-black text-white" disabled={loading} type="submit">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <FileUp className="size-4" />}
          Import report
        </button>
      </form>
      {error ? <InlineError text={error} /> : null}
      {result ? <DataPreview data={result} /> : null}
    </Panel>
  );
}
