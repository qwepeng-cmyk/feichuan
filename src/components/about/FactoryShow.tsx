import Image from 'next/image';
import styles from './FactoryShow.module.css';

const factoryImages = [
    {
        src: '/about/factory-show/uav-propeller-production.webp',
        alt: 'UAV propeller production line',
    },
    {
        src: '/about/factory-show/uav-motor-assembly.webp',
        alt: 'UAV motor assembly workshop',
    },
    {
        src: '/about/factory-show/uav-drone-companies-china.webp',
        alt: 'UAV production workshop',
    },
    {
        src: '/about/factory-show/uav-drone-solutions-china.webp',
        alt: 'UAV system testing line',
    },
    {
        src: '/about/factory-show/unmanned-aerial-solutions-china.webp',
        alt: 'Unmanned aerial system assembly area',
    },
    {
        src: '/about/factory-show/uav-detection-company-china.webp',
        alt: 'C-UAS equipment production area',
    },
    {
        src: '/about/factory-show/counter-uas-solutions-china.webp',
        alt: 'C-UAS solution assembly station',
    },
    {
        src: '/about/factory-show/uav-solution-china.webp',
        alt: 'Anti-drone equipment testing workshop',
    },
];

export default function FactoryShow({ dict }: { dict?: any }) {
    const title = dict?.about?.factoryShowTitle || 'Factory Show';

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
                                alt={image.alt}
                                fill
                                sizes="(max-width: 991px) 50vw, 25vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
