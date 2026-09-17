/**
 * Demo mode: seeded data, no passwords checked, and anyone can sign in as
 * any staff member to look around. On unless NEXT_PUBLIC_BENCH_DEMO_MODE is
 * "false". Turn it off the day real sign-in lands: signing in as someone
 * else then stops working in the data layer, not just in the UI.
 */
export const DEMO_MODE = process.env.NEXT_PUBLIC_BENCH_DEMO_MODE !== 'false';
