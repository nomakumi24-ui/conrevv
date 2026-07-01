"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder="商品名で検索..."
      className="mb-8 w-full rounded-lg border p-3"
    />
  );
}