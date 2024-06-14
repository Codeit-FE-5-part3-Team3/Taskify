import Image from "next/image";
import { ICard } from "@/type";
import {
  Card,
  CardList,
} from "@/app/(dashboards)/dashboard/[dashboardId]/components/card/Card";
import CardTag from "../card-tag/CardTag";
import formatDate from "@/util/formatDate";

export default async function Cards({ cards }: { cards: ICard[] }) {
  console.log();

  return (
    <CardList>
      {cards.map((card) => (
        <Card key={card.id}>
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
      ))}
    </CardList>
  );
}
