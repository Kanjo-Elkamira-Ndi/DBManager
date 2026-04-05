import type { BaseEntity } from "../../types/entity.types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  entity: BaseEntity | null;
};

export default function EntityViewModal({
  isOpen,
  onClose,
  entity,
}: Props) {
  if (!isOpen || !entity) return null;

  const displayName =
    entity.name || entity.title || "Unnamed Entity";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-[420px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Entity Name
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-xl p-4">
          
          <p className="text-lg font-semibold text-gray-900">
            {displayName}
          </p>

        </div>
      </div>
    </div>
  );
}