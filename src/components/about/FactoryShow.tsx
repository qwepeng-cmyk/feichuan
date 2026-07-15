import Image from 'next/image';
import styles from './FactoryShow.module.css';
import { cuasText } from '@/lib/cuasLocaleCopy';

const factoryImages = [
    {
        src: '/about/factory-show/uav-drone-companies-china.webp',
        alt: 'OEM equipment preparation workspace',
    },
    {
        src: '/about/factory-show/uav-drone-solutions-china.webp',
        alt: 'Equipment testing resources for delivery verification',
    },
    {
        src: '/about/factory-show/unmanned-aerial-solutions-china.webp',
        alt: 'System assembly resources supporting project delivery',
    },
    {
        src: '/about/factory-show/uav-detection-company-china.webp',
        alt: 'C-UAS component and equipment preparation area',
    },
    {
        src: '/about/factory-show/counter-uas-solutions-china.webp',
        alt: 'C-UAS equipment prepared for configuration checks',
    },
];

export default function FactoryShow({ dict, locale = 'en' }: { dict?: any; locale?: string }) {
    const title = dict?.about?.factoryShowTitle || 'Equipment Preparation & Testing';

    return (
        <section className={styles.factoryShow} aria-labelledby="factory-show-title">
            <div className={styles.inner}>
                <div className={styles.header}>
                    <h2 id="factory-show-title">{title}</h2>
                </div>

                <div className={styles.gallery}>
                    {factoryImages.map((image) => (
                        <figure className={styles.card} key={image.src}>
                            <Image
                                src={image.src}
                                alt={cuasText(locale, image.alt)}
                                fill
                                sizes="(max-width: 991px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
