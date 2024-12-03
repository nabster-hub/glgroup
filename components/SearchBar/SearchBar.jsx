'use client';
import React, {useEffect, useState} from 'react';
import styles from './SearchBar.module.scss'
import {useParams, useRouter} from "next/navigation";


const SearchBar = ({locale}) => {
    const [search, setSearch] = useState('')
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        if(params.slug){
            setSearch(decodeURI(params.slug))
        }
    }, [params.slug]);

    const handleSearch = (e) => {
        e.preventDefault()

        if(search.trim()){
            const searchUrl = `/${locale}/blog/search/${encodeURIComponent(search.trim())}`;
            router.push(searchUrl);
        }
    }

    return (
        <div className={styles.searchBar}>
            <form onSubmit={handleSearch}>
                <input type={'text'} placeholder={locale === 'ru' ? 'Поиск статьи...' : "Searching for article..."}
                       value={search}
                       onChange={(e) => {setSearch(e.target.value)}}

                />
                <button type={'submit'}>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.2099 18.79L16.4999 15.11C17.94 13.3144 18.6374 11.0353 18.4487 8.74133C18.26 6.44733 17.1996 4.31281 15.4854 2.77667C13.7713 1.24053 11.5337 0.419537 9.23283 0.482497C6.93194 0.545457 4.74263 1.48759 3.11505 3.11517C1.48747 4.74275 0.545335 6.93207 0.482375 9.23295C0.419414 11.5338 1.24041 13.7714 2.77655 15.4855C4.31269 17.1997 6.44721 18.2601 8.7412 18.4488C11.0352 18.6375 13.3143 17.9401 15.1099 16.5L18.7899 20.18C18.8829 20.2738 18.9935 20.3482 19.1153 20.3989C19.2372 20.4497 19.3679 20.4758 19.4999 20.4758C19.6319 20.4758 19.7626 20.4497 19.8845 20.3989C20.0063 20.3482 20.1169 20.2738 20.2099 20.18C20.3901 19.9936 20.4909 19.7444 20.4909 19.485C20.4909 19.2257 20.3901 18.9765 20.2099 18.79ZM9.4999 16.5C8.11544 16.5 6.76206 16.0895 5.61091 15.3203C4.45977 14.5511 3.56256 13.4579 3.03275 12.1788C2.50293 10.8997 2.36431 9.49226 2.63441 8.13439C2.9045 6.77653 3.57119 5.52925 4.55016 4.55028C5.52912 3.57131 6.77641 2.90463 8.13427 2.63453C9.49214 2.36443 10.8996 2.50306 12.1787 3.03287C13.4578 3.56268 14.551 4.45989 15.3202 5.61103C16.0894 6.76218 16.4999 8.11556 16.4999 9.50003C16.4999 11.3565 15.7624 13.137 14.4497 14.4498C13.1369 15.7625 11.3564 16.5 9.4999 16.5Z"
                            fill="#121212"/>
                    </svg>
                </button>
            </form>
        </div>
    );
};


export default SearchBar;