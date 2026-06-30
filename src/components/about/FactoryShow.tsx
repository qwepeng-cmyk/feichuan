import Image from 'next/image';
import styles from './FactoryShow.module.css';

const factoryImages = [
    {
        src: '/about/factory-show/uav-propeller-production.webp',
        alt: 'UAV propeller production line',
        group: 'uav',
        label: 'UAV Production',
    },
    {
        src: '/about/factory-show/uav-motor-assembly.webp',
        alt: 'UAV motor assembly workshop',
        group: 'uav',
        label: 'UAV Production',
    },
    {
        src: '/about/factory-show/uav-drone-companies-china.webp',
        alt: 'UAV production workshop',
        group: 'uav',
        label: 'UAV Production',
    },
    {
        src: '/about/factory-show/uav-drone-solutions-china.webp',
        alt: 'UAV system testing line',
        group: 'uav',
        label: 'UAV Production',
    },
    {
        src: '/about/factory-show/unmanned-aerial-solutions-china.webp',
        alt: 'Unmanned aerial system assembly area',
        group: 'uav',
        label: 'UAV Production',
    },
    {
        src: '/about/factory-show/uav-detection-company-china.webp',
        alt: 'Counter-UAS equipment production area',
        group: 'cuas',
        label: 'C-UAS Production',
    },
    {
        src: '/about/factory-show/counter-uas-solutions-china.webp',
        alt: 'Counter-UAS solution assembly station',
        group: 'cuas',
        label: 'C-UAS Production',
    },
    {
        src: '/about/factory-show/uav-solution-china.webp',
        alt: 'Anti-drone equipment testing workshop',
        group: 'cuas',
        label: 'C-UAS Production',
    },
];

export default function FactoryShow({ dict }: { dict?: any }) {
    const about = dict?.about || {};
    const title = about.factoryShowTitle || 'Factory Show';
    const subtitle = about.factoryShowDesc || 'Production scenes for UAV platforms, propulsion components, and counter-UAS equipment integration.';
    const uavLabel = about.factoryShowUavLabel || '5 UAV production scenes';
    const cuasLabel = about.factoryShowCuasLabel || '3 C-UAS production scenes';

    return (
        <section className={styles.factoryShow} aria-labelledby="factory-show-title">
            <div className={styles.inner}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>N-TET Manufacturing</span>
                        <h2 id="factory-show-title">{title}</h2>
                    </div>
                    <p>{subtitle}</p>
                </div>

                <div className={styles.legend} aria-label="Factory show groups">
                    <span>{uavLabel}</span>
                    <span>{cuasLabel}</span>
                </div>

                <div className={styles.gallery}>
                    {factoryImages.map((image, index) => (
                        <figure className={`${styles.card} ${styles[image.group]} ${index === 0 ? styles.featured : ''}`} key={image.src}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes={index === 0 ? '(max-width: 991px) 100vw, 50vw' : '(max-width: 991px) 50vw, 25vw'}
                                style={{ objectFit: 'cover' }}
                            />
                            <figcaption>{image.label}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
