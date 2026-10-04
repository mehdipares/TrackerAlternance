-- =============================================================
-- Alternance Tracker : schéma de la base de données
-- À exécuter une fois dans Supabase > SQL Editor.
-- =============================================================

-- Une candidature appartient à un utilisateur (table auth.users gérée par Supabase).
create table public.applications (
  id          uuid primary key default gen_random_uuid(),
  -- Rempli automatiquement avec l'utilisateur connecté : le front n'a pas à l'envoyer.
  user_id     uuid not null default auth.uid()
              references auth.users (id) on delete cascade,
  company     text not null check (char_length(company) between 1 and 100),
  position    text not null check (char_length(position) between 1 and 100),
  job_url     text,
  sent_at     date,
  -- Valeurs techniques en anglais ; les libellés français sont dans src/utils/status.js
  status      text not null default 'to_send'
              check (status in ('to_send', 'sent', 'followed_up', 'interview', 'rejected', 'accepted')),
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Accélère la requête principale : « les candidatures de cet utilisateur ».
create index applications_user_id_idx on public.applications (user_id);

-- Met à jour updated_at automatiquement à chaque modification.
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger applications_set_updated_at
before update on public.applications
for each row execute function public.set_updated_at();

-- =============================================================
-- Sécurité en deux niveaux :
-- 1. GRANT (niveau table) : seuls les utilisateurs connectés
--    ont accès à la table. Les visiteurs anonymes (anon), aucun.
-- 2. RLS (niveau ligne) : chaque utilisateur ne voit et ne modifie
--    que ses propres lignes. Sans policy, tout est refusé par défaut.
-- =============================================================
grant select, insert, update, delete on public.applications to authenticated;

alter table public.applications enable row level security;

create policy "Lecture de ses candidatures"
on public.applications for select
to authenticated
using (auth.uid() = user_id);

create policy "Création de ses candidatures"
on public.applications for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Modification de ses candidatures"
on public.applications for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Suppression de ses candidatures"
on public.applications for delete
to authenticated
using (auth.uid() = user_id);
