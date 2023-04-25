import Image from "next/image"
import styles from "@/styles/CardView.module.css"
import Link from "next/link";

export interface CardItemProps {
    id: number;
    image: string;
    title: string;
    price: number;
}

export function CardItem({ id, image, title, price }: CardItemProps) {
    return (
        <div>
            <Link href={`/products/${id}`} className={styles['card-item']}>
                <Image
                    className={styles['card-item_img']}
                    src={image}
                    alt="picture"
                    width={200}
                    height={200} />
                <div className={styles['card-item_title']}>{title}</div>
                <div className={styles['card-item_price']}>${price}</div>
                <div className={styles['card-item_buy']}>
                    Comprar
                </div>
            </Link>
        </div>
    )
}

export interface CardViewProps {
    cards: CardItemProps[];
}

export default function CardView({ cards }: CardViewProps) {
    const cardItems = cards.map((card, index) => {
        return (
            <CardItem
                key={index}
                id={card.id}
                image={card.image}
                title={card.title}
                price={card.price}
            />
        )
    })

    return (
        <div className={styles['card-view_container']}>
            <div className={styles['card-view']}>
                {cardItems}
            </div>
        </div>
    )
}
