import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  error?: Record<string, string[] | undefined>;
}

export const FormErrors = ({ id, error }: FormErrorsProps) => {
  if (!error) {
    return null;
  }

  return (
    <div
      className="mt-2 text-s text-red-600"
      id={`${id}-error`}
      aria-live="polite"
    >
      {error?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex ites-center font-medium p-2 border border-rose-500 bg-rose-100 rounded-sm"
        >
          <XCircle className="h-4 m-1" />
          {error}
        </div>
      ))}
    </div>
  );
};
