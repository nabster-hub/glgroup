'use client';
import React from 'react';
import { GoogleMapsEmbed } from '@next/third-parties/google'
import styles from './Contact.module.scss'

export default function GoogleMap() {
    return (
        <div className={styles.maps}>
            <GoogleMapsEmbed
                apiKey={"AIzaSyDsvbWoQqEo_mg23kEw2XEmWvGbpJKl9GA"}
                height={'100%'}
                width={'100%'}
                mode={"place"}
                style={"height: 100%"}
                q={"Benoa Square 2nd Floor, Jl Bypass Ngurah Rai No 21A, Kedonganan, Kuta, Bali 80361, Indonesia"}
                zoom={'17'}
                allowfullscreen={false}
            />
        </div>

    );
};


