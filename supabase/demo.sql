-- =============================================================
-- Compte de démo : données fictives + réinitialisation automatique
-- Prérequis : créer l'utilisateur de démo dans Supabase
--   (Authentication > Users > Add user, cocher « Auto Confirm User »).
-- Puis remplacer l'email ci-dessous et exécuter ce fichier dans le SQL Editor.
-- =============================================================

-- Supprime les candidatures du compte de démo et recrée un jeu de données fictif.
-- Les dates sont relatives au jour d'exécution : il y a toujours des relances à faire.
create or replace function public.reset_demo_data()
returns void
language plpgsql
set search_path = ''
as $$
declare
  demo_id uuid;
begin
  select id into demo_id from auth.users where email = 'demo@alternance-tracker.fr';
  if demo_id is null then
    raise exception 'Utilisateur de démo introuvable';
  end if;

  delete from public.applications where user_id = demo_id;

  insert into public.applications (user_id, company, position, job_url, sent_at, status, notes)
  values
    (demo_id, 'Nébula Studio', 'Développeur front-end React', 'https://example.com/offre-1',
     current_date - 12, 'sent', 'Candidature via le site carrière. Contact : équipe RH.'),
    (demo_id, 'Greenloop', 'Développeur web full-stack', 'https://example.com/offre-2',
     current_date - 9, 'sent', null),
    (demo_id, 'Kodo Labs', 'Développeur JavaScript', 'https://example.com/offre-3',
     current_date - 3, 'sent', 'Offre trouvée sur un job board, entreprise de 40 personnes.'),
    (demo_id, 'Datavia', 'Développeur React / Node.js', 'https://example.com/offre-4',
     current_date - 18, 'followed_up', 'Relancé par email, en attente de réponse.'),
    (demo_id, 'Orbital Santé', 'Développeur front-end', 'https://example.com/offre-5',
     current_date - 21, 'interview', 'Entretien technique prévu : revoir React, SQL et Git.'),
    (demo_id, 'Pixel & Co', 'Intégrateur / développeur web', 'https://example.com/offre-6',
     current_date - 25, 'interview', 'Premier entretien RH validé, test technique à rendre.'),
    (demo_id, 'FinPlume', 'Développeur full-stack JavaScript', 'https://example.com/offre-7',
     current_date - 30, 'rejected', 'Refus : profil plus expérimenté recherché.'),
    (demo_id, 'Atelier Brique', 'Développeur web', 'https://example.com/offre-8',
     current_date - 35, 'accepted', 'Alternance acceptée, début en septembre !'),
    (demo_id, 'Maison Lumen', 'Développeur front-end Vue / React', null,
     null, 'to_send', 'Adapter la lettre de motivation avant envoi.'),
    (demo_id, 'Agence Hublot', 'Développeur web junior', 'https://example.com/offre-10',
     null, 'to_send', null);
end;
$$;

-- SÉCURITÉ : Supabase expose les fonctions du schéma public via son API (/rpc/...).
-- Sans ces lignes, n'importe quel visiteur pourrait appeler reset_demo_data().
-- Seul l'administrateur (SQL Editor, tâche planifiée) peut l'exécuter.
revoke execute on function public.reset_demo_data() from public, anon, authenticated;

-- Remplit le compte de démo immédiatement.
select public.reset_demo_data();

-- -------------------------------------------------------------
-- Réinitialisation automatique chaque nuit à 3 h (UTC)
-- Nécessite l'extension pg_cron : Database > Extensions > pg_cron > Enable
-- -------------------------------------------------------------
select cron.schedule('reset-demo-data', '0 3 * * *', 'select public.reset_demo_data()');
