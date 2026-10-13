# Portfolio de Rémi Lamat

Site personnel publié sur GitHub Pages : **https://rlamat.github.io/LAMAT_Remi_Portfolio/**
(version anglaise : `/en/`).

Site statique en HTML, SCSS et JavaScript, sans framework.

## Structure

| Chemin | Rôle |
|---|---|
| `index.html` | Page principale (français) : accueil, expériences, à propos, projets, contact |
| `extramus.html` | Page détaillée du projet de stage Extramus |
| `i18n/en.json` | Tous les textes anglais, indexés par les attributs `data-i18n` des pages françaises |
| `tools/build.js` | Génère `en/` et insère le sprite d'icônes dans les pages |
| `app.js` | Navigation (section active), thème clair/sombre, visionneuse d'images, numéro de téléphone |
| `styles/` | Sources SCSS (`styles.scss`, `_media.scss`) et CSS compilé (`styles.css`) |
| `img/icons.svg` | Icônes (Font Awesome Free 5.15.4, licence CC BY 4.0) |
| `pdf/` | CV (français et anglais) et rapports des projets académiques |

## Modifier le site

**Textes** : le français s'écrit directement dans `index.html` / `extramus.html`. Tout élément traduit
porte un attribut `data-i18n="cle"` (contenu) ou `data-i18n-attr="attribut:cle"` (attribut), et la
traduction anglaise correspondante va dans `i18n/en.json`.

**Pages anglaises** : elles sont générées, ne pas les modifier à la main.

```bash
node tools/build.js
```

Le script échoue si une clé n'a pas de traduction. Le dossier `en/` n'est pas versionné : le workflow
de déploiement le régénère à chaque push.

**Styles** : modifier les fichiers `.scss`, puis compiler :

```bash
npx sass --no-source-map styles/styles.scss styles/styles.css
```

**Icônes** : ajouter un `<symbol id="i-nom">` dans `img/icons.svg`, l'utiliser avec
`<svg class="icon" aria-hidden="true"><use href="#i-nom"/></svg>`, puis relancer `node tools/build.js`.

**Compétences** : la liste du site (`index.html`, section Compétences) et celle des CV doivent rester
identiques.

## Aperçu en local

Après `node tools/build.js`, ouvrir `index.html` dans le navigateur, ou lancer un petit serveur :

```bash
npx serve .
```

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/static.yml` : build des pages anglaises, puis
publication sur GitHub Pages.
