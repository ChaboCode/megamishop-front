import { useEffect, useState } from "react";

import MegamiHead from "@/components/MegamiHead"
import MegamiNavBar from "@/components/MegamiNavBar"
import HomeBanner from "@/components/HomeBanner";
import Latest from "@/components/Latest";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";


export default function Home() {

    return (
        <>
            <MegamiHead />
            <MegamiNavBar />
            <HomeBanner />
            <SearchBar />
            <Latest />
            <Footer />
        </>
    )
}
