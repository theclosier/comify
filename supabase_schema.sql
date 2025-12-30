-- Create Profiles Table (Extends Auth Users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  email text,
  avatar_url text,
  bio text,
  role text default 'member' check (role in ('admin', 'member')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Create Communities Table
create table communities (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  subdomain text not null unique,
  logo text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table communities enable row level security;
create policy "Communities are viewable by everyone." on communities for select using (true);
create policy "Admins can insert communities." on communities for insert with check (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update communities." on communities for update using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));


-- Create Events Table
create table events (
  id uuid default gen_random_uuid() primary key,
  community_id uuid references communities(id) on delete cascade,
  title text not null,
  description text,
  start_date timestamp with time zone not null,
  location text,
  capacity int,
  price decimal,
  image text,
  status text default 'DRAFT' check (status in ('PUBLISHED', 'DRAFT')),
  platform text default 'Cominfy',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table events enable row level security;
create policy "Published events are viewable by everyone." on events for select using (status = 'PUBLISHED' or exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can insert events." on events for insert with check (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update events." on events for update using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Create Demo Community & Event
insert into communities (name, subdomain, description, logo)
values ('Yazılımcılar Kulübü', 'yazilimcilar', 'Yazılım dünyasına dair her şey.', 'https://ui-avatars.com/api/?name=YK&background=random');

insert into events (community_id, title, description, start_date, location, capacity, status)
select id, 'React 19 Lansmanı', 'React 19 özelliklerini inceliyoruz.', now() + interval '1 week', 'Online', 500, 'PUBLISHED'
from communities where subdomain = 'yazilimcilar';
