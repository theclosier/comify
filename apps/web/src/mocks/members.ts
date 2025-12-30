export interface Member {
    id: string;
    communityId: string;
    name: string;
    email: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    joinedAt: string;
    answers: Record<string, string>; // Question ID -> Answer
    role: 'ADMIN' | 'MEMBER';
}

export const MOCK_MEMBERS: Member[] = [
    {
        id: 'm1',
        communityId: 'c1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        status: 'PENDING',
        joinedAt: '2024-06-01T10:30:00',
        answers: {
            'q1': 'JavaScript, TypeScript, Go',
            'q2': 'Evet',
            'q3': 'Senior'
        },
        role: 'MEMBER'
    },
    {
        id: 'm2',
        communityId: 'c1',
        name: 'Ayşe Demir',
        email: 'ayse@example.com',
        status: 'APPROVED',
        joinedAt: '2024-05-28T15:20:00',
        answers: {
            'q1': 'Python, Rust',
            'q2': 'Hayır',
            'q3': 'Mid-Level'
        },
        role: 'ADMIN'
    },
    {
        id: 'm3',
        communityId: 'c2',
        name: 'Mehmet Kaya',
        email: 'mehmet@startup.com',
        status: 'PENDING',
        joinedAt: '2024-06-02T09:15:00',
        answers: {
            'q1': 'Evet'
        },
        role: 'MEMBER'
    }
];
