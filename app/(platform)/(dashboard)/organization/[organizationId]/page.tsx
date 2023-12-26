import { Suspense } from "react";
import { BoardList } from "../../_components/board-list";

const OrganizationIdPage = async () => {
  return (
    <div className="px-2 md:px-4">
      <Suspense fallback={<BoardList.skeleton />}>
        <BoardList />
      </Suspense>
    </div>
  );
};

export default OrganizationIdPage;
