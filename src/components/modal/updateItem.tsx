import React from 'react';

interface Field {
  label: string;
  name: string;
  type: 'text' | 'select' | 'textarea';
  options?: { value: string; label: string }[]; // Para select
  value?: string; // Valor inicial do campo
  required: boolean
}

interface ModalProps {
  isOpen: boolean;
  title: string;
  fields: Field[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: Record<string, any>) => void;
  onClose: () => void;
}

const ModalFormItem: React.FC<ModalProps> = ({ isOpen, title, fields, onSubmit, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md w-3/4 py-5">
        <h2 className="text-lg text-center font-bold mb-4 text-black">{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-3">
              <label className="block text-background font-bold text-sm mb-1">{field.label}</label>
              {field.type === 'text' && (
                <input
                  type="text"
                  name={field.name}
                  required={field.required}
                  defaultValue={field.value}
                  className="text-black text-xs block w-full px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                />
              )}
              {field.type === 'textarea' && (
                <textarea
                  name={field.name}
                  required={field.required}
                  defaultValue={field.value}
                  className="border p-2 rounded w-full"
                />
              )}
              {field.type === 'select' && field.options && (
                <select
                  name={field.name}
                  required={field.required}
                  defaultValue={field.value}
                  className="text-black text-xs block w-full px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-buttom rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-buttom rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFormItem;
