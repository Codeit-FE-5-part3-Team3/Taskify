import { serverSideFetcher } from "@/lib/utils";
import Comment from "./Comment";

type CommentT = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
};

async function getComments(cardID: number) {
  const res = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/comments?cardId=${cardID}`,
  );
  const data = await res?.json();
  return data.comments;
}

export default async function CommentList({ cardId }: { cardId: number }) {
  const comments = await getComments(cardId);
  return (
    <>
      {comments.length > 0 ? (
        <span>{comments.length} 개의 댓글</span>
      ) : (
        <span>아직 댓글이 없습니다</span>
      )}
      <ul className="flex flex-col gap-4 overflow-auto h-52">
        {comments.map((comment: CommentT) => (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </>
  );
}
