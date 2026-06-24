const logs = [
  {
    id: 1,
    admin: "Praise Innocent",
    action: "locked",
    user: "John Doe",
    reason: "Too many failed login attempts",
    time: "Today, 10:30 AM",
  },
  {
    id: 2,
    admin: "Praise Innocent",
    action: "unlocked",
    user: "Amaka Grace",
    reason: "Identity verified by admin",
    time: "Yesterday, 2:15 PM",
  },
];

export default function AuditLogs() {
  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-bold">Audit Logs</h2>
      <p className="mt-1 text-sm text-gray-500">
        Recent account lock and unlock activities.
      </p>

      <div className="mt-5 space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-xl border border-gray-200 p-4"
          >
            <p className="font-medium">
              {log.admin} {log.action} {log.user}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Reason: {log.reason}
            </p>
            <p className="mt-1 text-xs text-gray-400">{log.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}