-- =============================================================
-- Données d'exemple pour un compte existant.
-- 1. Remplacez l'email en bas du fichier par celui du compte visé.
-- 2. Exécutez dans Supabase > SQL Editor.
-- Le SQL Editor s'exécute en administrateur : il contourne le RLS,
-- c'est pourquoi on précise user_id explicitement.
-- Les dates sont relatives à aujourd'hui (current_date) pour que
-- les relances restent cohérentes quel que soit le jour d'exécution.
-- =============================================================

insert into public.applications (user_id, company, position, job_url, sent_at, status, notes)
select users.id, v.company, v.position, v.job_url, v.sent_at, v.status, v.notes
from auth.users as users
cross join (
  values
    ('Doctolib', 'Développeur front-end React', 'https://careers.doctolib.com', current_date - 12, 'sent',
     'Candidature envoyée via le site carrière.'),
    ('Decathlon Digital', 'Développeur web full-stack', 'https://recrutement.decathlon.fr', current_date - 20, 'interview',
     'Entretien technique prévu : revoir React et SQL.'),
    ('Leboncoin', 'Développeur React', 'https://careers.adevinta.fr', current_date - 3, 'sent',
     null),
    ('Back Market', 'Développeur front-end', 'https://jobs.backmarket.com', current_date - 15, 'followed_up',
     'Relancé par email, en attente de réponse.'),
    ('OVHcloud', 'Développeur web', 'https://careers.ovhcloud.com', current_date - 30, 'rejected',
     'Refus : profil plus orienté back-end recherché.'),
    ('Alan', 'Développeur full-stack JavaScript', null, null, 'to_send',
     'Adapter la lettre de motivation avant envoi.')
) as v(company, position, job_url, sent_at, status, notes)
where users.email = 'VOTRE_EMAIL@exemple.com';
