import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { user, loading, refresh } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const isMissingInfo = !form.company || !form.phone;

  useEffect(() => {
    async function run() {
      if (!user) return;
      const res = await fetch("/api/profile", { credentials: "include" });
      if (res.ok) {
        const json = await res.json();
        setForm({
          name: json.user.name || "",
          email: json.user.email || "",
          company: json.user.company || "",
          phone: json.user.phone || "",
        });
      } else {
        setForm({ name: user.name || "", email: user.email || "", company: "", phone: "" });
      }
      setLoaded(true);
    }
    run();
  }, [user]);

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");
      await refresh();
      alert("Profile saved");
    } catch (e: any) {
      alert(e.message || "Error");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !loaded) return <div className="container mx-auto py-12">Loading…</div>;
  if (!user) return <div className="container mx-auto py-12">Please sign in to view your profile.</div>;

  return (
    <div className="container mx-auto py-12 max-w-2xl">
      <div className="flex items-center gap-4">
        <img src={user.picture} alt={user.name || user.email} className="h-16 w-16 rounded-full object-cover" />
        <div>
          <h1 className="font-serif text-3xl">{user.name || user.email}</h1>
          <p className="text-muted-foreground">Welcome to your profile</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium">Full name</label>
          <input className="mt-1 h-11 w-full rounded-md border px-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input className="mt-1 h-11 w-full rounded-md border px-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium">Company</label>
          <input className="mt-1 h-11 w-full rounded-md border px-3" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input className="mt-1 h-11 w-full rounded-md border px-3" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
      </div>

      {isMissingInfo && (
        <p className="mt-3 text-sm text-amber-600">Please complete your company and phone details to finish setup.</p>
      )}

      <div className="mt-6">
        <Button onClick={save} className="h-11 px-6" disabled={saving}>{saving ? "Saving..." : "Save profile"}</Button>
      </div>
    </div>
  );
}
