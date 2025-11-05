# Card Memorizer

A React Native project made using Expo to assist in the training of the memory
technique to identify missing cards from The Memory Book.

## Technologies

`React Native` the primary framework used for it's versatility and ability to
build to multiple platforms.
`Expo` the meta framework used to quickly get to a solid working point.
`Realm` used for storing decks and mnemonic devices associated with them.
`React Native Reanimated` used to handle animations.

## Features

- Custom Deck building for training.
  - Rename existing decks
  - Delete decks
- Training
  - Practice with custom decks using user chosen words for mnemonic devices
  - Shuffle Deck
  - Clear current training sessions
  - Monitor practice training progress
- Play
  - Remove `x` number of cards from the deck.
  - Select missing cards at the end of training and compare against actually removed

## Lessons Learned

### useReducer

useReducer was helpful in training mode to manage the different actions
that can be performed on the active deck and reduce code bloat in the training page.

### useContext

useContext helped pass a standard theme to multiple components with only
a single line for each component while being performant.

### useEffect

I learned about the different ways useEffect can be used to ensure aspects of
components are updated at the right time.

### Memo / useMemo / useCallback

Memoization was helpful for reducing unnecessary re-renders on heavy or
repetitive computations.

### Component Management

In hindsight I wish I had implemented a more atomic folder structure from the
start to help manage reused components and simplify creating new components.

### React Native Reanimated

The new React Native Reanimated was nice to use and was a fun challenge to
implement the card swipe animation and using it for easily creating an animated
modal component.

## How to run

1. Clone it onto your local machine.

    (https) `git clone https://github.com/JeremyWeisener/Card_Memorizer.git`

    --or--

    (ssh) `git clone git@github.com:JeremyWeisener/Card_Memorizer.git`

2. Move into directory
   `cd ./Card_Memorizer`
3. Install package
   `npm install`
4. Run the project

### For use w/ Expo Go App

[Expo Go (Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)
or
[Expo Go (App Store)](https://apps.apple.com/us/app/expo-go/id982107779)

- Unfortunately not possible because Realm requires packages that don't come
  with the default Expo Go app. A custom dev build will need to be created.

### For custom dev build (Android) **Required: Developer Options enabled / adb installed**

- Enable Developer options by going to `Settings > About Phone` and tap on
  `Build Number` 7 times.
- Go to `Settings > Developer options` and enable USB Debugging
- Install `adb` -- this varies depending on OS so follow any instructions for
  your specific desktop OS.

```
npx expo prebuild --platform android
cd android
./gradlew.bat assembleDebug
adb install ./app/build/outputs/apk/debug/app-debug.apk
```

_If you do not have permissions for the `adb install` command_

1. Revoke permissions in Developer Options (on device)
2. Say yes to prompt on the phone to give permissions
3. Rerun the command

### Build apk

- `eas build -p android --profile preview`
- Login to EAS
- Follow prompts

### For use on Android Emulator **Required: Android Emulator already setup**

- `npx expo run:android`

### For use on iOS Emulator **Required: iOS Emulator already setup**

- `npx expo run:ios`
