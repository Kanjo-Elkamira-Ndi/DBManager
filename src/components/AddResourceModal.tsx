import { useState, useEffect, type ReactNode } from "react";


const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);


/* ---------------- TYPES ---------------- */

interface Field {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "url";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  info?: string;
}

interface EntityConfig {
  title: string;
  description: string;
  fields: Field[];
  primaryAction: string;
  breadcrumb: string;
}

/* ---------------- MOCK DB ---------------- */

const MOCK_TABLE_SCHEMA = [
  { column_name: "title", data_type: "text", is_nullable: "NO" },
  { column_name: "type", data_type: "character varying", is_nullable: "YES" },
  { column_name: "description", data_type: "text", is_nullable: "YES" },
  { column_name: "url", data_type: "text", is_nullable: "YES" },
  { column_name: "published", data_type: "boolean", is_nullable: "YES" },
];

/* ---------------- MAPPER ---------------- */

function mapDbToFields(columns: any[]): Field[] {
  return columns.map((col) => {
    if (col.data_type === "boolean") {
      return {
        id: col.column_name,
        label: col.column_name.toUpperCase(),
        type: "select",
        options: ["true", "false"],
      };
    }

    let type: Field["type"] = "text";
    if (col.data_type.includes("text")) type = "text";
    if (col.column_name.includes("url")) type = "url";

    return {
      id: col.column_name,
      label: col.column_name.replace(/_/g, " ").toUpperCase(),
      type,
      placeholder: `Enter ${col.column_name}`,
      required: col.is_nullable === "NO",
    };
  });
}

/* ---------------- FIELD COMPONENTS ---------------- */

function TextField({ field, value, onChange }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 text-sm font-sans focus:outline-none focus:border-[#7c2d12] focus:bg-white transition-all duration-150"
      />
      {field.hint && <p className="text-[11px] text-gray-400 font-sans italic">{field.hint}</p>}
    </div>
  );
}

function TextareaField({ field, value, onChange }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={5}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 text-sm font-sans focus:outline-none focus:border-[#7c2d12] focus:bg-white transition-all duration-150 resize-none"
      />
    </div>
  );
}

function SelectField({ field, value, onChange }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm font-sans focus:outline-none focus:border-[#7c2d12] focus:bg-white transition-all duration-150 cursor-pointer pr-10"
        >
          {field.options?.map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
}

function UrlField({ field, value, onChange }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <LinkIcon />
        </div>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 text-sm font-sans focus:outline-none focus:border-[#7c2d12] focus:bg-white transition-all duration-150"
        />
      </div>
      {field.info && (
        <div className="flex items-start gap-2 mt-1 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2.5 text-xs text-orange-700 font-sans">
          <span className="text-[#b45309] mt-0.5"><InfoIcon /></span>
          {field.info}
        </div>
      )}
    </div>
  );
}

function renderField(field: Field, value: string, onChange: any): ReactNode {
  switch (field.type) {
    case "textarea":
      return <TextareaField key={field.id} field={field} value={value} onChange={onChange} />;
    case "select":
      return <SelectField key={field.id} field={field} value={value} onChange={onChange} />;
    case "url":
      return <UrlField key={field.id} field={field} value={value} onChange={onChange} />;
    default:
      return <TextField key={field.id} field={field} value={value} onChange={onChange} />;
  }
}

/* ---------------- MODAL ---------------- */

function AddEntityModal({ config, isOpen, onClose, onSubmit }: any) {
  const initialValues = () =>
    Object.fromEntries(
      config.fields.map((f: Field) => [
        f.id,
        f.type === "select" ? f.options?.[0] ?? "" : "",
      ])
    );

  const [values, setValues] = useState<Record<string, string>>(initialValues());

  useEffect(() => {
    if (isOpen) setValues(initialValues());
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{config.title}</h2>

        {config.fields.map((f: Field) => (
          <div key={f.id} className="mb-4">
            <label className="text-sm font-semibold">{f.label}</label>
            {renderField(f, values[f.id] ?? "", (v: string) =>
              setValues((prev) => ({ ...prev, [f.id]: v }))
            )}
          </div>
        ))}

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-[#7c2d12] hover:text-white cursor-pointer text-sm font-semibold text-gray-600 font-sans transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onSubmit(values)}
            className="px-6 py-2.5 rounded-lg bg-[#7c2d12] hover:bg-[#991b1b] cursor-pointer text-white text-sm font-semibold font-sans transition-all duration-150 flex items-center gap-2 disabled:opacity-70"
          >
            {config.primaryAction}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export function AddResourceModal({ isOpen, onClose }: any) {
  const [config, setConfig] = useState<EntityConfig | null>(null);

  useEffect(() => {
    setConfig({
      title: "Add Study Resource",
      description: "Generated from DB schema",
      breadcrumb: "AUTO",
      primaryAction: "Create",
      fields: mapDbToFields(MOCK_TABLE_SCHEMA),
    });
  }, []);

  if (!config || !isOpen) return null;

  return (
    <AddEntityModal
      config={config}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(data: any) => console.log(data)}
    />
  );
}