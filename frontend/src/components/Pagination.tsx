import { PaginationMeta } from '../types/common';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  const { page, totalPages } = meta;

  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  // Si solo hay una página, no mostramos la paginación
  if (totalPages <= 1) return null;

  return <>
    <div className="pagination">
      <button
        onClick={handlePreviousPage}
        disabled={page <= 1}
        aria-label="Página anterior"
        type="button"
      >
        Anterior
      </button>

      <span>
        Página <strong>{page}</strong> de <strong>{totalPages}</strong>
      </span>

      <button
        onClick={handleNextPage}
        disabled={page >= totalPages}
        aria-label="Página siguiente"
        type="button"
      >
        Siguiente
      </button>
    </div>
  </>;
};
