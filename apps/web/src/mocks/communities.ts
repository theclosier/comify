export interface Community {
    id: string;
    subdomain: string;
    name: string;
    description: string;
    logo: string;
    about: string;
    gallery: string[];
    rules: string[];
    stats: {
        members: number;
        city: string;
        score: number;
    };
    socials: {
        twitter?: string;
        instagram?: string;
        website?: string;
        linkedin?: string;
        youtube?: string;
    };
    customQuestions: {
        id: string;
        question: string;
        type: 'text' | 'select' | 'boolean';
        options?: string[];
    }[];
}

export const MOCK_COMMUNITIES: Community[] = [
    {
        id: 'c1',
        subdomain: 'yazilimcilar',
        name: 'Yazılımcılar Kulübü',
        description: 'Türkiye\'nin en aktif yazılımcı topluluğu.',
        logo: 'https://ui-avatars.com/api/?name=Y+K&background=3b82f6&color=fff&size=128',
        about: 'Yazılımcılar Kulübü, 2015 yılında kurulmuş, Türkiye genelinde 50.000\'den fazla üyesi olan bağımsız bir teknoloji topluluğudur. Amacımız, yazılımcıları bir araya getirerek bilgi paylaşımını artırmak.',
        gallery: [
            'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80'
        ],
        rules: [
            'Saygı çerçevesinde iletişim kurun.',
            'Spam ve reklam yasaktır.',
            'Konu dışı paylaşımlardan kaçının.',
            'Siyasi ve dini tartışmalara girmeyin.'
        ],
        stats: {
            members: 1240,
            city: 'İstanbul',
            score: 4.9
        },
        socials: {
            twitter: 'https://twitter.com/yazilimcilar',
            website: 'https://yazilimcilar.org',
            instagram: 'https://instagram.com/yazilimcilar',
            linkedin: 'https://linkedin.com/company/yazilimcilar'
        },
        customQuestions: [
            {
                id: 'q1',
                question: 'Hangi programlama dilleriyle ilgileniyorsunuz?',
                type: 'text'
            },
            {
                id: 'q2',
                question: 'Daha önce bir hackathon\'a katıldınız mı?',
                type: 'boolean'
            },
            {
                id: 'q3',
                question: 'Kariyer seviyeniz nedir?',
                type: 'select',
                options: ['Öğrenci', 'Junior', 'Mid-Level', 'Senior', 'Lead']
            }
        ]
    },
    {
        id: 'c2',
        subdomain: 'startup-istanbul',
        name: 'Startup Istanbul',
        description: 'Girişimciler için buluşma noktası.',
        logo: 'https://ui-avatars.com/api/?name=S+I&background=10b981&color=fff&size=128',
        about: 'Startup Istanbul, girişimcileri, yatırımcıları ve mentorları buluşturan bir ekosistemdir. Her ay düzenli etkinlikler yapıyoruz.',
        gallery: [
            'https://images.unsplash.com/photo-1559223607-a43c990ed9fc?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80'
        ],
        rules: [
            'Yatırım tavsiyesi vermek yasaktır.',
            'Fikir hırsızlığına karşı sıfır tolerans.',
            'Üyelik formunu eksiksiz doldurun.'
        ],
        stats: {
            members: 850,
            city: 'İstanbul',
            score: 4.7
        },
        socials: {
            instagram: 'https://instagram.com/startupist',
            twitter: 'https://twitter.com/startupist'
        },
        customQuestions: [
            {
                id: 'q1',
                question: 'Girişiminiz var mı?',
                type: 'boolean'
            }
        ]
    }
];
