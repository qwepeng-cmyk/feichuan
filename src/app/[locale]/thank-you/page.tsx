import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle, Mail, ShieldCheck } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { localePath } from '@/lib/localePath';

const copy = {
    en: {
        title: 'Thank You',
        badge: 'N-TET Low-Altitude Defense Sales & Project Desk',
        heading: 'Your Low-Altitude Defense inquiry has been received.',
        intro: 'Our team will review the equipment, application and project details you provided before following up through your selected contact method.',
        steps: [
            'Inquiry saved in the N-TET admin system',
            'Equipment and system requirements queued for review',
            'A Low-Altitude Defense product specialist will follow up through your selected contact method',
        ],
        primary: 'Back to Home',
        secondary: 'View Products',
        noteTitle: 'Need to add more details?',
        note: 'You can submit another message from any Low-Altitude Defense product, solution, case, media or contact page.',
    },
    ru: {
        title: 'Спасибо',
        badge: 'Отдел запросов N-TET',
        heading: 'Ваш запрос получен.',
        intro: 'Наша команда изучит детали проекта и свяжется с вами в ближайшее время.',
        steps: [
            'Запрос сохранен в административной системе N-TET',
            'Требования проекта поставлены в очередь для дальнейшей обработки',
            'Специалист ответит через выбранный вами способ связи',
        ],
        primary: 'На главную',
        secondary: 'Смотреть продукты',
        noteTitle: 'Нужно добавить детали?',
        note: 'Вы можете отправить еще одно сообщение со страницы продукта, решения, кейса, медиа или контактов.',
    },
    es: {
        title: 'Gracias',
        badge: 'Mesa de consultas N-TET',
        heading: 'Recibimos su consulta.',
        intro: 'Nuestro equipo revisará los detalles de su proyecto y se pondrá en contacto lo antes posible.',
        steps: [
            'Consulta guardada en el sistema administrativo de N-TET',
            'Requisitos del proyecto en cola para seguimiento',
            'Un especialista responderá por el método de contacto seleccionado',
        ],
        primary: 'Volver al inicio',
        secondary: 'Ver productos',
        noteTitle: '¿Necesita agregar más detalles?',
        note: 'Puede enviar otro mensaje desde cualquier página de producto, solución, caso, medio o contacto.',
    },
    ar: {
        title: 'شكرا لك',
        badge: 'مكتب استفسارات N-TET',
        heading: 'تم استلام استفسارك.',
        intro: 'سيقوم فريقنا بمراجعة تفاصيل مشروعك والتواصل معك في أقرب وقت ممكن.',
        steps: [
            'تم حفظ الاستفسار في نظام إدارة N-TET',
            'تم وضع متطلبات المشروع في قائمة المتابعة',
            'سيرد متخصص عبر طريقة التواصل التي اخترتها',
        ],
        primary: 'العودة إلى الرئيسية',
        secondary: 'عرض المنتجات',
        noteTitle: 'هل تحتاج إلى إضافة تفاصيل أخرى؟',
        note: 'يمكنك إرسال رسالة أخرى من أي صفحة منتج أو حل أو حالة أو مركز إعلامي أو صفحة تواصل.',
    },
};

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
    const text = copy[params.locale] || copy.en;

    return {
        title: `${text.title} - N-TET`,
        description: text.intro,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default function ThankYouPage({ params }: { params: { locale: Locale } }) {
    const text = copy[params.locale] || copy.en;

    return (
        <main style={{ background: '#f4f7fb' }}>
            <section
                style={{
                    minHeight: 'calc(100vh - 180px)',
                    padding: '96px 20px 88px',
                    background:
                        'linear-gradient(135deg, rgba(15,31,55,0.96) 0%, rgba(49,91,164,0.92) 56%, rgba(225,234,245,0.96) 56.2%, rgba(248,250,252,1) 100%)',
                }}
            >
                <div
                    style={{
                        width: 'min(1120px, 100%)',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)',
                        gap: '48px',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ color: '#fff' }}>
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 12px',
                                border: '1px solid rgba(255,255,255,0.22)',
                                background: 'rgba(255,255,255,0.08)',
                                color: '#dbeafe',
                                fontSize: '1.2rem',
                                fontWeight: 800,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                marginBottom: '24px',
                            }}
                        >
                            <ShieldCheck size={16} />
                            {text.badge}
                        </div>

                        <h1
                            style={{
                                margin: 0,
                                maxWidth: '760px',
                                color: '#fff',
                                fontSize: 'clamp(3.8rem, 7vw, 7.4rem)',
                                lineHeight: 0.95,
                                fontWeight: 900,
                            }}
                        >
                            {text.heading}
                        </h1>
                        <p
                            style={{
                                margin: '26px 0 0',
                                maxWidth: '620px',
                                color: 'rgba(255,255,255,0.82)',
                                fontSize: '1.8rem',
                                lineHeight: 1.65,
                            }}
                        >
                            {text.intro}
                        </p>
                    </div>

                    <div
                        style={{
                            background: '#fff',
                            border: '1px solid rgba(148,163,184,0.25)',
                            boxShadow: '0 24px 80px rgba(15,23,42,0.18)',
                            padding: '34px',
                            borderRadius: '8px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '72px',
                                height: '72px',
                                borderRadius: '50%',
                                background: '#e8f5ee',
                                color: '#11804b',
                                marginBottom: '26px',
                            }}
                        >
                            <CheckCircle size={38} strokeWidth={1.8} />
                        </div>

                        <div style={{ display: 'grid', gap: '14px', marginBottom: '30px' }}>
                            {text.steps.map((step, index) => (
                                <div
                                    key={step}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '32px 1fr',
                                        gap: '12px',
                                        alignItems: 'start',
                                        color: '#24324a',
                                        fontSize: '1.45rem',
                                        lineHeight: 1.55,
                                    }}
                                >
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '28px',
                                            height: '28px',
                                            background: '#315ba4',
                                            color: '#fff',
                                            fontSize: '1.2rem',
                                            fontWeight: 900,
                                        }}
                                    >
                                        {index + 1}
                                    </span>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
                            <Link
                                href={localePath(params.locale, '/')}
                                prefetch={false}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '44px',
                                    padding: '0 18px',
                                    background: '#315ba4',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '1.3rem',
                                    fontWeight: 900,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {text.primary}
                            </Link>
                            <Link
                                href={localePath(params.locale, '/products')}
                                prefetch={false}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '44px',
                                    padding: '0 18px',
                                    background: '#eef3f9',
                                    color: '#1e365f',
                                    textDecoration: 'none',
                                    fontSize: '1.3rem',
                                    fontWeight: 900,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {text.secondary}
                            </Link>
                        </div>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '28px 1fr',
                                gap: '12px',
                                paddingTop: '22px',
                                borderTop: '1px solid #e5eaf0',
                            }}
                        >
                            <Mail size={22} color="#315ba4" />
                            <div>
                                <h2 style={{ margin: '0 0 6px', color: '#172033', fontSize: '1.5rem', fontWeight: 900 }}>
                                    {text.noteTitle}
                                </h2>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '1.3rem', lineHeight: 1.6 }}>{text.note}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
