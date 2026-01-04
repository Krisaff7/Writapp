# Writapp 📝

Writapp est une application de prise de notes mobile moderne, simple et performante, conçue avec **React Native** et **Expo**. Elle utilise une base de données locale **SQLite** pour garantir que vos données restent privées et accessibles même hors ligne.

## ✨ Fonctionnalités

- **Gestion des Notes** : Ajoutez, modifiez et supprimez vos notes avec une interface intuitive.
- **Persistance des Données** : Utilisation de `expo-sqlite` pour un stockage permanent et sécurisé.
- **Recherche Avancée** : Recherchez vos notes par titre, contenu ou même par **date** (format `JJ/MM/AAAA`).
- **Tri Intelligent** : Vos notes les plus récentes apparaissent automatiquement en haut de la liste.
- **Design Moderne** : Une interface épurée avec des ombres subtiles, des animations fluides et un bouton d'action flottant (FAB).
- **Validation** : Alertes intégrées pour s'assurer que vous ne perdez pas de données ou n'enregistrez pas de notes vides.

## 🚀 Technologies

- **Framework** : [Expo](https://expo.dev/) / [React Native](https://reactnative.dev/)
- **Navigation** : [Expo Router](https://docs.expo.dev/router/introduction/) (Routing basé sur le système de fichiers)
- **Base de données** : [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- **Styles** : [NativeWind](https://www.nativewind.dev/) (Tailwind CSS pour React Native)
- **Icônes** : [Ionicons](https://icons.expo.fyi/Index) via `@expo/vector-icons`

## 🛠️ Installation et Lancement

Suivez ces étapes pour faire fonctionner l'application localement.

### 1. Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### 2. Cloner le projet
```bash
git clone https://github.com/votre-compte/Writapp.git
cd Writapp
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Lancer l'application
```bash
npx expo start
```

### 5. Générer un APK (Android)
L'application est configurée pour utiliser **EAS (Expo Application Services)**.
1. Installez EAS CLI : `npm install -g eas-cli`
2. Connectez-vous à votre compte Expo : `eas login`
3. Lancez la création de l'APK :
   ```bash
   eas build -p android --profile preview
   ```
   *Note : Le profil "preview" est configuré dans `eas.json` pour générer un fichier `.apk` installable directement.*

Une fois la commande terminée, vous recevrez un lien pour télécharger votre APK.

---
Dépendences principales : `expo-sqlite`, `expo-router`, `nativewind`, `@expo/vector-icons`.
