cd ./android
CALL gradlew.bat clean
cd ../
CALL tsc
CALL react-native bundle --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --platform android --assets-dest ./android/app/src/main/res/ --dev false
cd ./android
CALL gradlew.bat assembleRelease