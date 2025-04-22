#!/usr/bin/env sh

echo "Recherche des dossiers node_modules dans le répertoire actuel et ses sous-dossiers..."

# Trouver tous les dossiers node_modules
FOUND_DIRS=$(find . -type d -name "node_modules")

# Vérifier si des dossiers ont été trouvés
if [ -z "$FOUND_DIRS" ]; then
    echo "Aucun dossier node_modules trouvé."
    exit 0
fi

# Compter le nombre de dossiers trouvés
COUNT=$(echo "$FOUND_DIRS" | wc -l)
echo "Trouvé $COUNT dossier(s) node_modules:"
echo "$FOUND_DIRS"


echo "Suppression des dossiers node_modules..."

# Pour chaque dossier trouvé
echo "$FOUND_DIRS" | while read DIR; do
	echo "Suppression de $DIR"
	rm -rf "$DIR"
done

echo "Suppression terminée."