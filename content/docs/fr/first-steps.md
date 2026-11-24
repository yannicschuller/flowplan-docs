---
keywords: premiers pas, démarrer, compte, interface, page d’accueil, aide
---

# Premiers pas

De la première connexion à votre première page : ce que vous faites avec Flowplan pendant les dix premières minutes.

## Se connecter ou créer un compte

Vous vous connectez avec votre e-mail et votre mot de passe, avec une clé d’accès (empreinte, visage ou code de l’appareil) ou – si votre organisation l’a configuré – avec **Se connecter avec SSO**, via la connexion de votre organisation (OpenID Connect, par exemple Keycloak, Authentik, Zitadel ou Entra ID). La page de connexion propose la méthode utilisée en dernier sur cet appareil sous forme d’un grand bouton ; **Avec e-mail et mot de passe** ouvre le formulaire. **Créer un compte** crée un compte, à condition que l’instance autorise les inscriptions ou que vous ayez été invité. Vous ajoutez ensuite des clés d’accès sous **Paramètres → Compte et sécurité**. Tout le reste est décrit sous [Sign-in](/sign-in) (en anglais).

Sur une instance toute neuve, vous créez le premier compte – il administre l’instance. Si vous déménagez ou réinstallez, choisissez plutôt **Restaurer depuis une sauvegarde** ([Restore while setting up](/restore#restore-while-setting-up)).

Lors de votre première connexion, Flowplan crée un espace de travail privé avec des pages d’exemple. Avec l’authentification unique (SSO), votre nom, votre adresse e-mail et – si elle existe – votre photo de profil viennent du fournisseur de connexion.

**Langue :** Flowplan suit la langue de votre navigateur. Sous **Paramètres → Apparence et langue → Langue**, vous choisissez l’allemand, l’anglais, l’anglais (US), le français, le chinois ou le russe – le choix vaut alors sur tous vos appareils, y compris pour les e-mails et les notifications push. L’interface de Flowplan est entièrement traduite en français ; la documentation, elle, est pour l’instant en anglais, à part cette page.

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

### Précédent et suivant

En haut à gauche, à côté de l’icône de la barre latérale, les flèches **←** et **→** vous ramènent à la page ouverte précédemment, puis à nouveau en avant. Chaque endroit qui a sa propre adresse compte comme une étape : pages, bases de données, jours du journal, tableaux blancs, un enregistrement ouvert depuis une base de données (en fenêtre et en pleine page, une étape chacun), l’accueil, la boîte de réception, **Mes tâches**, les étiquettes, les collections, les médias, la corbeille et les sections des paramètres. Les fenêtres de dialogue, les menus et la recherche ne comptent pas, et fermer un enregistrement ouvert dans sa base de données vous y ramène sans étape supplémentaire. Quand il n’y a rien dans une direction, la flèche correspondante est grisée. Chaque page et chaque vue s’ouvre en haut ; **←** et **→** vous ramènent là où vous l’aviez quittée.

- **Liste :** un clic droit ou un appui long sur une flèche affiche les dernières pages (dix au maximum) dans cette direction, avec leur icône et leur titre – un clic y mène directement.
- **Raccourcis clavier :** ++⌘ [++ et ++⌘ ]++ ou ++⌥ ←++ et ++⌥ →++ (Windows et Linux : ++Alt ←++ / ++Alt →++ ou ++Ctrl [++ / ++Ctrl ]++). Pendant la saisie, ++⌥++/++Alt++ avec une flèche déplace le curseur comme d’habitude ; les raccourcis se modifient comme tous les autres ([Keyboard shortcuts](/keyboard-shortcuts)).
- **Navigateur :** les flèches font les mêmes pas que les boutons Précédent et Suivant du navigateur et que les boutons latéraux de la souris – vous pouvez les combiner.
- **Application de bureau :** également le menu *Navigation* → **Précédent** / **Suivant**, les boutons latéraux de la souris et, sur un Mac, le balayage sur le trackpad ([More from the desktop app](/desktop-app#more-from-the-desktop-app)).
- **Téléphone :** il n’y a pas de flèches – le geste de retour (iPhone) ou le bouton Retour (Android) revient en arrière.

De courtes animations montrent ce qui vient de bouger : les cartes et les lignes glissent vers leur nouvelle place, et la cible d’un saut – depuis la table des matières, la recherche ou une notification – s’illumine brièvement. Le passage à une autre page ne fait qu’un bref fondu de la zone de contenu ; une carte d’un tableau kanban ou d’une galerie s’agrandit jusqu’à son enregistrement. Un appui ou une touche termine la transition aussitôt. L’intensité des animations se règle sous **Paramètres → Apparence et langue → Animations** ([Light and dark](/offline-and-apps#light-and-dark)). Si **Réduire les animations** est activé dans les réglages de votre appareil, tout arrive à sa place sans mouvement.

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

### À propos de Flowplan

**Paramètres → Aide et infos → À propos de Flowplan** (`/#settings/about`, également dans le menu du compte ⋯ en bas de la barre latérale – sur un téléphone sous **Plus** – et avec ++⌘/Ctrl K++ → « À propos de Flowplan ») affiche :

- **Version :** la version en cours d’exécution, le commit et la date de compilation ; pour nos images Docker, aussi s’il s’agit d’une **bêta** (`:beta`) ou d’une **version stable**. Les administrateurs y voient aussi quand une version plus récente est connue. Mentionnez de préférence la version si vous signalez un bug.
- **Nouveautés :** ouvre les notes des dernières versions ([Light and dark](/offline-and-apps#light-and-dark)).
- **Licence et code source :** Flowplan est un logiciel libre sous licence GNU AGPL-3.0 – avec des liens vers le texte de la licence et vers le code source qui tourne sur cette instance.
- **Liens :** site web, documentation, Discord et « Signaler un bug » (issues GitHub).
- **Soutenir Flowplan ♥ :** un lien vers GitHub Sponsors. Il n’apparaît jamais dans les applications pour iPhone, iPad et Android (règles des boutiques d’applications) ; les administrateurs peuvent le masquer avec `FLOWPLAN_HIDE_SPONSOR=true` ([Configuration](/configuration-storage#legal-and-interface)).

La recherche trouve la page avec « À propos », « Version », « Licence », « Source », « Soutenir » ou « Sponsor ». La page de connexion mentionne aussi en bas la licence (AGPL-3.0) et le code source.
