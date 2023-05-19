import MegamiHead from "@/components/MegamiHead";
import MegamiNavBar from "@/components/MegamiNavBar"
import { useRouter } from "next/router";
import SearchBar from "@/components/SearchBar";
import SearchView from "@/components/views/SearchView";

function SearchPage() {
    const router = useRouter()
    const { query } = router.query

    return (
        <>
            <MegamiHead title={query as string} />
            <MegamiNavBar />
            <SearchBar query={query as string} />
            <SearchView query={query as string} />
        </>
    )
}

export default SearchPage
