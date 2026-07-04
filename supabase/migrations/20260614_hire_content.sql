-- Hire services
create table if not exists public.hire_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  price_label text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Hire reasons
create table if not exists public.hire_reasons (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Contact inquiries
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  page_source text,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.hire_services enable row level security;
alter table public.hire_reasons enable row level security;
alter table public.inquiries enable row level security;

-- Public read for hire content
create policy "hire_services_select" on public.hire_services for select using (true);
create policy "hire_reasons_select" on public.hire_reasons for select using (true);

-- Anyone can insert inquiries
create policy "inquiries_insert" on public.inquiries for insert with check (true);

-- Seed data: services
insert into public.hire_services (title, description, price_label, sort_order) values
  ('Full-Time Role', 'Senior or lead engineer who owns the product end-to-end. I don''t wait for tickets — I find the problems and ship the fixes.', 'EMEA Remote', 1),
  ('Contract Project', 'From zero to production or from broken to stable. I take ownership of the product, not just the tasks.', '3-6 Month Engagement', 2),
  ('Rescue Sprint', 'Technical debt piling up? Site falling apart? I stabilize, clean up, and get things working again in 48-72h focused bursts.', 'Flat Fee', 3);

-- Seed data: reasons
insert into public.hire_reasons (text, sort_order) values
  ('10+ Years Shipping Web Products', 1),
  ('AI-First Workflow (Bun, MCP, Gemini)', 2),
  ('EMEA Timezone / Remote Ready', 3),
  ('Clear Communication, No Runaround', 4),
  ('I Solve Problems, Then Move On', 5);
