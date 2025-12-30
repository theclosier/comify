-- 1. Create a function that runs when a user is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'member' -- Default role is member
  );
  return new;
end;
$$ language plpgsql security definer;

-- 2. Bind this function to the auth.users table via a Trigger
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- REMINDER: 
-- You must first create the users in Supabase Dashboard -> Authentication -> Users.
-- Then, run the command below to make one of them an Admin.

-- Example Command (RUN THIS AFTER CREATING USERS):
-- update public.profiles set role = 'admin' where email = 'admin@cominfy.com';
