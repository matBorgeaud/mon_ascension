# Mon Ascension — memecoins en habit d’époque

## Description
Une fiction interactive où l’on glisse, sourire crispé, dans une ascension à la Ponzi — sauf qu’ici, l’habit d’époque pose pour la photo pendant que les memecoins font les poches. Le texte ne date jamais rien; les images, elles, paradent en « finance noire des années 1920 ». Anachronisme? Plutôt un miroir: mêmes promesses exponentielles, même confiance élastique, autre vernis. Le joueur incarne un funambule qui, comme Ponzi, se découvre condamné à continuer — pousser toujours plus loin, espérant repousser la chute, avec l’ironie comme casque en papier.

### Inspirations
- Ambiance et état d’esprit librement inspirés de « Mon ascension » de Charles Ponzi. Aucune citation textuelle; l’influence est celle du vertige et de l’auto‑enchaînement: on performe la réussite jusqu’à ce qu’elle vous traîne.

### Ton et choix esthétiques
- Images au style « époque » (noir financier, costumes, fumée) sur un récit contemporain des memecoins: décalage volontaire, satire assumée.
- Sarcasme léger: l’optimisme technico‑magique, les promesses de 100x et les bots qui « aident »… jusqu’à ce qu’ils aident surtout la gravité.

## Capture
![Illustration](images/illustration.png)  
Voir aussi le fichier source de l’illustration: [`images/illustration.png`](images/illustration.png)
- Pas de VR: aucun GIF requis.

## Démo en ligne
Jouer directement: https://fi.borgeaud.online

## Installation / Lancement
- Aucune installation nécessaire pour jouer: utilisez le lien de démo ci‑dessus.
- Pour un déploiement statique classique, le build public contient un [`index.html`](index.html) à la racine.

## Modules, librairies et scripts
- Outil de création: Twine au format SugarCube 2.36.1 (export web).
- Scripts front embarqués dans l’export SugarCube (gestion d’overlay de titre, menu hamburger, lexique).
- Côté joueur: un navigateur moderne suffit; aucune dépendance à installer.

## Crédits, droits et sources
- Images: générées via Midjourney; prompts documentés dans [`prompt_img.json`](prompt_img.json).
- Code et snippets: toute récupération partielle doit être créditée à même le code via des commentaires inline, conformément aux consignes anti‑plagiat.
- Licence: non spécifiée. À défaut d’indication contraire, les contenus de ce dépôt ne sont pas placés sous une licence open‑source explicite.
- Matériel soumis à droit d’auteur: aucun dépôt de matériaux non autorisés sur un dépôt public. En cas de doute, utiliser un dépôt privé.

## Contexte de développement
Ce projet a été développé dans le cadre du cours de fiction interactive dispensé par Isaac Pante (SLI, Lettres, UNIL).

## Structure du dépôt
Recommandations organisationnelles:
- Fichier de démarrage à la racine: [`index.html`](index.html).
- Styles dans un dossier styles/, images dans un dossier images/, ressources complémentaires dans assets/.

Éléments présents dans ce dépôt:
- Dossier d’images: [`images/`](images/)
  - Illustrations de passages: [`images/story/`](images/story/)
- Fichiers de données et documentation:
  - [`prompt_img.json`](prompt_img.json) — prompts des images Midjourney.
  - [`lexique.md`](lexique.md) — lexique des notions (pump.fun, LP, DEX, etc.).
  - Fichier source Twine: [`MonAscension.twee`](MonAscension.twee) (format SugarCube 2.36.1).

## Limites et améliorations
Les limites, bugs et pistes d’amélioration sont suivies dans l’onglet Issues du dépôt, étiquetées avec bug, enhancement, etc. Elles ne sont délibérément pas détaillées ici.

## Notes de conformité
- Le nom du dépôt doit faciliter l’identification unique du projet (penser « marque » plutôt que « projet‑générique »).
- En cas d’utilisation de code tiers, mentionner la source dans des commentaires inline au sein des fichiers concernés.
- Ne pas déposer de matériel soumis à droit d’auteur sans autorisation sur une archive publique.