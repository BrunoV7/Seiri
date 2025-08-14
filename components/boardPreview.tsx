"use client";
import Link from "next/link";

type Board = {
  id: string;
  title: string;
  description: string;
  collumn_quantity: number;
};

export default function BoardPreview({ board }: { board: Board }) {
  return (
    <Link href={`/v1/board/${board.id}`}>
      <div className="border border-neutral-200 rounded-md p-4 h-32">
        <h3 className="font-semibold text-lg">{board.title}</h3>
        <p className="text-sm text-neutral-600">{board.description}</p>
      </div>
    </Link>
  );
}
