import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export function usePagination() {
  const router = useRouter();
  const queryParams = useSearchParams();

  const [currentPage, setCurrentPage] = React.useState(() => {
    const page = Number(queryParams.get("page"));
    return Number.isNaN(page) ? 0 : page;
  });

  function handleChangePage(direction: -1 | 1) {
    return () => {
      setCurrentPage(currentPage + direction);
      const newParams = new URLSearchParams();
      newParams.set("page", String(currentPage + direction));
      if (currentPage === 1 && direction === -1) {
        newParams.delete("page");
      }

      router.replace(`/?${newParams.toString()}`);
    };
  }

  return [currentPage, handleChangePage] as const;
}
