# Mon Ascension

## Description
Une fiction interactive où l’on glisse, sourire crispé, dans une ascension à la Ponzi — sauf qu’ici, l’habit d’époque pose pour la photo pendant que les memecoins font les poches. Le texte parle de memecoins; les images, elles, paradent en « finance noire des années 1920 ». Anachronisme? Plutôt un miroir: mêmes promesses exponentielles, même confiance élastique, autre contexte. Le joueur incarne un funambule qui, comme Ponzi, se découvre condamné à continuer — pousser toujours plus loin, espérant repousser l'inexorable chute.

### Inspirations
- Ambiance et état d’esprit librement inspirés de « Mon ascension » de Charles Ponzi. Aucune citation textuelle; l’influence est celle du vertige et de l’auto‑enchaînement: on performe la réussite jusqu’à ce qu’elle vous traîne.

### Ton et choix esthétiques
- Images au style « époque » (noir financier, costumes, fumée) sur un récit contemporain des memecoins: décalage volontaire, satire assumée.
- Sarcasme léger: l’optimisme technico‑magique, les promesses de 100x et les bots qui « aident »… jusqu’à ce qu’ils aident surtout la gravité.

## Capture
![Illustration](images/illustration.png)  

## Démo en ligne
Jouer directement: https://fi.borgeaud.online
Ou sur itch.io: https://matborg.itch.io/mon-ascension
## Modules, librairies et outils utilisés
- Outil de création: Twine au format SugarCube 2.36.1 (export web).
- Kilo Code: un outil "d'IA" intégré à VS Code. Ce dernier a été utilisé autant pour le code que pour la création de la quasi intégralité des dialogues et raffiner la structure narrative globale (cf. les logs kilo code).
- gpt-5-2025-08-07: utilisé notamment pour créér de bons prompts pour kilo code afin d'être plus précis et de mieux gérer ma gestion des coûts avec l'API.
- Midjourney: un outil utilisé pour générer tout les visuels.
- Côté joueur: un navigateur moderne suffit; aucune dépendance à installer.

## Crédits, droits et sources
- Images: générées via Midjourney; prompts documentés dans [`prompt_img.json`](prompt_img.json).

## Contexte de développement
Ce projet a été développé dans le cadre du cours de fiction interactive dispensé par Isaac Pante (SLI, Lettres, UNIL).


Éléments présents dans ce dépôt:
- Dossier d’images: [`images/`](images/)
  - Illustrations de passages: [`images/story/`](images/story/)
- Fichiers de données et documentation:
  - [`prompt_img.json`](prompt_img.json) — prompts des images Midjourney.
  - [`kilo_code.md`](kilo_code_task_aug-25-2025_10-59-48-pm.md) — prompts kilo code. Il y a deux fichiers.
  - [`prompt_GPT.md`](prompts_openaAI-GPT5.md) - prompt gpt 5.
  - [`lexique.md`](lexique.md) — lexique des notions (pump.fun, LP, DEX, etc.).
  - Fichier source Twine: [`MonAscension.twee`](MonAscension.twee) (format SugarCube 2.36.1).

## Limites et améliorations
Les limites, bugs et pistes d’amélioration sont suivies dans l’onglet Issues du dépôt, étiquetées avec bug, enhancement, etc. Elles ne sont délibérément pas détaillées ici.
