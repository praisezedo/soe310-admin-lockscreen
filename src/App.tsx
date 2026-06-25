import { useState } from "react";
import { mockUsers } from "./data/mockUsers";
import LockModal from "./components/lockModal";
import AuditLogs, { type AuditLog } from "./components/auditLogs";

export default function App() {
  const [users, setUsers] = useState(mockUsers);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState<"lock" | "unlock">("lock");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [reason, setReason] = useState("");

  const currentUser = {
    name: "Praise Innocent",
    role: "admin",
  };

  const isAdmin = currentUser.role === "admin";

  function handleConfirmAction() {
    if (!selectedUserId || !isAdmin) return;

    const selectedUserData = users.find((user) => user.id === selectedUserId);
    if (!selectedUserData) return;

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === selectedUserId
          ? {
              ...user,
              status: action === "lock" ? "locked" : "active",
              failedAttempts: action === "unlock" ? 0 : user.failedAttempts,
            }
          : user
      )
    );

    const newLog: AuditLog = {
      id: Date.now(),
      admin: currentUser.name,
      action: action === "lock" ? "locked" : "unlocked",
      user: selectedUserData.name,
      reason: reason,
        // action === "lock"
        //   ? "Account locked due to failed login threshold"
        //   : "Account unlocked after admin verification",
      time: new Date().toLocaleString(),
    };

    setLogs((currentLogs) => [newLog, ...currentLogs]);
    setModalOpen(false);
    setReason("");
  }

  return (
    <main className="min-h-screen bg-white p-6 text-black">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm text-gray-500">SOE 310 Project</p>

        <h1 className="mt-2 text-3xl font-bold">
          Admin User Lock Management
        </h1>

        <p className="mt-2 text-gray-600">
          View users, monitor failed login attempts, and lock or unlock
          accounts.
        </p>

        <div className="mt-4 inline-flex rounded-full border border-gray-300 px-4 py-2 text-sm">
          Logged in as: {currentUser.name} ({currentUser.role})
        </div>

        {!isAdmin && (
          <p className="mt-3 text-sm text-red-600">
            Only administrators can lock or unlock accounts.
          </p>
        )}

        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Failed Attempts</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const belowThreshold =
                  user.status === "active" && user.failedAttempts < 5;

                return (
                  <tr key={user.id} className="border-t border-gray-200">
                    <td className="px-4 py-4">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </td>

                    <td className="px-4 py-4 capitalize">{user.role}</td>

                    <td className="px-4 py-4">
                      <p>{user.failedAttempts}</p>
                      {user.failedAttempts >= 5 ? (
                        <p className="text-xs text-red-500">
                          Threshold reached
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400">
                          Below threshold
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium capitalize">
                        {user.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        disabled={!isAdmin || belowThreshold}
                        onClick={() => {
                          setAction(
                            user.status === "locked" ? "unlock" : "lock"
                          );
                          setSelectedUser(user.name);
                          setSelectedUserId(user.id);
                          setModalOpen(true);
                        }}
                        className={`rounded-lg px-4 py-2  text-sm font-medium text-white ${
                          !isAdmin || belowThreshold
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-black hover:opacity-50 hover:cursor-pointer"
                        }`}
                      >
                        {user.status === "locked" ? "Unlock" : "Lock"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <AuditLogs logs={logs} />
      </section>

      <LockModal
        open={modalOpen}
        action={action}
        userName={selectedUser}
        reason={reason}
        onReasonChange={setReason}
        onClose={() => {
          setModalOpen(false);
          setReason("");
        }}
        onConfirm={handleConfirmAction}
      />
    </main>
  );
}