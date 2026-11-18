---
keywords: premiers pas, démarrer, compte, interface, page d’accueil, aide
---

# Premiers pas

De la première connexion à votre première page : ce que vous faites avec Flowplan pendant les dix premières minutes.

## Se connecter ou créer un compte

Vous vous connectez avec votre e-mail et votre mot de passe, avec une clé d’accès (empreinte, visage ou code de l’appareil) ou – si votre organisation l’a configuré – avec **Se connecter avec SSO**, via la connexion de votre organisation (OpenID Connect, par exemple Keycloak, Authentik, Zitadel ou Entra ID). La page de connexion propose la méthode utilisée en dernier sur cet appareil sous forme d’un grand bouton ; **Avec e-mail et mot de passe** ouvre le formulaire. **Créer un compte** crée un compte, à condition que l’instance autorise les inscriptions ou que vous ayez été invité. Vous ajoutez ensuite des clés d’accès sous **Paramètres → Compte et sécurité**. Tout le reste est décrit sous [Sign-in](/sign-in) (en anglais).

Sur une instance toute neuve, vous créez le premier compte – il administre l’instance. Si vous déménagez ou réinstallez, choisissez plutôt **Restaurer depuis une sauvegarde** ([Restore while setting up](/restore#restore-while-setting-up)).

Lors de votre première connexion, Flowplan crée un espace de travail privé avec des pages d’exemple. Avec l’authentification unique (SSO), votre nom, votre adresse e-mail et – si elle existe – votre photo de profil viennent du fournisseur de connexion.

**Langue :** Flowplan suit la langue de votre navigateur. Sous **Paramètres → Apparence et langue → Langue**, vous choisissez l’allemand, l’anglais, l’anglais (US), le français ou le chinois – le choix vaut alors sur tous vos appareils, y compris pour les e-mails et les notifications push. L’interface de Flowplan est entièrement traduite en français ; la documentation, elle, est pour l’instant en anglais, à part cette page.

## L’introduction

Après la création du compte, Flowplan vous guide une fois à travers l’essentiel : langue et apparence, pour les administrateurs la configuration de l’instance, si vous le souhaitez le passage depuis l’outil que vous utilisiez jusqu’ici, les premières pages, les notifications et l’usage hors ligne sur cet appareil. Chaque étape peut être sautée ; ensuite, la liste **Premiers pas** dans la barre latérale vous aide à continuer.

Vous venez de Notion, AFFiNE, Obsidian, Evernote, Confluence ou Google Docs ? Vous pouvez importer vos pages dans l’introduction (étape **D’où venez-vous ?**) et à tout moment sous **Paramètres → Import et export**. Ce qui est repris et comment s’y prendre au mieux est expliqué sous [Moving to Flowplan](/migrate).

Les paramètres s’ouvrent sur une vue d’ensemble, regroupée en **Personnel**, **Connexions**, **Espace de travail** et **Aide et infos**. La recherche en haut aide à trouver une section – « clé d’accès » mène par exemple à **Compte et sécurité**.

## L’interface

- **Barre latérale** à gauche : changement d’espace de travail, recherche, accueil, boîte de réception, vos espaces avec l’arborescence des pages, puis modèles, médias, corbeille et paramètres.
- **Accueil** : les pages modifiées récemment, des raccourcis pour une nouvelle idée ou un nouveau projet et toutes les pages de votre espace de travail – personnalisable avec des widgets (voir plus bas).
- **En-tête** d’une page : le chemin, **Partager**, **Commentaires**, les favoris et le menu **Actions de la page** (`…`).
- **Chemin :** espace de travail → pages parentes → page. Chaque élément est un lien. Les pages que vous ne pouvez pas lire n’y apparaissent pas.

Sur un ordinateur, faites glisser le bord droit de la barre latérale pour l’élargir ou la réduire ; un double-clic sur le bord rétablit la largeur d’origine. Sur un téléphone, la barre latérale se replie : l’icône en haut à gauche l’ouvre, de même qu’un balayage vers la droite depuis le bord gauche. La barre en bas de l’écran contient aussi **Accueil**, **Rechercher**, **Boîte de réception** et, au milieu, le **+** rond pour une nouvelle page. Pour l’iPhone et l’iPad, il existe une application sur l’App Store, pour Android une application à télécharger ([Apps for iPhone, iPad and Android](/mobile-apps)).

En haut à gauche, les flèches **←** et **→** ramènent à la page ouverte précédemment et à nouveau en avant, comme les boutons du navigateur. Raccourcis : ++⌘ [++ et ++⌘ ]++ (Windows et Linux : ++Alt ←++ et ++Alt →++). Tous les raccourcis sont sous [Keyboard shortcuts](/keyboard-shortcuts).

## Personnaliser la page d’accueil

La page d’accueil vous appartient : **Personnaliser** en haut à droite (ou « Personnaliser la page d’accueil » dans la recherche rapide) vous permet de la composer de widgets selon votre façon de travailler. Sur un téléphone, tout tient sur une colonne, sur une tablette sur deux, sur un grand écran sur trois ou quatre – les applications et l’application de bureau affichent la même page d’accueil.

Pendant la personnalisation :

- **Widget** ouvre la galerie : salutation, pages récentes, favoris, pages de l’espace de travail, mes tâches, boîte de réception, journal du jour, agenda, vue de base de données, page épinglée, capture rapide, concentration et temps, habitudes, compteur, bloc-notes, activité, liens et d’autres encore.
- **Déplacer** : faites glisser la poignée, utilisez les flèches ou le clavier.
- **Taille** : petite (une colonne), moyenne (deux), grande (trois) ou pleine largeur.
- **Paramètres** (roue dentée) : un titre à vous et ce que le widget affiche.
- **Apparence** : un en-tête avec une couleur, un dégradé ou une image de couverture, une icône, un espacement confortable ou compact.
- **Terminé** enregistre, **Annuler** abandonne les modifications.

Les widgets n’affichent que ce que vous avez le droit de voir. Une page de chiffres et de graphiques que plusieurs personnes consultent ensemble est un [Dashboard](/dashboards) (en français : tableau de bord).

## Votre première page

1. Cliquez sur **+** à côté d’un espace dans la barre latérale, ou choisissez **Nouvelle page** sur la page d’accueil.
2. Saisissez un nom en haut et choisissez le type en dessous : **Document**, **Base de données**, **Tableau blanc**, **Journal**, **Tableau de bord**, **Carnet**, **Workflow** ou **À partir d’un modèle**. **Espace** indique où la page est créée.
3. **Créer une page**, puis commencez à écrire. Tout est enregistré automatiquement, même sans connexion.

Dans un document, `/` ouvre le menu des blocs : tapez `/h2`, `/todo` ou `/table` et appuyez sur Entrée pour insérer le bloc. Le fonctionnement de l’éditeur est expliqué sous [Documents and the editor](/documents).

## Trouver plutôt que chercher

++⌘ K++ (Windows et Linux : ++Ctrl K++) ouvre la recherche rapide dans les titres, les textes, les enregistrements des bases de données, les commentaires et même le contenu des PDF et fichiers Office importés. Plus de détails sous [Search, inbox and push](/search-and-notifications).

## Pour aller plus loin

- [Pages and spaces](/pages-and-spaces) : arborescence, favoris, déplacer des pages et corbeille.
- [Databases](/databases) : tableaux, kanban, calendriers et plus encore à partir des mêmes enregistrements.
- [Collaboration and comments](/collaboration) : écrire ensemble, commenter, mentionner.

## Aide et communauté

Une question, une idée ou simplement envie de dire bonjour : sur le **[Discord de Flowplan](https://discord.gg/bCEdB6MPrR)**, utilisateurs et administrateurs s’entraident. Signalez de préférence les bugs et les demandes de fonctionnalités sous forme d’[issues GitHub](https://github.com/yannicschuller/flowplan/issues), pour que rien ne se perde – en anglais si possible, en français si c’est plus simple pour vous.

**Paramètres → Aide et infos → À propos de Flowplan** indique la version en cours d’exécution ; mentionnez-la si vous signalez un bug. **Nouveautés** y ouvre les notes des dernières versions.
