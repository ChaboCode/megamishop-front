import MegamiHead from "@/components/MegamiHead"
import MegamiNavBar from "@/components/MegamiNavBar"
import CardView, {CardItemProps} from "@/components/views/CardView"

export default function Home() {
  const cards: CardItemProps[] = []
  return (
    <>
      <MegamiHead />
      <MegamiNavBar />
      <CardView cards={cards} />
    </>
  )
}
