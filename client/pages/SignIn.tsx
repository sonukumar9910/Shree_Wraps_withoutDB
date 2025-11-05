import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="container mx-auto py-12 max-w-md">
      <h1 className="font-serif text-3xl text-center">Sign in</h1>
      <div className="mt-8 rounded-xl border p-6 bg-white shadow-sm">
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" required className="mt-1 h-11 w-full rounded-md border px-3" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" required className="mt-1 h-11 w-full rounded-md border px-3" placeholder="••••••••" />
          </div>
          <button className="w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium">Continue</button>
        </form>
        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
        </div>
        <button type="button" onClick={() => (window.location.href = "/api/auth/google")} className="w-full h-11 rounded-md border bg-white text-sm font-medium flex items-center justify-center gap-2">
          <svg viewBox="0 0 48 48" className="h-5 w-5"><path fill="#FFC107" d="M43.6 20.5H42v-.1H24v7.2h11.3c-1.6 4.6-6 7.9-11.3 7.9-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.1-5.1C33.7 6.1 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l5.9 4.3C13.6 15.7 18.4 12 24 12c3.1 0 5.9 1.2 8 3.1l5.1-5.1C33.7 6.1 29.1 4 24 4 16.1 4 9.5 8.6 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.1 0 9.7-2 13.1-5.2l-6-4.9C29 35.7 26.6 36.6 24 36.6c-5.3 0-9.7-3.4-11.3-8l-6.1 4.7C9.7 39.2 16.4 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42v-.1H24v7.2h11.3c-.7 2-2 3.7-3.6 4.9l6 4.9c3.5-3.2 5.7-8 5.7-13.4 0-1.3-.1-2.7-.4-3.5z"/></svg>
          Continue with Google
        </button>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          By continuing, you agree to our <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        No account? <a className="underline" href="#">Create one</a>
      </p>
    </div>
  );
}
