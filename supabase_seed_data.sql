-- 1. Insert Communities
-- We don't specify IDs here let Supabase generate them, OR we specify them but handle conflict.
-- If they already exist, we do nothing.
insert into communities (name, subdomain, logo, description)
values 
(
  'Yazılımcılar Kulübü', 
  'yazilimcilar', 
  'https://ui-avatars.com/api/?name=Y+K&background=3b82f6&color=fff&size=128',
  'Türkiye''nin en aktif yazılımcı topluluğu.'
),
(
  'Startup Istanbul',
  'startup-istanbul',
  'https://ui-avatars.com/api/?name=S+I&background=10b981&color=fff&size=128',
  'Girişimciler için buluşma noktası.'
)
on conflict (subdomain) do nothing;

-- 2. Insert Events
-- We look up the community_id dynamically to avoid "Detail: Key ... is not present" errors.
insert into events (community_id, title, description, start_date, location, capacity, image, status, platform)
values
(
  (select id from communities where subdomain = 'yazilimcilar' limit 1),
  'Büyük Buluşma: Microservices',
  'Microservices mimarisi üzerine derinlemesine bir sohbet.',
  '2026-06-15 14:00:00+00',
  'Kolektif House Levent',
  100,
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
  'PUBLISHED',
  'Luma'
),
(
  (select id from communities where subdomain = 'yazilimcilar' limit 1),
  'React 19 Yenilikleri',
  'React ekosistemindeki son gelişmeler.',
  '2026-06-20 19:00:00+00',
  'Online (Zoom)',
  500,
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000',
  'PUBLISHED',
  'Eventbrite'
),
(
  (select id from communities where subdomain = 'startup-istanbul' limit 1),
  'Yatırımcı Buluşması',
  'Melek yatırımcılarla networking etkinliği.',
  '2026-06-25 09:00:00+00',
  'Swisshotel Bosphorus',
  50,
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000',
  'DRAFT',
  'Meetup'
),
(
  (select id from communities where subdomain = 'yazilimcilar' limit 1),
  '2023 Kış Zirvesi',
  'Geçen yılın en büyük yazılım buluşması. 500+ katılımcı ile teknolojinin geleceğini konuştuk.',
  '2023-12-15 10:00:00+00',
  'Kolektif House, Levent',
  500,
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2670',
  'PUBLISHED',
  'Luma'
),
(
  (select id from communities where subdomain = 'yazilimcilar' limit 1),
  'Golang Workshop',
  'Go diline giriş ve microservices mimarisi üzerine pratik bir atölye çalışması.',
  '2024-03-10 14:00:00+00',
  'Online',
  50,
  'https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&q=80&w=2670',
  'PUBLISHED',
  'Cominfy'
);
