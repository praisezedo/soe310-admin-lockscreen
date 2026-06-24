import { mockUsers } from "./data/mockUsers";
import { useState } from "react";
import LockModal from "./components/lockModal";
import AuditLogs from "./components/auditLogs";

export default function App() {

const [modalOpen, setModalOpen] = useState(false);
const [action, setAction] = useState<"lock" | "unlock">("lock");
const [selectedUser, setSelectedUser] = useState("");
const [ users , setUsers ] = useState(mockUsers);
const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

function handleConfirmAction () {
  if (!selectedUserId) return;

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

  setModalOpen(false);
}

  return (
    <main className="min-h-screen bg-white p-6 text-black">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm text-gray-500">SOE 310 Project</p>

        <h1 className="mt-2 text-3xl font-bold">
          Admin User Lock Management
        </h1>

        <p className="mt-2 text-gray-600">
          View users, monitor failed login attempts, and lock or unlock accounts.
        </p>

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
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-200">
                  <td className="px-4 py-4">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </td>

                  <td className="px-4 py-4 capitalize">{user.role}</td>

                  <td className="px-4 py-4">{user.failedAttempts}</td>

                  <td className="px-4 py-4">
                    <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium capitalize">
                      {user.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
              <button
                onClick={() => {
                  setAction(user.status === "locked" ? "unlock" : "lock");
                  setSelectedUser(user.name);
                  setSelectedUserId(user.id);
                  setModalOpen(true);
                }}
                className="rounded-lg hover:opacity-50 hover:cursor-pointer bg-black px-4 py-2 text-white"
              >
                {user.status === "locked" ? "Unlock" : "Lock"}
              </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AuditLogs/>
        </div>
      </section>

      <LockModal
        open={modalOpen}
        action={action}
        userName={selectedUser}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmAction}
      />
    </main>
  );
}