import MegamiHead from "@/components/MegamiHead"
import MegamiNavBar from "@/components/MegamiNavBar"
import CardView, {CardItemProps} from "@/components/views/CardView"

export default function Home() {
  const cards: CardItemProps[] = [
    {title: "Mona china", image: "/next.svg", price: 555},
    {title: "Cartas Megami Monogatari", image: "/next.svg", price: 555},
    {title: "XD", image: "/next.svg", price: 555},
  ]
  return (
    <>
      <MegamiHead />
      <MegamiNavBar />
      <CardView cards={cards} />
    </>
  )
}
