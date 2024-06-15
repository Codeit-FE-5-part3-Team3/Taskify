import Image from "next/image";
import { ICard, IColumn } from "@/type";
import { Card } from "@/app/(dashboards)/dashboard/[dashboardId]/components/card/Card";
import CardTag from "../card-tag/CardTag";
import formatDate from "@/util/formatDate";
import { serverSideFetcher } from "@/lib/utils";

async function getComments(cardID: number) {
  const res = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/comments?cardId=${cardID}`,
  );
  const data = await res?.json();
  return data.comments;
}

export default async function Cards({
  cards,
  column,
}: {
  cards: ICard[];
  column: IColumn;
}) {
  return (
    <div className="flex flex-col gap-4 overflow-auto scrollbar-hide">
      {cards.map(async (card) => {
        const comments = await getComments(card.id);

        return (
          <Card
            key={card.id}
            cardData={card}
            column={column}
            comments={comments}
          >
            <Card.Header>
              {card.imageUrl && (
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  width={274}
                  height={128}
                  className="rounded"
                />
              )}
            </Card.Header>
            <Card.Content>
              <Card.Title>{card.title}</Card.Title>
              <CardTag cards={card} />
            </Card.Content>
            <Card.Footer>
              <Card.DueDate>{formatDate(card.dueDate)}</Card.DueDate>
              <Card.Asignee>{card.assignee?.nickname[0]}</Card.Asignee>
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
}
