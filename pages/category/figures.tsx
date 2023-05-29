import MegamiHead from "@/components/MegamiHead";
import MegamiNavBar from "@/components/MegamiNavBar";
import SearchBar from "@/components/SearchBar";
import ListView from "@/components/views/ListView";
function Figures() {
    return (
        <>
            <MegamiHead />
            <MegamiNavBar />
            <SearchBar />
            <ListView apiQuery={"figures"} title={'Figuras coleccionables'} />
        </>
    )
}

export default Figures
