import Image from "next/image"
import styles from "@/styles/CardView.module.css"

export interface CardItemProps {
  image: string;
  title: string;
  price: number;
}

export function CardItem({image, title, price}: CardItemProps) {
  return (
    <div className={styles['card-item']}>
      <Image 
        className={styles['card-item_img']}
        src={image} 
        alt="picture" 
        width={200}
        height={200}/>
      <div className={styles['card-item_title']}>{title}</div>
      <div className={styles['card-item_price']}>${price}</div>
      <button className={styles['card-item_buy']}>Comprar</button>
    </div>
  )
}

export interface CardViewProps {
  cards: CardItemProps[];
}

export default function CardView({cards}: CardViewProps) {
  const cardItems = cards.map((card, index) => {
    return (
      <CardItem
        key={index}
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
