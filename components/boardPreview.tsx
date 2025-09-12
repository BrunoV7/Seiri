"use client";
import Link from "next/link";
import { Calendar, MoreHorizontal, Star } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

type Board = {
  id: string;
  title: string;
  description: string;
  collumn_quantity: number;
  created_at?: string;
  updated_at?: string;
};

export default function BoardPreview({ board }: { board: Board }) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={`/v1/board/${board.id}`}>
        <div className="bg-white border border-slate-200 rounded-lg p-4 h-40 hover:shadow-md transition-all duration-200 group-hover:border-slate-300 relative overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 text-base truncate group-hover:text-blue-600 transition-colors">
                {board.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                {board.description || "Sem descrição"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Implement board actions menu
              }}
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                  {board.collumn_quantity} coluna{board.collumn_quantity !== 1 ? 's' : ''}
                </span>
                {board.updated_at && (
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(board.updated_at)}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Implement favorite functionality
                  }}
                >
                  <Star className="w-3 h-3 text-slate-400 hover:text-yellow-500" />
                </Button>
              </div>
            </div>
          </div>

          {/* Gradient overlay for visual appeal */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-50/50 pointer-events-none"></div>
        </div>
      </Link>
    </motion.div>
  );
}
