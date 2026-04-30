import React from 'react';
import { getAllMedia } from '@/lib/media';
import MediaClient from './MediaClient';

export default async function MediaPage() {
    const newsData = await getAllMedia();
    
    return <MediaClient newsData={newsData} />;
}
