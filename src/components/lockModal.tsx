type LockModalProps = {
  open: boolean;
  action: "lock" | "unlock";
  userName: string;
  onClose: () => void;
};

export default function LockModal({
  open,
  action,
  userName,
  onClose,
}: LockModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">
          {action === "lock" ? "Lock Account" : "Unlock Account"}
        </h2>

        <p className="mt-2 text-gray-600">
          Are you sure you want to {action} {userName}?
        </p>

        <textarea
          placeholder="Reason..."
          className="mt-4 w-full rounded-lg border p-3"
          rows={4}
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 hover:opacity-50 hover:cursor-pointer"
          >
            Cancel
          </button>

          <button
            className="rounded-lg hover:opacity-50 hover:cursor-pointer bg-black px-4 py-2 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}