import styles from '@/styles/SearchBar.module.css'
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

function SearchBar() {
    const router = useRouter()
    const [search, setSearch] = useState('')

    function searchItem() {
        if(search) router.push(`/search/${search}`)
    }

    function keyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'Enter') {
            searchItem()
        }
    }

    return (
        <div className={styles['container']}>
            <div className={styles['bar']}>
                <input className={styles['input']}
                       placeholder={"¿Qué vamos a buscar hoy...?"}
                       onChange={e => setSearch(e.target.value)}
                       onKeyDown={e => keyDown(e)}
                       value={search} />
                <button onClick={e => searchItem()} className={styles['search']}>
                    <Image src={'/search.png'} alt={'[Click here to search'} width={20} height={20} />
                </button>
            </div>
        </div>
    )
}

export default SearchBar