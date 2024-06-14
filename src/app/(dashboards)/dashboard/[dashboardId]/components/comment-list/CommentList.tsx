import { serverSideFetcher } from "@/lib/utils";

type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
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
    <ul className="flex flex-col gap-4 overflow-auto h-52">
      {comments.map((comment: Comment) => (
        <li key={comment.id}>
          <div className="flex border border-gray-300 rounded p-4">
            <span>{comment.content}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
