
-- Création des règles de sécurité pour le bucket avatars
CREATE POLICY "Les utilisateurs peuvent voir tous les avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Les utilisateurs peuvent télécharger leur propre avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = name
);

CREATE POLICY "Les utilisateurs peuvent mettre à jour leur propre avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = name
);

CREATE POLICY "Les utilisateurs peuvent supprimer leur propre avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = name
);
